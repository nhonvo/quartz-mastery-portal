---


title: "02.Revising the Select Query II"
tags: [sql, database, relational-db, hackerrank, learning-note]
---

# 📌 HackerRank SQL: Revising the Select Query II (02. Revising-the-Select-Query-II)

- **Problem Link**: [HackerRank - Revising the Select Query II](https://www.hackerrank.com/challenges/revising-the-select-query-ii/problem)
- **Dialect**: `PostgreSQL`
- **Difficulty**: `Easy`
- **Category**: `Basic Select`
- **Schema File**: [`schema.sql`](file:///D:/learning/05_sql_solutions/hackerrank_sql/02.Revising-the-Select-Query-II/schema.sql)
- **Query File**: [`query.sql`](file:///D:/learning/05_sql_solutions/hackerrank_sql/02.Revising-the-Select-Query-II/query.sql)
- **Shared Runner**: [`sql_runner.py`](file:///D:/learning/05_sql_solutions/sql_common/sql_runner.py)

---

## 📋 Problem Statement

Query the dataset to solve **Revising the Select Query II**.

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
