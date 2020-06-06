import knex from '../database/connection';
import { Request, Response } from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import DataAccessValidator from '../validators/DataAccessValidator';
import { Point } from '../interfaces/models/point';
export default class PointController {

    private dataAccessValidator = new DataAccessValidator();

    async create(request: Request, response: Response) {
        try {
            const requestedPointToCreate: Point = request.body;

            const emailAlreadyExistsInTheDatabase = this.dataAccessValidator.validateRequestedEmail(requestedPointToCreate.email);

            if (emailAlreadyExistsInTheDatabase) {
                return response.status(400).json({ success: false, message: "Email already exists in the database." });
            }
        
            const arrayOfCreatedIds: number[] = await knex('points').insert({
                name: requestedPointToCreate.name,
                email: requestedPointToCreate.email,
                whatsapp: requestedPointToCreate.whatsapp,
                latitude: requestedPointToCreate.latitude,
                longitude: requestedPointToCreate.longitude,
                city: requestedPointToCreate.city,
                uf: requestedPointToCreate.uf
            });
    
            requestedPointToCreate.items.forEach(async (id: number) => {
                await knex('point_items').insert({
                    item_id: id,
                    point_id: arrayOfCreatedIds[0]
                });
            });

            return response.status(201).json(new GenericResponse(true, "Ponto de coleta criado com sucesso"));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, 'Something unexpected happened in the server', error.toString()));
        }
    }

    async index(request: Request, response: Response) {
        try {
            const points = await knex('points').select('*');
    
            return response.status(200).json(new ListRetrievedResponse(true, 'List of points retrieved successfully', points));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, `Something unexpected happened in the server`, error));
        }
    }
}