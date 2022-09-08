"use strict";
exports.__esModule = true;
// utilized for start and end times when querying for metrics
var setStartAndEndTime = function () {
    var now = new Date();
    var copyNow = new Date(now.getTime());
    copyNow.setHours(copyNow.getHours() - 24);
    var startTime = copyNow.toISOString();
    var endTime = new Date().toISOString();
    return {
        startTime: startTime,
        endTime: endTime
    };
};
exports["default"] = setStartAndEndTime;
