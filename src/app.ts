import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { shelteredAnimalRouter } from './routers/shelteredAnimal-router';
import { speciesRouter } from './routers/species-router';
import { employeeKeeperRouter } from './routers/employeeKeeper-router';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use((request, response, next) => {
    next();
});

app.use('/animals', shelteredAnimalRouter);
app.use('/employees', employeeKeeperRouter);
app.use('/species', speciesRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});