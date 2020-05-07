import express from 'express';

export const shelteredAnimal = express.Router();

interface Animal { // Interface for an animal
    shelterIDNumber: number;
    name: string;
    sex: string;
};

const animalResidents: Animal[] = [ // The current animals in the shelter
    {
        shelterIDNumber: 1,
        name: 'Comet',
        sex: 'Male',
    },

    {
        shelterIDNumber: 2,
        name: 'Lee',
        sex: 'Male',
    },

    {
        shelterIDNumber: 3,
        name: 'Nova',
        sex: 'Female',
    }

];

shelteredAnimal.get('', (request, response, next) => { // Get function
    response.json(animalResidents);
    next();
});

