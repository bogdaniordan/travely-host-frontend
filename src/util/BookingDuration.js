export const getBookingDuration = (rawStartDate, rawEndDate) => {
    const startDate = new Date(rawStartDate);
    const endDate = new Date(rawEndDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    let days = differenceInTime / (1000 * 3600 * 24) + 1;
    if (days < 1) {
        days = 1;
    }
    return days
}