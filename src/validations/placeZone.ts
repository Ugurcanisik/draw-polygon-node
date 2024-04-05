import { body, query } from 'express-validator';

const createOrUpdate = [
    body('placeNumber')
        .exists()
        .withMessage('placeNumber is required')
        .isString()
        .withMessage('placeNumber is not valid'),
    body('name').exists().withMessage('name is required').isString().withMessage('name is not valid'),
    body('zones').exists().withMessage('zones is required').isArray().withMessage('zones is not valid'),
    body('zones.*.zoneNumber').optional({ nullable: true }),
    body('zones.*.polygon').exists().withMessage('polygon is required').isObject().withMessage('polygon is not valid'),
    body('zones.*.polygon.type').exists().withMessage('type is required').isString().withMessage('type is not valid'),
    body('zones.*.polygon.coordinates')
        .exists()
        .withMessage('coordinates is required')
        .isArray()
        .withMessage('coordinates is not valid')
];

const checkPointInPolygon = [
    query('lat').exists().withMessage('lat is required').isFloat().withMessage('lat is not valid'),
    query('lng').exists().withMessage('lng is required').isFloat().withMessage('lng is not valid')
];

const pointDifference = [
    query('lat').exists().withMessage('lat is required').isFloat().withMessage('lat is not valid'),
    query('lng').exists().withMessage('lng is required').isFloat().withMessage('lng is not valid')
];

export { createOrUpdate, checkPointInPolygon, pointDifference };
