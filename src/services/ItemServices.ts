import knex from '../database/connection';
import Item from '../interfaces/models/Item';
import ItemServicesInterface from '../interfaces/services/itemServices';

export default class ItemServices implements ItemServicesInterface {
    async getAllItems(): Promise<Item[]> {
        let allItems: Item[] = [];

        allItems = await knex('items').select('*');

        return allItems;
    }
}