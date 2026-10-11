use AdventureWorks
GO
-- Query 1 :
SELECT Name
from Production.Product
where Production.Product.ProductSubcategoryID in (select ProductSubcategoryID
from Production.ProductSubcategory
where Name = 'Saddles')
GO
-- Query 2 :
SELECT Name
from Production.Product
where Production.Product.ProductSubcategoryID in (select ProductSubcategoryID
from Production.ProductSubcategory
where Name like 'Bo%')
GO
-- Query 3 : 
SELECT Name, ListPrice
from Production.Product
where Production.Product.ListPrice = (select MIN(Production.Product.ListPrice)
from Production.Product
where ProductSubcategoryID = 3)
GO
-- Query 4 : part 1
SELECT c.Name
from Person.CountryRegion c
where c.CountryRegionCode in (select s.CountryRegionCode
from Person.StateProvince s
GROUP BY  s.CountryRegionCode
HAVING COUNT(*) < 10)
-- Query 4 : part 2
GO
SELECT c.Name
from Person.CountryRegion c join Person.StateProvince s on c.CountryRegionCode = s.CountryRegionCode
GROUP BY  c.Name
HAVING COUNT(*) < 10
GO
--Query 5: 
SELECT SalesPersonID, AVG(SubTotal) - (SELECT AVG(SubTotal)
    FROM Sales.SalesOrderHeader
    WHERE SalesPersonID IS NOT NULL) AS SalesDiff
FROM Sales.SalesOrderHeader
WHERE SalesPersonID IS NOT NULL
GROUP BY SalesPersonID
ORDER BY SalesPersonID;

GO
--Query 6:
-- step 1
SELECT AVG(ListPrice)
FROM Production.Product
WHERE ProductSubcategoryID IN (1,2,3)
-- step 2
SELECT NAME, (ListPrice - (SELECT AVG(ListPrice)
    FROM Production.Product
    WHERE ProductSubcategoryID IN (1,2,3))) AS DIFF
FROM Production.Product
WHERE ProductSubcategoryID IN (1,2,3)
ORDER BY ListPrice DESC
-- step 3
SELECT *
From
    (
SELECT NAME, (ListPrice - (SELECT AVG(ListPrice)
        FROM Production.Product
        WHERE ProductSubcategoryID IN (1,2,3))) AS [DIFF]
    FROM Production.Product
    WHERE ProductSubcategoryID IN (1,2,3)

) AS [X]
WHERE [DIFF] BETWEEN -800 AND -400
GO
-- Query 7:
-- part 1:
SELECT (P.FirstName + ' ' + P.LastName) as Name
FROM Sales.SalesPerson SP
    JOIN HumanResources.Employee E
    ON E.BusinessEntityID  = SP.BusinessEntityID
    JOIN Person.Person AS P
    ON E.BusinessEntityID = P.BusinessEntityID
WHERE Bonus > 5000
GO
-- part 2:
select P.FirstName + ' ' + P.LastName
FROM Person.Person AS P
WHERE  p.BusinessEntityID in (select e.BusinessEntityID
from HumanResources.Employee E
where e.BusinessEntityID in 
                        (select sp.BusinessEntityID
FROM Sales.SalesPerson sp
WHERE SP.Bonus > 5000))
---
-- part 3 : compare in mssql
-- the join faster in sub-queries. Join just need 1 loop, sub-queries need 3 loop
-- Query 8: 
-- Query 8 Part 1
SELECT sp.BusinessEntityID AS SalesPersonID
FROM Sales.SalesPerson sp
WHERE NOT EXISTS (
    SELECT 1
FROM Sales.Store s
WHERE s.SalesPersonID = sp.BusinessEntityID
);

-- Query 8 Part 2
SELECT sp.BusinessEntityID AS SalesPersonID
FROM Sales.SalesPerson sp
    LEFT JOIN Sales.Store s
    ON sp.BusinessEntityID = s.SalesPersonID
WHERE s.BusinessEntityID IS NULL;

-- Query 9:

-- Part 1:
SELECT ProductSubcategoryID, COUNT(*) AS ProductCount
FROM Production.Product
GROUP BY ProductSubcategoryID
ORDER BY ProductSubcategoryID;

-- Part 2:
WITH
    TempSet (ProdSubID, CountedProds)
    AS
    (
        SELECT ProductSubcategoryID, COUNT(*) AS CountedProds
        FROM Production.Product
        GROUP BY ProductSubcategoryID
    )
SELECT *
FROM TempSet;
-- Part 3:
WITH
    TempSet (ProdSubID, CountedProds)
    AS
    (
        SELECT ProductSubcategoryID AS ProdSubID, COUNT(*) AS CountedProds
        FROM Production.Product
        GROUP BY ProductSubcategoryID
    )
SELECT ps.ProductCategoryID, COUNT (ps.ProductSubcategoryID) AS SubCat, SUM(ts.CountedProds) AS SumProds
FROM Production.ProductSubcategory AS ps
    RIGHT OUTER JOIN TempSet AS ts
    ON ps.ProductSubcategoryID = ts.ProdSubID
GROUP BY ps.ProductCategoryID


