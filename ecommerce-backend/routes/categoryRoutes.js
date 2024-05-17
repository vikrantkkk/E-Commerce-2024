import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddelware.js";
import {
  createCategory,
  deleteCategory,
  listCategory,
  readCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)

router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory)

  router.get("/allcategories",listCategory)
  router.get("/:id",readCategory)

export default router;
