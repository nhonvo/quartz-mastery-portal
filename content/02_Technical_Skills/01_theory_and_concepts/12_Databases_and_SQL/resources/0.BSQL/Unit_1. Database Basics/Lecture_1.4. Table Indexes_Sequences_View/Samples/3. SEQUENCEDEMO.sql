USE LEC3DEMO
GO
CREATE TABLE dbo.Categories (
  CategoryID        INT            PRIMARY KEY,
  CategoryName      VARCHAR(255)   NOT NULL      UNIQUE
);
GO

CREATE SEQUENCE dbo.SEQID
	START WITH 1
	INCREMENT BY 5

GO
INSERT INTO dbo.Categories
VALUES	(NEXT VALUE FOR dbo.SEQID, 'Guitars'),
		(NEXT VALUE FOR dbo.SEQID, 'Basses'),
		(NEXT VALUE FOR dbo.SEQID, 'Drums'), 
		(NEXT VALUE FOR dbo.SEQID, 'Keyboards');

GO
SELECT * FROM DBO.Categories