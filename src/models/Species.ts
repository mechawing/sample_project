export class Species {
    speciesID: number;
    name: string;

    static from(object: SpeciesRow): Species {
        const species = new Species (
            object.speciesID, object.name,
        );
        return species;
    }

    constructor(speciesID: number, name: string) {
        this.name = name;
        this.speciesID = speciesID;
    }

};

export interface SpeciesRow { // Interface for an animal
    speciesID: number;
    name: string;
};