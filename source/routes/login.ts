import {getUser,validateToken,registerUser} from "../controllers/sample";
import express, {Router} from "express";

const router = express.Router()


router.get('/users',getUser)
router.get('/validate', validateToken)
router.get('/register', registerUser)
router.get('/login', registerUser)
router.get('/get/all', getUser)

export = router