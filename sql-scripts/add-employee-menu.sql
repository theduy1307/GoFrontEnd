-- Insert Employee Menu
INSERT INTO Menus (Name, Icon, Url)
VALUES ('Employee', 'pi pi-user', 'employees');

-- Insert MenuRole for Employee menu
-- Assuming the inserted MenuId is 3 (adjust if needed based on your database)
INSERT INTO MenuRoles (MenuId, RoleId)
VALUES (3, 1);

-- Update Menu with id = 3, set ParentId to 1
UPDATE Menus
SET ParentId = 1
WHERE Id = 3;
