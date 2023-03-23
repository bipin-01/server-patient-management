"use strict";
exports.__esModule = true;
exports.parseDateDod = exports.parseDate = void 0;
function parseDate(dateString) {
    var dateComponents = dateString.split('/');
    if (dateComponents.length !== 3) {
        return undefined;
    }
    var month = parseInt(dateComponents[0], 10) - 1;
    var day = parseInt(dateComponents[1], 10); // month is 0-based in Date constructor
    var year = parseInt(dateComponents[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return undefined;
    }
    return new Date(year, month, day);
}
exports.parseDate = parseDate;
function parseDateDod(dateString) {
    var dateComponents = dateString.split('/');
    if (dateComponents.length !== 3) {
        return undefined;
    }
    var day = parseInt(dateComponents[0], 10);
    var month = parseInt(dateComponents[1], 10) - 1; // month is 0-based in Date constructor
    var year = parseInt(dateComponents[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return undefined;
    }
    return new Date(year, month, day);
}
exports.parseDateDod = parseDateDod;
