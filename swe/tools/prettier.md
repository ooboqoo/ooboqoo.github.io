# Prettier

```bash
$ npm i -g prettier

$ npm i -D eslint-plugin-prettier eslint-config-prettier
$ vim .eslintrc.js

$ eslint --fix  # Eslint 会调用 Prettier 重新格式化文件
```

_.eslintrc.js_

```diff
module.exports = {
  "extends": [
    "plugin:vue/essential",
++  "plugin:prettier/recommended",
    "eslint:recommended"
  ]
}
```

