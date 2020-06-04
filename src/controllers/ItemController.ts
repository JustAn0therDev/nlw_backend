import knex from '../database/connection';
import {Request, Response} from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import Item from '../interfaces/Item';

export default class ItemController {
    async index(request: Request, response: Response) {
        try {
            const items = await knex('items').select('*');
    
            const serializedItems: Item[] = items.map((item) => { 
                return { id: item.id, title: item.title, image: `http://localhost:3333/uploads/${item.image}` }
            });
        
            return response.status(201).json(new ListRetrievedResponse(true, 'List of items retrieved successfully', serializedItems));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, `Something unexpected happened in the server`, error));
        }
    }
}