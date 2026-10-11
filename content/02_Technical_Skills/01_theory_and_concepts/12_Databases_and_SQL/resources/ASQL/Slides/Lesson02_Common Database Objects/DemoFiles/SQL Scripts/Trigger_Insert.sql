USE AdventureWorks;
GO

CREATE TRIGGER trgAfterInsert ON [dbo].[Employee] 
FOR INSERT
AS
	DECLARE @empid int;
	DECLARE @empname varchar(100);
	DECLARE @empsal decimal(10,2);
	DECLARE @audit_action varchar(100);

	SELECT @empid=i.Emp_ID from inserted i;	
	SELECT @empname=i.Emp_Name from inserted i;	
	SELECT @empsal=i.Emp_Sal from inserted i;	
	SET @audit_action='Inserted Record -- After Insert Trigger.';

	INSERT INTo Employee_Audit(Emp_ID,Emp_Name,Emp_Sal,Audit_Action,Audit_Timestamp) 
	VALUES(@empid,@empname,@empsal,@audit_action,getdate());

	PRINT 'AFTER INSERT trigger fired.'
GO

--INSERT INTO Employee_Test VALUES('Chris',1500);