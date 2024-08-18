const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('test');
});

app.post('/encode', (req, res) => {
    const { data, cipher, keyword } = req.body;
    if (typeof data !== 'string') {
        return res.status(400).json({ error: 'Data must be a string' });
    }
    switch (cipher) {
        case 'base64':
            const encodedBase64 = Buffer.from(data).toString('base64');
            res.json({ encodedData: encodedBase64 });
            break;
        case 'caesar':
            const shift = 3;
            const encodedCaesar = caesarCipher(data, shift);
            res.json({ encodedData: encodedCaesar });
            break;
        case 'atbash':
            const encodedAtbash = atbashCipher(data);
            res.json({ encodedData: encodedAtbash });
            break;
        case 'vigenere':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Vigenère cipher' });
            }
            const encodedVigenere = vigenereCipher(data, keyword);
            res.json({ encodedData: encodedVigenere });
            break;
        case 'rot13':
            const encodedROT13 = rot13Cipher(data);
            res.json({ encodedData: encodedROT13 });
            break;
        case 'playfair':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Playfair cipher' });
            }
            const encodedPlayfair = playfairCipher(data, keyword);
            res.json({ encodedData: encodedPlayfair });
            break;
        default:
            res.status(400).json({ error: 'Unsupported cipher type' });
    }
});

app.post('/decode', (req, res) => {
    const { encodedData, cipher, keyword } = req.body;
    if (typeof encodedData !== 'string') {
        return res.status(400).json({ error: 'Encoded data must be a string' });
    }
    switch (cipher) {
        case 'base64':
            try {
                const decodedBase64 = Buffer.from(encodedData, 'base64').toString('utf8');
                res.json({ decodedData: decodedBase64 });
            } catch (error) {
                res.status(400).json({ error: 'Invalid BASE64 encoded data' });
            }
            break;
        case 'caesar':
            const shift = 3;
            const decodedCaesar = caesarCipher(encodedData, -shift);
            res.json({ decodedData: decodedCaesar });
            break;
        case 'atbash':
            const decodedAtbash = atbashCipher(encodedData);
            res.json({ decodedData: decodedAtbash });
            break;
        case 'vigenere':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Vigenère cipher' });
            }
            const decodedVigenere = vigenereCipher(encodedData, keyword, true);
            res.json({ decodedData: decodedVigenere });
            break;
        case 'rot13':
            const decodedROT13 = rot13Cipher(encodedData);
            res.json({ decodedData: decodedROT13 });
            break;
        case 'playfair':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Playfair cipher' });
            }
            const decodedPlayfair = playfairCipher(encodedData, keyword, true);
            res.json({ decodedData: decodedPlayfair });
            break;
        default:
            res.status(400).json({ error: 'Unsupported cipher type' });
    }
});

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

function rot13Cipher(text) {
    return caesarCipher(text, 13);
}

function playfairCipher(text, keyword, decrypt = false) {
    const cleanedKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    const matrix = createPlayfairMatrix(cleanedKeyword);
    const cleanedText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');

    const digraphs = createDigraphs(cleanedText);
    const result = digraphs.map(pair => {
        const [a, b] = pair;
        const [rowA, colA] = findPosition(a, matrix);
        const [rowB, colB] = findPosition(b, matrix);

        if (rowA === rowB) {
            return decrypt
                ? matrix[rowA][(colA - 1 + 5) % 5] + matrix[rowB][(colB - 1 + 5) % 5]
                : matrix[rowA][(colA + 1) % 5] + matrix[rowB][(colB + 1) % 5];
        }
        if (colA === colB) {
            return decrypt
                ? matrix[(rowA - 1 + 5) % 5][colA] + matrix[(rowB - 1 + 5) % 5][colB]
                : matrix[(rowA + 1) % 5][colA] + matrix[(rowB + 1) % 5][colB];
        }
        return decrypt
            ? matrix[rowA][colB] + matrix[rowB][colA]
            : matrix[rowA][colB] + matrix[rowB][colA];
    });

    return result.join('');
}

function createPlayfairMatrix(keyword) {
    const matrix = [];
    const seen = new Set();
    for (const char of keyword) {
        if (!seen.has(char)) {
            seen.add(char);
            matrix.push(char);
        }
    }
    for (let char = 'A'.charCodeAt(0); char <= 'Z'.charCodeAt(0); char++) {
        const letter = String.fromCharCode(char);
        if (!seen.has(letter) && letter !== 'J') {
            matrix.push(letter);
        }
    }
    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, (i + 1) * 5));
}

function createDigraphs(text) {
    const digraphs = [];
    for (let i = 0; i < text.length; i += 2) {
        let pair = text[i] + (text[i + 1] || 'X');
        if (pair[0] === pair[1]) {
            pair = pair[0] + 'X';
        }
        digraphs.push(pair);
    }
    return digraphs;
}

function findPosition(letter, matrix) {
    for (let row = 0; row < 5; row++) {
        const col = matrix[row].indexOf(letter);
        if (col !== -1) {
            return [row, col];
        }
    }
    return [-1, -1];
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong please try again later. Thank you');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
