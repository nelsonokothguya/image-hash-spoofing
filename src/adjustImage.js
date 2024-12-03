const { Worker } = require('worker_threads');
const sharp = require('sharp');
const os = require('os');
const path = require('path');
const fs = require('fs').promises;

const { sha512Hash } = require('./hashUtils');

const NUM_WORKERS = os.cpus().length; // Number of CPU cores to determine the number of workers

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

/**
 * Adjusts an image file to have a hash that starts with the given prefix using parallel workers.
 * @param {string} targetPrefix - The desired hash prefix.
 * @param {string} inputFile - Path to the input image.
 * @param {string} outputFile - Path to save the modified image.
 */
async function adjustImageHexPrefix(targetPrefix, inputFile, outputFile) {
    const imageBuffer = await sharp(inputFile).toBuffer();
    const totalIterations = 50000000; // Adjust based on needs
    const iterationsPerWorker = Math.ceil(totalIterations / NUM_WORKERS);

    console.log(`Starting adjustment with ${NUM_WORKERS} workers...`);

    const workerPromises = [];
    for (let i = 0; i < NUM_WORKERS; i++) {
        const start = i * iterationsPerWorker;
        const end = Math.min(start + iterationsPerWorker, totalIterations);

        workerPromises.push(
            runWorker({
                buffer: imageBuffer,
                targetPrefix,
                start,
                end,
            })
        );
    }

    const results = await Promise.all(workerPromises);

    for (const result of results) {
        if (result.success) {
            console.log(`Match found! Iteration: ${result.iteration}, Hash: ${result.hash}`);
            await fs.writeFile(outputFile, result.modifiedBuffer);
            console.log(`Modified file saved to ${outputFile}`);
            return;
        }
    }

    console.log('No match found after all iterations.');
}

module.exports = { adjustImageHexPrefix };
