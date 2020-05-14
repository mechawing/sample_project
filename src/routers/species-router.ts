import express from 'express';
import * as speciesService from '../services/species-service';

export const speciesRouter = express.Router();

speciesRouter.get('/:speciesID', (request, response, next) => {
    const speciesID = +request.params.id;
    speciesService.getSpeciesByID(speciesID).then(species => {
        if (!species) {
            response.sendStatus(404);
        } else {
            response.json(species);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});