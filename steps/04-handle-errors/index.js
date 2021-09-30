const request = require('sync-request');

const urls = process.argv.slice(2);

for (const url of urls) {
  const response = request('GET', url);

  if (response.statusCode !== 200) {
    console.error('ERROR', url, response.statusCode);
  }
}
