import CategoryModel from "./category.model.js";

export default class CategoryMySQLRepository {
	async save(categoryEntity) {
		const category = await CategoryModel.create({
			name: categoryEntity.name,
			description: categoryEntity.description,
		});

		return category.toJSON();
	}

	async findAll() {
		return await CategoryModel.findAll();
	}

	async findById(id) {
		const category = await CategoryModel.findByPk(id);
		return category ? category.toJSON() : null;
	}

	async update(id, data) {
		const category = await CategoryModel.findByPk(id);
		if (!category) return null;
		await category.update(data);
		return category.toJSON();
	}

	async delete(id) {
		const category = await CategoryModel.findByPk(id);
		if (!category) return null;
		await category.destroy();
		return true;
	}
}