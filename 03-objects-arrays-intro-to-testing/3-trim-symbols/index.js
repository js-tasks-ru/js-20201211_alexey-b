/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (string.length < size) {
        return string;
    }
    if (size === 0) {
        return "";
    }

    if (size == undefined) {
        return string;
    }

    let input = Array.from(string);
    let output = "" + input[0];
    let i = 0;
    for (let j = 1; j < input.length; j++ ){
        if(output.charAt(output.length-1) === input[j]) {
            i++;
        } else{
            i =0;
        }
        if (i < size) {
            output += input[j]
        }
        
    }
    return output;
}