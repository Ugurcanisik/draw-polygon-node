import Server from './server';

const app = new Server()
    .enableCORS()
    .applyMiddleware()
    .applyRoutes()
    .enablePg()
    .listen();

export default app;
