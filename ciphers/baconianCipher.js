const baconianAlphabet = {
    'a': 'aaaaa', 'b': 'aaaab', 'c': 'aaaba', 'd': 'aaabb', 'e': 'aabaa',
    'f': 'aabab', 'g': 'aabba', 'h': 'aabbb', 'i': 'abaaa', 'j': 'abaab',
    'k': 'ababa', 'l': 'ababb', 'm': 'abbaa', 'n': 'abbab', 'o': 'abbba',
    'p': 'abbbb', 'q': 'baaaa', 'r': 'baaab', 's': 'baaba', 't': 'baabb',
    'u': 'babaa', 'v': 'babab', 'w': 'babba', 'x': 'babbb', 'y': 'bbaaa',
    'z': 'bbaab', ' ': 'bbbaa'
};

const baconianAlphabetReverse = Object.fromEntries(
    Object.entries(baconianAlphabet).map(([key, value]) => [value, key])
);

function baconianEncrypt(text) {
    return text.toLowerCase().split('').map(char => baconianAlphabet[char] || '').join(' ');
}

function baconianDecrypt(encoded) {
    return encoded.split(' ').map(code => baconianAlphabetReverse[code] || '').join('');
}

module.exports = { baconianEncrypt, baconianDecrypt };
