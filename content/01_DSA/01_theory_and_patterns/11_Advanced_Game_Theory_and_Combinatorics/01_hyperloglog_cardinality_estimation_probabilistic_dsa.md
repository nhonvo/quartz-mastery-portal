---


title: "Probabilistic DSA: HyperLogLog & Cardinality Estimation"
type: "pattern_guide"
category: "dsa"
subcategory: "11_Advanced_Game_Theory_and_Combinatorics"
created_at: 2026-08-22T00:30:43+07:00
updated_at: 2026-08-22T00:30:43+07:00
tags: [dsa, probabilistic-dsa, hyperloglog, cardinality-estimation, count-distinct, hash-functions, streaming-algorithms, flajolet-martin, algorithms, computer-science, learning-note]
---


# Probabilistic DSA: HyperLogLog & Cardinality Estimation

In large-scale data engineering, streaming systems, and distributed databases (e.g., Redis, Presto, Apache Druid), determining the exact number of unique elements (the **Count-Distinct / Cardinality Problem**) using hash sets requires $O(N)$ space. For billions of items, maintaining exact sets demands gigabytes or terabytes of RAM.

**HyperLogLog (HLL)** is a probabilistic algorithm introduced by Philippe Flajolet et al. (2007) that estimates stream cardinality $N$ with a relative standard error of $\approx 1.04 / \sqrt{m}$ using only $O(\log \log N)$ space per register. With $m = 16384$ registers (\$12 \text{ KB}$ memory), HLL estimates cardinalities up to $10^9+$ items within a typical $1\%$ error margin.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 The Geometric Bit-Pattern Intuition (Flajolet-Martin)
Assume a uniform 64-bit cryptographic/hash function $h(x) \to [0, 2^{64}-1]$.
For uniformly distributed random bit patterns, the probability that a hash value ends (or begins) with $k$ consecutive zeros is:
$$P(\text{leading zeros} = k) = \frac{1}{2^{k+1}}$$

If we process a stream of $N$ distinct items and record the maximum number of leading zeros $\rho_{\max}$ observed across all hash outputs, we can estimate cardinality as:
$$E \approx 2^{\rho_{\max}}$$

- **Problem with Naive Flajolet-Martin**: A single outlier hash value with an abnormally long sequence of leading zeros (e.g., 30 zeros out of pure random chance) causes an exponential overestimation error ($2^{30} \approx 10^9$).

### 1.2 Stochastic Averaging & Registers
To eliminate high variance, HyperLogLog partitions the stream across $m = 2^p$ independent registers:
1. Extract the first $p$ bits of the 64-bit hash $h(x)$ to serve as the **register index** $j \in [0, m-1]$.
2. Take the remaining \$64 - p$ bits $w$ and count the position of the 1st set bit $\rho(w)$ (1-indexed count of leading zeros plus 1).
3. Update register $M[j] = \max(M[j], \rho(w))$.

```
       64-bit Hash h(x):  [ 0 1 1 0 1 ] [ 0 0 0 0 1 0 1 1 ... ]
                          |___________| |___________________|
                          Register Index j    Bit Sequence w
                             (p bits)         rho(w) = 5 (leading zeros + 1)
```

### 1.3 Harmonic Mean & Bias Correction
Instead of geometric or arithmetic averaging, HyperLogLog aggregates register values $M[0 \dots m-1]$ using the **Harmonic Mean**. The harmonic mean heavily penalizes extreme outliers, producing a robust indicator of the true distribution median:

$$Z = \left( \sum_{j=0}^{m-1} 2^{-M[j]} \right)^{-1}$$

The uncorrected raw estimate $E$ is:
$$E = \alpha_m \cdot m^2 \cdot Z$$

where $\alpha_m$ is a constant bias-correction factor:
- For $m = 16$: $\alpha_m \approx 0.673$
- For $m = 32$: $\alpha_m \approx 0.697$
- For $m = 64$: $\alpha_m \approx 0.709$
- For $m \ge 128$: $\alpha_m = \frac{0.7213}{1 + 1.079 / m}$

### 1.4 Range Bias Corrections
1. **Small Range Correction ($E \le \frac{5}{2} m$)**:
   When stream size is small, many registers remain 0. Let $V$ be the number of registers containing 0. If $V > 0$, estimate via **Linear Counting**:
   $$E^* = m \cdot \ln\left( \frac{m}{V} \right)$$
