#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const pjson = require('../package.json');
const { compress } = require('../src/functions');

const availableFileTypes = ['css', 'js'];

program
    .version(pjson.version)
    .option('-p, --path <path>', 'path to the directory')
    .option('-t --type <type>', 'type of compress [css|js], when don`t passed compress both')
    .option('-r --recursive', 'search files in the subdirectories')
    .option('-v --verbose', 'output logs to the console')
    .parse(process.argv);

program.on('--help', () => {
    console.log(`
Minify and gzip css and js files

Usage: 
./src/compressor.js -p ./public -t js
`);
});

if (!program.path && !program.type) {
    program.help();
    process.exit(1);
}

if (program.type && availableFileTypes.indexOf(program.type) === -1) {
    console.log('Set type css or js or don`t pass for use both');
    process.exit(1);
}
if (!program.path) {
    console.log('No path');
    process.exit(1);
}

if (!fs.existsSync(program.path)){
    console.log('No dir ' + program.path);
    process.exit(1);
}

const types = program.type ? [program.type] : availableFileTypes;

try {
    compress(types, program.path, program.recursive, program.verbose);
} catch (e) {
    console.log(e.message);
    process.exit(1);
}
