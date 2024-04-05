import { Router } from 'express';
import placeRoute from './place';
import placeZone from './placeZone';

const appRoute = Router();

appRoute.use('/places', placeRoute);
appRoute.use('/place-zones', placeZone);

export default appRoute;
