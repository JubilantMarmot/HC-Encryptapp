const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('test');
});

app.post('/encode', (req, res) => {
    const { data } = req.body;
    const encodedData = Buffer.from(data).toString('base64');
    res.json({ encodedData });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}!`);
});
