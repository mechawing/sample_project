export class EmployeeKeeper {
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;

    static from(object: Employee): EmployeeKeeper {
        const employee = new EmployeeKeeper (
            object.employeeID, object.firstName, object.lastName, object.position
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
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;
};