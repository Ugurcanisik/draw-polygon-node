export class PlaceDetail {
    placeNumber: string;
    name: string;
    coordinates: Array<number>;
    zones: { zoneNumber: string; coordinates: number[][][] }[];
    notEditablePlaces?: PlaceDetail[];
}
