BEGIN TRY
    -- Generate divide-by-zero error.
    SELECT 1/0;
END TRY
BEGIN CATCH
    -- Execute error retrieval routine.
    SELECT
		ERROR_NUMBER() AS ErrorNumber
    ,	ERROR_SEVERITY() AS ErrorSeverity
    ,	ERROR_STATE() AS ErrorState
    ,	ERROR_PROCEDURE() AS ErrorProcedure
    ,	ERROR_LINE() AS ErrorLine
    ,	ERROR_MESSAGE() AS ErrorMessage;
END CATCH; 