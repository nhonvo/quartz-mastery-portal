-- Exercise 1 The same with Assignment 2 opt1
create DATABASE Assignment2_Opt3_Exercise1
go
use Assignment2_Opt3_Exercise1
go

Create table Employee
(
    EmployeeID int NOT NULL IDENTITY(1,1),
    EmployeeFirstName Nvarchar(50) NOT NULL ,
    EmployeeLastName Nvarchar(50) NOT NULL ,
    EmployeeHireDate DateTime NOT NULL,
    EmployeeStatus int ,
    SupervisorID int ,
    SocialSecurityNumber int ,
    PRIMARY KEY (EmployeeID),
    FOREIGN KEY (SupervisorID) REFERENCES Employee (EmployeeID),
);

Create table Project
(
    ProjectID int NOT NULL IDENTITY(1,1),
    ProjectName Nvarchar(50) NOT NULL,
    ProjectStartDate DateTime ,
    ProjectDescription Nvarchar(200) ,
    ProjectDetail nvarchar(500) ,
    ProjectCompletedOn DateTime ,
    EmployeeID int,
    PRIMARY KEY (ProjectID),
    FOREIGN KEY(EmployeeID) REFERENCES  Employee(EmployeeID)
);


Create table Project_Modules
(
    ModuleID int NOT NULL IDENTITY(1,1),
    ProjectID int NOT NULL,
    EmployeeID int NOT NULL ,
    ProjectModulesDate DateTime ,
    ProjectModulesCompletedOn DateTime ,
    ProjectModuleDescription Nvarchar (200) ,

    PRIMARY KEY (ModuleID),
    FOREIGN KEY (ProjectID) REFERENCES Project (ProjectID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee (EmployeeID),
)


Create table Work_Done
(
    WorkDoneID int NOT NULL IDENTITY(1,1),
    ModuleID int ,
    EmployeeID int,
    WorkDoneDate DateTime ,
    WorkDoneDescription nvarchar(200) ,
    WorkDoneStatus int ,

    PRIMARY KEY (WorkDoneID),
    FOREIGN KEY (ModuleID) REFERENCES Project_Modules (ModuleID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee (EmployeeID),
)
go

INSERT INTO Employee
    (EmployeeFirstName, EmployeeLastName, EmployeeHireDate, EmployeeStatus, SupervisorID, SocialSecurityNumber)
VALUES
    ('Jane', 'Doe', '2021-02-01', 1, 1, 123456789),
    ('John', 'Smith', '2021-03-15', 1, 1, 987654321),
    ('Mary', 'Jones', '2021-05-01', 1, 2, 555555555),
    ('David', 'Lee', '2021-06-30', 1, 2, 333333333),
    ('Sara', 'Taylor', '2021-08-15', 1, 3, 111111111);
INSERT INTO Project
    (ProjectName, ProjectStartDate, ProjectDescription, ProjectDetail, ProjectCompletedOn, EmployeeID)
VALUES
    ('Project A', '2021-01-01', 'This is project A', 'Details about project A', '2021-04-01', 1),
    ('Project B', '2021-02-01', 'This is project B', 'Details about project B', '2021-05-01', 2),
    ('Project C', '2021-03-01', 'This is project C', 'Details about project C', '2021-06-01', 1),
    ('Project D', '2021-04-01', 'This is project D', 'Details about project D', '2021-07-01', 3),
    ('Project E', '2021-05-01', 'This is project E', 'Details about project E', '2021-08-01', 1);

INSERT INTO Project_Modules
    (ProjectID, EmployeeID, ProjectModulesDate, ProjectModulesCompletedOn, ProjectModuleDescription)
VALUES
    (1, 2, '2021-02-01', '2021-03-01', 'Module 1 of project A'),
    (1, 3, '2021-02-15', '2021-03-15', 'Module 2 of project A'),
    (2, 4, '2021-03-01', '2021-04-01', 'Module 1 of project B'),
    (2, 5, '2021-03-15', '2021-04-15', 'Module 2 of project B'),
    (3, 1, '2021-04-01', '2021-05-01', 'Module 1 of project C');
INSERT INTO Work_Done
    (ModuleID, EmployeeID, WorkDoneDate, WorkDoneDescription, WorkDoneStatus)
VALUES
    (1, 2, '2021-02-10', 'Work done for module 1 of project A', 1),
    (2, 3, '2021-03-05', 'Work done for module 2 of project A', 1),
    (3, 4, '2021-04-10', 'Work done for module 1 of project B', 0),
    (4, 5, '2021-05-05', 'Work done for module 2 of project B', 1),
    (5, 1, '2021-06-10', 'Work done for module 1 of project C', 1);
GO

-- b
alter Procedure DeleteProject
as
begin
    SET NOCOUNT ON;
    DECLARE @RemovedWork INT = 0;
    DECLARE @RemovedProjects INT;
    DECLARE @RemovedModules INT;

    DELETE from dbo.Work_Done where ModuleID in (
        SELECT pm.ModuleID
    from dbo.Project_Modules pm
    where pm.ProjectID in (
            SELECT p.ProjectID
    from dbo.Project p
    WHERE P.ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE())))
    set @RemovedWork = @@ROWCOUNT

    DELETE from dbo.Project_Modules 
    where ProjectID in (
            SELECT p.ProjectID
    from dbo.Project p
    where P.ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE()))
    set @RemovedModules = @@ROWCOUNT

    delete from dbo.Project 
    WHERE ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE())

    set @RemovedProjects = @@ROWCOUNT


    PRINT 'Removed ' + CAST(@RemovedProjects AS VARCHAR(10)) + ' projects';
    PRINT 'Removed ' + CAST(@RemovedModules AS VARCHAR(10)) + ' project modules';
    PRINT 'Removed ' + CAST(@RemovedWork AS VARCHAR(10)) + ' work done records';

