import { db } from './db';
import { EmployeeKeeper, Employee } from '../models/EmployeeKeeper';

export function getEmployeeByID(employeeID: number): Promise<EmployeeKeeper> {
    const sql = 'SELECT * FROM employees WHERE employeeID = $1';

    return db.query<Employee>(sql, [employeeID])
        .then(result => result.rows.map(row => EmployeeKeeper.from(row))[0]);
}