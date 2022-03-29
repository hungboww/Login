import {getUser,validateToken,register} from "../controllers/sample";
import express, {Router} from "express";

const router = express.Router()

router.get('/validate', getUser)
router.get('/register', getUser)
router.get('/login', getUser)
router.get('/get/all', getUser)

export = router