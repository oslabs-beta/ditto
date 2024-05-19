import { Request, Response, NextFunction } from 'express';

/*
1. user puts in description, version, and script (req.body)
2. create a migration log when they click on 'save'
3. generate and store checksum based on script
4. when user runs migrations, only migrations with status pending will be run
5. when a script is successful, update the status of corresponding migration log
6. option to delete and edit any migrations that don't have status of success
7. if a migration fails and user changes the script, update status back to pending
8. user will not be able to edit any migrations that have status of success
*/
