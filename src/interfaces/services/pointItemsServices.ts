export default interface PointItemsServices {
    insert(item_id: Number, point_id: Number): Promise<void>
}