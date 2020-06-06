import knex from '../database/connection';
import DataAccessValidation from '../interfaces/functions/DataAccessValidation';
import Point from '../interfaces/models/point';

export default class DataAccessValidator {
    validateRequestedEmail: DataAccessValidation = async (requestedEmail: string) => {
        const arrayOfEmails: Point[] = await knex('points').select('*').where('email', '=', requestedEmail);

        if (arrayOfEmails.length > 0)
            throw 'O email ja existe na base de dados';
    }
}