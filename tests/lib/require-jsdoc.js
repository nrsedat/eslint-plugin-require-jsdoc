'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/require-jsdoc', {
    valid: [
        '/*@return*/function doSomething() {return 1+2;}',
        '/*@param @return*/function doSomething(string) {return string;}',
        '/*@param @return*/var test = function(string){console.log("test");}',
        'var comp = React.createClass({/*@return*/render: function(){}});'
    ],

    invalid: [
        {
            code: 'var outerFunction = function(){/*@return*/function innerFunction(){}}',
            errors: [ { message: 'Missing @jsdoc for outerFunction' }]
        },
        {
            code: 'function doSomething() {return 1+2;}',
            errors: [ { message: 'Missing @jsdoc for doSomething' } ]
        },
        {
            code: 'function doSomething(string) {return string}',
            errors: [ { message: 'Missing @jsdoc for doSomething' } ]
        },
        {
            code: '/*@return*/function doSomething(string) {return string}',
            errors: [ { message: 'Missing @param definitions' } ]
        },
        {
            code: '/*@param*/function doSomething(string) {return string}',
            errors: [ { message: 'Missing @return statement in jsdoc' } ]
        },
        {
            code: 'var test = function(){console.log("test");}',
            errors: [ { message: 'Missing @jsdoc for test' } ]
        },
        {
            code: 'var test = function(string){console.log("test");}',
            errors: [ { message: 'Missing @jsdoc for test' } ]
        },
        {
            code: '/*@return*/var test = function(string){console.log(string);}',
            errors: [ { message: 'Missing @param definitions' } ]
        },
        {
            code: '/*@param*/var test = function(string){console.log(string);}',
            errors: [ { message: 'Missing @return statement' } ]
        },
        {
            code: '/*@param*/var test = function(string,string2){console.log(string);}',
            errors: [ {message: 'Missing @return statement'}, { message: 'Missing @param definitions' } ]
        },
        {
            code: '/*@param@return*/var test = function(var1, var2){console.log(string);}',
            errors: [ { message: 'Missing @param definitions' } ]
        },
        {
            code: 'var comp = React.createClass({render: function(){}});',
            errors: [ { message: 'Missing @jsdoc for render' } ]
        }
    ]
});
