USE AdventureWorks
GO

DECLARE @FirstName VARCHAR(100)
SELECT @FirstName = A.FirstName FROM Person.Person AS A WHERE A.BusinessEntityID = 1

SELECT @FirstName FirstName


