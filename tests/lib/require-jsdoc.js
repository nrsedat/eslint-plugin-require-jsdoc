'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/require-jsdoc', {
    valid: [
        '/*@return*/function doSomething() {return 1+2;}'
    ],

    invalid: [
        {
            code: 'function doSomething() {return 1+2;}',
            errors: [ { message: 'Missing @jsdoc for doSomething' } ]
        }
    ]
});
