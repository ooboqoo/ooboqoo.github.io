# JS 文件类型检查

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





