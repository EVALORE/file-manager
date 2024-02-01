import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const env = require('./data/environment.json');

function checkArgs() {
  const args = process.argv.slice(2);

  const isValidLength = args.length === 2;
  const isValidFlag = args[1].includes('--username');

  if (!isValidLength || !isValidFlag) {
    console.log('Invalid arguments');
    return process.exit(1);
  }

  env.username = args[1].split('=')[1];
}

function setInitDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  env.currentDir = __dirname;
  process.chdir(env.currentDir);
}

export { checkArgs, setInitDirectory };
