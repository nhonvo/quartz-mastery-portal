USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE5_JOIN_DEMO
GO
CREATE DATABASE LECTURE5_JOIN_DEMO
GO
USE LECTURE5_JOIN_DEMO
GO
CREATE TABLE Customer(	CustomerID int PRIMARY KEY IDENTITY(1, 1),	FullName nvarchar(20) NOT NULL);CREATE TABLE DeliveryAddress(	ID int PRIMARY KEY IDENTITY(1, 1),	FullAddress nvarchar(20) NOT NULL); CREATE TABLE CustomerOrder(	OrderID int PRIMARY KEY IDENTITY(1, 1),	CustomerID int,	FoodName nvarchar(20) NOT NULL,	DeliveryAddressID int);INSERT INTO Customer(FullName)VALUES(N'Châu Tinh Trì'),(N'Châu Nhuận Phát'),(N'Lý Tiểu Long'),(N'Thành Long');INSERT INTO DeliveryAddress(FullAddress)VALUES(N'TP. HCM'),(N'TP. HA NOI') INSERT INTO CustomerOrder(CustomerID, FoodName, DeliveryAddressID)VALUES(1, N'Heo Quay', 1),(1, N'Gà Luộc', 1),(3, N'Bò Lá Lốt', 2),(100, N'Dê Nướng', 2);