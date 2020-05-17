import { db } from './db';
import { Species, SpeciesRow } from '../models/Species';

export function getSpeciesByID(speciesID: number): Promise<Species> {
    const sql = 'SELECT * FROM species WHERE speciesID = $1';

    return db.query<SpeciesRow>(sql, [speciesID])
        .then(result => result.rows.map(row => Species.from(row))[0]);
}

export function getAllSpecies(): Promise<Species[]> { // Get all species
    const sql = 'SELECT * FROM species';

    return db.query<SpeciesRow>(sql, []).then(result => {
        const rows: SpeciesRow[] = result.rows;

        console.log(rows);

        const species: Species[] = rows.map(row => Species.from(row));
        return species;
    });
}

export function saveSpecies(species: Species): Promise<Species> {
    const sql = `INSERT INTO species (name) \
VALUES ($1) RETURNING *`;

    return db.query<Species>(sql, [
        species.name
    ]).then(result => result.rows.map(row => Species.from(row))[0]);
}

export function patchSpecies(species: Species): Promise<Species> {

    const sql = `UPDATE species SET name = COALESCE($1, first_name), \
WHERE speciesID = $2 RETURNING *`;

    const params = [species.name, species.speciesID];

    return db.query<SpeciesRow>(sql, params)
        .then(result => result.rows.map(row => Species.from(row))[0]);
}
