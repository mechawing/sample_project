import { EmployeeKeeper } from '../models/EmployeeKeeper';
import * as employeeDao from '../daos/employee-dao';

export function getEmployeeByID(employeeID: number): Promise<EmployeeKeeper> { // To look up an animal by its shelter ID
    return employeeDao.getEmployeeByID(employeeID);
}

export function getAllEmployees(): Promise<EmployeeKeeper[]> {
    return employeeDao.getAllEmployees();
}

export function saveEmployee(employee: any): Promise<EmployeeKeeper> {

    const newEmployee = new EmployeeKeeper(
        undefined, employee.firstName,
        employee.lastName, employee.position
    );


    if(employee.firstName && employee.lastName && employee.position) {
        // Data is valid - Continue submitting to DAO
        return employeeDao.saveEmployee(newEmployee);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        return new Promise((resolve, reject) => reject(422));
    }
}