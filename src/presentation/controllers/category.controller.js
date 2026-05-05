export default class CategoryController {
	constructor(categoryService) {
		this.categoryService = categoryService;
	}

	createCategory = async (req, res) => {
		try {
			const category = await this.categoryService.createCategory(req.body);
			res.status(201).json(category);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	};

	getCategories = async (req, res) => {
		try {
			const categories = await this.categoryService.getCategories();
			res.status(200).json(categories);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	};

	getCategoryById = async (req, res) => {
		const id = Number(req.params.id);
		if (!Number.isFinite(id)) {
			return res.status(400).json({ error: "id must be a number" });
		}

		try {
			const category = await this.categoryService.getCategoryById(id);
			res.status(200).json(category);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	};

	updateCategory = async (req, res) => {
		const id = Number(req.params.id);
		if (!Number.isFinite(id)) {
			return res.status(400).json({ error: "id must be a number" });
		}

		try {
			const category = await this.categoryService.updateCategory(id, req.body);
			res.status(200).json(category);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	};

	deleteCategory = async (req, res) => {
		const id = Number(req.params.id);
		if (!Number.isFinite(id)) {
			return res.status(400).json({ error: "id must be a number" });
		}

		try {
			const result = await this.categoryService.deleteCategory(id);
			res.status(200).json(result);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	};
}
