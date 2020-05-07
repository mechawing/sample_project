import express from 'express';

export const shelteredAnimal = express.Router();

interface Animal { // Interface for an animal
    shelterIDNumber: number;
    name: string;
    sex: string;
    declawed: boolean; // While this procedure is done on cats most often, technically it can also be peformed on other animals as well.
};

const animalResidents: Animal[] = [ // The current animals in the shelter
    {
        shelterIDNumber: 1,
        name: 'Comet',
        sex: 'Male',
        declawed: false,
    },

    {
        shelterIDNumber: 2,
        name: 'Lee',
        sex: 'Male',
        declawed: false,
    },

    {
        shelterIDNumber: 3,
        name: 'Nova',
        sex: 'Female',
        declawed: false,
    }

];

shelteredAnimal.get('', (request, response, next) => { // Get function
    response.json(animalResidents);
    next();
});

