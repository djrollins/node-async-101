/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const fs = require('fs/promises');
const stats = require('./stats');

const processUrl = async (url) => {
  const response = await axios.get(url.toString());

  if (response.status !== 200) {
    console.error('ERROR', url, response.status);
    process.exit(-1);
  }

  const text = response.data;
  const characters = stats.countCharacters(text);
  const words = stats.countWords(text);
  const lines = stats.countLines(text);

  return { url: url.toString(), characters, words, lines };
};

const renderResults = (results) => {
  const renderOne = (result) => {
    const { lines, words, characters, url } = result;
    return `${lines}\t${words}\t${characters}\t${url}`;
  };
  return results.map(renderOne).join('\n');
};

const processFile = async (file) => {
  const contents = await file.handle.readFile('utf-8');
  const urls = contents.split(/\s+/).filter((url) => url.trimEnd() !== '');
  const results = urls.map((url) => {
    const parsedUrl = parseUrl(url);
    return processUrl(parsedUrl);
  });

  return Promise.all(results);
};

const processArgument = async (arg) => {
  if (arg instanceof URL) {
    return processFile(arg);
  } else {
    return processUrl(arg);
  }
};

const parseFilePath = async (path) => {
  try {
    const handle = await fs.open(path, 'r');
    return { path, handle };
  } catch (error) {
    return undefined;
  }
};

const parseUrl = (url) => {
  try {
    return new URL(url);
  } catch (error) {
    return undefined;
  }
};

const parseArguments = async () => {
  const argv = process.argv.slice(2);
  const parsedArgs = [];

  for (const arg of argv) {
    const parsedArg = parseUrl(arg) || (await parseFilePath(arg));

    if (parsedArg) {
      parsedArgs.push(parsedArg);
    } else {
      console.error(`${arg} is not a valid URL or file name`);
      process.exit(-1);
    }
  }

  return parsedArgs;
};

const main = async () => {
  const args = await parseArguments();
  const processing = args.map(processArgument);
  const results = await Promise.all(processing);
  console.log(renderResults(results));
};

main();
