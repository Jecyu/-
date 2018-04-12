module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "linebreak-style": [0, "windows"],
        "camelcase": [0, {"properties": "always"}],
        "strict": [0, "global"],
        "no-unused-vars": [0, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "no-underscore-dangle": [0, { "allow": ["foo_", "_bar"] }],
        "no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],
        "comma-dangle": [2, "never"]
      },
      "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
      },
};