import { workerData } from 'node:worker_threads';
import { open } from 'node:fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream';

async function compress() {
  const readFileHandle = await open(workerData.arguments[0]);
  const writeFileHandle = await open(workerData.arguments[1], 'w');

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();
  const compress = createBrotliCompress();
  pipeline(readStream, compress, writeStream, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function decompress() {
  const readFileHandle = await open(workerData.arguments[0]);
  const writeFileHandle = await open(workerData.arguments[1], 'w');

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();
  const decompress = createBrotliDecompress();
  pipeline(readStream, decompress, writeStream, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function zlibHandle() {
  if (workerData.input === 'compress') {
    compress();
  }
  if (workerData.input === 'decompress') {
    decompress();
  }
}

zlibHandle();
