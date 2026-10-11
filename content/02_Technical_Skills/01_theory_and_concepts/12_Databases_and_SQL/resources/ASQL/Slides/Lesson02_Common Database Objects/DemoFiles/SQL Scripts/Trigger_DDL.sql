CREATE TRIGGER DDL_DatabaseTrigger
ON DATABASE
FOR drop_table, alter_table
AS
PRINT 'You have to disable DDL_DatabaseTrigger first'
ROLLBACK;