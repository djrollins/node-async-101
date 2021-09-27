const countBytes = (buffer) => buffer.length;

const countCharacters = (text) => text.length;

const countWords = (text) => text.split(/\s+/).length;

const countLines = (text) => text.split(/\r?\n/).length;

//function countLines(text) { return text.split(/\r?\n/).length; }

module.exports = {
	countBytes,
	countLines,
	countWords,
	countCharacters
}
