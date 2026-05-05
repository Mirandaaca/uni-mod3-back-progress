import CategoryEntity from "../../domain/entities/category.entity.js";

// Logica de Negocio
export default class CategoryService {
	constructor(categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	async createCategory(data) {
		if (!data?.name) {
			throw new Error("Name is required");
		}

		const category = new CategoryEntity(data);
		return await this.categoryRepository.save(category);
	}

	async getCategoryById(id) {
		const category = await this.categoryRepository.findById(id);
		if (!category) throw new Error("Category not found");
		return category;
	}

	async getCategories() {
		return await this.categoryRepository.findAll();
	}

	async updateCategory(id, data) {
		const existingCategory = await this.categoryRepository.findById(id);
		if (!existingCategory) throw new Error("Category not found");

		const category = await this.categoryRepository.update(id, data);
		if (!category) throw new Error("Category not found");
		return category;
	}

	async deleteCategory(id) {
		const existingCategory = await this.categoryRepository.findById(id);
		if (!existingCategory) throw new Error("Category not found");

		const deleted = await this.categoryRepository.delete(id);
		if (!deleted) throw new Error("Category not found");
		return { message: "Category deleted successfully" };
	}
}