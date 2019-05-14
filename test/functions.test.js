const { assert } = require('chai');
const fs = require('fs');
const { minify, findFiles, minifyJs, minifyCss } = require('../src/functions');

const filesPath = __dirname + '/data/';

describe('functions.js', () => {
    describe('findFiles()', () => {
        it('should find js files in the directory', () => {
            findFiles(filesPath, /\.js$/, false, (filename) => {
                assert(filename, filename + 'bootstrap.js')
            });
        });
    });

    describe('minify()', () => {
        const compressedFile = __dirname + '/data/bootstrap.min.js';

        after(() => fs.unlink(compressedFile, () => {}));
        it('should minify js files', () => {
            minify(__dirname + '/data/bootstrap.js', minifyJs);
            assert(fs.existsSync(compressedFile));
        });

    });

    describe('minifyJs()', () => {
        it('should minify js code', () => {
            const minified = minifyJs(`const varibale = 12345;
const f = (param) => console.log(param)
f(1)`
            );
            assert.equal(minified, '"use strict";var varibale=12345;var f=function f(param){return console.log(param)};f(1);')
        });
    });
    describe('minifyCSS()', () => {
        it('should minify css code', () => {
            const minified = minifyCss(`html {
    background: #000,
    font-size: 20px
}

a.link {
    color: #fff
}
            `);
            assert.equal(minified,'html{background:#000,font-size: 20px}a.link{color:#fff}');
        });
    });
});
