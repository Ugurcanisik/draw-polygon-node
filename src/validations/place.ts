import { body, param } from 'express-validator';

const createPlace = [
    body('name').exists().withMessage('name is required').isString().withMessage('name is not valid'),
    body('coordinates')
        .exists()
        .withMessage('coordinates is required')
        .isObject()
        .withMessage('coordinates is not valid'),
    body('coordinates.type')
        .exists()
        .withMessage('coordinates.type is required')
        .isString()
        .withMessage('coordinates.type is not valid'),
    body('coordinates.coordinates')
        .exists()
        .withMessage('coordinates.coordinates is required')
        .isArray()
        .withMessage('coordinates.coordinates is not valid'),
    body('coordinates.coordinates.*').isNumeric().withMessage('coordinates.coordinates is not valid')
];

const getZonesByPlaceNumber = [
    param('placeNumber')
        .exists()
        .withMessage('placeNumber is required')
        .isString()
        .withMessage('placeNumber is not valid')
];

const updatePlace = [
    param('placeNumber')
        .exists()
        .withMessage('placeNumber is required')
        .isString()
        .withMessage('placeNumber is not valid'),
    body('name').exists().withMessage('name is required').isString().withMessage('name is not valid'),
    body('coordinates')
        .exists()
        .withMessage('coordinates is required')
        .isObject()
        .withMessage('coordinates is not valid'),
    body('coordinates.type')
        .exists()
        .withMessage('coordinates.type is required')
        .isString()
        .withMessage('coordinates.type is not valid'),
    body('coordinates.coordinates')
        .exists()
        .withMessage('coordinates.coordinates is required')
        .isArray()
        .withMessage('coordinates.coordinates is not valid'),
    body('coordinates.coordinates.*').isNumeric().withMessage('coordinates.coordinates is not valid')
];

export { createPlace, getZonesByPlaceNumber, updatePlace };