2. **Normal Range ($\frac{5}{2} m < E \le \frac{1}{30} 2^{64}$)**:
   $$E^* = E$$
3. **Large Range ($E > \frac{1}{30} 2^{64}$)**:
   $$E^* = -2^{64} \cdot \ln\left( 1 - \frac{E}{2^{64}} \right)$$

---

## 2. Idiomatic Code Implementations (C# & Python)

### 2.1 C# Implementation

```csharp
using System;
using System.Numerics;
using System.Text;

namespace DSALearning.Probabilistic
{
    /// <summary>
    /// Implements HyperLogLog cardinality estimator for high-throughput streaming unique item counts.
    /// </summary>
    public class HyperLogLog
    {
        private readonly int _p; // Precision bits (number of registers = 2^p)
        private readonly int _m; // Register count m = 2^p
        private readonly byte[] _registers;
        private readonly double _alphaM;

        public HyperLogLog(int precisionBits = 14)
        {
            if (precisionBits < 4 || precisionBits > 16)
                throw new ArgumentOutOfRangeException(nameof(precisionBits), "Precision bits must be between 4 and 16.");

            _p = precisionBits;
            _m = 1 << _p;
            _registers = new byte[_m];
            _alphaM = GetAlphaM(_m);
        }

        /// <summary>
        /// Inserts an item string into the HyperLogLog register sketch.
        /// </summary>
        public void Add(string item)
        {
            ulong hash = ComputeFnv1a64(item);
            int registerIndex = (int)(hash >> (64 - _p));
            ulong remainingBits = (hash << _p) | (1UL << (_p - 1)); // Maintain remaining bit alignment

            byte rank = ComputeRho(remainingBits, 64 - _p);
            if (rank > _registers[registerIndex])
            {
                _registers[registerIndex] = rank;
            }
        }

        /// <summary>
        /// Computes current cardinality estimate.
        /// </summary>
        public double EstimateCardinality()
        {
            double sum = 0.0;
            int zeroRegisters = 0;

            for (int i = 0; i < _m; i++)
            {
                byte val = _registers[i];
                sum += 1.0 / (1UL << val);
                if (val == 0) zeroRegisters++;
            }

            double rawEstimate = _alphaM * _m * _m / sum;

            // Small range correction using Linear Counting
            if (rawEstimate <= 2.5 * _m)
            {
                if (zeroRegisters > 0)
                {
                    return _m * Math.Log((double)_m / zeroRegisters);
                }
            }

            return rawEstimate;
        }

        private static byte ComputeRho(ulong bits, int maxBits)
        {
            if (bits == 0) return (byte)(maxBits + 1);
            int lz = BitOperations.LeadingZeroCount(bits);
            return (byte)Math.Min(lz + 1, maxBits + 1);
        }

        private static ulong ComputeFnv1a64(string input)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input);
            ulong hash = 14695981039346656037UL;
            foreach (byte b in bytes)
            {
                hash ^= b;
                hash *= 1099511628211UL;
            }
            return hash;
        }

        private static double GetAlphaM(int m)
        {
            return m switch
            {
                16 => 0.673,
                32 => 0.697,
                64 => 0.709,
                _ => 0.7213 / (1.0 + 1.079 / m)
            };
        }
    }
}
```

### 2.2 Python Implementation

