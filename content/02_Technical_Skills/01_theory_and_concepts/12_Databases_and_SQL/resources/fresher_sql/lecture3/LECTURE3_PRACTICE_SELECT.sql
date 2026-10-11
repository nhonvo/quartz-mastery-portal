USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE3_PRACTICE_SELECT
GO
CREATE DATABASE LECTURE3_PRACTICE_SELECT
GO
USE LECTURE3_PRACTICE_SELECT
GO

CREATE TABLE Student(	ID int PRIMARY KEY,	FullName nvarchar(20) NOT NULL,	Math tinyint CHECK (Math >= 0 AND Math <= 10));INSERT INTO Student(ID, FullName, Math)VALUES(1007, 'Nga Nguyễn', 5),	  (1006, N'Nga Nguyễn', 6),	  (1005, N'Trung hồ', 7),	  (1001, N'Hào Phạm', 5),	  (1002, N'Lan Anh', 2),	  (1003, N'Phương Trần', 9),	  (1004, N'Mỹ lệ', 10),	  (1010, N'Lan Anh', 10),	  (1011, N'Khác Biệt', NULL);SELECT * FROM Student