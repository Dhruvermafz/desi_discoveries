const express = require("express");
const categoryTagRouter = express.Router();
const {
  categoryController,
  tagController,
} = require("../controllers/categoriesTagsController");
// Category Routes
categoryTagRouter.get("/categories", categoryController.getAll);
categoryTagRouter.get("/categories/:id", categoryController.getById);
categoryTagRouter.post("/categories", categoryController.create);
categoryTagRouter.put("/categories/:id", categoryController.updateById);
categoryTagRouter.delete("/categories/:id", categoryController.deleteById);

// Tags Routes
categoryTagRouter.get("/tags", tagController.getAll);
categoryTagRouter.get("/tags/:id", tagController.getById);
categoryTagRouter.post("/tags", tagController.create);
categoryTagRouter.put("/tags/:id", tagController.updateById);
categoryTagRouter.delete("/tags/:id", tagController.deleteById);
module.exports = categoryTagRouter;
