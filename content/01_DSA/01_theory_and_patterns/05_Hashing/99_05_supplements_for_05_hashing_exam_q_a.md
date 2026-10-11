---
title: "99.05. 📚 Supplements for 05_hashing (Exam, Q&A)"
type: "supplement"
category: "dsa"
tags: [dsa, 05_hashing, exam, qa, learning-note]
aliases:
  - 99_05_hashing_supplements
---

# 📌 99.05. 📚 Supplements for 05_hashing (Exam, Q&A)

## 📌 Connected Resource Graph
- 🟢 **Primary Theory Note**: [[01_DSA/01_theory_and_patterns/05_Hashing/00_overview_05_Hashing]]

---


# 📝 05 Hashing — Comprehensive Module Exam & Self-Assessment

> **Assessment Duration**: 60 Minutes  
> **Total Points**: 100 Points (10 Multiple Choice Questions @ 5 pts each = 50 pts; 2 Coding & Proof Challenges @ 25 pts each = 50 pts)  
> **Passing Score**: 80% (80 / 100)

---

## 📋 Section 1: Multiple Choice Questions (50 Points)

### Question 1
What is the average time complexity of searching an element in a Hash Table with Load Factor alpha < 0.75?
- A) O(log N)
- B) O(1)
- C) O(N)
- D) O(sqrt(N))
> **Correct Answer**: **B**  
> **Explanation**: With low load factor and uniform hashing, average bucket chain length is constant O(1).

---

### Question 2
In Java 8's HashMap, what threshold triggers converting a bucket's linked list into a Red-Black Tree?
- A) 4 elements
- B) 8 elements
- C) 16 elements
- D) 32 elements
> **Correct Answer**: **B**  
> **Explanation**: Treeification occurs when a bucket contains >= 8 nodes and total capacity >= 64.

---

### Question 3
Which collision resolution technique moves elements around during insertion to minimize probe sequence variance?
- A) Separate Chaining
- B) Robin Hood Hashing
- C) Linear Probing
- D) Double Hashing
> **Correct Answer**: **B**  
> **Explanation**: Robin Hood Hashing swaps richer elements with poorer elements to equalize probe lengths.

---

### Question 4
What property is guaranteed by a Bloom Filter?
- A) Zero False Positives
- B) Zero False Negatives
- C) Exact element count
- D) O(1) deletion
> **Correct Answer**: **B**  
> **Explanation**: If any bit is 0, the item was definitely not inserted (no false negatives).

---

### Question 5
What is the load factor alpha of a hash table with 750 elements and 1000 buckets?
- A) 750,000
- B) 0.75
- C) 1.33
- D) 7.5
> **Correct Answer**: **B**  
> **Explanation**: Load factor = N / M = 750 / 1000 = 0.75.

---

### Question 6
What happens if you mutate an object's field that is used in its `GetHashCode()` calculation after adding it to a HashSet?
- A) The HashSet automatically moves it
- B) The object is lost in the old bucket and `Contains()` returns false
- C) An exception is thrown
- D) The HashSet size becomes zero
> **Correct Answer**: **B**  
> **Explanation**: Mutating key state corrupts bucket lookup integrity.

---

### Question 7
In Open Addressing with Linear Probing, what phenomenon causes long contiguous runs of occupied slots?
- A) Secondary Clustering
- B) Primary Clustering
- C) HashDoS
- D) Treeification
> **Correct Answer**: **B**  
> **Explanation**: Linear probing increases the probability of landing in large clusters (Primary Clustering).

---

### Question 8
How many hash locations does Cuckoo Hashing check during a key lookup?
- A) O(log N)
- B) At most 2 locations
- C) All M buckets
- D) O(sqrt N)
> **Correct Answer**: **B**  
> **Explanation**: Cuckoo hashing guarantees lookup in at most 2 table lookups in strict O(1) worst-case time.

---

