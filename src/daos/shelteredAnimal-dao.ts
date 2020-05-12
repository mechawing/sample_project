import { db } from './db';
import { ShelteredAnimal, Animal } from '../models/ShelteredAnimal';

export function getAnimalByID(shelteredIDNumber: number): Promise<ShelteredAnimal> {
    const sql = 'SELECT * FROM animals WHERE shelteredIDNumber = $1';

    return db.query<Animal>(sql, [shelteredIDNumber])
        .then(result => result.rows.map(row => ShelteredAnimal.from(row))[0]);
}