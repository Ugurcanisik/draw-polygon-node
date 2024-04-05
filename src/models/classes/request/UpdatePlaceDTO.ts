import { Coordinates } from '@models/interfaces';

export default class UpdatePlaceDTO {
    private name: string;
    private coordinates: Coordinates;
    private placeNumber: string;

    prepareUpdate() {
        return {
            name: this.name,
            coordinates: this.coordinates
        };
    }

    getPlaceNumber() {
        return this.placeNumber;
    }
}
