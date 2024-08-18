const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('test');
});

app.post('/encode', (req, res) => {
    const { data } = req.body;
    if (typeof data !== 'string') {
        return res.status(400).json({ error: 'Data must be a string' });
    }
    const encodedData = Buffer.from(data).toString('base64');
    res.json({ encodedData });
});

app.post('/decode', (req, res) => {
    const { encodedData } = req.body;
    if (typeof encodedData !== 'string') {
        return res.status(400).json({ error: 'Encoded data must be a string' });
    }
    try {
        const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
        res.json({ decodedData });
    } catch (error) {
        res.status(400).json({ error: 'Invalid BASE64 encoded data' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
