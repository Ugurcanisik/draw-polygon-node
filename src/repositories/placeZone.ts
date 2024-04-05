import { Postgres } from '@database';
import { CreateOrUpdatePolygonDTO } from '@models/classes';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

const createOrUpdate = async (payload: CreateOrUpdatePolygonDTO) =>
    Postgres.entities.placeZone.bulkCreate(payload.prepareBulkCreate(), { updateOnDuplicate: ['polygon'] });

const checkPointInPolygon = async (lat: number, lng: number) =>
    Postgres.entities.placeZone.findOne({
        where: {
            $and: Sequelize.where(
                Sequelize.fn(
                    'ST_Contains',
                    Sequelize.fn('ST_GeomFromText', Sequelize.fn('st_AsText', Sequelize.col('polygon'))),
                    Sequelize.fn('st_MakePoint', lat, lng)
                ),
                true
            )
        }
    });

const pointDifference = async (coordinates1: Array<number>, coordinates2: Array<number>) =>
    Postgres.rawQuery(
        'SELECT ST_DistanceSphere(st_MakePoint(:coordinates1), st_MakePoint(:coordinates2)) AS distance',
        {
            replacements: {
                coordinates1,
                coordinates2
            },
            type: QueryTypes.SELECT,
            raw: true,
            nest: true
        }
    );

export { createOrUpdate, checkPointInPolygon, pointDifference };
