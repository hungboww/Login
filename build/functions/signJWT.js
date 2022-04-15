"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = void 0;
// import jwt from 'jsonwebtoken';
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("../config/logging"));
var jwt = require('jsonwebtoken');
var NAMESPACE = 'Auth';
function signJWT(users, callback) {
    //the floor() function rounds a number down and returns an integer
    var timeSinchEpoch = new Date();
    var timeSet = timeSinchEpoch.getTime.bind(timeSinchEpoch);
    var expirationTime = timeSet() + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logging_1.default.info(NAMESPACE, "Sign token for ".concat(users.name));
    try {
        jwt.sign({
            name: users.name
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                console.log("test1");
                callback(null, token);
            }
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, "error");
    }
}
exports.signJWT = signJWT;
;
// export default signJWT;
