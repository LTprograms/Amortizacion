/**
 * Returns the days differences between two given dates
 * @param {string | Date} date1 present date
 * @param {string | Date} date2 future date
 * @returns {number}
 */
function getDaysDifference(date1, date2) {   
    let x;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    x = Math.abs(d2 - d1);
    x = Math.round(x / (1000 * 60 * 60 * 24));
    return x;
}
/**
 * receives a Date and returns the future date after a given number of months
 * @param {string | Date} date actual date
 * @param {number} months number of months
 * @returns {Date}
 */
function getFutureDate(date, months) {
    const futureDate = new Date(date);
    futureDate.setDate(new Date(date).getDate())
    futureDate.setMonth(new Date(date).getMonth() + months)
    if (months>12) {
        futureDate.setFullYear(new Date(date).getFullYear() + parseInt(months/12));
    }
    return futureDate;
}

/**
 * Receives a date got from an input:date and returns the actual date
 * @param {string} date A date got from input:date
 * @returns {Date}
 */
function getDateFromString(date){
    const aux = new Date();
    aux.setDate(new Date(date).getDate()+1);
    aux.setMonth(new Date(date).getMonth());
    aux.setFullYear(new Date(date).getFullYear());
    return aux;
}

export {getDaysDifference, getFutureDate, getDateFromString};