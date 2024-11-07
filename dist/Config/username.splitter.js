"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assureUserUnique(input) {
    if (input.length === 0)
        return input;
    const lastChar = input.charAt(input.length - 1);
    if (lastChar >= "1" && lastChar <= "9") {
        const incrementedChar = (parseInt(lastChar) + 1).toString();
        return input.slice(0, -1) + incrementedChar;
    }
    return input + "1";
}
exports.default = assureUserUnique;
