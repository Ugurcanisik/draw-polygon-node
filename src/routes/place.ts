import { Router } from 'express';
import { place as placeController } from '@controllers';
import { requestValidator } from '@middlewares/validation';
import * as placeValidation from '@validations/place';

const route = Router();

route.post('', requestValidator(placeValidation.createPlace), placeController.createPlace);

route.get('/', placeController.getPlaces);

route.get(
    '/:placeNumber',
    requestValidator(placeValidation.getZonesByPlaceNumber),
    placeController.getZoneByPlaceNumber
);

route.patch('/:placeNumber', requestValidator(placeValidation.updatePlace), placeController.updatePlace);

export default route;
