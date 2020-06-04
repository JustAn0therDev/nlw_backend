import express from 'express';
import routes from './routes';
import path from 'path';

const app = express();

//The .json() function embedded in express must be called before using any route that receives a JSON body.
app.use(express.json());

app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);