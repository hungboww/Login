"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWT = void 0;
var logging_1 = __importDefault(require("../config/logging"));
// import jwt from 'jsonwebtoken'
var config_1 = __importDefault(require("../config/config"));
var NAMESPACE = "Auth";
var jwt = require('jsonwebtoken');
function extractJWT(req, res, next) {
    var _a;
    logging_1.default.info(NAMESPACE, 'Validating token');
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jwt.verify(token, config_1.default.server.token.secret, function (error, decoded) {
            if (error) {
                return res.status(404).json({ message: error.message, error: error });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}
exports.extractJWT = extractJWT;
