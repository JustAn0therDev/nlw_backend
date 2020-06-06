import { Request, Response } from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import DataAccessValidator from '../validators/DataAccessValidator';

import Point from '../interfaces/models/point';
import IPointServices from '../interfaces/services/pointServices';
import PointServices from '../services/PointServices';

import IPointItemsServices from '../interfaces/services/pointItemsServices';
import PointItemsServices from '../services/PointItemsServices';
export default class PointController {

    private dataAccessValidator: DataAccessValidator = new DataAccessValidator();
    private pointServices: IPointServices = new PointServices();
    private pointItemsServices: IPointItemsServices = new PointItemsServices();

    async create(request: Request, response: Response) {
        try {
            const requestedPointToCreate: Point = await request.body;

            await this.dataAccessValidator.validateRequestedEmail(requestedPointToCreate.email);

            const arrayOfCreatedIds: Number[] = await this.pointServices.insert(requestedPointToCreate);
    
            request.body.items.forEach(async (id: Number) => {
                await this.pointItemsServices.insert(id, arrayOfCreatedIds[0]);
            });

            const responseToReturn = new GenericResponse(true, "Ponto de coleta criado com sucesso");

            return response.status(201).json({ success: responseToReturn.success, message: responseToReturn.message, point: requestedPointToCreate });
        } catch (error) {
            return response.json(new GenericResponse(false, 'Ocorreu um erro.', error.toString()));
        }
    }

    async show(request: Request, response: Response) {
        try{
            let genericResponse: GenericResponse;
            const point_id: Number = Number(request.params.id);
    
            const pointWithItems = await this.pointServices.show(point_id);
    
            genericResponse = new GenericResponse(true, "Ponto encontrado com sucesso.");
    
            return response.status(200).json({ success: genericResponse.success, message: genericResponse.message, point: pointWithItems });
        } catch (error) {
            return response.json(new GenericResponse(false, "Ocorreu um erro", error));
        }
    }

    async index(request: Request, response: Response) {
        try {
            const { city, uf, items } = request.query;

            const points = await this.pointServices.getAllPoints(city, uf, items);
    
            return response.status(200).json(new ListRetrievedResponse(true, 'Lista de pontos resgatada com sucesso', points));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, 'Ocorreu um erro', error));
        }
    }
}