```python
import math
import mmh3  # MurmurHash3 64/128-bit hash function

class HyperLogLog:
    """
    Implements HyperLogLog cardinality estimator using MurmurHash3 and 64-bit registers.
    """
    def __init__(self, precision_bits: int = 14):
        if not (4 <= precision_bits <= 16):
            raise ValueError("Precision bits must be between 4 and 16.")
        
        self.p = precision_bits
        self.m = 1 << self.p
        self.registers = [0] * self.m
        self.alpha_m = self._get_alpha_m(self.m)

    def add(self, item: str) -> None:
        """
        Hashes item and updates the corresponding register rank.
        """
        # 64-bit unsigned hash output
        hash_val = mmh3.hash64(item, signed=False)[0]
        
        # Top p bits for register index
        register_idx = hash_val >> (64 - self.p)
        
        # Remaining 64 - p bits for zero-count rank
        w = (hash_val << self.p) & 0xFFFFFFFFFFFFFFFF
        rank = self._compute_rho(w, 64 - self.p)
        
        if rank > self.registers[register_idx]:
            self.registers[register_idx] = rank

    def estimate_cardinality(self) -> float:
        """
        Computes cardinality estimate using harmonic mean and range bias corrections.
        """
        indicator_sum = 0.0
        zero_registers = 0

        for val in self.registers:
            indicator_sum += 1.0 / (1 << val)
            if val == 0:
                zero_registers += 1

        raw_estimate = (self.alpha_m * self.m * self.m) / indicator_sum

        # Small range linear counting correction
        if raw_estimate <= 2.5 * self.m:
            if zero_registers > 0:
                return self.m * math.log(self.m / zero_registers)

        return raw_estimate

    @staticmethod
    def _compute_rho(w: int, max_bits: int) -> int:
        """Counts 1-indexed leading zeros + 1 in remaining bitstream w."""
        if w == 0:
            return max_bits + 1
        
        # Format to binary string padded to max_bits
        binary_str = bin(w)[2:].zfill(64)[:max_bits]
        leading_zeros = len(binary_str) - len(binary_str.lstrip('0'))
        return min(leading_zeros + 1, max_bits + 1)

    @staticmethod
    def _get_alpha_m(m: int) -> float:
        if m == 16:
            return 0.673
        elif m == 32:
            return 0.697
        elif m == 64:
            return 0.709
        else:
            return 0.7213 / (1.0 + 1.079 / m)
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Time Complexity | Space Complexity | Memory Overhead |
| :--- | :--- | :--- | :--- |
| **`Add(item)`** | $O(1)$ | $O(1)$ | 1 hash computation + bitwise shift + register comparison. |
| **`EstimateCardinality()`** | $O(m)$ | $O(1)$ | Iterates over $m = 2^p$ register values. |
| **Total Sketch Space** | - | $O(m \cdot b)$ | $m$ registers storing 6 bits each ($\max \text{rank} \le 64 \implies 6 \text{ bits}$). |

### Memory Comparison: Exact vs HyperLogLog
- **Exact Hash Set (100 Million Strings)**: $\approx 100 \times 10^6 \times 64 \text{ bytes} \approx 6.4 \text{ GB}$ RAM.
- **HyperLogLog ($p=14, m=16384$)**: \$16384 \times 6 \text{ bits} = 98304 \text{ bits} \approx 12.28 \text{ KB}$ RAM (\$99.9998\%$ memory reduction for \$1.04/\sqrt{16384} \approx 0.81\%$ standard error).

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Using Non-Uniform / Bad Hash Functions**:
   - Standard 32-bit language `hashCode()` implementation (e.g., Java's polynomial string hash) exhibits heavy bit collisions and non-uniform bit distributions, invalidating the geometric distribution assumption and causing severe estimation error. A 64-bit cryptographic/uniform hash (e.g., Murmur3, CityHash, FNV-1a) is mandatory.

2. **Off-by-One in Leading Zero Rank $\rho(w)$**:
   - Forgetting that rank is 1-indexed (minimum rank = 1). If 0 leading zeros are observed, rank is 1, so $2^{-\text{rank}} = 0.5$. Setting rank = 0 leads to division by zero or inflated exponents $2^0 = 1$.

3. **Ignoring Small Range Correction**:
   - For streams with small $N$ relative to $m$, most registers are zero ($M[j] = 0$). Uncorrected harmonic mean overestimates raw values. Linear Counting ($m \ln(m/V)$) must be triggered when raw estimate $\le 2.5 m$.

4. **Integer Overflow in Harmonic Exponentiation**:
   - Writing `1 << val` with 32-bit signed integers when `val > 30` causes integer overflow wrapping to negative numbers. Registers must use unsigned 64-bit integer bit shifts (`1UL << val`).

---

## 5. Related LeetCode Problems & Variant Patterns

1. **System Design - Unique Visitors Counter (Web Scale)**:
   - *Problem*: Count unique daily active users (DAU) or IP addresses across distributed servers in real time.
   - *Pattern*: HyperLogLog register sketches are merged across nodes using element-wise maximum: $M_{\text{merged}}[j] = \max(M_A[j], M_B[j])$.

2. **Bloom Filter & Count-Min Sketch**:
   - *Bloom Filter*: Probabilistic set membership test ($O(k)$ hashes, 0% false negatives, small false positive rate).
   - *Count-Min Sketch*: Probabilistic element frequency estimation in streaming data.

3. **HyperLogLog++ Optimization (Google)**:
   - Uses 64-bit hashes, sparse register representation for low cardinality, and empirical bias correction tables for hyper-accurate small/medium stream estimation.
