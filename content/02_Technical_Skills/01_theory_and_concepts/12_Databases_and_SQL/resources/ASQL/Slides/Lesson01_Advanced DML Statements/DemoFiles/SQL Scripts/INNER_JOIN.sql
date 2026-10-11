USE AdventureWorks;
GO
SELECT 
	E.BusinessEntityID
,	P.FirstName
,	P.LastName
,	E.NationalIDNumber
,	E.JobTitle
,	E.BirthDate
,	E.MaritalStatus
FROM	HumanResources.Employee AS E
JOIN	Person.Person AS P
ON	E.BusinessEntityID = P.BusinessEntityID

SELECT * 
FROM Person.Person


USE Fsoft_Training
GO

SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM	dbo.Table1 t1
INNER JOIN dbo.Table2 t2 
ON		t1.ID = t2.ID
GO


SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM	dbo.Table1 t1, dbo.Table2 t2
WHERE	t1.ID = t2.ID