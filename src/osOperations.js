import { workerData } from 'node:worker_threads';
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

function osHandler() {
  if (workerData.arguments[0] === '--EOL') {
    getEOL();
  }
  if (workerData.arguments[0] === '--cpus') {
    getCPUS();
  }
  if (workerData.arguments[0] === '--homedir') {
    showHomeDir();
  }
  if (workerData.arguments[0] === '--username') {
    showUsername();
  }
  if (workerData.arguments[0] === '--architecture') {
    showArch();
  }
}

osHandler();
