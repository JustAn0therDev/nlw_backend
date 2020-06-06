export default class ListRetrievedResponse {
    success: boolean;
    message: String;
    collection: any[]

    constructor(success: boolean, message: String, collection: any[]) {
        this.success = success;
        this.message = message;
        this.collection = collection;
    }
}