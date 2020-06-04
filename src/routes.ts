import { Router, response } from 'express';
import ItemController from "./controllers/ItemController";
import PointController from './controllers/PointController';

const routes = Router();
const itemController = new ItemController();
const pointController = new PointController();

routes.get('/items', async (request, response) => await itemController.index(request, response));

routes.get('/points', async (request, response) => await pointController.index(request, response));

routes.post('/points', async (request, response) => await pointController.create(request, response));

export default routes;