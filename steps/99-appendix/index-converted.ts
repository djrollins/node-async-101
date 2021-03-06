import axios from 'axios';
import fs from 'fs/promises';
import stats from './stats';

interface Stats {
  url: string;
  characters: number;
  words: number;
  lines: number;
}

const processUrl = async (url: URL): Promise<Stats> => {
  const response = await axios.get<string>(url.toString());

  if (response.status !== 200) {
    console.error('ERROR', url, response.status);
    process.exit(-1);
  }

  const text = response.data;
  const words = stats.countWords(text);
  const lines = stats.countLines(text);

  return { url, words, lines };
};

const renderResults = (results: Stats[]): string => {
  const renderOne = (result: Stats): string => {
    const { lines, words, characters, url } = result;
    return `${lines}\t${words}\t${characters}\t${url}`;
  };
  return results.map(renderOne).join('\n');
};

const processFile = async (file: File): Promise<Stats[]> => {
  const contents = await file.handle.readFile('utf-8');
  const urls = contents.split(/\s+/).filter((url) => url.trimEnd() !== '');
  const results = urls.map((url) => {
    const parsedUrl = parseUrl(url);
    return processUrl(parsedUrl);
  });

  return Promise.all(results);
};

const processArgument = async (arg: File | URL): Promise<Stats[] | Stats> => {
  if (arg instanceof URL) {
    return processFile(arg);
  } else {
    return processUrl(arg);
  }
};

interface File {
  path: string;
  handle: fs.FileHandle;
}

const parseFilePath = async (path: string) => {
  try {
    const handle = await fs.open(path, 'r');
    return { path, handle };
  } catch {
    return undefined;
  }
};

const parseUrl = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
};

const parseArguments = async (): Promise<Array<URL | File>> => {
  const argv = process.argv.slice(2);
  const parsedArgs: Array<URL | File> = [];

  for (const arg of argv) {
    const parsedArg = parseUrl(arg) || parseFilePath(arg);

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
