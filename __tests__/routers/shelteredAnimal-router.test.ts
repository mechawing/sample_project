import express from 'express';
import bodyParser from 'body-parser';
import { shelteredAnimalRouter } from '../../src/routers/shelteredAnimal-router';
import * as animalService from '../../src/services/animal-service';
import request from 'supertest';

jest.mock('../../src/services/shelteredAnimal-service');
const mockAnimalService = animalService as any;

const app = express();
app.use(bodyParser.json())
app.use('/animals', shelteredAnimalRouter);

describe('GET /animals', () => {
    test('Returns normally under normal circumstances', async () => {
        mockAnimalService.getAllAnimals.mockImplementation(async () => []);
        await request(app)
            .get('/animals')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockAnimalService.getAllAnimals.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/animals')
            .expect(500);
    });
});

describe('POST /animals', () => {
    test('Successful creation should return 201 status', async () => {
        mockAnimalService.saveAnimal.mockImplementation(async () => ({}));
        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/animals')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockAnimalService.saveAnimal.mockImplementation(async () => {throw new Error()});

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/animals')
            .send(payload)
            .expect(500);
    });
});


describe('GET /animals/:shelterIDNumber', () => {
    test('Normal behavior Json with status 200', async () => {
        mockAnimalService.getAnimalByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/animals/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockAnimalService.getAnimalByID
            .mockImplementation(async () => (0));

        await request(app)
            .get('/animals/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockAnimalService.getAnimalByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/animals/99')
            .expect(500)
    })
})
