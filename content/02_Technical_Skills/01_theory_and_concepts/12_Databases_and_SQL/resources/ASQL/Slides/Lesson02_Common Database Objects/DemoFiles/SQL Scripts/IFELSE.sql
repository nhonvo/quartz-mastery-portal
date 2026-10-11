DECLARE @MaritalStatus NCHAR(2)

SELECT @MaritalStatus = MaritalStatus
FROM HumanResources.Employee WHERE BusinessEntityID = 3

IF (RTRIM(@MaritalStatus) = 'M')
	PRINT 'Maried.'
ELSE
	PRINT 'Single.'





