USE AdventureWorks;
GO
IF OBJECT_ID('HumanResources.GetEmployeeByID', 'P') IS NOT NULL
    DROP PROCEDURE HumanResources.GetEmployeeByID;
GO
CREATE PROCEDURE HumanResources.GetEmployeeByID
(
	@EmployeeID INT
)
AS  
    SET NOCOUNT ON;
	
	SELECT 
		NationalIDNumber
	,	JobTitle
	,	BirthDate
	,	MaritalStatus 
	FROM	HumanResources.Employee
	WHERE BusinessEntityID = @EmployeeID


-- Define a table to store result from SP
DECLARE @OuputTable TABLE
(
	NationalIDNumber	NVARCHAR(15)
,	Title				NVARCHAR(50)
,	BirthDate			DATETIME
,	MaritalStatus		NCHAR(1)
)

INSERT @OuputTable
EXEC HumanResources.GetEmployeeByID @EmployeeID = 1

SELECT * FROM @OuputTable