export class EmployeeKeeper {
    employeeID: number;
    name: string;
    position: string;

    static from(object: Employee): EmployeeKeeper {
        const employee = new EmployeeKeeper (
            object.employeeID, object.name, object.position
        );
        return employee;
    }

    constructor(employeeID: number, name: string, position: string) {
        this.employeeID = employeeID;
        this.name = name;
        this.position = position;
    }

};

export interface Employee { // Interface for an animal
    employeeID: number;
    name: string;
    position: string;
};