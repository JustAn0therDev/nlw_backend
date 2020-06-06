import { Request, Response } from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import DataAccessValidator from '../validators/DataAccessValidator';

import Point from '../interfaces/models/point';
import IPointServices from '../interfaces/services/pointServices';
import PointServices from '../services/PointServices';

import IPointItemsServices from '../interfaces/services/pointItemsServices';
import PointItemsServices from '../services/pointItemsServices';
export default class PointController {

    private dataAccessValidator: DataAccessValidator = new DataAccessValidator();
    private pointServices: IPointServices = new PointServices();
    private pointItemsServices: IPointItemsServices = new PointItemsServices();

    async create(request: Request, response: Response) {
        try {
            const requestedPointToCreate: Point = await request.body;

            const emailAlreadyExistsInTheDatabase = await this.dataAccessValidator.validateRequestedEmail(requestedPointToCreate.email);

            if (emailAlreadyExistsInTheDatabase) {
                return response.status(400).json({ success: false, message: "Email ja existe na nossa base de dados." });
            }
        
            const arrayOfCreatedIds: Number[] = await this.pointServices.insert(requestedPointToCreate);
    
            request.body.items.forEach(async (id: Number) => {
                await this.pointItemsServices.insert(id, arrayOfCreatedIds[0]);
            });

            const responseToReturn = new GenericResponse(true, "Ponto de coleta criado com sucesso");

            return response.status(201).json({ success: responseToReturn.success, message: responseToReturn.message, point: requestedPointToCreate });
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, 'Ocorreu um erro inesperado.', error.toString()));
        }
    }

    async show(request: Request, response: Response) {
        let genericResponse: GenericResponse;
        const point_id: Number = Number(request.params.id);

        const point = await this.pointServices.show(point_id);

        if (!point) {
            genericResponse = new GenericResponse(false, "Ponto não encontrado.");
            return response.status(404).json(genericResponse)
        }

        genericResponse = new GenericResponse(true, "Ponto encontrado com sucesso.");

        return response.status(200).json({ success: genericResponse.success, message: genericResponse.message, point });
    }

    async index(request: Request, response: Response) {
        try {
            const points = await this.pointServices.getAllPoints();
    
            return response.status(200).json(new ListRetrievedResponse(true, 'Lista de pontos resgatada com sucesso', points));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, 'Ocorreu um erro inesperado', error));
        }
    }
}