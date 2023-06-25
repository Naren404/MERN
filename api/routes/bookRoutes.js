import express from "express"

import { protect } from "../middleware/authMiddleware.js"
import { authorizeRole } from "../middleware/scopeMiddleware.js"

import { createBook, deletebook, getBook, getBooks, updateBook } from "../controllers/booksController.js";

const router = express.Router()

router.route('/').get(protect, getBooks)
router.route('/:id').get(protect, getBook)
router.route('/').post(protect, authorizeRole(["admin"]), createBook)
router.route('/:id').put(protect, authorizeRole(["admin"]), updateBook)
router.route('/:id').delete(protect, authorizeRole(["admin"]), deletebook)

export default router