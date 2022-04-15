"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = exports.validateToken = exports.getUser = void 0;
var logging_1 = __importDefault(require("../config/logging"));
var mysql_1 = require("../config/mysql");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var signJWT_1 = require("../functions/signJWT");
var User_1 = require("../entity/User");
var typeorm_1 = __importDefault(require("typeorm"));
var NAMESPACE = 'User';
var sampleHealthCheck = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Samples health check route calles");
    return res.status(200).json({
        message: 'pong'
    });
};
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, query, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logging_1.default.info(NAMESPACE, "Samples health check route calles");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, (0, mysql_1.Connect)()];
                case 2:
                    connection = _a.sent();
                    return [4 /*yield*/, typeorm_1.default
                            .getRepository(User_1.User)
                            .createQueryBuilder('user')
                            .select('user.name', 'name')
                            .addSelect("user.password", 'password')
                            .addSelect("user.email", 'email')
                            .getMany()];
                case 3:
                    query = _a.sent();
                    return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, res.status(200).json(res)];
                case 5:
                    results = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    logging_1.default.error(NAMESPACE, error_1.message, error_1);
                    return [2 /*return*/, res.status(500).json({
                            message: error_1.message,
                            error: error_1
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function validateToken(req, res, next) {
    logging_1.default.info(NAMESPACE, 'Token validated');
    return res.status(200).json({
        message: 'Authorization'
    });
}
exports.validateToken = validateToken;
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, password, email;
        return __generator(this, function (_b) {
            _a = req.body, name = _a.name, password = _a.password, email = _a.email;
            bcryptjs_1.default.hash(password, 10, function (hashError, hash) {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }
                var query = "INSERT INTO users (id,name,password,email) VALUES (\"".concat(name, "\",\"").concat(hash, "\",\"").concat(email, "\")");
                (0, mysql_1.Connect)()
                    .then(function (connection) {
                    (0, mysql_1.Query)(connection, query)
                        .then(function (result) {
                        return res.status(201).json(result);
                    })
                        .catch(function (error) {
                        return res.status(500).json({ message: error.message, error: error });
                    });
                })
                    .catch(function (error) {
                    logging_1.default.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.registerUser = registerUser;
// export async function register(req:Request,res:Response, next:Function){
//     let {id,name,password,email} = req.body();
//     bcryptjs.hash(password,10,(hashError, hash)=>{
//     if(hashError)
//     {
//         return res.status(500).json({
//             message: hashError.message,
//             error: hashError
//         });
//     }
//     let query=`INSERT INTO users(id,name,password,email) VALUES ("${id}","${name}","${hash}","${email}")`;
//     Connect()
//         .then(connection=>{
//             Query<IUser>(connection,query)
//                 .then((result)=>{
//                     return res.status(200).json(result
//                     )
//                 })
//         })
//     .catch(error=>{
//         logging.error(NAMESPACE,error.message,error);
//         return res.status(500).json({
//             message:error.message,error
//         })
//     })
//     })
//  }
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, password, query;
        return __generator(this, function (_b) {
            _a = req.body, name = _a.name, password = _a.password;
            query = "SELECT * FROM users WHERE name = '".concat(name, "'");
            (0, mysql_1.Connect)()
                .then(function (connection) {
                (0, mysql_1.Query)(connection, query)
                    .then(function (users) {
                    if (!users)
                        return res.status(400).json({ msg: "User not exist" });
                    bcryptjs_1.default.compare(password, users[0].password, function (error, result) {
                        if (error) {
                            return res.status(401).json({ message: error.message, error: error });
                        }
                        else if (result) {
                            console.log("test");
                            (0, signJWT_1.signJWT)(users[0], function (_error, token) {
                                if (_error) {
                                    return res.status(401).json({ message: "unable to sign jwt", error: _error });
                                }
                                else {
                                    return res.status(200).json({
                                        token: token,
                                        users: {
                                            message: "password default : ".concat(password),
                                            users: users
                                        }
                                    });
                                }
                            });
                        }
                    });
                })
                    .catch(function (error) {
                    logging_1.default.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                });
            })
                .catch(function (error) {
                logging_1.default.error(NAMESPACE, error.message, error);
                return res.status(500).json({ message: error.message, error: error });
            });
            return [2 /*return*/];
        });
    });
}
exports.login = login;
