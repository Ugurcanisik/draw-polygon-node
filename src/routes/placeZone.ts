import { Router } from 'express';
import { placeZone as placeZoneController } from '@controllers';
import { requestValidator } from '@middlewares/validation';
import * as placeZoneValidation from '@validations/placeZone';

const route = Router();

route.post('', requestValidator(placeZoneValidation.createOrUpdate), placeZoneController.createOrUpdate);

route.get(
    '/check-point-in-polygon',
    requestValidator(placeZoneValidation.checkPointInPolygon),
    placeZoneController.checkPointInPolygon
);

route.get(
    '/point-difference',
    requestValidator(placeZoneValidation.pointDifference),
    placeZoneController.pointDifference
);

export default route;
