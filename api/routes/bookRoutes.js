import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBook, deletebook, getBook, getBooks, updateBook } from "../controllers/booksController.js";

const router = express.Router()

router.route('/').get(protect, getBooks)
router.route('/:id').get(protect, getBook)
router.route('/').post(protect, createBook)
router.route('/:id').put(protect, updateBook)
router.route('/:id').delete(protect, deletebook)

export default router