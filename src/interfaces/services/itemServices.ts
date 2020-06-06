import Item from "../models/Item";

export default interface ItemServices {
    getAllItems(): Promise<Item[]> 
}