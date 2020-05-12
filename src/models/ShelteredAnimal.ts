export class ShelteredAnimal {
    shelterIDNumber: number;
    name: string;
    sex: string;
    fixed: boolean;
    declawed: boolean; // While this procedure is done on cats most often, technically it can also be peformed on other animals as well.

    static from(object: Animal): ShelteredAnimal {
        const animal = new ShelteredAnimal (
            object.shelterIDNumber, object.name, object.sex, object.fixed, object.declawed
        );
        return animal;
    }

    constructor(shelterIDNumber: number, name: string, sex: string, fixed: boolean, declawed: boolean) {
        this.shelterIDNumber = shelterIDNumber;
        this.name = name;
        this.sex = sex;
        this.fixed = fixed;
        this.declawed = declawed;
    }

};

export interface Animal { // Interface for an animal
    shelterIDNumber: number;
    name: string;
    sex: string;
    fixed: boolean;
    declawed: boolean; // While this procedure is done on cats most often, technically it can also be peformed on other animals as well.
};