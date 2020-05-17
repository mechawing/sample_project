import { Species } from '../models/Species';
import * as speciesDao from '../daos/species-dao';

export function getSpeciesByID(speciesID: number): Promise<Species> { // To look up an animal by its shelter ID
    return speciesDao.getSpeciesByID(speciesID);
}

export function getAllSpecies(): Promise<Species[]> {
    return speciesDao.getAllSpecies();
}

export function saveSpecies(species: any): Promise<Species> {

    const newSpecies = new Species(
        undefined, species.name
    );

    if(species.name) {
        return speciesDao.saveSpecies(newSpecies);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchSpecies(input: any): Promise<Species> {

    const species = new Species(
        input.speciesID, input.name
    );

    if (!species.speciesID) {
        throw new Error('400');
    }

    return speciesDao.patchSpecies(species);
}