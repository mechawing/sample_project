import { ShelteredAnimal } from '../models/ShelteredAnimal';
import * as animalDao from '../daos/shelteredAnimal-dao';

export function getAnimalByID(shelterIDNumber: number): Promise<ShelteredAnimal> { // To look up an animal by its shelter ID
    return animalDao.getAnimalByID(shelterIDNumber);
}

export function getAllAnimals(): Promise<ShelteredAnimal[]> {
    return animalDao.getAllAnimals();
}

export function saveAnimal(animal: any): Promise<ShelteredAnimal> {

    const newAnimal = new ShelteredAnimal(
        undefined, animal.name,
        animal.species, animal.sex, animal.declawed, animal.fixed, new Date(animal.birthdate)
    );

    if(animal.name && animal.birthdate) {
        return animalDao.saveAnimal(newAnimal);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}