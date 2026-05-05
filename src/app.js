import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import authRoutes from './presentation/routes/auth.routes.js';
import categoryRoutes from './presentation/routes/category.routes.js';
import { connectMongo } from './infraestructure/database/mongo/connection.js';
import { connectMysql } from './infraestructure/database/mysql/connection.js';
import dns from "node:dns/promises";
import { setupSwagger } from './infraestructure/config/swagger.config.js';
dns.setServers(["1.1.1.1"]);

//console.log(await dns.getServers());



await connectMongo();
await connectMysql();


const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app); // Configuramos Swagger para la documentación de la API
app.use(morgan('dev'));
app.use(loggerMiddleware);

// uso de imagenes estaticas
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/categories', categoryRoutes);
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
export default app;