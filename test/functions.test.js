const { assert } = require('chai');
const fs = require('fs');
const { minify, findFiles, minifyJs, minifyCss } = require('../src/functions');

const filesPath = __dirname + '/data/';

describe('functions.js', () => {
    describe('findFiles()', () => {
        it('should find js files in the directory', done => {
            findFiles(filesPath, /\.js$/, false, (filename) => {
                assert.equal(filename, filesPath + 'bootstrap.js');
                done()
            });
        });

        it('should find css files in the directory', done => {
            findFiles(filesPath, /\.css$/, false, (filename) => {
                assert.equal(filename, filesPath + 'bootstrap.css');
                done()
            });
        });

        it('should find files in the directory and subdirectory', done => {
            findFiles(filesPath, /\.js$/, true, (filename) => {
                assert.notEqual(
                    -1,
                    [
                        filesPath + 'bootstrap.js',
                        filesPath + 'subdirectory/test.js'
                    ].indexOf(filename)
                );
                done();
            });
        });
    });

    describe('minify()', () => {
        const compressedJsFile = __dirname + '/data/bootstrap.min.js';
        const compressedCssFile = __dirname + '/data/bootstrap.min.css';

        after(() => {
            fs.unlink(compressedJsFile, () => {});
            fs.unlink(compressedCssFile, () => {})
        });

        it('should minify js files', () => {
            minify(__dirname + '/data/bootstrap.js', minifyJs);
            assert.isTrue(fs.existsSync(compressedJsFile));
        });

        it('should minify css files', () => {
            minify(__dirname + '/data/bootstrap.css', minifyCss);
            assert.isTrue(fs.existsSync(compressedCssFile));
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
