import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddelware.js";
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchProductById,
  fetchProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import CheckId from "../middlewares/checkId.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), addProduct)
  .get(fetchProducts);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, CheckId, addProductReview);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, removeProduct)
  .get(authenticate, authorizeAdmin, fetchProductById);

export default router;
