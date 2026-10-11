USE Fsoft_Training
GO
-- Create table with name is DEPARTMENT
CREATE TABLE DEPARTMENT(
	DEPT_ID		INT NOT NULL PRIMARY KEY
,	DEPT_NAME	VARCHAR(40)
	)
-- Insert data to table
INSERT into DEPARTMENT Values(1,'IT')
INSERT into DEPARTMENT Values(2,'Payroll')
INSERT into DEPARTMENT Values(3,'HR')
INSERT into DEPARTMENT Values(4,'Admin')

GO
-- Create table with name is EMP
CREATE TABLE EMP
(
	ID		INT NOT NULL PRIMARY KEY
,	NAME	VARCHAR(40)
,	AGE		TINYINT
,	DEPT_ID	INT
,	FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID)
)

GO
--Insert data to table
INSERT into EMP Values(1,'John',25,3)
INSERT into EMP Values(2,'Mike',30,2)
INSERT into EMP Values(3,'Parm',25,1)
INSERT into EMP Values(4,'Todd',23,4)
INSERT into EMP Values(5,'Sara',35,1)
INSERT into EMP Values(6,'Ben',40,3)

GO
-- Create View from 2 tables EMP and DEPARTMENT
CREATE VIEW view_EmployeeByDpt
AS
SELECT ID, NAME, AGE, DEPT_NAME
FROM EMP, DEPARTMENT
WHERE EMP.DEPT_ID = DEPARTMENT.DEPT_ID

GO

SELECT * FROM view_EmployeeByDpt

GO

-- update data of EMP table thru View
UPDATE view_EmployeeByDpt
SET NAME = 'Ana' 
WHERE ID = 2
GO

-- Update view
ALTER VIEW view_EmployeeByDpt
AS
SELECT e.ID, e.NAME, e.AGE, e.DEPT_ID, d.DEPT_NAME
FROM EMP e, DEPARTMENT d
WHERE e.DEPT_ID = d.DEPT_ID
GO

DROP VIEW view_EmployeeByDpt
GO