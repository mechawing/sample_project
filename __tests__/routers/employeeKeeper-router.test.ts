import express from 'express';
import bodyParser from 'body-parser';
import { employeeKeeperRouter } from '../../src/routers/employeeKeeper-router';
import * as employeeService from '../../src/services/employee-service';
import request from 'supertest';

jest.mock('../../src/services/employee-service');
const mockEmployeeService = employeeService as any;

const app = express();
app.use(bodyParser.json())
app.use('/employees', employeeKeeperRouter);

describe('GET /employees', () => {
    test('Returns normally under normal circumstances', async () => {
        mockEmployeeService.getAllEmployees.mockImplementation(async () => []);
        await request(app)
            .get('/employees')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockEmployeeService.getAllEmployees.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/employees')
            .expect(500);
    });
});

describe('POST /employees', () => {
    test('Successful creation should return 201 status', async () => {
        mockEmployeeService.saveEmployee.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        await request(app)
            .post('/employees')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockEmployeeService.saveEmployee.mockImplementation(async () => {throw new Error()});

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        await request(app)
            .post('/employees')
            .send(payload)
            .expect(500);
    });
});


describe('GET /employees/:employeeID', () => {
    test('Normal behavior Json with status 200', async () => {
        mockEmployeeService.getEmployeeByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/employees/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockEmployeeService.getEmployeeByID
            .mockImplementation(async () => (0));

        await request(app)
            .get('/employees/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockEmployeeService.getEmployeeByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/employees/99')
            .expect(500)
    })
})
