# JavaScript 文件类型检查

https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76

```js
/** @type {number} */
var x

class C {
  constructor() {
    /** @type {number | undefined} */
    this.prop = undefined
    /** @type {number | undefined} */
    this.count
  }
}

/** @type {{a: number}} */
var obj = { a: 1 }

/** @param {...number} args */
function sum(/* numbers */) { }

/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
}

```

类型定义及跨文件复用

_aa.js_

```js
/**
 * 服务端下发的音视频服务配置信息
 * @typedef {Object<string, any>} Config
 * @property {string} key  某KEY
 * @property {number} id   某ID
 */
```

_bb.js_

```js
/**
 * @typedef {import('aa').Config} Config
 */

/** @param {Config} config */
function foo (config) { }
```


## VSCode

### 类型检查报错解决

文档：[Type Checking and Quick Fixes for JavaScript Files](https://code.visualstudio.com/docs/languages/javascript#_type-checking-and-quick-fixes-for-javascript-files) / 
[Global Variables and Type Checking](https://code.visualstudio.com/docs/languages/javascript#_global-variables-and-type-checking)

只要安装 `@types` 下的包就不会再有报错，如果只是个别全局变量啥的，可以在项目根目录添加以下两个文件解决：

```js
// jsconfig.json
{
    "compilerOptions": { },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

```js
// global.d.ts
declare var anyGlobalVar: any;
declare interface Window {
    FileReader: any
}

// 方案2, 模块写法，前一种无效可试试这种方案，但官方文档用的第一种
declare global {
    var define;
    var require;
    var angular;
    var $;
    interface Window {  // vscode有提示只有在模块内才支持对 Window 的扩展
        urlParams: any;
    }
}
export {}
```



