import express from 'express';
import * as animalService from '../services/animal-service';

export const shelteredAnimalRouter = express.Router();

shelteredAnimalRouter.get('/:shelteredAnimalID', (request, response, next) => {
    const shelteredAnimalID = +request.params.id;
    animalService.getAnimalByID(shelteredAnimalID).then(person => {
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

