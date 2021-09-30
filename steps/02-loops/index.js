const urls = process.argv.slice(2);

// Traditional for loop!
for (let i = 0; i < urls.length; ++i) {
  console.log(urls[i]);
}

// for..in loops through all the _keys_ in an object/array
for (const url in urls) {
  console.log(url);
}

// for..of loops through all the _values_ in an object/array
// You likely want this if you are writing a for loop
for (const url of urls) {
  console.log(url);
}

// TIP: prefer .forEach, .map .reduce functions for performing operations on arrays
//  - out of scope for this but a good research topic!
