"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = 'Auth';
function signJWT(user, callback) {
    var timeSinchEpoch = new Date().getTime;
    var expirationTime = timeSinchEpoch() + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logging_1.default.info(NAMESPACE, "Sign token for ".concat(user.name));
    try {
        jsonwebtoken_1.default.sign({
            name: user.name
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
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
exports.default = signJWT;
