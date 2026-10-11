USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE4_FUNCTION
GO
CREATE DATABASE LECTURE4_FUNCTION
GO
USE LECTURE4_FUNCTION
GO
CREATE TABLE Student(	ID int PRIMARY KEY IDENTITY(1, 1),	FirstName NVARCHAR(10),	MiddleName NVARCHAR(10),	LastName NVARCHAR(10),	Math int,	Physic int,	Chemical int,	DateOfBirth date);INSERT INTO Student(FirstName, MiddleName, LastName, Math, Physic, Chemical, DateOfBirth)VALUES(N'Nguyễn', N'Văn', N'Huấn', 7, 8, 9, '10/15/2000'),	(N'Võ', N'Văn', N'Hiếu', 3, 4, 5, '10/15/2005'),	(N'Nguyễn', N'Thị', N'Huệ', 2, 5, 7, '10/15/2008'),	(N'Nguyễn', NULL, 'Trương', NULL, 5, 7, '10/15/1999');SELECT * FROM Student