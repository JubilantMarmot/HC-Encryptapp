const { caesarCipher } = require('./caesarCipher');

function rot13Cipher(text) {
    return caesarCipher(text, 13);
}

module.exports = { rot13Cipher };
