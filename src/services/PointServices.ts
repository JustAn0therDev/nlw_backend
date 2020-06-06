import knex from '../database/connection';
import Point  from '../interfaces/models/point';
import PointServicesInterface from '../interfaces/services/pointServices';
import { PointItem } from '../interfaces/models/point_item';

export default class PointServices implements PointServicesInterface {

    async insert(point: Point): Promise<Number[]> {
        return await knex('points').insert({
            name: point.name,
            email: point.email,
            whatsapp: point.whatsapp,
            longitude: point.longitude,
            latitude: point.latitude,
            city: point.city,
            uf: point.uf
        });
    }

    async show(point_id: Number): Promise<any> {
        const point = await knex('points').select('*').where('id', '=', point_id.toString()).first();

        if (!point) 
            throw 'Ponto de coleta especificado nao foi encontrado.';

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', point_id);

        return { point, items };
    }

    async getAllPoints(city: any, uf: any, items: any): Promise<Point[]> {
        var filteredPoints: Point[] = [];

        const itemsInArray: Number[] = items ? items.split(',').map((item: String) => Number(item.trim())) : [];

        filteredPoints = await knex('points').select('*');
        // .join('point_items', 'points.id', 'point_items.point_id')
        // .whereIn('point_items.item_id', itemsInArray)
        // .where('city', city)
        // .where('uf', uf)
        // .distinct()
        // .select('points.*');

        if (city) {
            filteredPoints = filteredPoints.filter(item => item.city == city);
        }

        if (uf) {
            filteredPoints = filteredPoints.filter(item => item.uf == uf);
        }

        return filteredPoints;
    }
}