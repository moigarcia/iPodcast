const babelOptions = { 
    "presets": [
        "@babel/preset-react",
        [ "@babel/preset-env", {
          "targets": {
            "browsers": [ "last 1 version" ]
          }
        } ]
      ],
      "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties"]
      ]
 };

module.exports = require('babel-jest').createTransformer(babelOptions);