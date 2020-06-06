import Message from '../../interfaces/Message';

export default class GenericResponse implements Message {
    success: boolean = false;
    message: String = "";
    error: String = "No errors";

    constructor(success: boolean, message: String, error: String = "") {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}