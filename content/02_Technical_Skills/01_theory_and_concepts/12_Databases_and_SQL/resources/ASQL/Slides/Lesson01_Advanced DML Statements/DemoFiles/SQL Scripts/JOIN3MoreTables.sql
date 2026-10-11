USE AdventureWorks
GO

SELECT P.FirstName, S.Bonus, T.Name AS TerritoryName
FROM Person.Person P
JOIN Sales.SalesPerson S
ON P.BusinessEntityID = S.BusinessEntityID
LEFT JOIN Sales.SalesTerritory T
ON S.TerritoryID = T.TerritoryID
ORDER BY S.Bonus