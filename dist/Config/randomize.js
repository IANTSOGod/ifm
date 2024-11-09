"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Rnd(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=)!/"?';
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
exports.default = Rnd;
// const resultat = publications.filter((publi) => {
//   publi.notification.user_id != publi.user_id;
// });
