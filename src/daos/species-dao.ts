import { db } from './db';
import { Species, SpeciesRow } from '../models/Species';

export function getSpeciesByID(speciesID: number): Promise<Species> {
    const sql = 'SELECT * FROM species WHERE speciesID = $1';

    return db.query<SpeciesRow>(sql, [speciesID])
        .then(result => result.rows.map(row => Species.from(row))[0]);
}