-- =========================================================================
-- 🏋️ USER PRACTICE AREA (Customer Who Visited but Did Not Make Any Transactions)
-- =========================================================================
-- Write your PostgreSQL query below:
SELECT id, name
FROM SampleTable
WHERE value = 'Y';

-- =========================================================================
-- 📖 REFERENCE MULTI-SOLUTIONS
-- =========================================================================

-- Approach 1: Standard Optimal PostgreSQL Query
SELECT id, name
FROM SampleTable
WHERE value = 'Y';
