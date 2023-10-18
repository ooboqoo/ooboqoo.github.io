# CLI 工具


## CLI框架

* 最流行的老牌CLI框架 https://github.com/tj/commander.js
* 新流行的更漂亮的CLI框架 https://github.com/natemoo-re/clack
* https://github.com/yargs/yargs


## AST

* https://astexplorer.net/ 在线解析，支持多种语言 x 多种解析器
* [SpiderMonkey JS Parser API](https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)

AST Abstract Syntax Tree 抽象语法树，跟前端常接触的 DOM 非常相似，可以对 AST 进行遍历分析、修改树内容 等。

### 简明教程

https://medium.com/@dinis.cruz/ast-abstract-syntax-tree-538aa146c53b

The transformation from source code to an AST, is a very common pattern when processing any type of structured data. The typical workflow is based on “Creating a parser that converts raw data into an graph-based format, that can then be consumed by an rendering engine”.

AST 的常见应用场景

* write tests that check for what is actually happening in the code (easy when you have access to an object model of the code)
* consume log data which normal ‘regex’ based parsers struggled to understand
* perform static analysis on code written in custom languages
* transform data dumps into in-memory objects (than can then be easily transformed and filtered)
* create transformed files with slices of multiple source code files (which I called MethodStreams and CodeStreams) — See example below for what this looks like in practice
* perform custom code refactoring (for example to automatically fix security issues in code) — See example below for what this looks like in practice

### 实战

查找项目中用到的所有正则表达式

```ts
import fs from 'fs/promises';

import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

/** 查找文件中出现的 正则表达式 */
async function findRegexStrOf(filePath: string) {
  const result = new Set<string>();
  const text = await fs.readFile(filePath, 'utf8');
  const ast = acorn.parse(text, { ecmaVersion: 2020 });

  fs.writeFile('out.json', JSON.stringify(ast, null, 2));

  walk.simple(ast, {
    Literal(node) {
      if (node.regex) {
        result.add(node.regex.pattern);
      }
    },
    NewExpression(node) {
      if (node.callee?.name === 'RegExp') {
        result.add(node.arguments[0].value);
      }
    }
  });
  return result;
}

console.log(await findRegexStrOf('regex.js'));
```
