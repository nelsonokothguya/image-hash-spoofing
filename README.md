# Image Hash Spoofing Tool

A command-line tool that modifies an image file to generate a hash (SHA-based) that starts with a user-specified hexadecimal prefix, while ensuring the visual appearance of the image remains unchanged.

## Features
- Supports SHA-512 (default) and easily extendable to other hashing algorithms (e.g., SHA-256).
- Utilizes metadata or padding adjustments to avoid altering the visible image.
- Parallel processing using Node.js worker threads for faster execution.
- Handles large images efficiently with buffer manipulation.
- CLI tool for ease of use.

## Requirements
- Node.js v14+ installed.
- NPM dependencies: sharp for image manipulation.

## Installation
1. Clone the repository:

`git clone https://github.com/your-username/image-hash-spoofing.git`
`cd image-hash-spoofing`

2. Install the required dependencies:

`npm install`

3. Make the script executable:

`chmod +x index.js`


## Usage
### Syntax

`./index.js <hexPrefix> <inputFile> <outputFile>`

### Parameters
- `hexPrefix`: The desired prefix for the hash. E.g., `0x24` for a hash starting with `24`.
- `inputFile`: Path to the input image file (e.g., original.jpg).
- `outputFile`: Path to save the modified output file (e.g., altered.jpg).

### Example

`./index.js 0x2 ~/Downloads/images.jpg altered.jpg`

### Expected Output
If successful:

`Starting adjustment with 8 workers...`
`Match found! Iteration: 13245, Hash: 2af4d9a8893d...xyz`
`Modified file saved to altered.jpg`

If no match is found (after all iterations):

`No match found after all iterations.`

## Implementation Details
1. Image Buffer Modification:

- The tool modifies the image’s metadata or appends padding bytes in a non-destructive way.
2. Hashing:

- By default, uses SHA-512 to compute the file’s hash.
- Prefix matching ensures the hash starts with the specified hexadecimal sequence.
3. Parallel Processing:
- Divides the workload into multiple workers (based on CPU cores) to improve performance.


## Troubleshooting

1 Input File Not Found:

- Ensure the correct file path is provided, and the file exists.
- Test file readability using:

`file <inputFile>`
2. No Match Found:

- Increase the number of iterations in the code:

`const totalIterations = 1000000` <!--- Increase as needed -->
- Reduce the complexity of the prefix (e.g., 0x instead of 0x24).
3. Script Execution Errors:

- Ensure you’ve installed dependencies:

`npm install`

- Run the script with node instead of ./ if the shebang (#!) is not recognized:

`node index.js 0x2 ~/Downloads/images.jpg altered.jpg`

***

## Future Enhancements
- Add support for more image formats (e.g., BMP, TIFF).
- Optimize buffer manipulation for faster hash divergence.
- Implement dynamic selection of hashing algorithms (e.g., SHA-256, SHA-1).
- Add a progress bar for long-running operations.

***

## License
This project is licensed under the MIT License.

***

## Contributors
- Nelson Okoth (nelsonokothguya15@gmail.com)

***
# image-hash-spoofing
