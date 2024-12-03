const { adjustImageHexPrefix } = require('./adjustImage');

/**
 * Parses command-line arguments and executes the hash adjustment logic.
 */

async function handleCli () {

    const [targetHex, inputFile, outputFile] = process.argv.slice(2);

    //Authenticate args
    if (!targetHex || !inputFile || !outputFile) {
        console.error('Usage: spoof <hexPrefix> <inputFile> <outputFile>');
        process.exit(1); // Exit with an error code
    }

    try {
        // Execute the adjustment function with the provided arguments
        await adjustImageHexPrefix(targetHex, inputFile, outputFile);
    } catch (error) {
        console.error('Error:', error.message);
    }

}

module.exports = { handleCli }