"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var sample_1 = require("../controllers/sample");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/users', sample_1.getUser);
router.get('/validate', sample_1.validateToken);
router.get('/register', sample_1.register);
// router.get('/login', register)
router.get('/get/all', sample_1.getUser);
module.exports = router;
