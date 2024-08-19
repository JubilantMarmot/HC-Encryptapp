function gronsfeldEncrypt(text, key) {
    key = key.toString().repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    return text.toUpperCase().split('').map((char, i) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            const keyCode = key[i] - '0';
            return String.fromCharCode((charCode - 65 + keyCode) % 26 + 65);
        }
        return char;
    }).join('');
}

function gronsfeldDecrypt(text, key) {
    key = key.toString().repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    return text.toUpperCase().split('').map((char, i) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            const keyCode = key[i] - '0';
            return String.fromCharCode((charCode - 65 - keyCode + 26) % 26 + 65);
        }
        return char;
    }).join('');
}

module.exports = { gronsfeldEncrypt, gronsfeldDecrypt };
