
USE AdventureWorks 

GO
-- Use CAST, SUBSTRING
SELECT SUBSTRING(Name, 1, 30) AS ProductName, ListPrice
FROM Production.Product
WHERE CAST(ListPrice AS int) LIKE '3%';
GO

-- Use CONVERT, SUBSTRING
SELECT SUBSTRING(Name, 1, 30) AS ProductName, ListPrice
FROM Production.Product
WHERE CONVERT(int, ListPrice) LIKE '3%';

GO
-- convert string '5' to 5
SELECT CONVERT(INT, '5') 
 -- convert a string to datetime in YYYY-DD-MM (style = 103) format 
SELECT CONVERT(DATETIME, '2013-11-10',103)
-- covert a string to datetim in YYYY-MM-DD format
SELECT CONVERT(DATETIME, '2013-11-10',101) 

GO
--CAST function
SELECT CAST('5' AS INT) -- convert string '5' to 5
SELECT CAST('2013-11-20' AS DATETIME) -- convert a string to datetime

GO
-- DATEPART function
SELECT	DATEPART(yyyy, S.OrderDate) AS OrderYear,
		DATEPART(mm, S.OrderDate) AS OrderMonth,
		DATEPART(dd, S.OrderDate) AS OrderDay
FROM Sales.SalesOrderHeader S
WHERE SalesOrderId = 43659

GO
-- DAY, MONTH, YEAR function
-- Returns day, month or year in INT format.
SELECT DAY(GETDATE())
SELECT MONTH(GETDATE())
SELECT YEAR(GETDATE()) 

GO
-- Pay affter 45 day
SELECT s.SalesOrderID, s.OrderDate, DATEADD(day, 45, s.OrderDate) AS OrderPayDate
FROM Sales.SalesOrderHeader s

GO
-- DATEDIFF function
SELECT S.SalesOrderID, DATEDIFF(DAY, S.OrderDate, S.ShipDate) AS Ship_Date
FROM Sales.SalesOrderHeader S

GO
-- String Functions
-- LTRIM, RTRIM function
-- Truncating left or right trailing blanks
SELECT LTRIM('   Bill Gates   ')
SELECT RTRIM('   Bill Gates   ')
SELECT LTRIM(RTRIM('   Bill Gates   '))

GO
-- SUBSTRING
-- Returns part of string
SELECT SUBSTRING('Bill Gates', 1 ,5) As Result
SELECT SUBSTRING('Hello world', 0, 5)

GO
-- LEN
-- Returns the number of characters in a string.
SELECT LEN('Bill Gates')

GO
-- CHARINDEX
SELECT CHARINDEX('arm', Title)
FROM Production.Document
WHERE DocumentID = '1';

GO
-- PATINDEX
SELECT DocumentID, PATINDEX('%reflector%', Title)AS POSITION
FROM Production.Document
WHERE PATINDEX('%reflector%', Title) <> 0;