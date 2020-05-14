import { Species } from '../models/Species';
import * as speciesDao from '../daos/species-dao';

export function getSpeciesByID(speciesID: number): Promise<Species> { // To look up an animal by its shelter ID
    return speciesDao.getSpeciesByID(speciesID);
}

export function getAllSpecies(): Promise<Species[]> {
    return speciesDao.getAllSpecies();
}