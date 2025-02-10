// Import required modules
const Category = require("../models/Category");
const Tags = require("../models/Tags");

// Controllers
const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category)
        return res.status(404).json({ error: "Category not found." });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category." });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ error: "Category name is required." });
      const category = new Category({ name });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category." });
    }
  },

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ error: "Category name is required." });
      const category = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!category)
        return res.status(404).json({ error: "Category not found." });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category." });
    }
  },

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category)
        return res.status(404).json({ error: "Category not found." });
      res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category." });
    }
  },
};

const tagController = {
  async getAll(req, res) {
    try {
      const tags = await Tags.find();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const Tags = await Tags.findById(id);
      if (!Tags) return res.status(404).json({ error: "Tags not found." });
      res.status(200).json(Tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Tags." });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ error: "Tags name is required." });
      const Tags = new Tags({ name });
      await Tags.save();
      res.status(201).json(Tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to create Tags." });
    }
  },

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ error: "Tags name is required." });
      const Tags = await Tags.findByIdAndUpdate(id, { name }, { new: true });
      if (!Tags) return res.status(404).json({ error: "Tags not found." });
      res.status(200).json(Tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to update Tags." });
    }
  },

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const Tags = await Tags.findByIdAndDelete(id);
      if (!Tags) return res.status(404).json({ error: "Tags not found." });
      res.status(200).json({ message: "Tags deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Tags." });
    }
  },
};

// Routes
module.exports = { categoryController, tagController };
