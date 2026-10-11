-- e, d,  b
use master
go
create DATABASE Assignment2_Opt1_Question1
go
use Assignment2_Opt1_Question1
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
);

Create table Project
(
    ProjectID int NOT NULL IDENTITY(1,1),
    ProjectName Nvarchar(50) NOT NULL,
    ProjectStartDate DateTime ,
    ProjectDescription Nvarchar(200) ,
    ProjectDetail nvarchar(500) ,
    ProjectCompletedOn DateTime ,
    PRIMARY KEY (ProjectID),
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
INSERT INTO Employee
    (EmployeeFirstName, EmployeeLastName, EmployeeHireDate, EmployeeStatus, SupervisorID, SocialSecurityNumber)
VALUES
    ('Jane', 'Doe', '2021-02-01', 1, 1, 123456789),
    ('John', 'Smith', '2021-03-15', 1, 1, 987654321),
    ('Mary', 'Jones', '2021-05-01', 1, 2, 555555555),
    ('David', 'Lee', '2021-06-30', 1, 2, 333333333),
    ('Sara', 'Taylor', '2021-08-15', 1, 3, 111111111);
INSERT INTO Project
    (ProjectName, ProjectStartDate, ProjectDescription, ProjectDetail, ProjectCompletedOn)
VALUES
    ('Project A', '2021-01-01', 'This is project A', 'Details about project A', '2021-04-01'),
    ('Project B', '2021-02-01', 'This is project B', 'Details about project B', '2021-05-01'),
    ('Project C', '2021-03-01', 'This is project C', 'Details about project C', '2021-06-01'),
    ('Project D', '2021-04-01', 'This is project D', 'Details about project D', '2021-07-01'),
    ('Project E', '2021-05-01', 'This is project E', 'Details about project E', '2021-08-01');

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
SELECT * from dbo.Employee
SELECT * from dbo.Project
SELECT * from dbo.Project_Modules
SELECT * from dbo.Work_Done
go

-- b
DROP PROCEDURE IF EXISTS dbo.RemoveProjects; 
go


CREATE PROCEDURE RemoveProjects
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @RemovedWork INT = 0;
    DECLARE @RemovedProjects INT;
    DECLARE @RemovedModules INT;

    -- Remove work done modules
    Delete FROM dbo.Work_Done WHERE  EXISTS (
           select *
    from dbo.Project_Modules as PM
    where EXISTS (
				 SELECT *
    FROM Project  AS P
    WHERE P.ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE()))
                  );
    SET @RemovedWork = @@ROWCOUNT;

    -- Remove project modules has not work done
    Delete  from dbo.Project_Modules  where EXISTS (
				 SELECT *
    FROM dbo.Project  AS P
    WHERE P.ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE()));
    SET @RemovedModules = @@ROWCOUNT;

    -- Remove completed projects  at least three months ago
    Delete FROM dbo.Project   WHERE ProjectCompletedOn <DATEADD(MONTH, -3, GETDATE())
    SET @RemovedProjects = @@ROWCOUNT;

    PRINT 'Removed ' + CAST(@RemovedProjects AS VARCHAR(10)) + ' projects';
    PRINT 'Removed ' + CAST(@RemovedModules AS VARCHAR(10)) + ' project modules';
    PRINT 'Removed ' + CAST(@RemovedWork AS VARCHAR(10)) + ' work done records';
END
EXEC RemoveProjects;

-- c
go
DROP PROCEDURE IF EXISTS dbo.retriveEmployeeWorkingModules; 
go


ALTER PROC retriveEmployeeWorkingModules(@EmployeeID  INT)
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
EXEC dbo.retriveEmployeeWorkingModules @EmployeeID = 1 ;

go

-- d  

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
SELECT *
FROM GetUnassignedWorks(1);

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

UPDATE dbo.PROJECT SET ProjectCompletedOn='1/1/2003' WHERE ProjectID=10