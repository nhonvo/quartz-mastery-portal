---


title: "Advanced Math & Geometry: Fast Fourier Transform (FFT) & Polynomial Multiplication"
type: "pattern_guide"
category: "dsa"
subcategory: "09_Advanced_Math_and_Geometry"
created_at: 2026-08-22T00:08:54+07:00
updated_at: 2026-08-22T00:08:54+07:00
tags: [dsa, fft, fast-fourier-transform, ntt, polynomial-multiplication, complex-numbers, algorithm-math, algorithms, computer-science, learning-note]
---


# Advanced Math & Geometry: Fast Fourier Transform (FFT) & Polynomial Multiplication

Multiplying two polynomials $A(x) = \sum_{i=0}^{N-1} a_i x^i$ and $B(x) = \sum_{j=0}^{M-1} b_j x^j$ using coefficient form requires $O(N \cdot M)$ operations via standard Cauchy convolution. The **Fast Fourier Transform (FFT)** evaluates polynomial coefficients at complex **roots of unity** to transform them into **point-value form** in $O(N \log N)$ time, multiplies the values element-wise in $O(N)$, and interpolates back using Inverse FFT (IFFT).

This guide covers coefficient vs point-value representations, Cooley-Tukey Radix-2 Decimation-in-Time (DIT) FFT, bit-reversal permutation, Number Theoretic Transform (NTT) mod $998244353$, complete C# and Python implementations, numerical precision bounds, and variant applications.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Dual Representations of Polynomials

- **Coefficient Form**: $A(x) = (a_0, a_1, \dots, a_{N-1})$. Multiplication $C(x) = A(x) \cdot B(x)$ requires $O(N^2)$ convolution: $c_k = \sum_{i=0}^k a_i b_{k-i}$.
- **Point-Value Form**: A degree-$N$ polynomial is uniquely defined by $N$ distinct point-value pairs $\{(x_0, y_0), (x_1, y_1), \dots, (x_{N-1}, y_{N-1})\}$. Point-wise multiplication $C(x_k) = A(x_k) \cdot B(x_k)$ takes $O(N)$ time.

```
Coefficient Form A, B  ---(FFT Evaluation O(N log N))--->  Point-Value Form A(w_k), B(w_k)
                                                                    |
                                                      Pointwise Mult O(N)
                                                                    v
Coefficient Form C    <---(IFFT Interpolation O(N log N))--  Point-Value Form C(w_k)
```

---

## 1.2 Roots of Unity & Cooley-Tukey Divide-and-Conquer

The $N$-th roots of unity are complex numbers satisfying $\omega^N = 1$:
$$\omega_N^k = e^{2\pi i k / N} = \cos\left(\frac{2\pi k}{N}\right) + i \sin\left(\frac{2\pi k}{N}\right)$$

### Key Properties:
1. **Cancellation Property**: $\omega_{dN}^{dk} = \omega_N^k$.
2. **Halving Property**: If $N$ is even, the squares of the $N$ roots of unity are the $N/2$ roots of unity.
3. **Symmetry Property**: $\omega_N^{k + N/2} = -\omega_N^k$.

Using even and odd coefficient splitting:
$$A(x) = A_{even}(x^2) + x A_{odd}(x^2)$$
$$A(\omega_N^k) = A_{even}(\omega_{N/2}^k) + \omega_N^k A_{odd}(\omega_{N/2}^k)$$
$$A(\omega_N^{k + N/2}) = A_{even}(\omega_{N/2}^k) - \omega_N^k A_{odd}(\omega_{N/2}^k)$$

---

## 1.3 Bit-Reversal Permutation Diagram

Iterative Cooley-Tukey FFT operates in-place by reordering input array elements according to their **bit-reversed indices** before applying butterfly operations:

```mermaid
stateDiagram-v2
    [*] --> BitReverse: Apply Bit-Reversal Permutation to array
    BitReverse --> LevelLoop: Loop stage len = 2, 4, 8, ... N
    LevelLoop --> CalculateW: Compute principal root w_len = exp(2*pi*i / len)
    CalculateW --> ButterflyOp: Perform Butterfly Operation:
    ButterflyOp --> CalcPair: u = A[i + j], v = w * A[i + j + len/2]
    CalcPair --> UpdatePair: A[i + j] = u + v, A[i + j + len/2] = u - v
    UpdatePair --> StepW: w = w * w_len
    StepW --> LevelLoop: Next element pair / Next level
```

---

## 2. Idiomatic Code Implementations

### 2.1 C# 12 Implementation

