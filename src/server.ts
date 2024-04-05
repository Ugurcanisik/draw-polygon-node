import 'dotenv/config';
import express, { Express, Router } from 'express';
import { AddressInfo } from 'net';
import AppRoutes from './routes';
import cors from 'cors';
import { Postgres } from '@database';
import PGConfig from '@config/database.config.json';

class Server {
    private _app: Express;
    private readonly _router: Router;
    private readonly _domain: string;
    private readonly _version: string;
    constructor() {
        this._app = express();
        this._domain = 'app';
        this._version = 'v1';
        this._router = express.Router();
    }

    applyMiddleware() {
        this._app.use(express.json());
        return this;
    }

    applyRoutes() {
        this._router.use(`/${this._domain}/${this._version}`, AppRoutes);
        this._app.use(this._router);
        return this;
    }

    enableCORS() {
        this._app.use(cors({ origin: '*' }));
        return this;
    }

    enablePg() {
        new Postgres().setConfig(PGConfig).initializeDB();
        return this;
    }

    listen(port = 3000) {
        const server = this._app.listen(port, () => {
            const { address, port } = server.address() as AddressInfo;
            try {
                console.log(`Node version: ${process.version}`);
            } catch (ignored) {
                console.log(`Node version error: ${ignored}`);
            }
            console.log(`Draw Polygon app listening at ${port} port`);
            console.log(`API URL: http://127.0.0.1:${port}/${this._domain}/${this._version}`);
        });
        return server;
    }
}

export default Server;
