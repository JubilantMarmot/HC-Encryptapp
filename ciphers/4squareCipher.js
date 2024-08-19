function createSquare(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    const square = [];
    const used = new Set();

    key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    
    for (let char of key) {
        if (!used.has(char)) {
            used.add(char);
            square.push(char);
        }
    }

    for (let char of alphabet) {
        if (!used.has(char)) {
            square.push(char);
        }
    }

    return square;
}

function getPosition(char, square) {
    const index = square.indexOf(char);
    return [Math.floor(index / 5), index % 5];
}

function fourSquareEncrypt(text, key1, key2) {
    const square1 = createSquare(key1);
    const square2 = createSquare(key2);

    text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let result = '';

    for (let i = 0; i < text.length; i += 2) {
        let a = text[i];
        let b = text[i + 1] || 'X';

        if (a === b) b = 'X';

        const [rowA, colA] = getPosition(a, square1);
        const [rowB, colB] = getPosition(b, square1);

        result += square2[rowA * 5 + colB];
        result += square2[rowB * 5 + colA];
    }

    return result;
}

function fourSquareDecrypt(text, key1, key2) {
    const square1 = createSquare(key1);
    const square2 = createSquare(key2);

    text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let result = '';

    for (let i = 0; i < text.length; i += 2) {
        let a = text[i];
        let b = text[i + 1];

        const [rowA, colA] = getPosition(a, square2);
        const [rowB, colB] = getPosition(b, square2);

        result += square1[rowA * 5 + colB];
        result += square1[rowB * 5 + colA];
    }

    return result;
}

module.exports = { fourSquareEncrypt, fourSquareDecrypt };
