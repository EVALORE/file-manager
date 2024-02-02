import { workerData, isMainThread, parentPort } from 'node:worker_threads';
import { EOL, cpus, userInfo, arch } from 'node:os';

function getEOL() {
  console.log(EOL.split(''));
}

function getCPUS() {
  console.log(`Amount of CPU cores: ${cpus().length}`);
  console.log(`Current CPU: ${cpus()[0].model}`);
  console.log(`Current CPU speed: ${cpus()[0].speed} MHz`);
}

function showHomeDir() {
  console.log(`Your home directory is ${userInfo().homedir}`);
}

function showUsername() {
  console.log(`Your username is ${userInfo().username}`);
}

function showArch() {
  console.log(`Your architecture is ${arch()}`);
}

const operations = {
  '--EOL': getEOL,
  '--cpus': getCPUS,
  '--homedir': showHomeDir,
  '--username': showUsername,
  '--architecture': showArch,
};

(() => {
  if (isMainThread) return console.log('please run index.js file');

  const { values } = workerData;

  if (!values)
    return parentPort.postMessage({
      message: 'missingArgument',
    });
  if (values.length === 0)
    return parentPort.postMessage({
      message: 'missingArgument',
    });
  if (values.length > 1)
    return parentPort.postMessage({
      message: 'tooManyArguments',
    });

  const operation = operations[values[0]];

  if (!operation)
    return parentPort.postMessage({
      message: 'invalidInput',
    });

  operation();
})();