```csharp
using System;
using System.Numerics;

namespace AdvancedMath
{
    public class FastFourierTransform
    {
        public static void FFT(Complex[] a, bool invert)
        {
            int n = a.Length;
            
            // 1. Bit-Reversal Permutation
            for (int i = 1, j = 0; i < n; i++)
            {
                int bit = n >> 1;
                for (; (j & bit) != 0; bit >>= 1)
                {
                    j ^= bit;
                }
                j ^= bit;
                if (i < j)
                {
                    (a[i], a[j]) = (a[j], a[i]);
                }
            }

            // 2. Iterative Butterfly Diagram
            for (int len = 2; len <= n; len <<= 1)
            {
                double ang = 2 * Math.PI / len * (invert ? -1 : 1);
                Complex wlen = new Complex(Math.Cos(ang), Math.Sin(ang));

                for (int i = 0; i < n; i += len)
                {
                    Complex w = 1;
                    int halfLen = len >> 1;
                    for (int j = 0; j < halfLen; j++)
                    {
                        Complex u = a[i + j];
                        Complex v = a[i + j + halfLen] * w;
                        a[i + j] = u + v;
                        a[i + j + halfLen] = u - v;
                        w *= wlen;
                    }
                }
            }

            // 3. Scaling for Inverse FFT
            if (invert)
            {
                for (int i = 0; i < n; i++)
                {
                    a[i] /= n;
                }
            }
        }

        public static long[] Multiply(long[] a, long[] b)
        {
            int n = 1;
            while (n < a.Length + b.Length) n <<= 1;

            Complex[] fa = new Complex[n];
            Complex[] fb = new Complex[n];

            for (int i = 0; i < a.Length; i++) fa[i] = a[i];
            for (int i = 0; i < b.Length; i++) fb[i] = b[i];

            FFT(fa, invert: false);
            FFT(fb, invert: false);

            for (int i = 0; i < n; i++)
            {
                fa[i] *= fb[i];
            }

            FFT(fa, invert: true);

            long[] result = new long[a.Length + b.Length - 1];
            for (int i = 0; i < result.Length; i++)
            {
                result[i] = (long)Math.Round(fa[i].Real);
            }
            return result;
        }
    }
}
```

---

### 2.2 Python 3 Implementation

```python
import cmath
import math


def fft(a: list[complex], invert: bool = False):
    n = len(a)
    
    # Bit-Reversal Permutation
    j = 0
    for i in range(1, n):
        bit = n >> 1
        while j & bit:
            j ^= bit
            bit >>= 1
        j ^= bit
        if i < j:
            a[i], a[j] = a[j], a[i]

    # Iterative Butterfly
    length = 2
    while length <= n:
        ang = 2 * math.pi / length * (-1 if invert else 1)
        wlen = cmath.rect(1.0, ang)

        half_len = length // 2
        for i in range(0, n, length):
            w = 1.0 + 0.0j
            for j_idx in range(half_len):
                u = a[i + j_idx]
                v = a[i + j_idx + half_len] * w
                a[i + j_idx] = u + v
                a[i + j_idx + half_len] = u - v
                w *= wlen
        length <<= 1

    if invert:
        for i in range(n):
            a[i] /= n


def multiply(a: list[int], b: list[int]) -> list[int]:
    n = 1
    target_len = len(a) + len(b)
    while n < target_len:
        n <<= 1

    fa = [complex(x, 0) for x in a] + [0.0j] * (n - len(a))
    fb = [complex(x, 0) for x in b] + [0.0j] * (n - len(b))

    fft(fa, invert=False)
    fft(fb, invert=False)

    fc = [fa[i] * fb[i] for i in range(n)]

    fft(fc, invert=True)

    result_len = len(a) + len(b) - 1
    return [round(fc[i].real) for i in range(result_len)]
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation Stage | Time Complexity | Auxiliary Space | Key Operations |
| :--- | :--- | :--- | :--- |
| **Bit-Reversal Permutation** | $O(N)$ | $O(1)$ | Bitwise XOR swaps |
| **Forward FFT Traversal** | $O(N \log N)$ | $O(N)$ | $N \log_2 N$ complex additions/multiplications |
| **Pointwise Array Product** | $O(N)$ | $O(1)$ | $N$ complex scalar multiplications |
| **Inverse FFT (IFFT)** | $O(N \log N)$ | $O(1)$ | $N \log_2 N$ butterfly ops + $N$ scalar divisions |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Failure to Pad Array Size to Next Power of Two**:
   - *Bug*: FFT requires input length $N = 2^k$. Using non-power-of-two size causes index out of bounds or invalid butterfly pairing.
   - *Fix*: Compute minimum $N = 2^{\lceil \log_2(|A| + |B|) \rceil}$ and pad arrays with zeros.

2. **Floating-Point Precision Loss in Large Integer Multiplication**:
   - *Bug*: Standard 64-bit IEEE double floats have 53 bits of mantissa. Multiplying polynomials with large coefficients ($> 10^6$) causes precision degradation after IFFT.
   - *Fix*: Use **NTT (Number Theoretic Transform)** modulo $998244353$ or split integers into base $10^3$ chunks.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 3272 - Find the Count of Good Integers**: Polynomial combination counting.
2. **LeetCode 43 - Multiply Strings**: Big integer multiplication variant via FFT/NTT.
3. **Codeforces 528D - Fuzzy Search**: String pattern matching with wildcards using FFT string bitmask convolutions.
