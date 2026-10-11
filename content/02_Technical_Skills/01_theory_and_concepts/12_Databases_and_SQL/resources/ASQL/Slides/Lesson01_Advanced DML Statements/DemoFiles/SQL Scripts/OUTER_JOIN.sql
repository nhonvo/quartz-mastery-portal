USE AdventureWorks;
GO

SELECT p.Name, sod.SalesOrderID
FROM Production.Product p
FULL OUTER JOIN Sales.SalesOrderDetail sod
ON p.ProductID = sod.ProductID


USE Fsoft_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM Table1 t1
FULL OUTER JOIN Table2 t2 ON t1.ID = t2.ID