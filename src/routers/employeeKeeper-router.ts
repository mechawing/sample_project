import express from 'express';
import * as employeeService from '../services/employee-service';

export const employeeKeeperRouter = express.Router();

employeeKeeperRouter.get('/:employeeID', (request, response, next) => { // Get Employees by ID
    const employeeID = +request.params.id;
    employeeService.getEmployeeByID(employeeID).then(employee => {
        if (!employee) {
            response.sendStatus(404);
        } else {
            response.json(employee);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

employeeKeeperRouter.get('', (request, response, next) => {
    employeeService.getAllEmployees().then(employees => {
        response.set('content-type', 'application/json');
        response.json(employees);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

employeeKeeperRouter.post('', (request, response, next) => {
        const employee = request.body;
        employeeService.saveEmployee(employee)
            .then(newEmployee => {
                response.status(201);
                response.json(newEmployee);
                next();
            }).catch(err => {
                response.sendStatus(500);
                next();
            });
});

employeeKeeperRouter.patch('', (request, response, next) => {
    const employee = request.body;
    employeeService.patchEmployee(employee)
        .then(updatedEmployee => {
            if (updatedEmployee) {
                response.json(updatedEmployee);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});