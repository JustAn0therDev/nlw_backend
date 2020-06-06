import ItemServices from '../services/ItemServices';
import ItemServicesInterface from '../interfaces/services/itemServices';
import { Request, Response } from 'express';
import ListRetrievedResponse from '../utils/classes/ListRetrievedResponse';
import GenericResponse from '../utils/classes/GenericResponse';
import Item from '../interfaces/models/Item';
import transformImageInUrl from '../utils/functions/transformImageInUrl';

export default class ItemController {

    private itemServices: ItemServicesInterface = new ItemServices();

    async index(request: Request, response: Response) {
        try {
            const items: Item[] = await this.itemServices.getAllItems();
        
            const serializedItems: Item[] = transformImageInUrl(items);
        
            return response.status(200).json(new ListRetrievedResponse(true, 'List of items retrieved successfully', serializedItems));
        } catch (error) {
            return response.status(500).json(new GenericResponse(false, `Something unexpected happened in the server`, error));
        }
    }
}