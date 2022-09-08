
// utilized for start and end times when querying for metrics
const setStartAndEndTime = () => {
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
// // console logs to test date format
// const tester = setStartAndEndTime();
// console.log((tester.endTime))

// const time = 1662461863.033 * 1000;
// console.log(new Date(time));
export default setStartAndEndTime;
