function vigenereCipher(text, keyword, decrypt = false) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keywordRepeating = keyword.toUpperCase().repeat(Math.ceil(text.length / keyword.length)).slice(0, text.length).toUpperCase();
    return text.split('')
        .map((char, i) => {
            if (char.match(/[a-z]/i)) {
                const code = char.toUpperCase().charCodeAt();
                const keyCode = keywordRepeating[i].charCodeAt();
                const base = char >= 'a' && char <= 'z' ? 97 : 65;
                const shift = (keyCode - 65) * (decrypt ? -1 : 1);
                return String.fromCharCode(((code - base + shift + 26) % 26) + base);
            }
            return char;
        })
        .join('');
}

module.exports = { vigenereCipher };
