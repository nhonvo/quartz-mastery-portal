USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE4_SQLCLAUSE_DEMO
GO
CREATE DATABASE LECTURE4_SQLCLAUSE_DEMO
GO
USE LECTURE4_SQLCLAUSE_DEMO
GO

CREATE TABLE StudentScore(	ID int PRIMARY KEY IDENTITY(1, 1),	StudentID int,	FullName NVARCHAR(20),	LearnSubject NVARCHAR(20),	Score int,);INSERT INTO StudentScore(StudentID, FullName, LearnSubject, Score)VALUES (1,N'Châu Tinh Trì', N'Toán', 3),       (2,N'Châu Kiệt Luân', N'Toán', 3),       (3, N'Châu Nhuận Phát', N'Toán', 5),       (4,N'Ngôn Nhật Phi', N'Toán', 5),       (1,N'Châu Tinh Trì', N'Văn', 6),       (2,N'Châu Kiệt Luân', N'Văn', 6),       (3, N'Châu Nhuận Phát', N'Văn', 8),       (4,N'Ngôn Nhật Phi', N'Văn', 8),       (1,N'Châu Tinh Trì', 'Anh', 8),       (2,N'Châu Kiệt Luân', 'Anh', 10),       (3, N'Châu Nhuận Phát', 'Anh', 10),       (4,N'Ngôn Nhật Phi', 'Anh', 8);SELECT ID, StudentID, FullName, LearnSubject, ScoreFROM StudentScore