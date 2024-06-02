# Our Store

- user: the user that is logged in.
- projects: used to map options for Choose Projects drop down bar.
- databases: in SidePanel.tsx, databases gets set to an array of objects, where the object contains properties: connection_string, db_name, db_id. These properties are used to map options for the Choose Database drop down bar.
- selectedProject: this is the project selected in the drop down bar for Choose Project.
- selecteDatabase: this is the database selected in the drop down bar for Choose Database.
- selectedTable: this is the table selected in the drop down bar for Choose Table.
- selectedAction:
- selectedScript:
- setShowInput:
- connectionString:
- dbName:
- dbId:
- description:
- token: where token gets stashed
- migrationVersions:

# ProjectPanel.tsx

- handleDelete: if project is chosen and pop up bar isn't already open, we will open it with by setting IsOpen to false, else if project is chosen and pop up bar is open, we will close it by setting isOpen to false.

# SidePanel.tsx

- short circuiting in javascript (https://www.freecodecamp.org/news/short-circuiting-in-javascript/)
