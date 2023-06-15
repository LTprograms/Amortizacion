/**
 * Returns the value of EDR from a EAR
 * @param {Number} tea 
 * @returns {Number}
 */
export function getEDR(tea) {
    return Math.pow(1+(tea/100), 1/360) - 1;
}

/**
 * Returns the value of ERM from a EAR
 * @param {Number} tea 
 * @returns {Number}
 */
export function getEMR(tea){
    return Math.pow(1+(tea/100), 1/12) - 1;
}