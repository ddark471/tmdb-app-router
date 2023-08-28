export const hasDataChecker = (checkForData, hasData) => {
  if (checkForData === typeof "Number" && checkForData > 1) return checkForData;
  if (checkForData.length !== 0) return checkForData;
  else return hasData;
};
