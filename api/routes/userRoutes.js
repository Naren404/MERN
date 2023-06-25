import express from "express";

const router = express.Router()

import { authUser, logoutUser, registerUser } from "../controllers/usersController.js";

router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/register').post(registerUser)

export default router