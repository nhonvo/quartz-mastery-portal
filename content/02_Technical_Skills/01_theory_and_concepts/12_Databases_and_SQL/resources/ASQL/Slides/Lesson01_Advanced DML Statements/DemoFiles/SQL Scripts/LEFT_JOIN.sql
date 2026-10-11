/* LEFT JOIN */
USE AdventureWorks;
GO
SELECT p.Name, pr.ProductReviewID
FROM Production.Product p
LEFT OUTER JOIN Production.ProductReview pr
ON p.ProductID = pr.ProductID

SELECT *
FROM Production.Product

SELECT *
FROM Production.ProductReview


USE Fsoft_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
LEFT JOIN dbo.Table2 t2 ON t1.ID = t2.ID
GO