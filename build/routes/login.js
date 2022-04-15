"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var login_controller_1 = require("../controllers/login.controller");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/users', login_controller_1.getUser);
router.get('/validate', login_controller_1.validateToken);
router.post('/register', login_controller_1.registerUser);
router.post('/login', login_controller_1.login);
router.get('/get/all', login_controller_1.getUser);
module.exports = router;
