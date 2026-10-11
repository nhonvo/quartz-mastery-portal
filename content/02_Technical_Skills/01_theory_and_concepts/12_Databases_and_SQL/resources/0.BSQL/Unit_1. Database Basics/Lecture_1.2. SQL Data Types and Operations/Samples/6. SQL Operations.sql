USE Fsoft_Training
GO
-- Usage Exists operator
IF EXISTS (SELECT * FROM sys.tables WHERE name LIKE 'Trainer')
	DROP TABLE Trainer
GO

CREATE TABLE Trainer(
	Id			int PRIMARY KEY IDENTITY
,	TrnName		varchar(50)
,	TrnAge		tinyint
,	TrnAddress	varchar(100)
,	TrnSalary	float
)

GO
INSERT INTO dbo.Trainer(TrnName, TrnAge, TrnAddress, TrnSalary)
VALUES ('Ramesh', 32, 'Ahmedabad', 2000.00),
		('Khilan', 28, 'Delhi', 1500.00),
		('Kaushik', 26, 'Kota', 1600.00),
		('Chaitali',35,'Mumbai', 2800.00),
		('Hardik',27,'Bhopal', 3000.00),
		('Komal',36,'MP',5000.00),
		('Muffy',28,'Indore', 6000.00)

GO
SELECT * FROM	dbo.Trainer

GO
-- usage of SQL Comparison Operators
SELECT * FROM dbo.Trainer trn 
WHERE trn.TrnAge >= 30 AND trn.TrnSalary >= 2500

GO
SELECT * FROM dbo.Trainer trn 
WHERE trn.TrnAge >= 30 OR trn.TrnSalary >= 2500

GO
SELECT * FROM dbo.Trainer trn
WHERE trn.TrnAge IS NOT NULL

GO
SELECT * FROM dbo.Trainer trn 
WHERE trn.TrnName LIKE 'Ko%'

GO
SELECT * FROM dbo.Trainer trn 
WHERE trn.TrnAge IN ( 25, 27 )

GO

SELECT * FROM dbo.Trainer trn 
WHERE trn.TrnAge BETWEEN 25 AND 27

GO
IF EXISTS (SELECT TrnAge FROM dbo.Trainer WHERE TrnSalary >= 5000)
	PRINT 'YES'
ELSE
	PRINT 'NO'

GO

SELECT * FROM dbo.Trainer 
WHERE TrnAge <= ALL 
	(
		SELECT TrnAge FROM dbo.Trainer 
		WHERE TrnSalary >=1000 AND TrnSalary<=2000  -- BETWEEN 1000 AND 2000
	)
GO

SELECT * FROM dbo.Trainer 
WHERE TrnAge > ANY 
	(
		SELECT TrnAge FROM dbo.Trainer 
		WHERE TrnSalary BETWEEN 1000 AND 2000
	)


