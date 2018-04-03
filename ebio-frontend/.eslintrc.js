module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "linebreak-style": ["error", "windows"],
      "camelcase": [0, {"properties": "always"}],
      "strict": [2, "global"],
      "no-unused-vars": [0, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
      "no-underscore-dangle": [0, { "allow": ["foo_", "_bar"] }],
      "no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],
      "comma-dangle": [2, "never"]
    }
};