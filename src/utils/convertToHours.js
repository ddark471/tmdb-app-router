export const convertToHours = (minutes) => {
  const getMinutes = minutes % 60;
  const getHours = Math.floor(minutes / 60);
  if (getMinutes === 0) return getHours;
  else {
    return {
      hours: getHours,
      minutes: getMinutes,
    };
  }
};
