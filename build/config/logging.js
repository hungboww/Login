"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    if (object) {
        console.log("[".concat(getTimeStamp(), "][INFO] [").concat(namespace, "] ").concat(message), object);
    }
    else
        console.log("[".concat(getTimeStamp(), "][INFO] [").concat(namespace, "] ").concat(message));
};
var warn = function (namespace, message, object) {
    if (object) {
        console.warn("[".concat(getTimeStamp(), "][WARN] [").concat(namespace, "] ").concat(message), object);
    }
    else
        console.warn("[".concat(getTimeStamp(), "][WARN] [").concat(namespace, "] ").concat(message));
};
var error = function (namespace, message, object) {
    if (object) {
        console.error("[".concat(getTimeStamp(), "][ERROR] [").concat(namespace, "] ").concat(message), object);
    }
    else
        console.error("[".concat(getTimeStamp(), "][ERROR] [").concat(namespace, "] ").concat(message));
};
var debug = function (namespace, message, object) {
    if (object) {
        console.debug("[".concat(getTimeStamp(), "][DEBUG] [").concat(namespace, "] ").concat(message), object);
    }
    else
        console.debug("[".concat(getTimeStamp(), "][DEBUG] [").concat(namespace, "] ").concat(message));
};
exports.default = { info: info, debug: debug, error: error, warn: warn };
