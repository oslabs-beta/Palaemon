// utilized for start and end times when querying for metrics
export const setStartAndEndTime = () => {
  const now = new Date();
  const copyNow = new Date(now.getTime());
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
