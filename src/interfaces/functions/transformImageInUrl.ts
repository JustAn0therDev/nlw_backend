import Item from "../models/Item";

export default interface transformImageInUrl {
    (arrayOfItems: Item[]): Item[]
}