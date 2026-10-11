USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE4_GROUPBY_DIFF
GO
CREATE DATABASE LECTURE4_GROUPBY_DIFF
GO
USE LECTURE4_GROUPBY_DIFF
GO
CREATE TABLE HocSinh(	HocSinhID int IDENTITY(1,1) primary key,	HoTen nvarchar(20)	NOT NULL,	DiemMonToan int,);INSERT INTO HocSinh(HoTen, DiemMonToan)VALUES ('Huy', 90), (N'Việt', 100), ('Huy', 50); SELECT * FROM HocSinh; -- tính điểm trung bình group by HoTenSELECT HoTen, AVG(DiemMonToan) 'Group by HoTen'FROM HocSinhGROUP BY HoTen; -- tính điểm trung bình group by HocSinhID và HoTenSELECT HoTen, AVG(DiemMonToan) 'Group by HocSinhID, HoTen'FROM HocSinhGROUP BY HocSinhID, HoTen