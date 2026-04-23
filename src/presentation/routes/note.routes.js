import {Router} from 'express';
import NoteController from '../controllers/note.controller.js';
import NoteService from '../../application/use-cases/note.service.js';
// Aqui definiremos que base de datos usar para las notas, en este caso MongoDB, pero luego se puede cambiar a MySQL, o incluso usar ambas, dependiendo de la necesidad de cada endpoint. Para esto, se puede crear un servicio que se encargue de decidir que repositorio usar, y luego inyectar ese servicio en el controlador. De esta manera, el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.
import NoteMongoRepository from '../../infraestructure/database/mongo/note.mongo.repository.js';
import NoteMySQLRepository from '../../infraestructure/database/mysql/note.mysql.repository.js';
import MailService from '../../infraestructure/services/mail.service.js';
// inyeccion de dependencias

const noteMongoRepository = new NoteMongoRepository();

const noteMySQLRepository = new NoteMySQLRepository();
const mailService = new MailService();
const noteService = new NoteService(noteMySQLRepository);
const noteController = new NoteController(noteService);


const router = Router();

router.post("/", noteController.createNote);
router.get('/', noteController.getNotesByUserId);

// Definir las rutas para las notas  
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);
router.get("/", authMiddleware, noteController.getNotesByUserId);

router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);
router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;
