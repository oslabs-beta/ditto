import { Request, Response, NextFunction } from 'express';

/* 
1. user clicks on add migration and that creates a migration log and stores migration_id in databases table

2. user adds script and that stores the script in the scripts table and in script_id col in migration_logs table 

3. do we still need user_db table?
*/
