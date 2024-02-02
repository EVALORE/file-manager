import { workerData, isMainThread, parentPort } from 'node:worker_threads';
import { open } from 'node:fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream';

async function compress(source, destination) {
  if (!source)
    return parentPort.postMessage({
      message: 'sourcePathIsMissing',
    });

  if (!destination)
    return parentPort.postMessage({
      message: 'destinationPathIsMissing',
    });

  const readFileHandle = await open(source);
  const writeFileHandle = await open(destination, 'w');

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();
  const compress = createBrotliCompress();
  pipeline(readStream, compress, writeStream, (err) => {
    if (err) {
      parentPort.postMessage({
        message: 'operationFailed',
      });
    }
  });
}

async function decompress(source, destination) {
  if (!source)
    return parentPort.postMessage({
      message: 'sourcePathIsMissing',
    });

  if (!destination)
    return parentPort.postMessage({
      message: 'destinationPathIsMissing',
    });

  const readFileHandle = await open(source);
  const writeFileHandle = await open(destination, 'w');

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();
  const decompress = createBrotliDecompress();
  pipeline(readStream, decompress, writeStream, (err) => {
    if (err) {
      parentPort.postMessage({
        message: 'operationFailed',
      });
    }
  });
}

const operations = {
  compress,
  decompress,
};

(() => {
  if (isMainThread) return console.log('please run index.js file');
  const { values } = workerData;
  if (values.length === 0)
    return parentPort.postMessage({
      message: 'missingArgument',
    })
  if (values.length > 2) {
    parentPort.postMessage({
      message: 'tooManyArguments',
    });
  }

  const operation = operations[workerData.command];
  operation && operation();
})();
