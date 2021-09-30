const request = require('sync-request');

const urls = process.argv.slice(2);

const processUrl = (url) => {
  const response = request('GET', url);

  if (response.statusCode !== 200) {
    console.error(
      `ERROR: unable to retrieve ${url}. HTTP Status ${response.statusCode}`
    );
    return;
  }

  const bytes = response.body.length;
  const text = response.body.toString('utf-8');
  const characters = text.length;
  const words = text.split(/\W+/).length;
  const lines = text.split(/\r?\n/).length;

  return { url, bytes, characters, words, lines };
};

const results = [];

for (const url of urls) {
  results.push(processUrl(url));
}

console.table(results);
