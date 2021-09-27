const fs = require('fs');
const { countWords, countBytes, countCharacters, countLines } = require("./stats");

const filenames = process.argv.slice(2);

let totalBytes = 0;
let totalCharacters = 0;
let totalWords = 0;
let totalLines = 0;

const stats = {
	files: {},
	total: null,
};

for (const filename of filenames) {
	const buffer = fs.readFileSync(filename);
	const byteCount = countBytes(buffer);
	const text = buffer.toString('utf-8');
	const characters = countCharacters(text);
	const words = countWords(text);
	const lines = countLines(text);

	stats.files[filename] = {
		bytes: byteCount,
		characters: characters,
		words: words,
		lines: lines
	};

	totalBytes += byteCount;
	totalCharacters += characters;
	totalWords += words;
	totalLines += lines;
}

stats.total = {
	bytes: totalBytes,
	characters: totalCharacters,
	words: totalWords,
	lines: totalLines
};

console.log(stats);
