import { Worker } from 'node:worker_threads';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { checkArgs, setInitDirectory } from './initOperations.js';
import { closeApp, greetUser, showCurrentDirectory } from './userMessage.js';

const require = createRequire(import.meta.url);
const operations = require('./data/operations.json');
const env = require('./data/environment.json');

function createWorker(command, args) {
  const types = {
    nwd: resolve(env.currentDir, 'navigation.js'),
    fs: resolve(env.currentDir, 'fsOperations.js'),
  };

  const worker = new Worker(types[operations[command]], {
    workerData: { input: command, arguments: args },
  });

  worker.on('message', (data) => {
    data.cwd && process.chdir(data.cwd);
  });

  worker.on('exit', () => {
    showCurrentDirectory();
    process.stdout.write('> ');
  });
}

function main() {
  checkArgs();
  greetUser();
  setInitDirectory();
  showCurrentDirectory();
  process.stdout.write('> ');

  process.stdin.on('data', (data) => {
    //! change substring to filter
    const input = data
      .toString('utf-8')
      .trim()
      .substring(0, data.length - 2);

    const [command, ...args] = input.split(' ');

    if (operations[command]) {
      operations[command] === 'exit'
        ? process.exit()
        : createWorker(command, args);
    }
  });

  process.on('exit', () => {
    closeApp();
  });

  process.on('SIGINT', () => {
    closeApp();
  });
}

main();
