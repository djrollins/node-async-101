const fetch = require('node-fetch');
const stats = require('./stats');

const urls = process.argv.slice(2);

const processUrl = async (url) => {
  const response = await fetch(url);

  if (response.status !== 200) {
    console.error('ERROR', url, response.status);
    return;
  }

  const body = await response.buffer();

  const byte = body.length;
  const text = body.toString('utf-8');

  const characters = stats.countCharacters(text);
  const words = stats.countWords(text);
  const lines = stats.countLines(text);

  return { url, byte, characters, words, lines };
};

results = [];

for (const url of urls) {
  results.push(processUrl(url));
}

Promise.all(results).then((stats) => console.table(stats));
