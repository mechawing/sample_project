export class EmployeeKeeper {
    name: string;
 
    static from(object: Employee): EmployeeKeeper {
        const employee = new EmployeeKeeper (
            object.name
        );
        return employee;
    }

    constructor(name: string) {
        this.name = name;
    }

};

export interface Employee { // Interface for an animal
    name: string;
};