import { Postgres } from '@database';
import { CreatePlaceDTO, UpdatePlaceDTO } from '@models/classes';

const createPlace = async (place: CreatePlaceDTO) => Postgres.entities.place.create(place.prepareCreate());

const getPlaces = async () => Postgres.entities.place.findAll({});

const getAllPlacesWithZones = async () =>
    Postgres.entities.place.findAll({
        include: {
            model: Postgres.entities.placeZone
        }
    });

const getPlaceByPlaceNumber = async (placeNumber: string) =>
    Postgres.entities.place.findOne({
        include: {
            model: Postgres.entities.placeZone
        },
        where: {
            placeNumber
        }
    });

const updatePlace = async (place: UpdatePlaceDTO) =>
    Postgres.entities.place.update(place.prepareUpdate(), { where: { placeNumber: place.getPlaceNumber() } });

export { createPlace, getPlaces, getAllPlacesWithZones, getPlaceByPlaceNumber, updatePlace };
