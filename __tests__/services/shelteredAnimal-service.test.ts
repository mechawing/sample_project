import * as animalService from '../../src/services/animal-service';
import * as animalDao from '../../src/daos/shelteredAnimal-dao';
import { ShelteredAnimal } from '../../src/models/ShelteredAnimal';

jest.mock('../../src/daos/shelteredAnimal-dao');

const mockAnimalDao = animalDao as any;

describe('saveAnimal', () => {
    test('422 returned if no name provided', async () => {
        expect.assertions(1);
        mockAnimalDao.saveAnimal.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

    const payload = {
        shelterIDNumber: 78,
        name: 'Maggie',
        species: 'dog',
        sex: 'female',
        fixed: true,
        declawed: false,
        birthdate: '2020-01-01'
    };

        try {
            await animalService.saveAnimal(payload);
            fail('animalService.saveAnimal did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no birthdate is provided', async () => {
        expect.assertions(1);

        mockAnimalDao.saveAnimal.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        try {
            await animalService.saveAnimal(payload);
            fail('animalService.saveAnimal did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no lastName provided', async () => {
        expect.assertions(1);
        mockAnimalDao.savePerson.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        try {
            await animalService.saveAnimal(payload);
            fail('animalService.saveAnimal did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Person object', async () => {
        mockAnimalDao.savePerson.mockImplementation(o => o);

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        const result = await animalService.saveAnimal(payload);

        expect(payload).not.toBeInstanceOf(ShelteredAnimal);
        expect(result).toBeInstanceOf(ShelteredAnimal);
    });

    test('ID value of input is replaced in output', async () => {
        mockAnimalDao.saveAnimal.mockImplementation(o => o);

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };;

        const result = await animalService.saveAnimal(payload);

        expect(result.shelterIDNumber).not.toBe(payload.shelterIDNumber);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockAnimalDao.saveAnimal.mockImplementation(o => o);

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        const result = await animalService.saveAnimal(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchAnimal', () => {

    test('successful patch', async () => {
        expect.assertions(1);

        mockAnimalDao.patchAnimal
            .mockImplementation(() => ({}));

        const payload = {
                shelterIDNumber: 78,
                name: 'Maggie',
                species: 'dog',
                sex: 'female',
                fixed: true,
                declawed: false,
                birthdate: '2020-01-01'
        };

        const result = await animalService.patchAnimal(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockAnimalDao.patchAnimal
            .mockImplementation(() => ({}));

        const payload = {
            shelterIDNumber: 78,
            name: 'Maggie',
            species: 'dog',
            sex: 'female',
            fixed: true,
            declawed: false,
            birthdate: '2020-01-01'
        };

        try {
            await animalService.patchAnimal(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});