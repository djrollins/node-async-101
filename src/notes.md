do npm init

time node . /usr/share/dict/{british-english,american-english,words} package.json index.js

require fs

get arguments and loop through them:
    - traditional for loop
    - for-in ... not what you'd expect loops over keys, because arrays are actually objects in JavaScript but with numeric keys
    - for-of - this is what you were expecting

readFileSync
    * really we would use createReadStream, but that's more difficult and this is a demo
    * returns a buffer, but we can as node to translate it to utf-8 as part of the call, but we want the raw bytes value so lets not

get byte count

convert to text buffer.toString('utf-8');

get characters, words and lines

construct stats object (use explicit keys first)
Can just use the variable names if they are the same as the keys

const fs = require('fs');

const filenames = process.argv.slice(2);

let totalBytes = 0;
let totalCharacters = 0;
let totalWords = 0;
let totalLines = 0;

const stats = {
	files: {},
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

consider testing with jest for statistics functions
 * 📙 Emojipedia — 😃 Home of Emoji Meanings 💁👌🎍😍
 * 👨🏼‍🦳  <- should be one character?

