USE master
GO
CREATE DATABASE Assignment1_Opt1_Question1
go
use Assignment1_Opt1_Question1
go
create  table Khach_Hang (
    Ma_KH INT primary key, 
    Ten_KH NVARCHAR(30), 
    Phone_No VARCHAR(10), 
    Ghi_Chu NVARCHAR(MAX)
)
create  table San_Pham (
    Ma_SP INT primary key, 
    Ten_SP NVARCHAR(30), 
    Don_Gia MONEY, 
    Ma_KH  INT,
    FOREIGN KEY (Ma_KH) REFERENCES Khach_Hang(Ma_KH)

)
create  table Don_Hang (
    Ma_DH INT primary key, 
    Ngay_DH VARCHAR(10), 
    Ma_SP  INT, 
    So_Luong INT,
    FOREIGN KEY (Ma_SP) REFERENCES San_Pham(Ma_SP)
)
go
INSERT INTO Khach_Hang VALUES (1, N'Nhon', '0905726748', 'nothing');

GO
INSERT INTO Khach_Hang (Ma_KH, Ten_KH, Phone_No, Ghi_Chu) 
VALUES (4, 'Nguyen Van A', '0987654321', 'Vip customer');

INSERT INTO Khach_Hang (Ma_KH, Ten_KH, Phone_No, Ghi_Chu) 
VALUES (2, 'Le Thi B', '0912345678', 'Regular customer');

INSERT INTO Khach_Hang (Ma_KH, Ten_KH, Phone_No, Ghi_Chu) 
VALUES (3, 'Tran Van C', '0965432190', 'New customer');

GO
INSERT INTO San_Pham (Ma_SP, Ten_SP, Don_Gia, Ma_KH) 
VALUES (1, 'Samsung Galaxy', 10000000, 1);

INSERT INTO San_Pham (Ma_SP, Ten_SP, Don_Gia, Ma_KH) 
VALUES (2, 'iPhone 12', 15000000, 2);

INSERT INTO San_Pham (Ma_SP, Ten_SP, Don_Gia, Ma_KH) 
VALUES (3, 'Oppo A74', 7000000, 3);


GO
INSERT INTO Don_Hang (Ma_DH, Ngay_DH, Ma_SP, So_Luong) 
VALUES (1, '2022-01-01', 1, 2);

INSERT INTO Don_Hang (Ma_DH, Ngay_DH, Ma_SP, So_Luong) 
VALUES (2, '2022-02-15', 2, 1);

INSERT INTO Don_Hang (Ma_DH, Ngay_DH, Ma_SP, So_Luong) 
VALUES (3, '2022-03-22', 3, 3);

GO
SELECT * FROM dbo.Khach_Hang
SELECT * FROM dbo.San_Pham
SELECT * FROM dbo.Don_Hang
go
-- b
CREATE VIEW Don_Hang_View AS
SELECT *
FROM dbo.Khach_Hang k JOIN dbo.San_Pham s on K.Ma_KH = s.Ma_KH
                JOIN dbo.Don_Hang d on d.Ma_SP = s.Ma_SP
go
SELECT  * FROM Don_Hang_View