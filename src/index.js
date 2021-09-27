const request = require('sync-request');

const {
  countWords,
  countBytes,
  countCharacters,
  countLines,
} = require('./stats');

const urls = process.argv.slice(2);

let totalBytes = 0;
let totalCharacters = 0;
let totalWords = 0;
let totalLines = 0;

const stats = { urls: {}, errors: [], total: null };

for (const url of urls) {
  const response = request('GET', url);

  if (response.statusCode !== 200) {
    stats.errors.push(url);
    continue;
  }

  const text = response.body.toString('utf-8');

  const byteCount = countBytes(response.body);
  const characters = countCharacters(text);
  const words = countWords(text);
  const lines = countLines(text);

  stats.urls[url] = {
    bytes: byteCount,
    characters: characters,
    words: words,
    lines: lines,
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
  lines: totalLines,
};

console.log(stats);
