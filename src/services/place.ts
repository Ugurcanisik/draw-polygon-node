import { place as placeRepository } from '@repositories';
import { place as placeHelpers } from '@helpers';
import { CreatePlaceDTO, UpdatePlaceDTO } from '@models/classes';

const createPlace = async (data: CreatePlaceDTO) => {
    const place = await placeRepository.createPlace(data);

    return {
        placeNumber: place.placeNumber,
        name: place.name,
        coordinates: place.coordinates
    };
};

const getPlaces = async () => {
    const places = await placeRepository.getPlaces();

    return places.map((place) => ({
        placeNumber: place.placeNumber,
        name: place.name
    }));
};

const getZoneByPlaceNumber = async (placeNumber: string) => {
    if (placeNumber === 'allPlaces') {
        const placeZones = await placeRepository.getAllPlacesWithZones();
        return placeZones.map((placeZone) => placeHelpers.fillPlaceDetails(placeZone));
    }

    const place = await placeRepository.getPlaceByPlaceNumber(placeNumber);

    if (!place) {
        return { zoneNumber: null }; // TODO ERROR
    }

    return placeHelpers.fillPlaceDetails(place, []);
};

const updatePlace = async (data: UpdatePlaceDTO) => placeRepository.updatePlace(data);

export { createPlace, getPlaces, getZoneByPlaceNumber, updatePlace };
