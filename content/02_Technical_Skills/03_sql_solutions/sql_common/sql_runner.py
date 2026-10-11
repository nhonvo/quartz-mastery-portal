import os
import sys
import sqlite3

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def run_sql_problem(problem_dir):
    schema_path = os.path.join(problem_dir, "schema.sql")
    query_path = os.path.join(problem_dir, "query.sql")

    if not os.path.exists(schema_path) or not os.path.exists(query_path):
        print(f"[!] Error: Missing schema.sql or query.sql in {problem_dir}")
        return False

    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    with open(query_path, "r", encoding="utf-8") as f:
        query_sql = f.read()

    print(f"==========================================================================")
    print(f"Testing PostgreSQL Problem: {os.path.basename(problem_dir)}")
    print(f"==========================================================================")

    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()

    try:
        # Pre-process PG syntax for in-memory SQLite runner
        clean_schema = schema_sql.replace("CASCADE", "").replace("VARCHAR(1)", "TEXT").replace("VARCHAR(255)", "TEXT")
        clean_schema = "\n".join([line for line in clean_schema.splitlines() if not line.strip().startswith("--")])

        cursor.executescript(clean_schema)
        conn.commit()
        print("[+] Schema DDL and Seed Data Loaded Successfully.")

        # Extract queries from query.sql
        queries = [q.strip() for q in query_sql.split(";") if q.strip()]
        for idx, q in enumerate(queries, 1):
            cleaned_q = "\n".join([line for line in q.splitlines() if not line.strip().startswith("--")]).strip()
            if not cleaned_q:
                continue

            print(f"\n--- Query {idx} Execution Output ---")
            cursor.execute(cleaned_q)
            rows = cursor.fetchall()
            col_names = [description[0] for description in cursor.description] if cursor.description else []
            
            print(f"Columns: {col_names}")
            for row in rows:
                print(row)
            print(f"Total Rows Returned: {len(rows)}")

        print("\n==========================================================================")
        return True
    except Exception as e:
        print(f"[!] SQL Execution Error: {e}")
        return False
    finally:
        conn.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_sql_problem(sys.argv[1])
    else:
        print("Usage: python sql_runner.py <path_to_problem_directory>")
