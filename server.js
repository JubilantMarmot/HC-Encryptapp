const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/encode', (req, res) => {
    const { data, cipher } = req.body;
    if (typeof data !== 'string') {
        return res.status(400).json({ error: 'Data must be a string' });
    }
    if (cipher === 'base64') {
        const encodedData = Buffer.from(data).toString('base64');
        res.json({ encodedData });
    } else if (cipher === 'caesar') {
        const shift = 3; // Shift by 3 for Caesar Cipher
        const encodedData = caesarCipher(data, shift);
        res.json({ encodedData });
    } else {
        res.status(400).json({ error: 'Unsupported cipher type' });
    }
});

app.post('/decode', (req, res) => {
    const { encodedData, cipher } = req.body;
    if (typeof encodedData !== 'string') {
        return res.status(400).json({ error: 'Encoded data must be a string' });
    }
    if (cipher === 'base64') {
        try {
            const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
            res.json({ decodedData });
        } catch (error) {
            res.status(400).json({ error: 'Invalid BASE64 encoded data' });
        }
    } else if (cipher === 'caesar') {
        const shift = 3; // i looked it up and it seems that 3 is alwayus used
        const decodedData = caesarCipher(encodedData, -shift);
        res.json({ decodedData });
    } else {
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong please try again later. Thank you');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