end;
EXEC dbo.DeleteProject
    go
-- c

create PROC retriveEmployeeWorkingModules(@EmployeeID  INT)
AS
BEGIN
    SELECT
        ModuleID,
        PM.ProjectID,
        E.EmployeeLastName+' '+E.EmployeeFirstName AS Name,
        PM.ProjectModulesCompletedOn,
        PM.ProjectID, PM.ProjectModulesCompletedOn,
        PM.ProjectModulesDate,
        PM.ProjectModuleDescription
    FROM dbo.Employee E INNER JOIN dbo.Project_Modules PM ON E.EmployeeID=PM.EmployeeID
    WHERE E.EmployeeID= @EmployeeID
END
go
EXEC dbo.retriveEmployeeWorkingModules @EmployeeID = 2;

go

-- d

DROP PROCEDURE IF EXISTS dbo.retriveEmployeeWorkingModules; 
go
CREATE FUNCTION GetUnassignedWorks (@EmployeeID int)
RETURNS TABLE
AS
RETURN 
(
select *
from Project_Modules pm
where pm.EmployeeID != @EmployeeID and pm.ProjectID in (select p.ProjectID
    from Project p
    where pm.ProjectID in (select pm.ProjectID
    from Project_Modules pm
    where pm.EmployeeID = @EmployeeID))
);
go

SELECT *
FROM GetUnassignedWorks(3);
-- e
go
--PREVENT INSERT AND UPDATE IN Project_Module
CREATE TRIGGER ProjectInputInvalid
ON Project_Modules
FOR INSERT, UPDATE
AS
BEGIN
    IF EXISTS( 
		SELECT *
    FROM inserted I, dbo.Project P
    WHERE I.ProjectID=P.ProjectID
        AND P.ProjectStartDate>I.ProjectModulesDate
	)
	BEGIN
        PRINT 'err: ProjectModuleDate < ProjectStartDate'
        ROLLBACK TRAN
    END
	ELSE
	IF EXISTS( 
		SELECT *
    FROM inserted I, dbo.Project P
    WHERE I.ProjectID=P.ProjectID
        AND P.ProjectCompletedOn<I.ProjectModulesCompletedOn
			)
	BEGIN
        PRINT 'err: ProjectModuleCompletedOn > ProjectCompletedOn'
        ROLLBACK TRAN
    END
	ELSE
	PRINT 'success'
END
go

