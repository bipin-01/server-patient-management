"use strict";
exports.__esModule = true;
exports.validateEmailFormat = void 0;
exports.validateEmailFormat = function (email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
};
