-- f
use master
GO
CREATE DATABASE Assignment2_Opt2_Question1
GO
use Assignment2_Opt2_Question1
GO

CREATE TABLE [dbo].[Employee]
(
    [EmpNo] [INT] NOT NULL,
    [EmpName] [nchar](30) COLLATE 
SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [BirthDay] [datetime] NOT NULL,
    [DeptNo] [INT] NOT NULL,
    [MgrNo] [INT] NOT NULL,
    [StartDate] [datetime] NOT NULL,
    [Salary] [money] NOT NULL,
    [Status] [INT] NOT NULL,
    [Note] [nchar](100) COLLATE 
SQL_Latin1_General_CP1_CI_AS NULL,
    [Level] [INT] NOT NULL

) ON [PRIMARY]

GO

ALTER TABLE Employee 
ADD CONSTRAINT PK_Emp PRIMARY KEY (EmpNo)
GO

ALTER TABLE [dbo].[Employee]  ADD  CONSTRAINT [chk_Level] CHECK  (([Level]=(7) OR [Level]=(6) OR [Level]=(5) OR [Level]=(4) OR [Level]=(3) OR [Level]=(2) OR [Level]=(1)))
GO
ALTER TABLE [dbo].[Employee]  ADD  CONSTRAINT [chk_Status] CHECK  (([Status]=(2) OR [Status]=(1) OR [Status]=(0)))

GO
ALTER TABLE [dbo].[Employee]
ADD Email NCHAR(30) 
GO

ALTER TABLE [dbo].[Employee]
ADD CONSTRAINT chk_Email CHECK (Email IS NOT NULL)
GO

ALTER TABLE [dbo].[Employee] ADD CONSTRAINT chk_Email1 UNIQUE(Email)
GO
ALTER TABLE Employee
ADD CONSTRAINT DF_EmpNo DEFAULT 0 FOR EmpNo
GO

ALTER TABLE Employee
ADD CONSTRAINT DF_Status DEFAULT 0 FOR Status
GO

CREATE TABLE [dbo].[Skill]
(
    [SkillNo] [INT] IDENTITY(1,1) NOT NULL,
    [SkillName] [nchar](30) COLLATE 
SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [Note] [nchar](100) COLLATE 
SQL_Latin1_General_CP1_CI_AS NULL
) ON [PRIMARY]
GO
ALTER TABLE Skill
ADD CONSTRAINT PK_Skill PRIMARY KEY (SkillNo)

GO

CREATE TABLE [dbo].[Department]
(
    [DeptNo] [INT] IDENTITY(1,1) NOT NULL,
    [DeptName] [nchar](30) COLLATE 
SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [Note] [nchar](100) COLLATE 
SQL_Latin1_General_CP1_CI_AS NULL
) ON [PRIMARY]
GO
ALTER TABLE Department
ADD CONSTRAINT PK_Dept PRIMARY KEY (DeptNo)
GO
CREATE TABLE [dbo].[Emp_Skill]
(
    [SkillNo] [INT] NOT NULL,
    [EmpNo] [INT] NOT NULL,
    [SkillLevel] [INT] NOT NULL,
    [RegDate] [datetime] NOT NULL,
    FOREIGN KEY(EmpNo) REFERENCES Employee(EmpNo),
    FOREIGN KEY(SkillNo) REFERENCES Skill(SkillNo),
    [Description] [nchar](100) COLLATE 
SQL_Latin1_General_CP1_CI_AS NULL
) ON [PRIMARY]

GO

ALTER TABLE Emp_Skill
ADD CONSTRAINT PK_Emp_Skill PRIMARY KEY (SkillNo, EmpNo)
GO

ALTER TABLE Employee  ADD  CONSTRAINT [FK_1] FOREIGN KEY([DeptNo])
REFERENCES Department (DeptNo)


GO
INSERT INTO Skill
    (SkillName, Note)
VALUES
    ('C++', 'A high-performance programming language'),
    ('Java', 'A widely used programming language'),
    ('Python', 'An INTerpreted, high-level, general-purpose programming language'),
    ('JavaScript', 'A lightweight, INTerpreted programming language'),
    ('SQL', 'A standard language for managing relational databases'),
    ('HTML', 'A markup language used for creating web pages'),
    ('CSS', 'A stylesheet language used for describing the presentation of a document written in HTML'),
    ('.NET', 'A framework for building Windows applications and web services');


INSERT INTO Department
    (DeptName, Note)
VALUES
    ('Sales', 'Responsible for selling products and services'),
    ('Marketing', 'Responsible for promoting products and services'),
    ('Human Resources', 'Responsible for managing employee relations and recruitment'),
    ('Finance', 'Responsible for managing financial operations and budgets'),
    ('IT', 'Responsible for managing information technology and computer systems'),
    ('Operations', 'Responsible for managing day-to-day operations and processes'),
    ('Research and Development', 'Responsible for developing new products and services'),
    ('Customer Service', 'Responsible for providing customer support and assistance');

INSERT INTO Employee
    (EmpNo, EmpName, BirthDay, DeptNo, MgrNo, StartDate, Salary, Status, Note, Level, Email)
