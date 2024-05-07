import express from "express";
import {
  createUser,
  deleteUserById,
  findUserById,
  getAllUsers,
  getCurrentUserProfile,
  logOut,
  loginUser,
  updateCurrentProfile,
  updateUserById,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddelware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logOut);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentProfile);

// admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, findUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
