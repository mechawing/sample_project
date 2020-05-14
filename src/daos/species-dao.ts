import { db } from './db';
import { Species, SpeciesRow } from '../models/Species';

export function getSpeciesByID(speciesID: number): Promise<Species> {
    const sql = 'SELECT * FROM species WHERE speciesID = $1';

    return db.query<SpeciesRow>(sql, [speciesID])
        .then(result => result.rows.map(row => Species.from(row))[0]);
}

export function getAllSpecies(): Promise<Species[]> { // Get all species
    const sql = 'SELECT * FROM pecies';

    return db.query<SpeciesRow>(sql, []).then(result => {
        const rows: SpeciesRow[] = result.rows;

        console.log(rows);

        const species: Species[] = rows.map(row => Species.from(row));
        return species;
    });
}