import {Router} from 'express';
import NoteController from '../controllers/note.controller.js';
import NoteService from '../../application/use-cases/note.service.js';
// Aqui definiremos que base de datos usar para las notas, en este caso MongoDB, pero luego se puede cambiar a MySQL, o incluso usar ambas, dependiendo de la necesidad de cada endpoint. Para esto, se puede crear un servicio que se encargue de decidir que repositorio usar, y luego inyectar ese servicio en el controlador. De esta manera, el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.
import NoteMongoRepository from '../../infraestructure/database/mongo/note.mongo.repository.js';
import NoteMySQLRepository from '../../infraestructure/database/mysql/note.mysql.repository.js';
import MailService from '../../infraestructure/services/mail.service.js';
import upload from '../middlewares/upload.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
// inyeccion de dependencias

const noteMongoRepository = new NoteMongoRepository(); // se puede cambiar a NoteMySQLRepository sin afectar el resto del codigo, ya que el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.

const noteMySQLRepository = new NoteMySQLRepository(); // se puede cambiar a NoteMongoRepository sin afectar el resto del codigo, ya que el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.
const mailService = new MailService();
const noteService = new NoteService(noteMySQLRepository, mailService); // actualmente se esta usando MySQL, pero se puede cambiar a MongoDB sin afectar el resto del codigo, ya que el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.
const noteController = new NoteController(noteService); // se le inyecta el servicio al controlador, para que el controlador pueda usar los metodos del servicio, y el servicio se encargue de la logica de negocio, y el controlador se encargue de manejar las peticiones y respuestas, sin preocuparse por la logica de negocio, y se pueda cambiar facilmente la logica de negocio sin afectar el controlador, y viceversa.


const router = Router();

// Definir las rutas para las notas
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener notas del usuario
 *     description: Retorna todas las notas del usuario autenticado.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                     nullable: true
 *                   isPrivate:
 *                     type: boolean
 *                   password:
 *                     type: string
 *                     nullable: true
 *                   userId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: No autenticado (token faltante o inválido)
 */
router.get("/", authMiddleware, noteController.getNotesByUserId);

router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);
router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;
