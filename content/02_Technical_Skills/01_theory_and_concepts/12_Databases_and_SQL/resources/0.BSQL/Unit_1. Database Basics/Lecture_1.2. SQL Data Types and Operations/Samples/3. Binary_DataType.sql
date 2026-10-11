-- Binary

DECLARE @BinaryVariable2 binary(2);

SET @BinaryVariable2 = 123456;
SET @BinaryVariable2 = @BinaryVariable2 + 1;

SELECT @BinaryVariable2

SELECT CAST( @BinaryVariable2 AS int);
GO