export class Species {
    speciesID: number;
    name: string;

    static from(object: SpeciesRow): Species {
        const speciesRow = new Species ( object.species_id, object.name);
        return speciesRow;
    }

    constructor(speciesID: number, name: string) {
        this.speciesID = speciesID;
        this.name = name;
    }

};

export interface SpeciesRow { // Interface for an animal
    species_id: number;
    name: string;
};