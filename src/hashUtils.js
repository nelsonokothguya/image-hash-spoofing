const crypto = require('crypto')

/**
 * Generates a SHA-512 hash of a given buffer.
 * @param {Buffer} buffer - The binary data of the file.
 * @returns {string} - The hex representation of the SHA-512 hash.
 */

function sha512Hash(buffer) {
    return crypto.createHash('sha512').update(buffer).digest('hex')
}

module.exports = { sha512Hash }