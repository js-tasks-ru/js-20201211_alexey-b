/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
   return function getNestedValue(obj) {
        return path.split(".").reduce(function(result, key) {
            if (result === undefined) {
                return undefined;
            }
           return result[key] 
        }, obj);
    }
     
}
