const request = require('sync-request');

const urls = process.argv.slice(2);

const results = [];

for (const url of urls) {
  const response = request('GET', url);

  if (response.statusCode !== 200) {
    console.error(
      `ERROR: unable to retrieve ${url}. HTTP Status ${response.statusCode}`
    );
    continue; // If we error just restart the loop
  }

  const bytes = response.body.length;
  const text = response.body.toString('utf-8');
  const characters = text.length;
  const words = text.split(/\W+/).length;
  const lines = text.split(/\r?\n/).length;

  // As these are the same name we can use Shorthand property names:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
  const stats = {
    url: url,
    bytes: bytes,
    characters: characters,
    words: words,
    lines: lines,
  };

  results.push(stats);
}

console.table(results);

// time node steps/06-output-format/index.js https://google.com
// time node steps/06-output-format/index.js https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com https://google.com
