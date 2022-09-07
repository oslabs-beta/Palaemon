// utilized for start and end times when querying for metrics
export const setStartAndEndTime = () => {
  const now: Date = new Date();
  const copyNow: Date = new Date(now.getTime());
  copyNow.setHours(copyNow.getHours() - 24);

  const startTime = copyNow.toISOString();
  const endTime = new Date().toISOString();

  return {
    startTime,
    endTime,
  };
};

// // module.exports = setStartAndEndTime;
// export default setStartAndEndTime;
