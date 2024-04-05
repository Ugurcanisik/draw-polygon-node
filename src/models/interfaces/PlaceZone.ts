import { Polygon } from '@models/interfaces';

export interface PlaceZone {
    id: number;
    zoneNumber: string;
    placeNumber: string;
    polygon: Polygon;
    createdAt: Date;
    updatedAt: Date;
}
