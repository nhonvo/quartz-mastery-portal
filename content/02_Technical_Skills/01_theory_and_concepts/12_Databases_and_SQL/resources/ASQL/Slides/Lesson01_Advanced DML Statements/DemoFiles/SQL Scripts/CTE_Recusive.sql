USE AdventureWorks;
GO
WITH DirectReports (ManagerID, EmployeeID, Title, DeptID, Level)
AS
(
-- Anchor member definition
    SELECT e.ManagerID, e.BusinessEntityID, e.JobTitle, edh.DepartmentID, 
        0 AS Level
    FROM HumanResources.Employee AS e
    INNER JOIN HumanResources.EmployeeDepartmentHistory AS edh
        ON e.BusinessEntityID = edh.BusinessEntityID AND edh.EndDate IS NULL
    WHERE ManagerID IS NULL
    UNION ALL
-- Recursive member definition
    SELECT e.ManagerID, e.BusinessEntityID, e.JobTitle, edh.DepartmentID,
        Level + 1
    FROM HumanResources.Employee AS e
    INNER JOIN HumanResources.EmployeeDepartmentHistory AS edh
        ON e.BusinessEntityID = edh.BusinessEntityID AND edh.EndDate IS NULL
    INNER JOIN DirectReports AS d
        ON e.ManagerID = d.EmployeeID
)
-- Statement that executes the CTE
SELECT ManagerID, EmployeeID, Title, Level
FROM DirectReports
ORDER BY EmployeeID
INNER JOIN HumanResources.Department AS dp
    ON DirectReports.DeptID = dp.DepartmentID
WHERE dp.GroupName = N'Research and Development' OR Level = 0;
GO
