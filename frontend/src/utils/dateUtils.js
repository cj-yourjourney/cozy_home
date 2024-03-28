// dateUtils.js

export function getDatesInRange(checkInDate, checkOutDate) {
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  const datesArray = [];
  const currentDate = new Date(startDate);

  // Loop through dates from check-in to check-out (inclusive)
  while (currentDate < endDate) {
    datesArray.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
}
