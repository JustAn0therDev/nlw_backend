import knex from '../database/connection';
import {Request, Response} from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import { open } from 'inspector';
import Knex from 'knex';

export default class PointController {
    async create(request: Request, response: Response) {
        try {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                items
            } = request.body;
        
            const arrayOfCreatedIds = await knex('points').insert({
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            });
    
            items.forEach(async (id: number) => {
                await knex('point_items').insert({
                    item_id: id,
                    point_id: arrayOfCreatedIds[0]
                });
            });

            return response.status(200).json(new GenericResponse(true, "Ponto de coleta criado com sucesso"));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, 'Something unexpected happened in the server', error.toString()));
        }
    }

    async index(request: Request, response: Response) {
        try {
            const points = await knex('points').select('*');
    
            return response.status(201).json(new ListRetrievedResponse(true, 'List of points retrieved successfully', points));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, `Something unexpected happened in the server`, error));
        }
    }
}