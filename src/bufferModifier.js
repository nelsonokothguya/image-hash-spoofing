/**
 * Modifies the buffer by appending a unique marker to adjust the hash.
 * @param {Buffer} buffer - The original buffer to modify.
 * @param {number} iteration - The current iteration number to generate a unique marker.
 * @returns {Buffer} - The modified buffer.
 */

function modifyBuffer(buffer, iteration) {
    const marker = Buffer.from(iteration.toString(16).padStart(16, '0'), 'hex')
    return Buffer.concat([buffer, marker])
}

module.exports = { modifyBuffer }