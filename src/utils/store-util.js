/**
 * @param {Object} obj
 * @returns {Object}
 */
export function convertDictMapStateByObject(obj) {
  let mapStateObj = {};
  for (let key in obj) {
    mapStateObj[obj[key]] = state => state.dict[key];
  }
  return mapStateObj;
}
