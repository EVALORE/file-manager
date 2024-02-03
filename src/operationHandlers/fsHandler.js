import { workerData, isMainThread, parentPort } from 'node:worker_threads';
import { writeFile, open, rename, copyFile, unlink } from 'node:fs/promises';

async function generateNewFile(file) {
  await writeFile(file, '');
}

async function readFileContent(file) {
  if (!file) {
    parentPort.postMessage({
      message: 'sourcePathIsMissing',
    });
    return;
  }

  const fileHandle = await open(file);
  const readStream = fileHandle.createReadStream();

  readStream.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  readStream.on('error', () => {
    parentPort.postMessage({
      message: 'operationFailed',
    });
  });

  readStream.on('end', () => {
    fileHandle.close();
  });
}

function renameFile(oldName, newName) {
  rename(oldName, newName);
}

async function copyEntireFile(src, dest) {
  if (!src)
    return parentPort.postMessage({
      message: 'sourcePathIsMissing',
    });

  if (!dest)
    return parentPort.postMessage({
      message: 'destinationPathIsMissing',
    });

  const readFileHandle = await open(src);
  const writeFileHandle = await open(dest, 'w');
  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });

  readStream.on('error', () => {
    parentPort.postMessage({
      message: 'operationFailed',
    });
  });

  readStream.on('end', () => {
    readFileHandle.close();
  });

  writeStream.on('finish', () => {
    writeFileHandle.close();
  });
}

function removeFile(toRemove) {
  unlink(toRemove).catch(() =>
    parentPort.postMessage({ message: 'operationFailed' })
  );
}

async function moveFile(source, destination) {
  await copyFile(source, destination).catch(() =>
    parentPort.postMessage({ message: 'operationFailed' })
  );

  removeFile(source);
}

const operations = {
  cat: readFileContent,
  add: generateNewFile,
  rn: renameFile,
  cp: copyEntireFile,
  mv: moveFile,
  rm: removeFile,
};

(() => {
  if (isMainThread) return console.log('please run index.js file');
  const operation = operations[workerData.command];

  const { values } = workerData;

  if (!values || values.length === 0)
    return parentPort.postMessage({
      message: 'missingArgument',
    });

  if (values.length > 2)
    return parentPort.postMessage({
      message: 'tooManyArguments',
    });

  operation && operation(...values);
})();
