import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBook, getBooks } from "../controllers/booksController.js";

const router = express.Router()

router.route('/').get(protect, getBooks)
router.route('/create').post(protect, createBook)

export default router