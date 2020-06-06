import knex from '../database/connection';
import Point  from '../interfaces/models/point';
import PointServicesInterface from '../interfaces/services/pointServices';

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

    async show(point_id: Number): Promise<Point> {
        const point = await knex('points').select('*').where('id', '=', point_id.toString()).first();

        if (!point) 
            throw 'Ponto de coleta especificado nao foi encontrado.';

        return point;
    }

    async getAllPoints(): Promise<Point[]> {
        return await knex('points').select('*');
    }
}