/*

Lưu ý: 
- khi nộp bài: Copy toàn bộ lệnh SQL vào file .txt. Và nộp file này nhớ ghi lại đề nhé
- chạy 1 lần là được không bị lỗi.
- Bấm chạy lại lần nữa cũng không được lỗi(học cách drop if exists)

*/
-- Create database
USE MASTER
GO
DROP DATABASE IF EXISTS EmployeeDatabase
GO
CREATE DATABASE EmployeeDatabase
GO

USE EmployeeDatabase
GO

CREATE TABLE Employees (
    ID INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(50),
    Phone VARCHAR(20)
);

CREATE TABLE Departments (
    ID INT PRIMARY KEY IDENTITY,
    DepartmentName VARCHAR(50),
    Location VARCHAR(50)
);

CREATE TABLE Jobs (
    ID INT PRIMARY KEY IDENTITY,
    JobTitle VARCHAR(50),
    Salary DECIMAL(10,2)
);

CREATE TABLE EmployeeDepartment (
    EmployeeID INT,
    DepartmentID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(ID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(ID),
	CONSTRAINT PK_EmployeeID_DepartmentID PRIMARY KEY(EmployeeID, DepartmentID)
);

CREATE TABLE EmployeeJob (
    EmployeeID INT,
    JobID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(ID),
    FOREIGN KEY (JobID) REFERENCES Jobs(ID),
	CONSTRAINT PK_EmployeeID_JobID PRIMARY KEY(EmployeeID, JobID)
);
