"use strict";
exports.__esModule = true;
exports.parseTime = void 0;
function parseTime(timeString, presentDateString) {
    var presentDate = new Date(presentDateString);
    if (isNaN(presentDate.getTime())) {
        return undefined;
    }
    var timeComponents = timeString.split(' ');
    if (timeComponents.length !== 2) {
        return undefined;
    }
    var _a = timeComponents[0].split(':'), hourString = _a[0], minuteString = _a[1];
    var hour = parseInt(hourString, 10);
    var minute = parseInt(minuteString, 10);
    if (isNaN(hour) || isNaN(minute)) {
        return undefined;
    }
    var meridian = timeComponents[1].toLowerCase();
    if (meridian !== 'am' && meridian !== 'pm') {
        return undefined;
    }
    if (meridian === 'pm') {
        hour += 12;
    }
    var date = presentDate.getDate();
    var month = presentDate.getMonth();
    var year = presentDate.getFullYear();
    return new Date(year, month, date, hour, minute);
}
exports.parseTime = parseTime;
