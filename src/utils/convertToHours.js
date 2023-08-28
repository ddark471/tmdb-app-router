export const convertToHours = (minutes) => {
  const getMinutes = minutes % 60;
  const getHours = Math.floor(minutes / 60);
  let total;
  if (getMinutes === 0) return (total = getHours);
  else
    return (total = {
      hours: getHours,
      minutes: getMinutes,
    });

  return total;
};
