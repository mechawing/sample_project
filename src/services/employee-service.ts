import { EmployeeKeeper } from '../models/EmployeeKeeper';
import * as employeeDao from '../daos/employee-dao';

export function getEmployeeByID(employeeID: number): Promise<EmployeeKeeper> { // To look up an animal by its shelter ID
    return employeeDao.getEmployeeByID(employeeID);
}