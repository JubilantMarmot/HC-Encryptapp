function scytaleEncrypt(text, diameter) {
    const numCols = Math.ceil(text.length / diameter);
    const grid = Array.from({ length: diameter }, () => []);
    
    for (let i = 0; i < text.length; i++) {
        const row = i % diameter;
        const col = Math.floor(i / diameter);
        grid[row][col] = text[i];
    }

    let result = '';
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < diameter; row++) {
            if (grid[row][col]) {
                result += grid[row][col];
            }
        }
    }

    return result;
}

function scytaleDecrypt(text, diameter) {
    const numCols = Math.ceil(text.length / diameter);
    const grid = Array.from({ length: diameter }, () => []);
    let index = 0;

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < diameter; row++) {
            if (index < text.length) {
                grid[row][col] = text[index++];
            }
        }
    }

    let result = '';
    for (let row = 0; row < diameter; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col]) {
                result += grid[row][col];
            }
        }
    }

    return result;
}

module.exports = { scytaleEncrypt, scytaleDecrypt };
