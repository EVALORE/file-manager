import { workerData, isMainThread, parentPort } from 'worker_threads';
import { resolve, dirname, sep } from 'path';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

function goUpper() {
  parentPort.postMessage({
    // cwd: process.cwd().split(sep).slice(0, -1).join(sep),
    cwd: resolve(process.cwd(), '../'),
  });
}

function changeDirectory() {
  workerData.arguments[0] &&
    parentPort.postMessage({
      cwd: resolve(process.cwd(), workerData.arguments[0]),
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

function navigationHandler() {
  console.log(workerData.input);
  if (workerData.input === 'up') {
    goUpper();
  }
  if (workerData.input === 'ls') {
    showFiles();
  }
  if (workerData.input === 'cd') {
    changeDirectory();
  }
}

navigationHandler();
