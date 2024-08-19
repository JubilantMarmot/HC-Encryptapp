function autokeyEncrypt(plaintext, key) {
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    const extendedKey = key + plaintext;
    const result = plaintext.split('').map((char, i) => {
        const charCode = char.charCodeAt(0);
        const keyCode = extendedKey[i].charCodeAt(0);
        return String.fromCharCode(((charCode - 65 + keyCode - 65) % 26) + 65);
    });
    return result.join('');
}

function autokeyDecrypt(ciphertext, key) {
    ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        const cipherCode = ciphertext.charCodeAt(i);
        const keyCode = keyIndex < key.length ? key.charCodeAt(keyIndex) : result.charCodeAt(i - key.length);
        result += String.fromCharCode(((cipherCode - 65 - (keyCode - 65) + 26) % 26) + 65);
        keyIndex++;
    }
    return result;
}

module.exports = { autokeyEncrypt, autokeyDecrypt };
