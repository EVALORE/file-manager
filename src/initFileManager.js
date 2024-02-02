import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const env = require('./data/environment.json');

function checkArgs() {
  const args = process.argv.slice(2);

  if (!(args.length === 2)) {
    console.log('Missing arguments');
    console.log('Ex: node src -- --username=username');
    return process.exit(1);
  }

  if (!args[1].includes('--username=')) {
    console.log('Invalid argument: valid argument is --username=<username>');
    return process.exit(1);
  }

  env.username = args[1].split('=')[1];
}

function setInitDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  env.currentDir = __dirname;
  process.chdir(homedir());
}

export function initFM() {
  checkArgs();
  setInitDirectory();
}
