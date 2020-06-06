import Point from "../models/point";

export default interface PointServices {
    insert(point: Point): Promise<Number[]>

    getAllPoints(city: any, uf: any, items: any): Promise<Point[]>

    show(point_id: Number): Promise<Point>
}