const fs = require('fs');

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
	const byteCount = buffer.length;
	const text = buffer.toString('utf-8');
	const characters = text.length;
	const words = text.split(/\s+/).length;
	const lines = text.split(/\r?\n/).length;

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
