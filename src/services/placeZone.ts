import { placeZone as placeZoneRepository } from '@repositories';
import { CreateOrUpdatePolygonDTO } from '@models/classes';

const createOrUpdate = async (payload: CreateOrUpdatePolygonDTO) => {
    const zones = await placeZoneRepository.createOrUpdate(payload.setZoneNumber());

    return zones.map((zone) => ({
        zoneNumber: zone.zoneNumber,
        coordinates: zone.polygon.coordinates
    }));
};

const checkPointInPolygon = async (lat: number, lng: number) => {
    const zone = await placeZoneRepository.checkPointInPolygon(lat, lng);

    if (!zone) {
        return { zoneNumber: null };
    }

    return {
        zoneNumber: zone.zoneNumber
    };
};

const pointDifference = async (lat: Array<number>, lng: Array<number>) => {
    const findDiff = await placeZoneRepository.pointDifference(lat, lng);

    return findDiff;
};

export { createOrUpdate, checkPointInPolygon, pointDifference };
