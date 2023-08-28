export const sliceDescription = (text) => {
  let textArray;
  let textArrayLength;

  if (text) {
    textArray = text.split(" ");
    textArrayLength = textArray.filter((word) => word !== " ").length;
    if (textArrayLength > 100) {
      text = text.slice(0, 150) + "...";
      return text;
    }
  }
  return text;
};
