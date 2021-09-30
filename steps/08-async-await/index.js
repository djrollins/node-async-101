const fetch = require('node-fetch');

const urls = process.argv.slice(2);

const results = [];

const processUrl = async (url) => {
  const response = await fetch(url);

  if (response.status !== 200) {
    console.error(`ERROR: unable to retrieve ${url}. HTTP Status ${status}`);
    return;
  }

  const body = await response.buffer();

  const bytes = body.length;
  const text = body.toString('utf-8');
  const characters = text.length;
  const words = text.split(/\W+/).length;
  const lines = text.split(/\r?\n/).length;

  return {
    url,
    bytes,
    characters,
    words,
    lines,
  };
};

for (const url of urls) {
  results.push(processUrl(url));
}

Promise.all(results).then(console.table);
