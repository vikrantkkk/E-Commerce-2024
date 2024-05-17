import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingName = await Category.findOne({ name });
    if (existingName) {
      return res.json({ error: "Name already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log("🚀 ~ createCategory ~ error:", error);
    return res.status(400).json(error);
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const listCategory = asyncHandler(async (req, res) => {
  try {
    const allCategory = await Category.find({});
    res.json(allCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const readCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const readCategory = await Category.findOne({ _id: id});
    res.json(readCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});