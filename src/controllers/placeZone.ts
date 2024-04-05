import { Response, Request } from 'express';
import { matchedData } from 'express-validator';
import { plainToClass } from 'class-transformer';
import { HttpStatusCode } from '@constants';
import { BaseResponse, CreateOrUpdatePolygonDTO } from '@models/classes';
import { placeZone as placeZoneService } from '@services';

const createOrUpdate = async (req: Request, res: Response) => {
    const reqData = plainToClass(CreateOrUpdatePolygonDTO, matchedData(req, { locations: ['body'] }));

    try {
        const zones = await placeZoneService.createOrUpdate(reqData);
        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: zones
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const checkPointInPolygon = async (req: Request, res: Response) => {
    const { lat, lng } = matchedData(req, { locations: ['query'] });

    try {
        const zone = await placeZoneService.checkPointInPolygon(lat, lng);

        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: zone
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const pointDifference = async (req: Request, res: Response) => {
    const { lat, lng } = matchedData(req, { locations: ['query'] });

    try {
        const difference = await placeZoneService.pointDifference(lat, lng);

        return res.status(HttpStatusCode.OK).json(
            new BaseResponse({
                data: difference
            })
        );
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

export { createOrUpdate, checkPointInPolygon, pointDifference };
