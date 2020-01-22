// Custom isEmpty method created

const isEmpty = value =>
        // If value is equal to undefined or if value is equal to null
        value === undefined ||
        value === null ||
        // typeof checks the data type
        (typeof value === 'object' && Object.keys(value).length === 0 ) ||
        (typeof value === 'string' && value.trim().length === 0);

// Specialised isEmpty const that checks for undefined, null, empty object or empty string.

module.exports = isEmpty;