-- Exercise 2: Joining Data from multiple tables (90')
-- Query 1:
SELECT
    cr.Name AS Country,
    sp.Name AS Province
FROM Person.CountryRegion AS cr
    JOIN Person.StateProvince AS sp ON cr.CountryRegionCode = sp.CountryRegionCode;
-- Query 2:
SELECT
    cr.Name AS Country,
    sp.Name AS Province
FROM Person.CountryRegion AS cr
    JOIN Person.StateProvince AS sp ON cr.CountryRegionCode = sp.CountryRegionCode
WHERE cr.Name IN ('Canada', 'Germany')
ORDER BY cr.Name, sp.Name;

-- Query 3: 
SELECT soh.SalesOrderID, CONVERT(date, soh.OrderDate) AS OrderDate, soh.SalesPersonID,
    sp.BusinessEntityID, sp.Bonus--, sum(sp.SalesYTD)
FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesPerson AS sp
    ON soh.SalesPersonID = sp.BusinessEntityID
where OnlineOrderFlag != 0 or SalesPersonID is not NULL
group by  soh.SalesOrderID, OrderDate, soh.SalesPersonID,
    sp.BusinessEntityID, sp.Bonus
ORDER BY sp.BusinessEntityID;

-- Query 4: 
SELECT soh.SalesOrderID, CONVERT(date, soh.OrderDate) AS OrderDate, he.JobTitle,
    sp.Bonus, sp.SalesYTD
FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesPerson AS sp
    ON soh.SalesPersonID = sp.BusinessEntityID
    JOIN HumanResources.Employee he
    on he.BusinessEntityID = sp.BusinessEntityID
where OnlineOrderFlag != 0 or SalesPersonID is not NULL

-- Query 5: 
SELECT soh.SalesOrderID, CONVERT(date, soh.OrderDate) AS OrderDate,
    p.FirstName, p.LastName, sp.Bonus
FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesPerson AS sp ON soh.SalesPersonID = sp.BusinessEntityID
    JOIN HumanResources.Employee AS e ON sp.BusinessEntityID = e.BusinessEntityID
    JOIN Person.Person AS p ON e.BusinessEntityID = p.BusinessEntityID
WHERE OnlineOrderFlag != 0 OR SalesPersonID IS NOT NULL

-- Query 6: 
SELECT soh.SalesOrderID, CONVERT(date, soh.OrderDate) AS OrderDate,
    p.FirstName, p.LastName, sp.Bonus
FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesPerson AS sp ON soh.SalesPersonID = sp.BusinessEntityID
    JOIN Person.Person AS p ON sp.BusinessEntityID = p.BusinessEntityID
WHERE OnlineOrderFlag != 0 OR SalesPersonID IS NOT NULL

-- Query 7: 
SELECT soh.SalesOrderID, CONVERT(date, soh.OrderDate) AS OrderDate,
    p.FirstName, p.LastName
FROM Sales.SalesOrderHeader AS soh
    JOIN Person.Person AS p ON soh.SalesPersonID = p.BusinessEntityID
WHERE OnlineOrderFlag != 0 OR SalesPersonID IS NOT NULL

-- Query 8: 
SELECT so.SalesOrderID, CONVERT(date, so.OrderDate) as OrderDate, CONCAT(p.FirstName, ' ', p.LastName) AS SalesPerson, sod.ProductID, sod.OrderQty
FROM Sales.SalesOrderHeader so
    JOIN Person.Person p ON so.SalesPersonID = p.BusinessEntityID
    JOIN Sales.SalesOrderDetail sod ON so.SalesOrderID = sod.SalesOrderID
ORDER BY so.OrderDate, so.SalesOrderID

-- Query 9: 

SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    CONCAT(p.FirstName, ' ', p.LastName) AS SalesPerson,
    pp.Name AS ProductName,
    sod.OrderQty
FROM
    Sales.SalesOrderHeader AS soh
    JOIN Person.Person AS p ON soh.SalesPersonID = p.BusinessEntityID
    JOIN Sales.SalesOrderDetail AS sod ON soh.SalesOrderID = sod.SalesOrderID
    JOIN Production.Product AS pp ON sod.ProductID = pp.ProductID
ORDER BY 
    soh.OrderDate, 
    soh.SalesOrderID

-- Query 10:
SELECT SalesOrderHeader.SalesOrderID, CONVERT(date,  SalesOrderHeader.OrderDate) as OrderDay, Person.FirstName + ' '+ Person.LastName as PersonName,
    Product.Name AS ProductName, SalesOrderDetail.OrderQty
FROM Sales.SalesOrderHeader
    JOIN Sales.SalesOrderDetail ON SalesOrderHeader.SalesOrderID = SalesOrderDetail.SalesOrderID
    JOIN Sales.SalesPerson ON SalesOrderHeader.SalesPersonID = SalesPerson.BusinessEntityID
    JOIN Production.Product ON SalesOrderDetail.ProductID = Product.ProductID
    JOIN Person.Person ON SalesPerson.BusinessEntityID = Person.BusinessEntityID
WHERE SalesOrderHeader.SubTotal > 100000
    AND YEAR(SalesOrderHeader.OrderDate) = 2004
ORDER BY SalesOrderHeader.SalesOrderID
-- Query 11: 

SELECT cr.Name AS CountryName, sp.Name AS ProvinceName
FROM Person.CountryRegion cr
    LEFT JOIN Person.StateProvince sp ON cr.CountryRegionCode = sp.CountryRegionCode
ORDER BY CountryName, ProvinceName;

-- Query 12: 
SELECT C.CustomerID, SOH.SalesOrderID
FROM Sales.Customer C
    LEFT OUTER JOIN Sales.SalesOrderHeader SOH
    ON C.CustomerID = SOH.CustomerID
WHERE SOH.SalesOrderID IS NULL

-- Query 13: 

SELECT Product.Name AS ProductName, ProductModel.Name AS ProductModelName
FROM Production.Product
    FULL JOIN Production.ProductModel ON Product.ProductModelID = ProductModel.ProductModelID
WHERE ProductModel.Name IS NULL OR Product.Name IS NULL
