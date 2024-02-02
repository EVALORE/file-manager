import { workerData, isMainThread, parentPort } from 'worker_threads';
import { resolve, sep } from 'path';
import { readdir } from 'fs/promises';

function goUpper() {
  if (process.cwd().split(sep).length === 2) {
    parentPort.postMessage({
      message: 'topLevelDirectory',
    });
    return;
  }
  parentPort.postMessage({
    cwd: resolve(process.cwd(), '../'),
  });
}

function changeDirectory() {
  const { values } = workerData;
  if (!(values || values[0]))
    return parentPort.postMessage({
      message: 'destinationPathIsMissing',
    });
  if (values.length > 1)
    return parentPort.postMessage({
      message: 'tooManyArguments',
    });

  parentPort.postMessage({
    cwd: resolve(process.cwd(), values[0]),
  });
}

async function showFiles() {
  const dirToHandle = await readdir(process.cwd(), {
    withFileTypes: true,
  });
  dirToHandle.sort((a, b) =>
    a.name === b.name ? 0 : a.name < b.name ? -1 : 1
  );

  const folders = dirToHandle
    .filter((folder) => folder.isDirectory())
    .map((folder) => ({ Name: folder.name, Type: 'directory' }));
  const files = dirToHandle
    .filter((file) => file.isFile())
    .map((file) => ({ Name: file.name, Type: 'file' }));

  console.table([...folders, ...files]);
}

const operations = {
  up: goUpper,
  ls: showFiles,
  cd: changeDirectory,
};

(() => {
  if (isMainThread) return console.log('please run index.js file');
  const operation = operations[workerData.command];
  operation && operation();
})();
