import express from 'express';
import bodyParser from 'body-parser';
import { speciesRouter } from '../../src/routers/species-router';
import * as speciesService from '../../src/services/species-service';
import request from 'supertest';

jest.mock('../../src/services/species-service');
const mockSpeciesService = speciesService as any;

const app = express();
app.use(bodyParser.json())
app.use('/species', speciesRouter);

describe('GET /species', () => {
    test('Returns normally under normal circumstances', async () => {
        mockSpeciesService.getAllSpecies.mockImplementation(async () => []);
        await request(app)
            .get('/species')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockSpeciesService.getAllSpecies.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/species')
            .expect(500);
    });
});

describe('GET /species/:speciesID', () => {
    test('Normal behavior Json with status 200', async () => {
        mockSpeciesService.getSpeciesByID.mockImplementation(async () => ({}));
        await request(app)
        .get('/species/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockSpeciesService.getSpeciesByID.mockImplementation(async () => (0))
        await request(app)
        .get('/species/adasfasa')
        .expect(404);
        // no need for expect for content type
    });

    test('500 internal server error', async() => {
        mockSpeciesService.getSpeciesByID.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/species/')
        .expect(500)
    });
})

describe('POST /species', () => {
    test('Successful creation should return 201 status', async () => {
        mockSpeciesService.saveSpecies.mockImplementation(async () => ({}));
        const payload = {
            name: 'cat'
        };

        await request(app)
            .post('/species')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockSpeciesService.saveSpecies.mockImplementation(async () => {throw new Error()});

        const payload = {
            speciesID: 2,
            name: 'cat'
        };

        await request(app)
            .post('/species')
            .send(payload)
            .expect(500);
    });
});


describe('GET /species/:speciesID', () => {
    test('Normal behavior Json with status 200', async () => {
        mockSpeciesService.getSpeciesByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/species/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockSpeciesService.getSpeciesByID
            .mockImplementation(async () => (0));

        await request(app)
            .get('/species/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockSpeciesService.getSpeciesByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/species/99')
            .expect(500)
    })
})
