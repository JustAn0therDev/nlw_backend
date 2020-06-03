import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({success: true, message: "well hello there!"});
})

export default routes;