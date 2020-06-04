import { Router } from 'express';
import knex from './database/connection';

const routes = Router();

routes.get('/items', async (request, response) => {
    try {
        const items = await knex('items').select('*');

        const serializedItems: any[] = items.map((item) => { 
            return { title: item.title, image: `http://localhost:3333/uploads/${item.image}` }
        });
    
        return response.json({ success: true, message: "List of items retrived succesfully", items: serializedItems });
    } catch (error) {
        return response.status(500).json({ success: false, message: `Something unexpected happened in the server. Error: ${error}` })
    }
});

export default routes;