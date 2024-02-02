import { workerData, isMainThread, parentPort } from 'node:worker_threads';
import { createHash } from 'node:crypto';
import { open } from 'node:fs/promises';

async function calculateHash(file) {
  if (!file)
    return parentPort.postMessage({
      message: 'sourcePathIsMissing',
    });

  const fileHandle = await open(file);
  const readStream = fileHandle.createReadStream();
  const hash = createHash('sha256');

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('error', () => {
    parentPort.postMessage({
      message: 'operationFailed',
    });
  });

  readStream.on('end', () => {
    console.log(hash.digest('hex'));
    fileHandle.close();
  });
}

(() => {
  if (isMainThread) return console.log('please run index.js file');
  const { values } = workerData;

  if (!values || values.length === 0)
    return parentPort.postMessage({
      message: 'missingArgument',
    });

  if (values.length > 1)
    return parentPort.postMessage({
      message: 'tooManyArguments',
    });

  calculateHash(...values);
})();
