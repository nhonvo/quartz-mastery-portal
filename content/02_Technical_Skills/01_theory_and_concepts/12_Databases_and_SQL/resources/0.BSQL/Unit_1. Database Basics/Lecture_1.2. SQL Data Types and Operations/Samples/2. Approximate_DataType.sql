-- Approximate numberic
-- float(n) n<=24 4bytes, (53) n>24 8bytes. real=float(24)

DECLARE @Float1 float, @Float2 float, @Float3 float, @Float4 float;
SET @Float1 = 54;
SET @Float2 = 3.1;
SET @Float3 = 0 + @Float1 + @Float2;
SELECT @Float3 - @Float1 - @Float2 AS "Should be 0";