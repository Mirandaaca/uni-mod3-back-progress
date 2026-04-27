import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthService from "../../application/use-cases/auth.service.js";
import UserMongoRepository from "../../infraestructure/database/mongo/user.mongo.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

// Inyección de dependencias
const userRepository = new UserMongoRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController({ authService });

const router = Router();

// Solo los administradores pueden registrar nuevos usuarios
//router.post("/register", authMiddleware, roleMiddleware(["admin"]), authController.register); // los usuarios normales no pueden registrar nuevos usuarios, solo los administradores pueden hacerlo
router.post("/register", authController.register); // cualquier usuario puede registrarse, no es necesario estar autenticado para registrarse
router.post("/login", authController.login); // cualquier usuario puede iniciar sesión, no es necesario estar autenticado para iniciar sesión

export default router;
