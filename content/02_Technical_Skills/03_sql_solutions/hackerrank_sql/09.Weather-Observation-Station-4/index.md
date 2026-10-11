---


title: "09.Weather Observation Station 4"
tags: [sql, database, relational-db, hackerrank, learning-note]
---

# 📌 HackerRank SQL: Weather Observation Station 4 (09. Weather-Observation-Station-4)

- **Problem Link**: [HackerRank - Weather Observation Station 4](https://www.hackerrank.com/challenges/weather-observation-station-4/problem)
- **Dialect**: `PostgreSQL`
- **Difficulty**: `Easy`
- **Category**: `COUNT DISTINCT`
- **Schema File**: [`schema.sql`](file:///D:/learning/05_sql_solutions/hackerrank_sql/09.Weather-Observation-Station-4/schema.sql)
- **Query File**: [`query.sql`](file:///D:/learning/05_sql_solutions/hackerrank_sql/09.Weather-Observation-Station-4/query.sql)
- **Shared Runner**: [`sql_runner.py`](file:///D:/learning/05_sql_solutions/sql_common/sql_runner.py)

---

## 📋 Problem Statement

Query the dataset to solve **Weather Observation Station 4**.

### Constraints & Data Types
- PostgreSQL 15+ compatible engine.
- Proper handling of NULL values and index utilization.

---

## 📊 Schema & Mock Seed Data

```sql
CREATE TABLE SampleTable (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    value VARCHAR(255)
);
```

---

## 🏋️ Space to Practice

### 📝 Query Thought Process Framework
1. **Identify Source Tables**: Determine target tables and JOIN criteria.
2. **Filter Conditions**: Apply WHERE filters and handling of NULLs.
3. **Aggregations & Grouping**: GROUP BY, HAVING, and aggregate functions.
4. **Ordering & Projection**: SELECT required columns and ORDER BY.

### 💻 My PostgreSQL Query Draft
```sql
SELECT id, name
FROM SampleTable
WHERE value = 'Y';
```

---

## 💡 Multi-Solution Analysis (Deep Step-by-Step Explanations)

### Approach 1: Standard Optimal Query ⭐

#### Intuition & Concept
Filtering rows directly using indexed columns.

#### PostgreSQL Source Code
```sql
SELECT id, name
FROM SampleTable
WHERE value = 'Y';
```

#### Performance & Indexing Analysis
- **Execution Plan**: Index Scan / Sequential Scan depending on table cardinality.
- **Optimization Tip**: Create composite or B-tree index on filtered columns if dataset size $N > 10^5$.

---

## 🛠️ PostgreSQL Specific Optimization Tips

1. Use `COALESCE(val, default)` instead of `IFNULL`.
2. Test query execution plan using `EXPLAIN ANALYZE`.
