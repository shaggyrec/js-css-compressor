#!/usr/bin/env node

const program = require('commander');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const pjson = require('../package.json');
const { minify, findFiles, minifyCss, minifyJs } = require('./functions');

program
    .version(pjson.version)
    .option('-p, --path <path>', 'path to the directory')
    .option('-t --type <type>', 'type of compress [css|js]')
    .parse(process.argv);

if (program.type !== 'js' && program.type !== 'css') {
    console.log('Set type css or js');
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

findFiles(program.path, `.${program.type}$`, false, filename => {
    const minified = minify(
        filename,
        program.type === 'js' ? minifyJs : minifyCss
    );
    fs.createReadStream(minified)
        .pipe(gzip)
        .pipe(fs.createWriteStream(`${minified}.gz`));
});

process.exit(0);
