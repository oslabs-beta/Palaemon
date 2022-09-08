// utilized for start and end times when querying for metrics
export const setStartAndEndTime = () => {
  const now = new Date();
  const copyNow = new Date(now.getTime());
  copyNow.setHours(copyNow.getHours() - 0.2);

  const startTime = copyNow.toISOString();
  const endTime = new Date().toISOString();

  return {
    startTime,
    endTime,
  };
};


// console logs to test date format
const tester = setStartAndEndTime();
console.log((tester.endTime))

const time = 1662461863.033 * 1000;
console.log(new Date(time));
// module.exports = setStartAndEndTime;
// export default setStartAndEndTime;
