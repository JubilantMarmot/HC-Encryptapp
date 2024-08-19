function atbashCipher(text) {
    return text.split('')
        .map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt();
                const base = char >= 'a' && char <= 'z' ? 97 : 65;
                return String.fromCharCode(155 - code);
            }
            return char;
        })
        .join('');
}

module.exports = { atbashCipher };