VALUES
    (1, 'John Doe', '1980-01-01', 1, '1', '2020-01-01', 50000, 1, NULL, 5, 'john.doe@example.com'),
    (2, 'Jane Smith', '1985-05-15', 1, '1', '2018-01-01', 45000, 1, NULL, 4, 'jane.smith@example.com'),
    (3, 'Bob Johnson', '1990-07-10', 2, '2', '2021-03-15', 40000, 0, NULL, 3, 'bob.johnson@example.com'),
    (4, 'Alice Lee', '1995-12-25', 2, '2', '2019-05-01', 55000, 1, NULL, 6, 'alice.lee@example.com'),
    (5, 'Tom Davis', '1988-09-30', 3, '3', '2022-01-01', 60000, 1, NULL, 7, 'tom.davis@example.com'),
    (6, 'Amy Chen', '1992-04-20', 3, '3', '2020-06-01', 48000, 1, NULL, 4, 'amy.chen@example.com'),
    (7, 'David Kim', '1986-11-12', 4, '4', '2018-10-01', 52000, 1, NULL, 5, 'david.kim@example.com'),
    (8, 'Emily Wang', '1998-02-28', 4, '4', '2021-05-15', 45000, 0, NULL, 3, 'emily.wang@example.com');
INSERT INTO Employee
    (EmpNo, EmpName, BirthDay, DeptNo, MgrNo, StartDate, Salary, Status, Note, Level, Email)
VALUES
    (9, 'the employee work 5 month', '1998-02-28', 4, '4', '2023-11-15', 45000, 0, NULL, 3, 'test.wang@example.com');

GO

INSERT INTO Emp_Skill
    (SkillNo, EmpNo, SkillLevel, RegDate, Description)
VALUES
    (1, 1, 5, '2022-01-01', 'Expert in C# programming language'),
    (2, 1, 4, '2022-01-01', 'Proficient in SQL'),
    (3, 2, 3, '2022-02-01', 'Knows basic HTML and CSS'),
    (4, 2, 2, '2022-02-01', 'Familiar with JavaScript'),
    (5, 3, 4, '2022-03-01', 'Has experience in Java programming'),
    (6, 4, 3, '2022-04-01', 'Familiar with Python'),
    (7, 5, 2, '2022-05-01', 'Knows basic data analysis using R'),
    (8, 6, 1, '2022-06-01', 'Has some experience with PHP');
GO
SELECT *
FROM dbo.Department
GO
SELECT *
FROM dbo.Emp_Skill
GO
SELECT *
FROM dbo.Employee
GO
SELECT *
FROM dbo.Skill
GO

-- b
CREATE PROCEDURE updateEmployeeLevel
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.Employee
        SET Level = 2
        WHERE Level = 1 AND DATEDIFF(YEAR, StartDate, GETDATE()) >= 3;
    SELECT @@ROWCOUNT AS 'Number of Updated Records';
END;

EXEC updateEmployeeLevel;
GO
-- c
DECLARE @employeeNo INT
GO
CREATE PROCEDURE employeeInfomation(@employeeNo INT)
as
begin
    SELECT e.EmpName, d.DeptName, e.Email
    from dbo.Employee e join dbo.Department d on e.DeptNo = d.DeptNo
    WHERE e.EmpNo = @employeeNo
END;
GO
EXEC employeeInfomation @employeeNo = 1
GO
-- d
DROP FUNCTION IF EXISTS Emp_Tracking
GO
CREATE FUNCTION Emp_Tracking (@EmployeeNo INT)
RETURNS INT
AS
BEGIN
    DECLARE @output INT
    SELECT @output = Salary
    FROM Employee
    WHERE EmpNo = @EmployeeNo
    RETURN @output
END;
GO
select dbo.Emp_Tracking(1);
-- e/ trigger
GO
CREATE trigger EmployeeSalary
on  Employee
FOR INSERT, UPDATE
as 
    IF EXISTS(SELECT 1
FROM inserted
WHERE Level = 1 AND Salary > 10000000)
    BEGIN
    RAISERROR('Error. Employees information (level = 1 and salary >10.000.000).', 16, 1)
    ROLLBACK TRANSACTION
    RETURN
END

GO
-- test trigger
UPDATE Employee set  Salary = 10000001 WHERE EmpNo = 3


-- f 
DECLARE @Salary MONEY
DECLARE @ID INT
DECLARE @StartDate DATE
DECLARE @Level INT

DECLARE UpdateSalaryCu CURSOR FOR
	SELECT EmpNo, Salary, [Level], StartDate
FROM Employee
WHERE EmpNo IN ( 
		SELECT EmpNo
    FROM Emp_Skill
    GROUP BY EmpNo
    HAVING COUNT(*)>1)
    AND (LEVEL=2 OR Level=3)
    AND DATEADD(YEAR,-2,GETDATE())>StartDate
OPEN UpdateSalaryCu
FETCH NEXT FROM UpdateSalaryCu  
	INTO @ID ,@Salary, @Level, @StartDate
WHILE @@FETCH_STATUS = 0 
BEGIN
    PRINT CAST(@LEVEL AS NVARCHAR) + ' '+CAST(@StartDate AS NVARCHAR)
    IF(@Level=2 AND @StartDate BETWEEN DATEADD(YEAR,-3,GETDATE())AND DATEADD(YEAR,-2,GETDATE())) 
	BEGIN
        update Employee SET Salary = Salary + 200000 WHERE EmpNo= @ID
    END

    IF (@Level=3 AND @StartDate < DATEADD(YEAR,-3,GETDATE()))
	BEGIN
        UPDATE Employee SET Salary = Salary + 500000 WHERE EmpNo= @ID
    END
    FETCH NEXT FROM UpdateSalaryCu 
		INTO @ID ,@Salary, @Level, @StartDate
END

CLOSE UpdateSalaryCu
DEALLOCATE UpdateSalaryCu
