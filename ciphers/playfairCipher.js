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
	for (let i = 65; i <= 90; i++) {
		const char = String.fromCharCode(i);
		if (char !== 'J' && !seen.has(char)) {
			matrix.push(char);
		}
	}
	return chunk(matrix, 5);
}