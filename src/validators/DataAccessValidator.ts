import knex from '../database/connection';
import DataAccessValidation from '../interfaces/functions/DataAccessValidation';

export default class DataAccessValidator {
    validateRequestedEmail: DataAccessValidation = async (requestedEmail: string) => {
        const arrayOfEmails: string[] = await knex('points').select('email');

        if (arrayOfEmails.find((email: string) => email.toLowerCase() == requestedEmail.toLowerCase())) {
            return true;
        }

        return false;
    }
}