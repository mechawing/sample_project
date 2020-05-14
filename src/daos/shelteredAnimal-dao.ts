import { db } from './db';
import { ShelteredAnimal, Animal } from '../models/ShelteredAnimal';

export function getAnimalByID(shelterIDNumber: number): Promise<ShelteredAnimal> { // Get an animal by its ID
    const sql = 'SELECT * FROM animals WHERE shelteredIDNumber = $1';

    return db.query<Animal>(sql, [shelterIDNumber])
        .then(result => result.rows.map(row => ShelteredAnimal.from(row))[0]);
}

export function getAllAnimals(): Promise<ShelteredAnimal[]> { // Get all animals
    const sql = 'SELECT * FROM animals';

    return db.query<Animal>(sql, []).then(result => {
        const rows: Animal[] = result.rows;

        console.log(rows);

        const animals: ShelteredAnimal[] = rows.map(row => ShelteredAnimal.from(row));
        return animals;
    });
}


export async function animalExists(shelterIDNumber: number): Promise<boolean> { // Chekcs if animal exists in the table.
    const sql = `SELECT EXISTS(SELECT shelterIDNumber FROM animals WHERE shelterIDNumber = $1);`;
    const result = await db.query<Exists>(sql, [shelterIDNumber]);
    return result.rows[0].exists;
}

export function saveAnimal(animal: ShelteredAnimal): Promise<ShelteredAnimal> {
    const sql = `INSERT INTO animals (shelterIDNumber, name, species, sex, fixed, declawed, birthdate) \
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    return db.query<Animal>(sql, [
        animal.shelterIDNumber,
        animal.name,
        animal.species,
        animal.sex,
        animal.fixed,
        animal.declawed,
        animal.birthdate.toISOString()
    ]).then(result => result.rows.map(row => ShelteredAnimal.from(row))[0]);
}


interface Exists {
    exists: boolean;
}