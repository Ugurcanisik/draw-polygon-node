import { Coordinates } from '@models/interfaces';
import { common as commonHelpers } from '@helpers';

export default class CreatePlaceDTO {
    private name: string;
    private coordinates: Coordinates;

    prepareCreate() {
        return {
            name: this.name,
            coordinates: this.coordinates,
            placeNumber: 'PLC-' + commonHelpers.generateRandomString(10).toUpperCase()
        };
    }
}
