export const DatedFormated = (date) => {
  let localDate = new Date(date).toISOString().split("T")[0];

  return localDate;
};
