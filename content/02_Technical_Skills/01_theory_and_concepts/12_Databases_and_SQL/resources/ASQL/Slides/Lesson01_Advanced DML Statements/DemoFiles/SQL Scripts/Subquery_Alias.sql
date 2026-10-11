USE AdventureWorks;
GO

SELECT TOP 5 * FROM HumanResources.Employee

SELECT E1.BusinessEntityID, E1.LoginID, E1.ManagerID
FROM HumanResources.Employee AS E1
WHERE E1.ManagerID IN
    (SELECT E2.ManagerID
     FROM HumanResources.Employee AS E2
     WHERE E2.BusinessEntityID = 12 OR E2.BusinessEntityID = 30)