### Question 9
Which hash function is commonly used for fast non-cryptographic hash tables in modern software?
- A) SHA-256
- B) MD5
- C) xxHash / MurmurHash3
- D) RSA
> **Correct Answer**: **C**  
> **Explanation**: xxHash and Murmur3 provide near-uniform bit distribution at GB/s throughput.

---

### Question 10
In Distributed Consistent Hashing with N nodes, what fraction of keys migrate when 1 node is removed?
- A) 100%
- B) 1 / N of total keys
- C) N / (N - 1)
- D) 50%
> **Correct Answer**: **B**  
> **Explanation**: Consistent hashing localizes key reassignment strictly to the adjacent node on the hash ring.

---

## 💻 Section 2: Coding & Algorithmic Proof Challenges (50 Points)

### Challenge 1: LRU Cache Implementation (LeetCode 146) (25 Points)

**Task**: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put.

**Evaluation Rubric**:
- Hash Map + Doubly Linked List integration: 10 pts
- O(1) Node eviction & splice: 10 pts
- Capacity boundary handling: 5 pts

#### Model Solution (C++20)
```cpp
#include <unordered_map>
#include <list>

class LRUCache {
private:
    int capacity_;
    std::list<std::pair<int, int>> dll_; // {key, value}
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> map_;

public:
    LRUCache(int capacity) : capacity_(capacity) {}

    int get(int key) {
        auto it = map_.find(key);
        if (it == map_.end()) return -1;
        dll_.splice(dll_.begin(), dll_, it->second); // Move to head
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = map_.find(key);
        if (it != map_.end()) {
            dll_.splice(dll_.begin(), dll_, it->second);
            it->second->second = value;
            return;
        }
        if (static_cast<int>(map_.size()) == capacity_) {
            int lru_key = dll_.back().first;
            dll_.pop_back();
            map_.erase(lru_key);
        }
        dll_.emplace_front(key, value);
        map_[key] = dll_.begin();
    }
};
```

#### Model Solution (Python 3.12)
```python
class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add(self, node: Node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
```

---

### Challenge 2: Insert Delete GetRandom O(1) (LeetCode 380) (25 Points)

**Task**: Implement RandomizedSet supporting insert, remove, and getRandom in O(1) average time.

**Evaluation Rubric**:
- Dynamic array + Hash map index mapping: 10 pts
- O(1) Swap-with-last deletion: 10 pts
- Uniform random index generation: 5 pts

#### Model Solution (C++20)
```cpp
#include <vector>
#include <unordered_map>
#include <cstdlib>

class RandomizedSet {
private:
    std::vector<int> nums_;
    std::unordered_map<int, int> val_to_idx_;

public:
    RandomizedSet() {}

    bool insert(int val) {
        if (val_to_idx_.count(val)) return false;
        val_to_idx_[val] = static_cast<int>(nums_.size());
        nums_.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (!val_to_idx_.count(val)) return false;
        int idx = val_to_idx_[val];
        int last_val = nums_.back();

        nums_[idx] = last_val;
        val_to_idx_[last_val] = idx;

        nums_.pop_back();
        val_to_idx_.erase(val);
        return true;
    }

    int getRandom() {
        return nums_[rand() % nums_.size()];
    }
};
```

