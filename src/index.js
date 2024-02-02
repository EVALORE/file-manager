import { Worker } from 'node:worker_threads';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { EOL } from 'node:os';
import readline from 'node:readline';

import { initFM } from './initFileManager.js';
import { showMessage } from './userMessage.js';

const require = createRequire(import.meta.url);
const operations = require('./data/operations.json');
const env = require('./data/environment.json');

function createWorker(command, args, cb) {
  const types = {
    nwd: resolve(env.currentDir, 'operationHandlers', 'nwdHandler.js'),
    fs: resolve(env.currentDir, 'operationHandlers', 'fsHandler.js'),
    os: resolve(env.currentDir, 'operationHandlers', 'osHandler.js'),
    hash: resolve(env.currentDir, 'operationHandlers', 'hashHandler.js'),
    zlib: resolve(env.currentDir, 'operationHandlers', 'zlibHandler.js'),
  };

  const worker = new Worker(types[operations[command]], {
    workerData: { command, values: args },
  });

  worker.on('message', (data) => {
    data.cwd && process.chdir(data.cwd);
    data.message && showMessage(data.message);
  });

  worker.on('exit', () => {
    cb();
  });
}

function main() {
  initFM();
  showMessage('greetUser');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion() {
    showMessage('showCurrentDirectory');
    rl.question('> ', (data) => {
      const [command, ...args] = data.trim().split(' ');
      if (operations[command])
        operations[command] === 'exit'
          ? process.exit()
          : createWorker(command, args, () => askQuestion());
      else {
        showMessage('invalidInput');
        askQuestion();
      }
    });
  }

  askQuestion();

  process.on('exit', () => {
    showMessage('closeApp');
  });

  process.on('SIGINT', () => {
    process.exit();
    showMessage('closeApp');
  });
}

main();
