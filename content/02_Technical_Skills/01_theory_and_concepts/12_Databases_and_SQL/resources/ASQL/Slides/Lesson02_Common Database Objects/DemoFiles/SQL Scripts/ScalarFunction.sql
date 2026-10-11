USE AdventureWorks
GO

CREATE FUNCTION dbo.fnc_FullName
(	
	@firstName	VARCHAR(100)
,	@lastName	VARCHAR(100))
RETURNS
AS

BEGIN
	DECLARE @fullName varchar(200)
	SET  @fullName = ISNULL(@firstName, '') + ' ' + ISNULL(@lastName, '')
	RETURN	@fullName
END

USE AdventureWorks
GO

SELECT dbo.fnc_FullName(FirstName, LastName) FullName FROM Person.Person