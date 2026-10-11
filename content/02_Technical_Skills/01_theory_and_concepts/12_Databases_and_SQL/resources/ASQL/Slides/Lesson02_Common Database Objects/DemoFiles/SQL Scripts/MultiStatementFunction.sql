CREATE FUNCTION dbo.fncSplit(
	@String		NVARCHAR (4000)
,	@Delimiter	NVARCHAR (10)
 )
RETURNS @ValueTable TABLE ([Value] NVARCHAR(4000))
BEGIN
	DECLARE @NextString nvarchar(4000)
	DECLARE @Pos int
	DECLARE @NextPos int
	DECLARE @CommaCheck nvarchar(1)
 
	--Initialize
	SET @NextString = ''
	SET @CommaCheck = RIGHT(@String,1) 
 
	--Check for trailing Comma, if not exists, INSERT
	--if (@CommaCheck <> @Delimiter )
	SET @String = @String + @Delimiter
 
	--Get position of first Comma
	SET @Pos = charindex(@Delimiter,@String)
	SET @NextPos = 1
 
	--Loop while there is still a comma in the String of levels
	WHILE (@pos <>  0)  
	BEGIN
		SET @NextString = SUBSTRING(@String,1,@Pos - 1)
 
		INSERT INTO @ValueTable ( [Value]) VALUES (@NextString)
 
		SET @String = SUBSTRING(@String,@pos +1,LEN(@String))
  
		SET @NextPos = @Pos
		SET @pos  = CHARINDEX(@Delimiter,@String)
	END
 
 RETURN
END

SELECT * FROM dbo.fncSplit('1,2,3,4,5',',')