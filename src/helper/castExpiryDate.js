export function castExpiryDate(day) {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + day);
  return futureDate;
}
