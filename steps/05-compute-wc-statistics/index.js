const request = require('sync-request');

const urls = process.argv.slice(2);

for (const url of urls) {
  const response = request('GET', url);

  if (response.statusCode !== 200) {
    console.error('ERROR', url, response.statusCode);
    continue; // If we error just restart the loop
  }

  const bytes = response.body.length;
  const text = response.body.toString('utf-8');
  const characters = text.length;
  const words = text.split(/\W+/).length;
  const lines = text.split(/\r?\n/).length;

  console.log(url, bytes, characters, words, lines);
}
