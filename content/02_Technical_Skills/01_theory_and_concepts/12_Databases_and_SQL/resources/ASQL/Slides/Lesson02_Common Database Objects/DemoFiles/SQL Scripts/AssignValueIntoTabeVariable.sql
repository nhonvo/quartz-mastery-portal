USE AdventureWorks
GO

DECLARE @temp TABLE
(
	FirstName		VARCHAR(100)
,	LastName		VARCHAR(100)
) 

INSERT @temp 
(
	FirstName
,	LastName
)

SELECT 
	FirstName
,	LastName
FROM	Person.Person 

SELECT * FROM @temp
