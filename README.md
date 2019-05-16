# JS CSS minify, transform and gzip compress

+ Minify CSS and JS files
+ Compiles modern JS to the ecma5
+ Gzips the files

## Install
        npm i js-css-compressor

Creates the files `<filename>.min.<ext>` and  `<filename>.min.<ext>.gz` near the original files 

## CLI usage example
        ./bin/compressor.js -p ./public -t js

### CLI help (see all commands)

        ./bin/compressor.js -h 
        

## API reference

    const compressor = require('compressor');
    
    compressor('/path/to/src', ['js'], true);

### compressor(path, types = ['js', 'css'], recursive = false)

 + `path`  (string) - path to folder `TODO: Path to single file `
 + `types` (array)  - types of compressing files ['css'|'js'], default ['js', 'css']
 + `recursive` (boolean) - search files in subdirectories, default false
 
 TODO: for api:
 + params validation
 + errors
 + callback or promise 
          
