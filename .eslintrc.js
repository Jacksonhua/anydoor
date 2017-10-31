module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
    },
    "rules": {
        "no-console": ["error", {
            "allow": ["warn", "error", "info"]
          }],
        "indent": [
            "error",
            "tab"
        ],
		
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};