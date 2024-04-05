import { Polygon } from '@models/interfaces';
import { common as commonHelpers } from '@helpers';

export default class CreateOrUpdatePolygonDTO {
    private zones: Array<{ zoneNumber?: string; polygon: Polygon }>;
    private placeNumber: string;

    setZoneNumber() {
        this.zones = this.zones.map((zone) => ({
            ...zone,
            zoneNumber: zone.zoneNumber || 'ZONE-' + commonHelpers.generateRandomString(10).toUpperCase()
        }));
        return this;
    }

    prepareBulkCreate() {
        return this.zones.map((zone) => ({
            ...zone,
            placeNumber: this.placeNumber
        }));
    }
}
