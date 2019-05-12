# 编辑器配置

编辑器选用 VS Code，对于 React Native 项目作以下配置。

## ESLint

[JSLint-JSHint-ESLint 对比](http://moelove.info/2015/11/28/JSLint-JSHint-ESLint%E5%AF%B9%E6%AF%94%E5%92%8CVim%E9%85%8D%E7%BD%AE/) 总结地不错，大概就是，ESLint 作为后来者，虽然运行慢了点，但是能很好地支持 ES6 和 JSX。

配置教程参考：https://medium.com/the-react-native-log/getting-eslint-right-in-react-native-bd27524cc77b

1. 安装编辑器 ESLint 插件
2. `npm i --save-dev babel-eslint eslint eslint-plugin-react`
3. 添加 `.eslintrc` 配置文件

```
{
  "parser": "babel-eslint",  // default parser espree does not support static properties
  "env": {
    "browser": true,         // 注1
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/prop-types": 0,
    "quotes": ["error", "single"]
  },
  "globals": {
    "fetch": true
  },
  "settings": {
    "react": {
      "version": "16.0"
    }
  }
}
```


[注1] React Native mimics some APIs found in browsers like timers (setInterval, clearInterval, etc…) or Geolocation API. 虽然这个解决方案不够完美(好多浏览器方法 RN 没有实现，用了也不会报错)，但比那个 eslint-plugin-react-native 插件靠谱，那东西没鸟用。

## Flow

1. 安装编辑器插件 Flow Language Support
2. `npm i -g flow-bin@0.40`  (对版本要求还挺严格，自动装的 0.44 不来，输入 flow 命令发现版本不对)
3. `.flowconfig` 已经配好了，具体也不去研究，貌似 FB 对这个配置文件的格式自己也不满意

```
; Ignore tests      // 自己添加的这个
.*/__tests__/.*       // 不屏蔽这个，测试文件都报错
```

FB 觉得 TS 不够好，非得搞一个 Flow，慢死，勉强用吧。
