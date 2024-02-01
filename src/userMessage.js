import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const env = require('./data/environment.json');

async function greetUser() {
  console.log(`Welcome to the File Manager, \x1b[35m${env.username}\x1b[0m!`);
  console.log('────────────────────────────────────────────');
}

async function closeApp() {
  console.log(`Thank you for using File Manager, ${env.username}, goodbye!`);
  console.log('─────────────────────────────────────────');
}

function showCurrentDirectory() {
  console.log(`You are currently in \x1b[35m${process.cwd()}\x1b[0m!`);
  console.log('────────────────────────────────────────────');
}

export { greetUser, closeApp, showCurrentDirectory };
