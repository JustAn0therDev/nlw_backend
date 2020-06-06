import Message from '../../interfaces/Message';

export default class GenericResponse implements Message {
    success: boolean = false;
    message: string = "";
    error: string = "No errors";

    constructor(success: boolean, message: string, error: string = "") {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}