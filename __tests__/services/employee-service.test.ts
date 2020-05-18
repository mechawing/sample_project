import * as employeeService from '../../src/services/employee-service';
import * as employeeDao from '../../src/daos/employee-dao';
import { EmployeeKeeper } from '../../src/models/EmployeeKeeper';

jest.mock('../../src/daos/employee-dao');

const mockEmployeeDao = employeeDao as any;

describe('saveEmployee', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveEmployee.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            employeeID: 1,
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        try {
            await employeeService.saveEmployee(payload);
            fail('employeeService.saveEmployee did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });


    test('422 returned if no lastName provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveEmployee.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            position: 'Dog Keeper'
        };

        try {
            await employeeService.saveEmployee(payload);
            fail('employeeService.saveEmployee did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to EmployeeKeeper object', async () => {
        mockEmployeeDao.saveEmployee.mockImplementation(o => o);

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        const result = await employeeService.saveEmployee(payload);

        expect(payload).not.toBeInstanceOf(EmployeeKeeper);
        expect(result).toBeInstanceOf(EmployeeKeeper);
    });

    test('ID value of input is replaced in output', async () => {
        mockEmployeeDao.saveEmployee.mockImplementation(o => o);

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };;

        const result = await employeeService.saveEmployee(payload);

        expect(result.employeeID).not.toBe(payload.employeeID);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockEmployeeDao.saveEmployee.mockImplementation(o => o);

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        const result = await employeeService.saveEmployee(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchEmployee', () => {

    test('successful patch', async () => {
        expect.assertions(1);

        mockEmployeeDao.patchEmployee
            .mockImplementation(() => ({}));

        const payload = {
            employeeID: 1,
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        const result = await employeeService.patchEmployee(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockEmployeeDao.patchEmployee
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'Jimmy',
            lastName: 'Johnson',
            position: 'Dog Keeper'
        };

        try {
            await employeeService.patchEmployee(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});