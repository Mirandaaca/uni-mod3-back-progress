import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// uso de imagenes estaticas
app.use('/uploads', express.static('uploads'));

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