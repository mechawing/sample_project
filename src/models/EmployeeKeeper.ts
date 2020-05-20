export class EmployeeKeeper {
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;

    static from(object: Employee): EmployeeKeeper {
        const employee = new EmployeeKeeper (
            object.employee_id, object.first_name, object.last_name, object.position
        );
        return employee;
    }

    constructor(employeeID: number, firstName: string, lastName: string, position: string) {
        this.employeeID = employeeID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
    }

};

export interface Employee { // Interface for an animal
    employee_id: number;
    first_name: string;
    last_name: string;
    position: string;
};