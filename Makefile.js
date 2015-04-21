'use strict';

require('shelljs/make');

/*global exec, target*/

var TEST_FILES = find('tests/lib/').filter(fileType('js')).join(' ');

/**
 * Generates a function that matches files with a particular extension.
 * @param {string} extension The file extension (i.e. "js")
 * @returns {Function} The function to pass into a filter method.
 * @private
 */
function fileType(extension) {
    return function(filename) {
        return filename.substring(filename.lastIndexOf('.') + 1) === extension;
    };
}

target.test = function() {
    exec('istanbul cover mocha -- -c ' + TEST_FILES);
    exec('istanbul check-coverage --statement 95 --branch 70 --function 95 --lines 95');
};
