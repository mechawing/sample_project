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

speciesRouter.get('', (request, response, next) => {
    speciesService.getAllSpecies().then(species => {
        response.set('content-type', 'application/json');
        response.json(species);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});


speciesRouter.post('', (request, response, next) => {
        const species = request.body;
        speciesService.saveSpecies(species)
            .then(newSpecies => {
                response.status(201);
                response.json(newSpecies);
                next();
            }).catch(err => {
                response.sendStatus(500);
                next();
            });
});

speciesRouter.patch('', (request, response, next) => {
    const species = request.body;
    speciesService.patchSpecies(species)
        .then(updatedSpecies => {
            if (updatedSpecies) {
                response.json(updatedSpecies);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});