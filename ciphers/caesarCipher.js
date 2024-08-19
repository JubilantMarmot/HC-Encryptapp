function caesarCipher(text, shift) {
    return text.split('')
        .map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt();
                const base = char >= 'a' && char <= 'z' ? 97 : 65;
                return String.fromCharCode(((code - base + shift + 26) % 26) + base);
            }
            return char;
        })
        .join('');
}

module.exports = { caesarCipher };
