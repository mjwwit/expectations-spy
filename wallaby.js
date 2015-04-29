module.exports = function () {
    'use strict';

    return {
        files: [
            'lib/*.js',
            'index.js'
        ],

        tests: [
            'test/*.spec.js'
        ],

        env: {
            type: 'node',
            runner: 'node'
        },
        testFramework: "mocha@2.1.0"
    };
};