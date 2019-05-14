#!/usr/bin/env node

const program = require('commander');
const zlib = require('zlib');
const fs = require('fs');
const pjson = require('../package.json');
const { minify, findFiles, minifyCss, minifyJs } = require('./functions');

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
./scr/compressor.js -p ./public -t js
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
types.map(type => {
    findFiles(program.path, `.${type}$`, program.recursive, filename => {
        if(program.verbose) {
            console.log(`${filename} is compressing`)
        }
        const minified = minify(
            filename,
            program.type === 'js' ? minifyJs : minifyCss
        );

        const output =fs.createWriteStream(`${minified}.gz`);
        fs.createReadStream(minified)
            .pipe(zlib.createGzip())
            .pipe(output);

        if(program.verbose) {
            console.log(`${filename} has compressed`)
        }
    });
});
