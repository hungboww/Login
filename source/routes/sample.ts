import {getUser,validateToken,register} from "../controllers/sample";
import express, {Router} from "express";

const router = express.Router()


router.get('/users',getUser)
router.get('/validate', validateToken)
router.get('/register', register)
// router.get('/login', register)
router.get('/get/all', getUser)

export = router