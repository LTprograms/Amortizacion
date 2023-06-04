/**
 * Returns the value of TED from a TEA
 * @param {Number} tea 
 * @returns {Number}
 */
export function getTED(tea) {
    return Math.pow(1+(tea/100), 1/360) - 1;
}

/**
 * Returns the value of TEM from a TEA
 * @param {Number} tea 
 * @returns {Number}
 */
export function getTEM(tea){
    return Math.pow(1+(tea/100), 1/12) - 1;
}