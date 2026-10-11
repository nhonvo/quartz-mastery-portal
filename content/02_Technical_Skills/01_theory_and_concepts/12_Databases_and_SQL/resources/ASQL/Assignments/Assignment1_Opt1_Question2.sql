USE master
GO
CREATE DATABASE Assignment1_Opt1_Question2
go
use Assignment1_Opt1_Question2
go
CREATE table Department
(
    Department_Number int primary key,
    Department_Name varchar(30)
)
CREATE table Employee_Table
(
    Employee_Number int primary key,
    Employee_Name varchar(30),
    Department_Number int,
    FOREIGN  KEY (Department_Number) REFERENCES Department(Department_Number),
)
CREATE table Employee_Skill_Table
(
    FOREIGN  KEY (Employee_Number) REFERENCES Employee_Table(Employee_Number),
    Employee_Number int,
    Skill_Code varchar(10),
    Date_Registered DATETIME,
    primary key(Employee_Number, Skill_Code),
)
go

INSERT INTO Department
VALUES
    (1, 'Sales');
INSERT INTO Department
VALUES
    (2, 'Marketing');
INSERT INTO Department
VALUES
    (3, 'IT');

INSERT INTO Employee_Table
VALUES
    (1, 'Truong Nhon', 1);
INSERT INTO Employee_Table
VALUES
    (2, 'Peter Smith', 1);
INSERT INTO Employee_Table
VALUES
    (3, 'Boby Roaddy', 1);
INSERT INTO Employee_Table
VALUES
    (4, 'Anh Khoa', 2);
INSERT INTO Employee_Table
VALUES
    (5, 'Hung Dung', 2);
INSERT INTO Employee_Table
VALUES
    (6, 'Mit nai', 3);

INSERT INTO Employee_Skill_Table
VALUES
    (1, 'HTML', '2021-01-01');
INSERT INTO Employee_Skill_Table
VALUES
    (1, 'CSS', '2021-01-02');
INSERT INTO Employee_Skill_Table
VALUES
    (2, 'JavaScript', '2021-01-03');
INSERT INTO Employee_Skill_Table
VALUES
    (3, 'Java', '2021-01-04');
INSERT INTO Employee_Skill_Table
VALUES
    (4, 'Python', '2021-01-05');
INSERT INTO Employee_Skill_Table
VALUES
    (4, 'SQL', '2021-01-06');
INSERT INTO Employee_Skill_Table
VALUES
    (5, 'C++', '2021-01-07');
INSERT INTO Employee_Skill_Table
VALUES
    (6, 'Ruby', '2021-01-08');


go
SELECT *
from dbo.Department
SELECT *
from dbo.Employee_Table
SELECT *
from dbo.Employee_Skill_Table

GO
-- 2.1 
SELECT *
from dbo.Employee_Skill_Table sk join dbo.Employee_Table e on sk.Employee_Number = e.Employee_Number
where sk.Skill_Code = 'java'

go
-- 2.2
SELECT *
from dbo.Employee_Table e
where  e.Employee_Number
in (SELECT sk.Employee_Number
from dbo.Employee_Skill_Table sk
where Skill_Code = 'java')


SELECT *
from dbo.Employee_Table e join (SELECT sk.Employee_Number
from dbo.Employee_Skill_Table sk
where Skill_Code = 'java') d on d.Employee_Number = e.Employee_Number

go
-- 3

SELECT e.Employee_Name, e.Department_Number
FROM dbo.Employee_Table e
    JOIN (
SELECT Department_Number
    FROM dbo.Employee_Table
    GROUP BY Department_Number
    HAVING COUNT(*) >= 3
) d ON e.Department_Number = d.Department_Number;
go
-- 4

go


SELECT e.Employee_Name
FROM dbo.Employee_Table e
    JOIN (
SELECT Employee_Number
    FROM dbo.Employee_Skill_Table
    GROUP BY Employee_Number
    HAVING COUNT(*) > 1
) s ON e.Employee_Number = s.Employee_Number;
go
-- 5
CREATE view Assignment_Question2
as
    SELECT distinct e.Employee_Number, e.Employee_Name, d.Department_Name
    from dbo.Employee_Table e join Department  d on e.Department_Number =d.Department_Number
        join dbo.Employee_Skill_Table k on k.Employee_Number = e.Employee_Number
    GROUP BY e.Employee_Number, e.Employee_Name, d.Department_Name
    HAVING COUNT(k.Employee_Number) > 1
go
SELECT *
from Assignment_Question2