--PREVENT UPDATE IN Project_Module
go
create TRIGGER RG_UpdateProjectInvalid
ON Project
FOR UPDATE
AS
BEGIN
    IF EXISTS( 
		SELECT *
    FROM inserted I, dbo.Project_Modules P
    WHERE I.ProjectID=P.ProjectID
        AND I.ProjectStartDate>P.ProjectModulesDate
	)
		BEGIN
        PRINT 'err: ProjectModuleDate < ProjectStartDate'
        ROLLBACK TRAN
    END
	ELSE
		IF EXISTS( 
		SELECT *
    FROM inserted I, dbo.Project_Modules P
    WHERE I.ProjectID=P.ProjectID
        AND I.ProjectCompletedOn<P.ProjectModulesCompletedOn
			)
		BEGIN
        PRINT 'err: ProjectModuleCompletedOn > ProjectCompletedOn'
        ROLLBACK TRAN
    END
	ELSE PRINT 'success'
END
-- test trigger
UPDATE dbo.PROJECT SET ProjectCompletedOn='1/1/2003' WHERE ProjectID=10

-- Exercise 2 User Defined Function (UDF)
use AdventureWorks
go
-- 1
create FUNCTION ProductFunction()
returns TABLE
as
RETURN
(
    SELECT p.ProductID, p.Name, p.Color, p.ListPrice, p.ProductNumber
from Production.Product p
WHERE p.ProductNumber like 'CA%' and p.Color = 'black'
)
go
SELECT *
from ProductFunction() 
-- 2
GO
ALTER FUNCTION AddressFunction(@businessId int)
returns TABLE
as
RETURN
(
    SELECT (pa.AddressLine1 +''+iif(pa.AddressLine2 is null, '', pa.AddressLine2)+' '+ pa.City +' '+ps.Name) as andress
from Person.BusinessEntityAddress pb
    join Person.Address  pa on pa.AddressID = pb.AddressID
    JOIN Person.StateProvince ps on ps.StateProvinceID = pa.StateProvinceID
    join Person.CountryRegion  pc on pc.CountryRegionCode = ps.CountryRegionCode

where pb.BusinessEntityID = @businessId
)
go

SELECT *
From AddressFunction(1)
-- Exercise 3: Stored Procedure
go
SELECT p.ModifiedDate, p.FirstName
from Person.Person p

go

alter PROCEDURE ex3
    @ModifiedDate DATETIME,
    @UpperFlag bit
AS
BEGIN
    SELECT iif(@UpperFlag = 1, UPPER(p.FirstName), p.FirstName) as FirstName
    from Person.Person p
    where DATEDIFF(DAY, p.ModifiedDate, @ModifiedDate) <0
END;

go

EXEC dbo.ex3 @ModifiedDate = '2009-01-06 00:00:00.000', @UpperFlag = 0

-- Exercise 4
GO
CREATE TABLE Production.ProductInventoryAudit
(
    ProductID INT NOT NULL,
    LocationID SMALLINT NOT NULL,
    Shelf NVARCHAR(10) NOT NULL,
    Bin TINYINT NOT NULL,
    Quantity SMALLINT NOT NULL,
    rowguid UNIQUEIDENTIFIER NOT NULL,
    ModifiedDate DATETIME NOT NULL,
    InsertOrDelete CHAR(1) NOT NULL
)

go
-- trigger delete
create trigger ex4_DELETE
on Production.ProductInventory
for DELETE
as
 BEGIN
    INSERT into Production.ProductInventoryAudit
    select d.ProductID, d.LocationID, d.Shelf, d.Bin, d.Quantity, d.rowguid, d.ModifiedDate, 'D'
    from deleted d
END
--  trigger insert
GO
create trigger ex4_INSERT
on Production.ProductInventory
for INSERT
as
 BEGIN
    INSERT into Production.ProductInventoryAudit
    select d.ProductID, d.LocationID, d.Shelf, d.Bin, d.Quantity, d.rowguid, d.ModifiedDate, 'D'
    from inserted d
END
GO
SELECT *
FROM Production.ProductInventory
GO
SELECT *
FROM Production.ProductInventoryAudit
GO
-- test trigger
INSERT INTO Production.ProductInventory
VALUES(31, 5012, 'A', 2, 427, 'f407c07a-ca14-4684-a02c-608bd00c2233', '2014-08-08 00:00:00.000');
go
DELETE FROM Production.ProductInventory WHERE rowguid ='3c860c96-15ff-4df4-91d7-b237ff64480f'