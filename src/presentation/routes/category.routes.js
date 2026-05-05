import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import CategoryService from "../../application/use-cases/category.service.js";
import CategoryMySQLRepository from "../../infraestructure/database/mysql/category.mysql.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRepository = new CategoryMySQLRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getCategories);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
