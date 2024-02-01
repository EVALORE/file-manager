import { workerData, isMainThread, parentPort } from 'node:worker_threads';
import { writeFile, open, rename, copyFile, unlink } from 'node:fs/promises';

async function generateNewFile() {
  await writeFile(workerData.arguments[0], '');
}

async function readFileContent() {
  const fileHandle = await open(workerData.arguments[0]);
  const readStream = fileHandle.createReadStream();

  readStream.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  readStream.on('end', () => {
    fileHandle.close();
  });
}

function renameFile() {
  rename(workerData.arguments[0], workerData.arguments[1]);
}

async function copyEntireFile() {
  await copyFile(workerData.arguments[0], workerData.arguments[1]);
}

function removeFile() {
  unlink(workerData.arguments[0]).catch((error) => console.log(error));
}

function fsHandler() {
  if (workerData.input === 'cat') {
    readFileContent();
  }
  if (workerData.input === 'add') {
    generateNewFile();
  }
  if (workerData.input === 'rn') {
    renameFile();
  }
  if (workerData.input === 'cp') {
    copyEntireFile();
  }
  if (workerData.input === 'rm') {
    removeFile();
  }
}

fsHandler();
