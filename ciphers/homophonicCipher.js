const homophonicAlphabet = {
    'a': ['1', '2', '3'], 'b': ['4', '5', '6'], 'c': ['7', '8', '9'], 
    'd': ['10', '11'], 'e': ['12', '13', '14'], 'f': ['15', '16'], 
    'g': ['17', '18'], 'h': ['19', '20'], 'i': ['21', '22'], 'j': ['23'], 
    'k': ['24'], 'l': ['25'], 'm': ['26'], 'n': ['27'], 'o': ['28', '29'], 
    'p': ['30'], 'q': ['31'], 'r': ['32', '33'], 's': ['34', '35'], 
    't': ['36'], 'u': ['37'], 'v': ['38'], 'w': ['39'], 'x': ['40'], 
    'y': ['41'], 'z': ['42'], ' ': ['43']
};

const homophonicReverseAlphabet = Object.fromEntries(
    Object.entries(homophonicAlphabet).flatMap(([key, values]) => values.map(value => [value, key]))
);

function homophonicEncrypt(text) {
    return text.toLowerCase().split('').map(char => {
        const choices = homophonicAlphabet[char];
        if (choices) {
            return choices[Math.floor(Math.random() * choices.length)];
        }
        return '';
    }).join(' ');
}

function homophonicDecrypt(encoded) {
    return encoded.split(' ').map(code => homophonicReverseAlphabet[code] || '').join('');
}

module.exports = { homophonicEncrypt, homophonicDecrypt };
