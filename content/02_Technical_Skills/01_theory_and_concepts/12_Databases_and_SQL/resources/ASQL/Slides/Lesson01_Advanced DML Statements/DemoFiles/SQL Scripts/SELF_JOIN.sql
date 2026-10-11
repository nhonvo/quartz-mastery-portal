USE AdventureWorks;
GO

SELECT MgrTable.LoginID AS MLoginID, EmplTable.ManagerID AS MID, 
    EmplTable.LoginID AS ELoginID, EmplTable.BusinessEntityID AS EBEntityID
FROM HumanResources.Employee AS EmplTable
    JOIN HumanResources.Employee AS MgrTable
        ON EmplTable.ManagerID = MgrTable.BusinessEntityID
ORDER BY EmplTable.ManagerID

select BusinessEntityID, ManagerID
FROM HumanResources.Employee

USE AdventureWorks;
GO
SELECT E.LoginID EmployeeName, 
	ISNULL(M.LoginID, 'Top Manager') AS ManagerName
FROM HumanResources.Employee E
LEFT JOIN HumanResources.Employee M
ON E.ManagerID = M.BusinessEntityID
GO

