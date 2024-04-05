import { Coordinates } from '@models/interfaces/coordinates';
import { PlaceZone } from '@models/interfaces/PlaceZone';

export interface IPlace {
    id: number;
    placeNumber: string;
    name: string;
    coordinates: Coordinates;
    createdAt: Date;
    updatedAt: Date;
    placeZones?: Array<PlaceZone>;
}
