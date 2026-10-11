USE AdventureWorks;
GO
SELECT Name
FROM Production.Product
WHERE ProductSubcategoryID NOT IN
    (SELECT ProductSubcategoryID
     FROM Production.ProductSubcategory
     WHERE Name = 'Mountain Bikes' 
        OR Name = 'Road Bikes'
        OR Name = 'Touring Bikes')