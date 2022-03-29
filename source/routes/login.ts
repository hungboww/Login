import {getUser,validateToken,registerUser,login} from "../controllers/login.controller";
import express, {Router} from "express";

const router = express.Router()

router.get('/users',getUser)
router.get('/validate', validateToken)
router.post('/register', registerUser)
router.post('/login', login)
router.get('/get/all', getUser)

export = router