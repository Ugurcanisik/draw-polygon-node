import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    AllowNull,
    Unique,
    PrimaryKey,
    AutoIncrement,
    ForeignKey
} from 'sequelize-typescript';
import { date as dateHelper } from '@helpers';
import { Polygon } from '@models/interfaces';
import { Place } from './index';

@Table({
    tableName: 'PlaceZone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class PlaceZone extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @Column(DataType.STRING)
    zoneNumber: string;

    @ForeignKey(() => Place)
    @Column(DataType.STRING)
    placeNumber: string;

    @AllowNull(false)
    @Column(DataType.GEOMETRY('POLYGON'))
    polygon: Polygon;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;
}
