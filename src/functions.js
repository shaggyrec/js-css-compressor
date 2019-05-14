const fs = require('fs');
const babel = require('babel-core');
const path = require('path');
const CleanCSS = require('clean-css');
const zlib = require('zlib');

function minify (filename, minifyFunc) {
    const filenameWithoutExt = filename.replace(RegExp(path.parse(filename).ext + '$'), '');
    const result = minifyFunc(fs.readFileSync(filename, 'utf8'));
    const minifiedFile = `${filenameWithoutExt}.min${path.parse(filename).ext}`;
    fs.writeFileSync(minifiedFile, result);
    return minifiedFile;
}

function minifyJs (code) {
    return babel.transform(code, {
        minified: true,
        presets: ['env', 'stage-0']
    }).code;
}

function minifyCss (code) {
    return new CleanCSS({}).minify(code).styles;
}

function findFiles(startPath, filter, recursive, callback) {
    fs.readdirSync(startPath).filter(file => {
        const filename = path.join(startPath, file);
        if (fs.lstatSync(filename).isDirectory() && recursive) {
            findFiles(filename, filter, recursive, callback);
        } else if ((new RegExp(filter)).test(filename) && !(new RegExp(`.min${filter}`)).test(filename)) {
            callback(filename);
        }
    });
}

function compress(types, path, recursive, verbose) {
    types.map(type => {
        findFiles(path, `.${type}$`, recursive, filename => {
            if(verbose) {
                console.log(`${filename} is compressing`)
            }
            const minified = minify(
                filename,
                type === 'js' ? minifyJs : minifyCss
            );

            const output =fs.createWriteStream(`${minified}.gz`);
            fs.createReadStream(minified)
            .pipe(zlib.createGzip())
            .pipe(output);

            if(verbose) {
                console.log(`${filename} has compressed`)
            }
        });
    });
}

module.exports = {
    minify,
    findFiles,
    minifyCss,
    minifyJs,
    compress
};
