import { Response, Request } from 'express';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from '@constants';
import { BaseResponse, CreatePlaceDTO, UpdatePlaceDTO } from '@models/classes';
import { place as placeService } from '@services';
import { plainToClass } from 'class-transformer';

const createPlace = async (req: Request, res: Response) => {
    const reqData = plainToClass(CreatePlaceDTO, matchedData(req, { locations: ['body'] }));

    try {
        const place = await placeService.createPlace(reqData);

        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: place
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const getPlaces = async (req: Request, res: Response) => {
    try {
        const places = await placeService.getPlaces();

        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: places
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const getZoneByPlaceNumber = async (req: Request, res: Response) => {
    const { placeNumber } = matchedData(req, { locations: ['params'] });

    try {
        const placeZones = await placeService.getZoneByPlaceNumber(placeNumber);

        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: placeZones
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const updatePlace = async (req: Request, res: Response) => {
    const reqData = plainToClass(UpdatePlaceDTO, matchedData(req, { locations: ['body', 'params'] }));

    try {
        await placeService.updatePlace(reqData);

        return res.status(HttpStatusCode.OK).json(new BaseResponse({}));
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

export { createPlace, getPlaces, getZoneByPlaceNumber, updatePlace };
