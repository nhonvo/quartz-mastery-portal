-- Date and Time
SELECT getdate()
DECLARE @d date
SET @d = getdate()
SELECT @d

GO

DECLARE @t time
SET @t = getdate()
SELECT @t

GO
-- DateTime and DateTime2
DECLARE @d1 datetime   = '2/25/2013 11:59:59.997'
DECLARE @d2 datetime2  = '2/25/2013 11:59:59.999'
SELECT @d1 as 'DateTime', @d2 'DateTime2'

GO
-- DateTimeOffSET
SELECT cast(getdate() as DateTimeOffSET)
