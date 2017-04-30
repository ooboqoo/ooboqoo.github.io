# ESLint

http://eslint.org/

`.eslintrc`

```json
{
  "parser": "babel-eslint",
  "plugins": [
    "babel",
    "react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/prop-types": 0,
    "quotes": ["warn", "single"],
    "no-debugger": "warn"
  }
}
```
