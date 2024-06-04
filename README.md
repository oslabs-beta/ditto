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
- dbName: // we might be able to get rid of this because its only used in SidePanel
- dbId:
- description:
- token: where token gets stashed
- migrationVersions:

# States

- projectName: refers to the input field we put in for project name when we create.

# ProjectPanel.tsx

- handleDelete: if project is chosen and pop up bar isn't already open, we will open it with by setting IsOpen to false, else if project is chosen and pop up bar is open, we will close it by setting isOpen to false.

# SidePanel.tsx

- handleButtonClick: has two features, if you press the database icon it will show the input fields to add database name and connection string. The other feauture is if you press yes after pressing the trash can popper, it will delete whatever database your state is on.
