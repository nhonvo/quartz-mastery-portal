USE AdventureWorks;
GO
SELECT i.ProductID, p.Name, i.LocationID, i.Quantity, 
    DENSE_RANK() OVER (ORDER BY i.Quantity) AS DENSE_RANK
FROM Production.ProductInventory i 
    INNER JOIN Production.Product p 
        ON i.ProductID = p.ProductID
ORDER BY Quantity;
GO