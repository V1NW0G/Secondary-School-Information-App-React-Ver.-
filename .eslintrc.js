module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "arrow-parens": 0,
        "generator-star-spacing": 0,
        "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "comma-dangle": ["error", "always-multiline"],
        "prefer-promise-reject-errors": ["off"],
        "semi": ["error", "never"],
    },
}
