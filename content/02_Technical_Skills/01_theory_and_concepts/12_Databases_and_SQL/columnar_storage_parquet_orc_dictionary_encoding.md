---


title: "Columnar Storage Formats: Apache Parquet, ORC, Dictionary Encoding & SIMD Vectorization"
description: "Master-level architecture and implementation guide for Columnar Storage Formats: Apache Parquet, ORC, Dictionary Encoding & SIMD Vectorization covering core theory, runtime mechanics, and production best practices."
category: "Databases & SQL Engineering"
tags: [databases, sql, engineering, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Columnar Storage Formats: Apache Parquet, ORC, Dictionary Encoding & SIMD Vectorization

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Executive Summary
**Columnar Storage Formats**—such as **Apache Parquet** and **Apache ORC**—are the foundation of modern Analytical (OLAP) processing engines including **Apache Spark**, **DuckDB**, **Trino/Presto**, **ClickHouse**, and **Snowflake**. While OLTP storage engines structure data horizontally in row order (optimizing for single-record point updates), columnar formats store each column's data contiguously on disk. This enables $90\%+$ compression ratios through dictionary encoding and bit-packing, and boosts analytical query performance by $10\times - 100\times$ by eliminating I/O for unreferenced columns and utilizing **SIMD (Single Instruction, Multiple Data)** hardware vectorization.

---

### 1.2 Under-the-Hood Mechanics

```
ROW-ORIENTED (OLTP) LAYOUT vs COLUMN-ORIENTED (OLAP) LAYOUT:

Row Layout (PostgreSQL / MySQL):
[Row 1: ID, Age, City, Salary] [Row 2: ID, Age, City, Salary] [Row 3: ID, Age, City, Salary]

Columnar Layout (Apache Parquet / ORC):
[ID Column Chunk: 1, 2, 3...] [Age Column Chunk: 25, 30, 25...] [City Chunk: NY, SF, NY...]
```

```
PARQUET FILE PHYSICAL HIERARCHY:
+-------------------------------------------------------------------------------+
| Header: "PAR1"                                                                |
+-------------------------------------------------------------------------------+
| Row Group 0 (128MB - 512MB, e.g., 1,000,000 Rows)                              |
|   +-------------------------------------------------------------------------+ |
|   | Column Chunk 0 (Age): Page 0 [Header|Dict] -> Page 1 [Data] -> Page 2   | |
|   +-------------------------------------------------------------------------+ |
|   | Column Chunk 1 (City): Dictionary Page -> RLE Encoded Data Pages        | |
|   +-------------------------------------------------------------------------+ |
| Row Group 1 (128MB - 512MB)                                                   |
|   +-------------------------------------------------------------------------+ |
|   | Column Chunk 0 (Age)...                                                 | |
+-------------------------------------------------------------------------------+
| File Footer (Schema Metadata, Column Min/Max Stats, Page Index, Offsets)     |
+-------------------------------------------------------------------------------+
| Footer Length (4 bytes) | Footer Magic Number: "PAR1"                         |
+-------------------------------------------------------------------------------+
```

#### Physical Storage Structures: Parquet vs ORC
1. **Apache Parquet**:
   - **Row Group**: Logical horizontal partition of rows (typically $128\text{ MB} - 1\text{ GB}$).
   - **Column Chunk**: Contiguous block of data for a single column within a Row Group.
   - **Page**: Basic unit of data transfer ($1\text{ MB}$ target size). Types include Dictionary Pages and Data Pages.
   - **File Footer**: Written last upon file finalization; contains file schema, Row Group metadata, row count, and per-column statistics (`min_value`, `max_value`, `null_count`).
2. **Apache ORC (Optimized Row Columnar)**:
   - Partitioned into **Stripes** ($64\text{ MB} - 256\text{ MB}$).
   - Each Stripe contains a **Stripe Footer**, **Row Index** (every 10,000 rows), **Data Streams**, and **Postscript**.

#### Compression & Encoding Mechanisms
1. **Dictionary Encoding**:
   - Replaces repeating values (strings, byte arrays) with compact integer dictionary IDs (\$1 - 4$ bytes).
   - Example: Values `["US", "US", "CA", "US"]` $\rightarrow$ Dictionary `[0: "US", 1: "CA"]`, Encoded Stream `[0, 0, 1, 0]`.
2. **Run-Length Encoding (RLE) + Bit-Packing**:
   - RLE compresses consecutive identical values into `(Count, Value)` pairs (e.g., `1000x "US"` $\rightarrow$ `(1000, 0)`).
   - Bit-packing strips unused leading zero bits from integers (e.g., storing values $< 4$ using 2 bits instead of 32 bits).
3. **Delta Encoding & Frame of Reference (FoR)**:
   - Stores relative differences between sequential values (e.g., Timestamps `[1700000000, 1700000005, 1700000010]` $\rightarrow$ Base `1700000000`, Deltas `[0, 5, 5]`).

#### Predicate Pushdown & SIMD Vectorized Scanning
- **Predicate Pushdown**: Engines inspect Row Group and Page Footer statistics prior to reading payload bytes. Queries like `WHERE age > 65` immediately skip Row Groups whose footer stats indicate `max_value = 50`.
- **SIMD Hardware Acceleration**: Modern execution engines (DuckDB, ClickHouse) evaluate boolean filters against bit-packed integer buffers using AVX-512 or ARM Neon vector instructions, scanning up to 64 records per CPU cycle.

---

## 2. Production-Grade Code Implementations & Best Practices

Below is a production-grade C# implementation of a **Dictionary Encoder & RLE Bit-Packing BitStream Codec** designed for columnar numerical processing.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Numerics;
using System.Text;

namespace StorageEngine.Columnar
{
    public sealed class DictionaryEncoder<T> where T : notnull
    {
        private readonly Dictionary<T, int> _encodingMap = new();
        private readonly List<T> _dictionary = new();

        public int GetOrAdd(T value)
        {
            if (_encodingMap.TryGetValue(value, out int id))
            {
                return id;
            }

            id = _dictionary.Count;
            _encodingMap[value] = id;
            _dictionary.Add(value);
            return id;
        }

        public T GetValue(int id) => _dictionary[id];
        public IReadOnlyList<T> Dictionary => _dictionary;
        public int Cardinality => _dictionary.Count;
    }

    public sealed class RleBitPackingCodec
    {
        public static byte[] Encode(int[] values, int bitWidth)
        {
            using var ms = new MemoryStream();
            using var bw = new BinaryWriter(ms);

            bw.Write((byte)bitWidth);
            bw.Write(values.Length);

            int i = 0;
            while (i < values.Length)
            {
                // Check for RLE run
                int runLength = 1;
                while (i + runLength < values.Length && values[i + runLength] == values[i] && runLength < 127)
                {
                    runLength++;
                }

                if (runLength >= 4)
                {
                    // RLE Header: Bit 0 = 0 (RLE indicator), top 7 bits = count
                    bw.Write((byte)(runLength << 1));
                    WriteBitPackedValue(bw, values[i], bitWidth);
                    i += runLength;
                }
                else
                {
                    // Bit-Packed Group
                    int packGroupSize = Math.Min(8, values.Length - i);
                    bw.Write((byte)((packGroupSize << 1) | 1)); // Bit 0 = 1 (Bit-Packed indicator)
                    for (int j = 0; j < packGroupSize; j++)
                    {
                        WriteBitPackedValue(bw, values[i + j], bitWidth);
                    }
                    i += packGroupSize;
                }
            }

            return ms.ToArray();
        }

        public static int[] Decode(byte[] encodedBytes)
        {
            using var ms = new MemoryStream(encodedBytes);
            using var br = new BinaryReader(ms);

            int bitWidth = br.ReadByte();
            int totalValues = br.ReadInt32();
            int[] result = new int[totalValues];

            int outIdx = 0;
            while (outIdx < totalValues && ms.Position < ms.Length)
            {
                byte header = br.ReadByte();
                bool isBitPacked = (header & 1) == 1;
                int count = header >> 1;

                if (!isBitPacked)
                {
                    int val = ReadBitPackedValue(br, bitWidth);
                    for (int k = 0; k < count; k++)
                    {
                        result[outIdx++] = val;
                    }
                }
                else
                {
                    for (int k = 0; k < count; k++)
                    {
                        result[outIdx++] = ReadBitPackedValue(br, bitWidth);
                    }
                }
            }

            return result;
        }

        private static void WriteBitPackedValue(BinaryWriter bw, int value, int bitWidth)
        {
            bw.Write(value); // Simplified for representation - production uses byte-level bit shifts
        }

        private static int ReadBitPackedValue(BinaryReader br, int bitWidth)
        {
            return br.ReadInt32();
        }
    }
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Compression Ratio & Analytical Query Throughput

| Compression / Encoding | Typical Ratio | Decoding Speed | CPU Overhead | Ideal Data Types |
| :--- | :--- | :--- | :--- | :--- |
| **Plain / Uncompressed** | \$1.0\times$ | Baseline ($O(1)$) | Zero | Random Floats / UUIDs |
| **Dictionary Encoding** | $3\times - 10\times$ | **Ultra Fast** (SIMD compatible) | Low | Low-cardinality strings/IDs |
| **RLE + Bit-Packing** | $10\times - 50\times$ | **Ultra Fast** (RLE skip) | Low | Sorted columns / repeated flags |
| **Snappy Compression** | $2\times - 4\times$ | High (\$250 \text{ MB/s/core}$) | Low-Medium | Generic byte blocks |
| **ZSTD (Level 3)** | $4\times - 12\times$ | Medium (\$100 \text{ MB/s/core}$)| Medium | Cold archival data |

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### 4.1 Anti-Pattern 1: Dictionary Explosion on High-Cardinality Columns
- **Incorrect Practice**: Enforcing Dictionary Encoding on high-cardinality unique columns (e.g., transaction timestamps, UUIDs), causing dictionary size to exceed 100MB and incurring high memory overhead.
- **Correct Solution**: Configure automatic dictionary fallback thresholds. If unique key ratio exceeds $10\% - 20\%$, fallback to Plain/Delta encoding.

```python
# PyArrow Parquet Dictionary Fallback Configuration
import pyarrow.parquet as pq

pq.write_table(
    table,
    'output.parquet',
    use_dictionary=True,
    dictionary_pagesize_limit=1024 * 1024, # Fallback to plain if Dict > 1MB
    compression='SNAPPY'
)
```

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 5.1 Parquet Small File Problem & Out-Of-Memory (OOM)
- **Symptom**: Spark or DuckDB jobs crash with OOM errors during Parquet file writes, or query execution experiences high file metadata listing latency ($> 30\text{ seconds}$).
- **Root Cause**: Generating millions of undersized Parquet files ($< 5\text{ MB}$), causing driver metadata bloat and ineffective Row Group buffering.
- **Resolution**:
  1. Compact output files into target sizes of $128\text{ MB} - 512\text{ MB}$.
  2. In Spark, coalesce partitions before writing: `df.coalesce(num_partitions).write.parquet(...)`.
