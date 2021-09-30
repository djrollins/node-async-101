// Require external package (must be in package.json and installed to node_modules)
const request = require('sync-request');

const urls = process.argv.slice(2);

for (const url of urls) {
  // API docs for `sync-request` here: https://www.npmjs.com/package/sync-request#usage
  const response = request('GET', url);
  console.log(response);
}
