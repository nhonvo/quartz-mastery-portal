USE AdventureWorks;
GO
SELECT p.BusinessEntityID, t.Name AS Territory
FROM Sales.SalesPerson p
CROSS JOIN Sales.SalesTerritory t
ORDER BY p.BusinessEntityID;


USE Fsoft_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
CROSS JOIN dbo.Table2 t2