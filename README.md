# JS CSS minify, transform and gzip compress

## CLI usage example
        ./src/compressor.js -p ./public -t js

### CLI help (see all commands)

        ./src/compressor.js -h 
        

## API reference

    const compressor = require('compressor');
    
    compressor('/path/to/src', ['js'], true);

# compressor(path, types = ['js', 'css'], recursive = false)

 + `path`  (string) - path to folder `TODO: Path to single file `
 + `types` (array)  - types of compressing files ['css'|'js'], default ['js', 'css']
 + `recursive` (boolean) - search files in subdirectories, default false
 
 TODO: for api:
 + params validation
 + errors
 + callback or promise 
          
