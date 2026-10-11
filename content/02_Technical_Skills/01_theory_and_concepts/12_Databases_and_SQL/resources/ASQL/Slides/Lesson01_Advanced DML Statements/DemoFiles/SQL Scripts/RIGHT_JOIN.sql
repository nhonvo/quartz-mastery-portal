/* RIGHT JOIN */
USE AdventureWorks;
GO
SELECT ST.Name AS Territory, SP.BusinessEntityID
FROM Sales.SalesTerritory ST 
RIGHT OUTER JOIN Sales.SalesPerson SP
ON ST.TerritoryID = SP.TerritoryID;

SELECT *
FROM Sales.SalesTerritory

SELECT *
FROM Sales.SalesPerson

USE Fsoft_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
FULL JOIN dbo.Table2 t2 ON t1.ID = t2.ID
GO

SELECT *
FROM dbo.Table1

SELECT *
FROM dbo.Table2