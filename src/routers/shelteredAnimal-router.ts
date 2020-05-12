import express from 'express';
import * as animalService from '../services/animal-service';

export const shelteredAnimalRouter = express.Router();

shelteredAnimalRouter.get('/:shelterIDNumber', (request, response, next) => {
    const shelterIDNumber = +request.params.id;
    animalService.getAnimalByID(shelterIDNumber).then(person => {
        if (!person) {
            response.sendStatus(404);
        } else {
            response.json(person);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

