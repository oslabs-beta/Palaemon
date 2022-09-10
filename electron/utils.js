"use strict";
exports.__esModule = true;
exports.formatClusterData = exports.setStartAndEndTime = void 0;
// utilized for start and end times when querying for metrics
var setStartAndEndTime = function () {
    var now = new Date();
    var copyNow = new Date(now.getTime());
    copyNow.setHours(copyNow.getHours() - 1);
    var startTime = copyNow.toISOString();
    var endTime = new Date().toISOString();
    return {
        startTime: startTime,
        endTime: endTime
    };
};
exports.setStartAndEndTime = setStartAndEndTime;
var formatClusterData = function (data) {
    var formattedData = data.body.items.map(function (pod) { var _a; return (_a = pod === null || pod === void 0 ? void 0 : pod.metadata) === null || _a === void 0 ? void 0 : _a.name; });
    return formattedData;
};
exports.formatClusterData = formatClusterData;
// export default setStartAndEndTime;
