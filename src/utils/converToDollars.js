export const convertToDollars = (number) => {
  const addSpace = new Intl.NumberFormat("fr-FR");
  return addSpace.format(number);
};
