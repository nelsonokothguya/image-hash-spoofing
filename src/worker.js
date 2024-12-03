const { parentPort, workerData } = require('worker_threads');
const { sha512Hash } = require('./hashUtils');
const { modifyBuffer } = require('./bufferModifier');

const { buffer, targetPrefix, start, end } = workerData;

function findHashInRange(buffer, targetPrefix, start, end) {
    for (let i = start; i < end; i++) {
        const modifiedBuffer = modifyBuffer(buffer, i);
        const hash = sha512Hash(modifiedBuffer);

        if (hash.startsWith(targetPrefix)) {
            return { success: true, iteration: i, hash, modifiedBuffer };
        }
    }
    return { success: false };
}

const result = findHashInRange(Buffer.from(buffer), targetPrefix, start, end);
parentPort.postMessage(result);
