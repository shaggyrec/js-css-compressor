import { compress } from './functions';

module.exports = function (path, types = ['js', 'css'], recursive = false, verbose = false) {
    compress(types, path, recursive, verbose);
};
