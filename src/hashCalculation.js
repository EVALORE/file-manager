import { workerData } from 'node:worker_threads';
import { createHash } from 'node:crypto';
import { open } from 'node:fs/promises';

async function calculateHash() {
  const fileHandle = await open(workerData.arguments[0]);
  const readStream = fileHandle.createReadStream();
  const hash = createHash('sha256');

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('end', () => {
    console.log(hash.digest('hex'));
    fileHandle.close();
  });
}

calculateHash();
