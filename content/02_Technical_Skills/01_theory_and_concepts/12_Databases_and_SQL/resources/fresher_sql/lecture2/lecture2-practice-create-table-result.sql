USE master -- nhảy vô master database
GO -- thực thi lệnh trước đó
DROP DATABASE IF EXISTS LECTURE2_CLASS_PRACTICE -- xóa database nếu đã tồn tại
GO
CREATE DATABASE LECTURE2_CLASS_PRACTICE -- tạo database
GO
USE LECTURE2_CLASS_PRACTICE -- sử dụng database vừa tạo
GO
/*
	đây là comment để nhắc nhở cho bản thân
	rằng mấy đoạn code này ruốt cuộc dùng để làm gì :))
*/
CREATE TABLE Student(
	StudentID int PRIMARY KEY IDENTITY(1, 1), -- StudentID start from 1 and increase one by one.
	FullName nchar(50) NOT NULL, -- FullName is not nullable
	DateOfBirth date DEFAULT '10/22/2000', -- DateOfBirth default is '10/22/2000'
	Score int CHECK (Score > 0 AND Score < 100) -- Score between 0 and 100
)
GO
CREATE TABLE StudentEmail(
	StudentID int FOREIGN KEY REFERENCES Student(StudentID),
	Email varchar(20) UNIQUE, -- Email is unique
	-- in 'StudentEmail' table Primary key is StudentID & Email
	CONSTRAINT PK_StudentEmail PRIMARY KEY (StudentID, Email),)
GO