#### Model Solution (Python 3.12)
```python
import random

class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.val_to_idx = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

---

---


# 💬 05 Hashing — Master Technical Interview Q&A & System Design Trade-offs

> 📖 **Concept Guide**: [[01_DSA/01_theory_and_patterns/05_Hashing/00_overview_05_hashing|05 Hashing Overview]]  
> 🔗 **Resource Sheet**: [[01_DSA/01_theory_and_patterns/05_Hashing/05_hashing_resource|05 Hashing Resource Sheet]]  
> 🧩 **Problem Set**: [[01_DSA/01_theory_and_patterns/05_Hashing/05_hashing_problems|05 Hashing Problem Set]]  
> 📝 **Module Exam**: [[01_DSA/01_theory_and_patterns/05_Hashing/05_hashing_exam|05 Hashing Exam]]

This comprehensive interview guide provides high-level and low-level architectural insights, mathematical proofs, runtime trade-offs, and polyglot code examples expected in senior engineering technical interviews.

---

## ❓ Q1: What causes Hash Table Denial of Service (HashDoS) attacks and how do modern runtimes mitigate it?

### **Deep Technical Answer**:
HashDoS exploits predictable, deterministic hash functions. An attacker crafts thousands of string keys that all hash to the same bucket index modulo M. This forces all keys into a single collision chain, degrading lookup and insert times from O(1) to O(N), resulting in 100% CPU starvation. Mitigations include:
1. Cryptographic randomized seeding (SipHash) on process startup (used in Python, Rust, .NET Core).
2. Treeification: Java 8 converts linked list chains exceeding 8 elements into Red-Black Trees, guaranteeing O(log N) worst-case lookup.

```mermaid
graph TD
    Bucket[Bucket Index 5] --> N1[Node 1] --> N2[Node 2] --> N3[...] --> N8[Node 8]
    N8 -->|Count >= 8| Tree[Convert to Red-Black Tree O(log N)]
```

### 🛠️ Reference Implementation Snippet:
```cpp
// Java 8 treeification threshold
static final int TREEIFY_THRESHOLD = 8;
static final int UNTREEIFY_THRESHOLD = 6;
```

---

## ❓ Q2: What is the exact contract between `equals()` and `hashCode()` in object-oriented languages?

### **Deep Technical Answer**:
The fundamental invariant states: If two objects are equal according to `equals()`, they MUST return the exact same `hashCode()`. However, two objects with the same `hashCode()` are NOT required to be equal (this is simply a collision). If `equals()` is overridden without overriding `hashCode()`, two logically identical objects will produce different hash codes and land in different buckets, making retrieval impossible.

### 🛠️ Reference Implementation Snippet:
```cpp
public class Person {
    private string _id;
    public override bool Equals(object obj) => obj is Person p && _id == p._id;
    public override int GetHashCode() => _id.GetHashCode();
}
```

---

## ❓ Q3: What is the difference between Separate Chaining and Open Addressing in CPU cache performance?

### **Deep Technical Answer**:
- Separate Chaining: Each bucket holds a pointer to a linked list node on the heap. Traversing the chain incurs pointer chasing and frequent L1/L2 cache misses.
- Open Addressing: All key-value entries reside contiguously inside the bucket array. Probing adjacent slots (Linear Probing or Robin Hood Hashing) reads contiguous 64-byte CPU cache lines, achieving up to 3x-5x faster wall-clock execution.

---

## ❓ Q4: How does Robin Hood Hashing balance probe lengths during collision resolution?

### **Deep Technical Answer**:
In standard Open Addressing, some elements may have very long Probe Sequence Lengths (PSL). Robin Hood Hashing enforces fairness: during insertion, if the incoming element has a larger PSL than the element currently occupying the slot, the incoming element 'steals' the slot, and the existing element is evicted and probed forward. This minimizes the variance of PSL across the entire table.

### 🛠️ Reference Implementation Snippet:
```cpp
if (table[idx].psl < cur_psl) {
    std::swap(table[idx], cur_entry);
    cur_psl = cur_entry.psl;
}
```

---

## ❓ Q5: What is a Bloom Filter and why does it guarantee zero false negatives?

### **Deep Technical Answer**:
A Bloom Filter is a space-efficient probabilistic data structure using a bit array of size M and K independent hash functions. To insert key X, set bits `h_1(X), ..., h_K(X)` to 1. To query key Y, check if all K bits are 1.
- Zero False Negatives: If any of the K bits is 0, key Y was definitely never inserted.
- False Positives Possible: Hash collisions from other keys may have set all K bits to 1.

### 🛠️ Reference Implementation Snippet:
```cpp
bool MightContain(const std::string& key) {
    for (int i = 0; i < K; ++i) {
        if (!bitset[Hash(key, i)]) return false; // Definitely not present!
    }
    return true; // Probably present
}
```

---

## ❓ Q6: How does Cuckoo Hashing achieve worst-case O(1) lookup time?

### **Deep Technical Answer**:
Cuckoo Hashing uses two independent hash tables $T_1, T_2$ and two hash functions $h_1(k), h_2(k)$. A key $k$ can only ever reside in slot $T_1[h_1(k)]$ or $T_2[h_2(k)]$. Therefore, lookup checks exactly 2 memory locations in strict $\mathcal{O}(1)$ worst-case time. When inserting, if both slots are full, it evicts an existing key (like a cuckoo bird) to its alternate table location.

---

## ❓ Q7: Why should mutable objects never be used as keys in a Hash Map?

### **Deep Technical Answer**:
If an object's internal fields change after being inserted into a hash map, its hash code changes. The hash map cannot know this happened, so the object remains in its original bucket. Subsequent lookups compute the new hash code, search the wrong bucket, and fail to find the key, causing memory leaks and corrupted data retrieval.

---

## ❓ Q8: What is Consistent Hashing and why is it essential in distributed caches (e.g. Redis Cluster, Cassandra)?

### **Deep Technical Answer**:
In a distributed system with $N$ cache nodes, standard modulo hashing `h(k) % N` causes nearly all keys to remap to different nodes when a single node is added or removed ($N \to N+1$). Consistent Hashing maps both servers and keys onto a virtual $2^{32}-1$ circular ring. When a server joins or leaves, only $K/N$ keys need to be migrated on average.

### 🛠️ Reference Implementation Snippet:
```cpp
// Map key to first server clockwise on ring
auto it = ring.lower_bound(hash(key));
if (it == ring.end()) it = ring.begin();
return it->second;
```

---

---

## 🔬 Deep Diagnostic & Production Engineering Notes

### 1. In-Depth State Verification & Invariant Proofs
When deploying algorithms in high-throughput production environments:
- **Loop Invariants**: State preconditions must be strictly asserted before entering loops. Post-conditions guarantee deterministic state convergence.
- **Memory Boundary Defense**: Guard against off-by-one errors ($< N$ vs $\le N$), signed integer overflow ($2^{31}-1$), and empty container operations.
- **Asymptotic Amortization**: Use aggregate analysis and potential functions $\Phi(D)$ to ensure operations maintain their promised average and worst-case bounds.

### 2. High-Performance Multi-Language Testing Harness

#### C++20 Micro-Benchmarking Suite
```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <numeric>

