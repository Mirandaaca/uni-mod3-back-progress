import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import authRoutes from './presentation/routes/auth.routes.js';
import { connectMongo } from './infraestructure/database/mongo/connection.js';
//import { connectMySQL } from './infraestructure/database/mysql/connection.js';
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

//console.log(await dns.getServers());



await connectMongo();
await connectMySQL();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

// uso de imagenes estaticas
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', noteRoutes);
app.use('/api/v1/auth', authRoutes);

// primer endpoint de tipo GET
app.get('/api/health', (req, res) => {
    res.status(200).json({status: 'OK', message: 'API de notas activa'});
});

// middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Eror interno del servidor'});
});

// iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});