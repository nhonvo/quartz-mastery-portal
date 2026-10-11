---


title: "08.Customer Who Visited but Did Not Make Any Transactions"
tags: [sql, database, relational-db, leetcode-sql, learning-note]
---

# 📌 LeetCode SQL: Customer Who Visited but Did Not Make Any Transactions (08. Customer-Who-Visited-but-Did-Not-Make-Any-Transactions)

- **Problem Link**: [LeetCode 1581 - Customer Who Visited but Did Not Make Any Transactions](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/)
- **Dialect**: `PostgreSQL`
- **Difficulty**: `Easy`
- **Category**: `LEFT JOIN / Anti-Join`
- **Schema File**: [`schema.sql`](file:///D:/learning/05_sql_solutions/leetcode_sql/08.Customer-Who-Visited-but-Did-Not-Make-Any-Transactions/schema.sql)
- **Query File**: [`query.sql`](file:///D:/learning/05_sql_solutions/leetcode_sql/08.Customer-Who-Visited-but-Did-Not-Make-Any-Transactions/query.sql)
- **Shared Runner**: [`sql_runner.py`](file:///D:/learning/05_sql_solutions/sql_common/sql_runner.py)

---

## 📋 Problem Statement

Query the dataset to solve **Customer Who Visited but Did Not Make Any Transactions**.

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
