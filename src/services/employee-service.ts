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
        return employeeDao.saveEmployee(newEmployee);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchEmployee(input: any): Promise<EmployeeKeeper> {

    const employee = new EmployeeKeeper(
        input.employeeID, input.firstName,
        input.lastName, input.position
    );

    if (!employee.employeeID) {
        throw new Error('400');
    }

    return employeeDao.patchEmployee(employee);
}