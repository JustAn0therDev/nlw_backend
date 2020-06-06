import knex from '../database/connection';
import IPointItemsServices from '../interfaces/services/pointItemsServices';

export default class PointItemsServices implements IPointItemsServices {
    async insert(item_id: Number, point_id: Number): Promise<void> {
        await knex('point_items').insert({ item_id, point_id });
    }
}