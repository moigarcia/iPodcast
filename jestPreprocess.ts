const babelOptions = { 
    "presets": ['next/babel'],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-syntax-decorators"]
    ]
 };

module.exports = require('babel-jest').createTransformer(babelOptions);