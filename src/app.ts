import express from 'express';
import bodyParser from 'body-parser';
import { shelteredAnimal } from './routers/shelteredAnimal';
import { species } from './routers/species';
import { employeeKeeper } from './routers/employeeKeeper';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use((request, response, next) => {
    next();
});

app.use('/animals', shelteredAnimal);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});