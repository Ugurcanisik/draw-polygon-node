import { PlaceDetail } from '@models/classes';
import { IPlace } from '@models/interfaces';

const fillPlaceDetails = (editAblePlace: IPlace, notEditablePlaces?: IPlace[]) => {
    const placeDetail = new PlaceDetail();
    placeDetail.coordinates = editAblePlace.coordinates.coordinates;
    placeDetail.placeNumber = editAblePlace.placeNumber;
    placeDetail.name = editAblePlace.name;
    placeDetail.zones = editAblePlace.placeZones!.map((zone) => ({
        zoneNumber: zone.zoneNumber,
        coordinates: zone.polygon.coordinates
    }));

    if (notEditablePlaces) {
        placeDetail.notEditablePlaces = notEditablePlaces.map((place) => {
            return {
                coordinates: place.coordinates.coordinates,
                placeNumber: place.placeNumber,
                name: place.name,
                zones: place.placeZones!.map((zone) => ({
                    zoneNumber: zone.zoneNumber,
                    coordinates: zone.polygon.coordinates
                }))
            };
        });
    }

    return placeDetail;
};

export { fillPlaceDetails };
