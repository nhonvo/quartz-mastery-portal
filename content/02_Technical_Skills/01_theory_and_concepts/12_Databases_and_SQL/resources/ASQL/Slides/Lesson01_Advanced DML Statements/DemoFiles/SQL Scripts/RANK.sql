USE AdventureWorks;
GO
SELECT i.ProductID, p.Name, i.LocationID, i.Quantity
    ,RANK() OVER (ORDER BY i.Quantity) AS 'RANK'
FROM Production.ProductInventory i 
    INNER JOIN Production.Product p 
        ON i.ProductID = p.ProductID
ORDER BY Quantity;
GO