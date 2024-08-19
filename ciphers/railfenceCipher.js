function railFenceEncrypt(text, rails) {
    const rail = Array.from({ length: rails }, () => []);
    let direction = 1; // 1 = down, -1 = up
    let row = 0;

    for (let char of text) {
        rail[row].push(char);
        row += direction;
        if (row === 0 || row === rails - 1) {
            direction *= -1;
        }
    }

    return rail.flat().join('');
}

function railFenceDecrypt(text, rails) {
    const rail = Array.from({ length: rails }, () => []);
    let direction = 1; // same as above
    let row = 0;
    let index = 0;

    for (let char of text) {
        rail[row].push(null);
        row += direction;
        if (row === 0 || row === rails - 1) {
            direction *= -1;
        }
    }

    for (let r = 0; r < rails; r++) {
        for (let c = 0; c < rail[r].length; c++) {
            rail[r][c] = text[index++];
        }
    }

    // this is the zigzag that rail fence does
    let result = '';
    row = 0;
    direction = 1;

    for (let i = 0; i < text.length; i++) {
        result += rail[row].shift();
        row += direction;
        if (row === 0 || row === rails - 1) {
            direction *= -1;
        }
    }

    return result;
}

module.exports = { railFenceEncrypt, railFenceDecrypt };
