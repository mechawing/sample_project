import express from 'express';
import * as animalService from '../services/animal-service';

export const shelteredAnimalRouter = express.Router();

shelteredAnimalRouter.get('/:shelterIDNumber', (request, response, next) => { // Get animal by ID
    const shelterIDNumber = +request.params.shelterIDNumber;
    animalService.getAnimalByID(shelterIDNumber).then(animal => {
        if (!animal) {
            response.sendStatus(404);
        } else {
            response.json(animal);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

shelteredAnimalRouter.get('', (request, response, next) => {
    animalService.getAllAnimals().then(animals => {
        response.set('content-type', 'application/json');
        response.json(animals);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

shelteredAnimalRouter.post('', (request, response, next) => {
    const animal = request.body;
    animalService.saveAnimal(animal)
        .then(newAnimal => {
            response.status(201);
            response.json(newAnimal);
            next();
        }).catch(err => {
            response.sendStatus(500);
            next();
        });
});

shelteredAnimalRouter.patch('', (request, response, next) => {
    const animal = request.body;
    animalService.patchAnimal(animal)
        .then(updatedAnimal => {
            if (updatedAnimal) {
                response.json(updatedAnimal);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});