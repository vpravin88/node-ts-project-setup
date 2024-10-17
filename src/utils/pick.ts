/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (object: any, keys: any) =>
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   keys.reduce((obj: any, key: any) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
         // eslint-disable-next-line no-param-reassign
         obj[key] = object[key];
      }
      return obj;
   }, {});

export default pick;
