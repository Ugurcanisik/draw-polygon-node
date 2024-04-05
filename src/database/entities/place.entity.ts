import {
    Table,
    Model,
    Column,
    DataType,
    HasMany,
    Unique,
    Default,
    PrimaryKey,
    AutoIncrement
} from 'sequelize-typescript';
import { date as dateHelper } from '@helpers';
import { PlaceZone } from './';
import { Coordinates } from '@models/interfaces';

@Table({
    tableName: 'Place',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class Place extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @Column(DataType.STRING)
    placeNumber: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.GEOMETRY('POINT'))
    coordinates: Coordinates;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;

    @HasMany(() => PlaceZone, {
        sourceKey: 'placeNumber'
    })
    placeZones?: Array<PlaceZone>;
}
