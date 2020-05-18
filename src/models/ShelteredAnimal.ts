export class ShelteredAnimal {
    shelterIDNumber: number;
    name: string;
    species: string;
    sex: string;
    fixed: boolean;
    declawed: boolean; // While this procedure is done on cats most often, technically it can also be peformed on other animals as well.
    birthdate: Date;

    static from(object: Animal): ShelteredAnimal {
        const animal = new ShelteredAnimal (
            object.shelterIDNumber, object.name, object.species, object.sex, object.fixed, object.declawed, new Date(object.birthdate)
        );
        return animal;
    }

    constructor(shelterIDNumber: number, name: string, species: string, sex: string, fixed: boolean, declawed: boolean, birthdate: Date) {
        this.shelterIDNumber = shelterIDNumber;
        this.name = name;
        this.species = species;
        this.sex = sex;
        this.fixed = fixed;
        this.declawed = declawed;
        this.birthdate = birthdate;
    }

};

export interface Animal { // Interface for an animal
    shelterIDNumber: number;
    name: string;
    species: string;
    sex: string;
    fixed: boolean;
    declawed: boolean; // While this procedure is done on cats most often, technically it can also be peformed on other animals as well.
    birthdate: Date;
};