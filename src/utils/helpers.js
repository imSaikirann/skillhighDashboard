export const displayExpiryDate = (courseExpiryDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(courseExpiryDate);

    // Calculate the difference in months
    const totalMonthsDiff =
      (expiryDate.getFullYear()  - currentDate.getFullYear()) * 12 +
      expiryDate.getMonth() - currentDate.getMonth();

    // Check if 1 month is left
    return totalMonthsDiff === 1;
};