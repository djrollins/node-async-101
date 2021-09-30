const { fetchUrl } = require('fetch');

const urls = process.argv.slice(2);

const results = [];

for (const url of urls) {
  fetchUrl(url, (_, meta, body) => {
    if (meta.status !== 200) {
      console.error(`ERROR: unable to retrieve ${url}. HTTP Status ${status}`);
      return;
    }

    const bytes = body.length;
    const text = body.toString('utf-8');
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
  });
}

// this won't work because it executes this line before all of the fetch callbacks have run!
console.log(results);

// We can fix this, but it's waste of time because we now have promises!
