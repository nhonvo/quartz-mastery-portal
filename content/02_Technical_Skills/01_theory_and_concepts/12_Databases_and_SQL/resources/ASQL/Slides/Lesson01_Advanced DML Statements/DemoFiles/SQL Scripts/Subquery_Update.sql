USE AdventureWorks;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ProductID IN
		   (SELECT ProductID
			FROM Purchasing.ProductVendor
			WHERE BusinessEntityID = 1520);

GO 
UPDATE Production.Product
SET ListPrice = ListPrice * 2
WHERE ProductID IN
    (SELECT ProductID
     FROM Purchasing.ProductVendor
     WHERE BusinessEntityID = 1520);
GO

