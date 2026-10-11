USE MASTER
GO 
DROP DATABASE IF EXISTS LibraryDatabase
GO 
CREATE DATABASE LibraryDatabase
GO 
USE LibraryDatabase
GO 

CREATE TABLE Authors (
  ID int PRIMARY KEY IDENTITY(1,1),
  FirstName varchar(50),
  LastName varchar(50),
  DateOfBirth date
);

CREATE TABLE Books (
  ID int PRIMARY KEY IDENTITY(1,1),
  Title varchar(100),
  AuthorID int FOREIGN KEY REFERENCES Authors(ID),
  PublicationDate date,
  ISBN varchar(20),
  AvailableCopies int
);

CREATE TABLE Members (
  ID int PRIMARY KEY IDENTITY(1,1),
  FirstName varchar(50),
  LastName varchar(50),
  DateOfBirth date,
  Email varchar(100)
);

CREATE TABLE Loans (
  ID int PRIMARY KEY IDENTITY(1,1),
  MemberID int FOREIGN KEY REFERENCES Members(ID),
  BookID int FOREIGN KEY REFERENCES Books(ID),
  LoanDate date,
  DueDate date
);