export const datePlusInterval = (date, interval) => {
    date.setDate(date.getDate() + interval);
    return date;
}