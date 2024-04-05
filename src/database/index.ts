import { Repository, Sequelize } from 'sequelize-typescript';
import { SyncOptions, QueryOptions } from 'sequelize/types';
import * as entities from './entities';

interface DeliveryPostgresConfig {
    HOSTNAME: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    SCHEMA: string;
    OPTIONS: {
        MAX_CONNECTION: number;
        MIN_CONNECTION: number;
        IDLE_TIME: number;
        LOGGING: boolean;
        BENCHMARK: boolean;
    };
}
interface DeliveryPostgresEntities {
    place: Repository<entities.Place>;
    placeZone: Repository<entities.PlaceZone>;
}

export class Postgres {
    private static DB: Sequelize;
    private config: DeliveryPostgresConfig;
    public static entities: DeliveryPostgresEntities;

    static getTransaction = () => Postgres.DB.transaction();
    static rawQuery = (query: string, options?: QueryOptions) => Postgres.DB.query(query, options);

    setConfig(config: DeliveryPostgresConfig) {
        this.config = config;
        return this;
    }

    private createDB = () =>
        new Sequelize({
            host: this.config.HOSTNAME,
            username: this.config.USERNAME,
            password: this.config.PASSWORD,
            database: this.config.SCHEMA,
            dialect: 'postgres',
            pool: {
                max: this.config.OPTIONS.MAX_CONNECTION,
                min: this.config.OPTIONS.MIN_CONNECTION,
                idle: this.config.OPTIONS.IDLE_TIME
            },
            logging: this.config.OPTIONS.LOGGING || false,
            benchmark: this.config.OPTIONS.BENCHMARK || false,
            models: [__dirname + `/entities/*.entity.{js,ts}`],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.entity')).toLowerCase() === member.toLowerCase();
            },
            repositoryMode: true,
            dialectOptions: {
                decimalNumbers: true
            },
            timezone: 'Europe/Istanbul'
        });

    async initializeDB(sync?: boolean, syncOptions?: SyncOptions) {
        Postgres.DB = this.createDB();
        Postgres.DB.authenticate()
            .then(() => {
                this.setEntities();
                console.log('DB is authenticated!');
            })
            .catch((err) => {
                console.log('DB is cannot authenticated!', err);
            });

        if (sync) {
            await Postgres.DB.sync(syncOptions);
        }
    }

    private setEntities() {
        Postgres.entities = {
            place: Postgres.DB.getRepository(entities.Place),
            placeZone: Postgres.DB.getRepository(entities.PlaceZone)
        };
    }
}