void BenchmarkSuite(int iterations) {
    auto start = std::chrono::high_resolution_clock::now();
    long long checksum = 0;
    for (int i = 1; i <= iterations; ++i) {
        checksum += (i ^ (i << 1));
    }
    auto end = std::chrono::high_resolution_clock::now();
    auto dur = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    std::cout << "Executed " << iterations << " iterations in " << dur << " us. Checksum: " << checksum << "\n";
}
```

#### Python 3.12 Verification Harness
```python
import time

def verify_performance(iterations: int) -> int:
    t0 = time.perf_counter_ns()
    checksum = sum(i ^ (i << 1) for i in range(1, iterations + 1))
    t1 = time.perf_counter_ns()
    print(f"Verified {iterations} iterations in {(t1 - t0) / 1_000_000:.3f} ms. Checksum: {checksum}")
    return checksum
```

#### C# (.NET 8) Memory Profiling Harness
```csharp
using System;
using System.Diagnostics;

public class BenchmarkRunner {
    public static void Run(int iterations) {
        long memoryBefore = GC.GetTotalMemory(true);
        var sw = Stopwatch.StartNew();
        long checksum = 0;
        for (int i = 1; i <= iterations; i++) {
            checksum += (i ^ (i << 1));
        }
        sw.Stop();
        long memoryAfter = GC.GetTotalMemory(false);
        Console.WriteLine($"[C# .NET 8] {iterations} iterations completed in {sw.ElapsedMilliseconds} ms. Memory delta: {memoryAfter - memoryBefore} bytes.");
    }
}
```

---

---
