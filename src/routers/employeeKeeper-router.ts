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