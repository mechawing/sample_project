import { ShelteredAnimal } from '../models/shelteredAnimal';
import * as animalDao from '../daos/shelteredAnimal-dao';

export function getAnimalByID(id: number): Promise<ShelteredAnimal> { // To look up an animal by its shelter ID
    return animalDao.getAnimalByID(id);
}