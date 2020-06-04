export default class ListRetrievedResponse {
    success: boolean;
    message: string;
    collection: any[]

    constructor(success: boolean, message: string, collection: any[]) {
        this.success = success;
        this.message = message;
        this.collection = collection;
    }
}