USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE7_SQL_injection
GO
CREATE DATABASE LECTURE7_SQL_injection
GO
USE LECTURE7_SQL_injection
GO

CREATE TABLE Users (
  ID INT PRIMARY KEY IDENTITY(1, 1),
  Username VARCHAR(50) NOT NULL,
  Password VARCHAR(50) NOT NULL
);

INSERT INTO users (username, password) VALUES ('USER_1', '123');

-- LOGIN TO THE SYSTEM
SELECT * 
FROM Users
WHERE Username = 'USER_1' AND Password = '123'

-- MODIFY THE QUERY WITH Username = 'USER_1' OR 1=1 --' AND Password = '456'

SELECT * 
FROM Users
WHERE Username = 'USER_1' OR 1=1 --' AND Password = '456'

-- using parameter to improve the security

DECLARE @username NVARCHAR(50) = 'USER_1';
DECLARE @password NVARCHAR(50) = '123';
SELECT * 
FROM users 
WHERE username = @username AND password = @password;
