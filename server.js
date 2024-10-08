const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// all of the ciphers
const { caesarCipher} = require('./ciphers/caesarCipher');
const { atbashCipher } = require('./ciphers/atbashCipher');
const { vigenereCipher } = require('./ciphers/vigenereCipher');
const { rot13Cipher}  = require('./ciphers/rot13Cipher');
const { playfairCipher } = require('./ciphers/playfairCipher');
const { railFenceEncrypt, railFenceDecrypt } = require('./ciphers/railfenceCipher');
const { scytaleEncrypt, scytaleDecrypt } = require('./ciphers/scytaleCipher');
const { baconianEncrypt, baconianDecrypt } = require('./ciphers/baconianCipher');
const { gronsfeldEncrypt, gronsfeldDecrypt } = require('./ciphers/gronsfeldCipher');
const { homophonicEncrypt, homophonicDecrypt } = require('./ciphers/homophonicCipher');
const { autokeyEncrypt, autokeyDecrypt } = require('./ciphers/autokeyCipher');
const { fourSquareEncrypt, fourSquareDecrypt } = require('./ciphers/fourSquareCipher');

app.get('/', (req, res) => {
    res.send('test');
});

app.get('/ciphers', (req, res) => {
    const ciphers = ['base64', 'caesar', 'atbash', 'vigenere', 'rot13', 'playfair', 'railfence', 'scytale', 'baconian', 'gronsfeld', 'homophonic', 'autokey', 'fourSquare'];
    res.json({ ciphers });
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
        case 'railfence':
            const rails = 3;
            const encodedRailfence = railFenceEncrypt(data, rails);
            res.json({ encodedData: encodedRailfence });
            break;
        case 'scytale':
            const scytalediameter = 3;
            const encodedScytale = scytaleEncrypt(data, scytalediameter);
            res.json({ encodedData: encodedScytale });
            break;
        case 'baconian':
            const encodedBaconian = baconianEncrypt(data);
            res.json({ encodedData: encodedBaconian });
            break;
        case 'gronsfeld':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Gronsfeld cipher' });
            }
            const encodedGronsfeld = gronsfeldEncrypt(data, keyword);
            res.json({ encodedData: encodedGronsfeld });
            break;
        case 'homophonic':
            const encodedHomophonic = homophonicEncrypt(data);
            res.json({ encodedData: encodedHomophonic });
            break;
        case 'autokey':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Autokey cipher' });
            }
            const encodedAutokey = autokeyEncrypt(data, keyword);
            res.json({ encodedData: encodedAutokey });
            break;
        case 'fourSquare':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Four Square cipher' });
            }
            const keyword1 = keyword[0];
            const keyword2 = keyword[1];
            const encodedFourSquare = fourSquareEncrypt(data, keyword1, keyword2);
            res.json({ encodedData: encodedFourSquare });
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
        case 'railfence':
            const rails = 3;
            const decodedRailfence = railFenceDecrypt(encodedData, rails);
            res.json({ decodedData: decodedRailfence });
            break;
        case 'scytale':
            const scytalediameter = 3;
            const decodedScytale = scytaleDecrypt(encodedData, scytalediameter);
            res.json({ decodedData: decodedScytale });
            break;
        case 'baconian':
            const decodedBaconian = baconianDecrypt(encodedData);
            res.json({ decodedData: decodedBaconian });
            break;
        case 'gronsfeld':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Gronsfeld cipher' });
            }
            const decodedGronsfeld = gronsfeldDecrypt(encodedData, keyword);
            res.json({ decodedData: decodedGronsfeld });
            break;
        case 'homophonic':
            const decodedHomophonic = homophonicDecrypt(encodedData);
            res.json({ decodedData: decodedHomophonic });
            break;
        case 'autokey':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Autokey cipher' });
            }
            const decodedAutokey = autokeyDecrypt(encodedData, keyword);
            res.json({ decodedData: decodedAutokey });
            break;
        case 'fourSquare':
            if (!keyword) {
                return res.status(400).json({ error: 'Keyword is required for Four Square cipher' });
            }
            const keyword1 = keyword[0];
            const keyword2 = keyword[1];
            const decodedFourSquare = fourSquareDecrypt(encodedData, keyword1, keyword2);
            res.json({ decodedData: decodedFourSquare });
            break;
        default:
            res.status(400).json({ error: 'Unsupported cipher type' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong please try again later. Thank you');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
