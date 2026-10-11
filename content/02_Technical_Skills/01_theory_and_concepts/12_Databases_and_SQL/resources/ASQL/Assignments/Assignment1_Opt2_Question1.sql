use master 
go
create database Assignment1_Opt2_Question1
go
use Assignment1_Opt2_Question1
go
CREATE TABLE [dbo].[Employee]
(
    [EmpNo] [int] NOT NULL,
    [EmpName] [nchar](30) COLLATE 
SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [BirthDay] [datetime] NOT NULL,
    [DeptNo] [int] NOT NULL,
    [MgrNo] [nchar](10) COLLATE 
SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [StartDate] [datetime] NOT NULL,
    [Salary] [money] NOT NULL,
    [Status] [int] NOT NULL,
    [Note] [nchar](100) COLLATE 
SQL_Latin1_General_CP1_CI_AS NULL,
    [Level] [int] NOT NULL

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
    [SkillNo] [int] IDENTITY(1,1) NOT NULL,
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
    [DeptNo] [int] IDENTITY(1,1) NOT NULL,
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
    [SkillNo] [int] NOT NULL,
    [EmpNo] [int] NOT NULL,
    [SkillLevel] [int] NOT NULL,
    [RegDate] [datetime] NOT NULL,
    FOREIGN KEY (SkillNo) REFERENCES SKILL(SkillNo),
    FOREIGN KEY (EmpNo) REFERENCES Employee(EmpNo),
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
    ('Python', 'An interpreted, high-level, general-purpose programming language'),
    ('JavaScript', 'A lightweight, interpreted programming language'),
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


SELECT *
FROM dbo.Department
go
SELECT *
FROM dbo.Emp_Skill
go
SELECT *
FROM dbo.Employee
go
SELECT *
FROM dbo.Skill
go
-- b
SELECT d.DeptName, e.EmpName, e.Email, e.StartDate
FROM dbo.Department d JOIN dbo.Employee e on d.DeptNo = e.DeptNo
where DATEDIFF(MONTH, e.StartDate, GETDATE()) >6
-- c
go
SELECT DISTINCT e.EmpName
FROM dbo.Employee e join dbo.Emp_Skill ek ON e.EmpNo = ek.EmpNo
    join Skill s on s.SkillNo = ek.SkillNo
where s.SkillName = 'C++' OR s.SkillName = 'Java'
-- d
go
SELECT e.EmpName AS EmployeeName, m.EmpName AS ManagerName, m.Email AS ManagerEmail
FROM dbo.Employee e
    JOIN dbo.Employee m ON e.MgrNo = m.EmpNo
go
-- e
go
SELECT d.DeptName, e.EmpName
FROM dbo.Employee e
    JOIN dbo.Department d ON e.DeptNo = d.DeptNo
    JOIN (
SELECT DeptNo
    FROM dbo.Employee
    GROUP BY DeptNo
    HAVING COUNT(*) >= 2
) d2 ON e.DeptNo = d2.DeptNo;
go
-- f
SELECT e.EmpName, e.Email, es.SkillNo
FROM dbo.Employee e
    JOIN dbo.Emp_Skill es ON e.EmpNo = es.EmpNo
ORDER BY e.EmpName ASC

go
-- g

SELECT distinct e.EmpName, e.BirthDay, e.Email
from dbo.Employee e join dbo.Emp_Skill ek on e.EmpNo = ek.EmpNo
join  (
SELECT ek.EmpNo
FROM dbo.Emp_Skill ek
GROUP BY ek.EmpNo
HAVING COUNT(*) > 1
) f on f.EmpNo = e.EmpNo
go

-- h
CREATE VIEW WorkingEmployees
AS
    SELECT e.EmpName, s.SkillName, d.DeptName
    FROM dbo.Employee e
        JOIN dbo.Department d ON e.DeptNo = d.DeptNo
        JOIN dbo.Emp_Skill es ON e.EmpNo = es.EmpNo
        JOIN dbo.Skill s ON es.SkillNo = s.SkillNo
    WHERE e.Status = 1

go
select *
from dbo.WorkingEmployees