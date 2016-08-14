# TypeScript 配置

浏览器不能直接执行 ts 文件，得先用 tsc 编译器转译 transpile 成 JS 代码，这项工作需要进行一定的配置。

## tsconfig.json - 编译器配置

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",           // 这里还是采用了 node 的模块方案
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true, // NG与TS两家的联姻就是从加入 decorators 开始的吧
    "removeComments": false,
    "noImplicitAny": false          // 是否强制类型声明，刚开始设为 false 易于入门
  }
}
```

module 配置项用于指定生成哪个模块系统代码：'commonjs'，'amd'，'system'，或 'umd'或'es2015'。  
特别需要说明的是，system 指的是 [systemjs-builder](https://github.com/systemjs/builder) 生成的打包格式。

## typings.json - 类型声明文件管理

> TS 类型定义文件 .d.ts 主要就是定义类型，用于类型检测及提示；  
> TS 需要类型声明文件来理解各个库专有的特性和语法，如果找不到需要的 .d.ts 文件，tsc 编译器就会报错；
> 另外一个附加功能是通过添加 JSDoc 注释，在编写代码时提供提示。

很多 JavaScript 库，比如 jQuery 、 Jasmine 测试库和 Angular 自己，会通过新的特性和语法来扩展 JavaScript 环境。而 TypeScript 编译器并不能原生的识别它们。当编译器不能识别时，它就会抛出一个错误。

我们可以使用 TypeScript 类型定义文件 .d.ts 文件来告诉编译器要加载的库的类型定义。TypeScript 敏感的编辑器借助这些定义文件来显示这些库中各个特性的类型定义。

很多库在自己的 npm 包中都包含了它们的类型定义文件，TypeScript 编译器和编辑器都能找到它们。Angular 库就是这样的。遗憾的是，很多如 jQuery、Jasmine 和 Lodash 等库都没有在它们自己的 npm 包中包含 d.ts 文件。幸运的是，它们的作者或社区中的贡献者已经为这些库创建了独立的 d.ts 文件，并且把它们发布到了一个众所周知的位置。有一个叫 typings 的工具可以为我们找到并获取这些文件。

这个 typings 命令行工具会把我们在 typings.json 文件中指定的那些 d.ts 文件安装进 typings 目录。

```js
// typings.json
{
  "globalDependencies": {
    "angular-protractor": "registry:dt/angular-protractor#1.5.0+20160425143459",
    "core-js": "registry:dt/core-js#0.0.0+20160602141332",
    "jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
    "node": "registry:dt/node#6.0.0+20160621231320",
    "selenium-webdriver": "registry:dt/selenium-webdriver#2.44.0+20160317120654"
  }
}
```

要学习关于 typings 工具的更多特性，请到 [github](https://github.com/typings/typings)

```
typings list  // 列出安装的文件，有过期的会提醒更新
typings install node --source dt --global --save  // 更新 node 文件的命令
```
