USE Fsoft_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
RIGHT JOIN dbo.Table2 t2 ON t1.ID = t2.ID
WHERE t1.ID IS NULL