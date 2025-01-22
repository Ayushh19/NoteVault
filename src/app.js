import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import routes from './routes.js';

const app = express();

(async () => {
    try {
        await mongoose.connect(config.connectionString);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error.message);
    }
})();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', routes);

export default app;
