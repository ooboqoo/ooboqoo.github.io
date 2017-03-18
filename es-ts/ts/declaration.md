# 声明文件

## 要点

* 使用 `declare` 来表明这是 ts 专用的声明定义
* 使用 `tsc -d` 来编译一些 ts 文档以熟悉具体的行为
* 全局变量形式的外部依赖库使用 `/// <reference types="somelib" />` 声明，应是借鉴 index.html 中的 `<script src="path/to/somelib.js"></script>` 来设计的
* 模块形式的外部依赖库使用 `import * as SomeLib form 'somelib'`（整体加载） 或 `import { Parts } from 'somelib'`（加载其中部件）声明，具体采用哪种格式根据依赖库的写法及实际使用场景选择使用
* `namespace` 对应一个全局变量声明（模块形式的库是模块内的一个变量，一般就是模块名），对于现代的库基本没有使用的必要了
* `interface` 本来就是 ts 特有的，声明文件会照搬过去
* `export =` 的写法对应的是 CJS 模块规范的 `module.exports =`，指定模块整体输出内容，而多个 `export` 对应的是 ES6 模块规范，现在第三方库的定义文件中一般都是两者并存，`export` 一些独立的组件，而 `export =` 的是整个 模块/类 名。正是这种情况，导致使用库时，`import * as LibName from 'libname'` 和 `import { Parts } from 'libname'` 两种写法并存，使用时应根据实际情况选用。但实际使用时，后端代码一般都是配置为 编译成 CJS 格式使用，所以到最终运行时的其实都转换成了整体依赖使用，至于前端，不清楚各模块加载器的具体实现，理论上只有 ES6 才支持静态分析，但实际使用应该也没什么区别。

示例分析：

```ts
// Type definitions for Koa 2.x
// Project: http://koajs.com
// Definitions by: DavidCai1993 <https://github.com/DavidCai1993>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />           // 依赖 node 环境，属于全局变量依赖
import { EventEmitter } from "events";   // 只导入 events 的其中一个定义
import * as cookies from "cookies";      // cookies 采用整体依赖导入

export = Koa;            // 指定整体引用模块时的导出内容，此内容对应代码中的 `module.exports =`

declare namespace Koa {  // Context Request Response 这些接口定义并不属于 Koa 类的一部分，所以单独提取出来，
                         // 放到 Koa 命名空间下，这里的内容及后面的类定义最终会通过 声明合并 整合成单一声明
    export interface Context extends Request, Response {
        app: Koa;
        req: http.IncomingMessage;
        // .......
        toJSON(): any;
        inspect(): any;
        [key: string]: any;
    }
    export interface Request { }
    export interface Response { }
    export type Middleware = (ctx: Koa.Context, next: () => Promise<any>) => any;
}

declare class Koa extends EventEmitter {
    // 类声明，如果添加一个 `export` 的话，就可以 `import { Koa } from 'koa'` 了，
    // 但这种方式的 Koa 只包含类定义本身，不包含其他接口定义等内容
}
```


## Library Structures

### 区分库的类型

#### Global Libraries

全局库是指能在全局命名空间下直接访问的库，全局库只是简单的暴露出一个或多个全局变量。

全局库声明文件模版：[global.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html)

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ If this library is callable (e.g. can be invoked as myLib(3)),
 *~ include those call signatures here.
 *~ Otherwise, delete this section.
 */
declare function myLib(a: string): string;
declare function myLib(a: number): number;

/*~ If you want the name of this library to be a valid type name,
 *~ you can do so here.
 *~
 *~ For example, this allows us to write 'var x: myLib';
 *~ Be sure this actually makes sense! If it doesn't, just
 *~ delete this declaration and add types inside the namespace below.
 */
interface myLib {
    name: string;
    length: number;
    extras?: string[];
}

/*~ If your library has properties exposed on a global variable,
 *~ place them here.
 *~ You should also place types (interfaces and type alias) here.
 */
declare namespace myLib {
    //~ We can write 'myLib.timeout = 50;'
    let timeout: number;

    //~ We can access 'myLib.version', but not change it
    const version: string;

    //~ There's some class we can create via 'let c = new myLib.Cat(42)'
    //~ Or reference e.g. 'function f(c: myLib.Cat) { ... }
    class Cat {
        constructor(n: number);
        readonly age: number;
        purr(): void;
    }

    //~ We can declare a variable as
    //~ var s: myLib.CatSettings = { weight: 5, name: "Maru" };
    interface CatSettings {
        weight: number;
        name: string;
        tailLength?: number;
    }

    //~ We can write 'const v: myLib.VetID = 42;'
    //~  or 'const v: myLib.VetID = "bob";'
    type VetID = string | number;

    //~ We can invoke 'myLib.checkCat(c)' or 'myLib.checkCat(c, v);'
    function checkCat(c: Cat, s?: VetID);
}
```


#### Modular Libraries

许多流行的 Node.js 库都是此类型，具体的示例包含在下面 UMD 部分。

#### UMD

UMD 模块会检查是否存在模块加载器环境，优先采用模块化形式，当不存在模块加载器时才回退到全局库形式。大多数流行的库现在都采用这种方式发布。

UMD 模块的模板有三种，须根据实际选用：[module.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html), [module-class.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html) and [module-function.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-function-d-ts.html).

* 如果模块能够作为函数调用就使用 module-function.d.ts
* 如果模块能够使用new来构造使用 module-class.d.ts
* 如果模块不能被调用或构造则使用 module.d.ts

```ts
/*~ If this module is a UMD module that exposes a global variable 'myFuncLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace myFuncLib;

/*~ This declaration specifies that the function is the exported object from the file
 */
export = MyFunction;

/*~ This example shows how to have multiple overloads for your function */
declare function MyFunction(name: string): MyFunction.NamedReturnType;
declare function MyFunction(length: number): MyFunction.LengthReturnType;

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block. Often you will want to describe the
 *~ shape of the return type of the function; that type should
 *~ be declared in here, as this example shows.
 */
declare namespace MyFunction {
    export interface LengthReturnType {
        width: number;
        height: number;
    }
    export interface NamedReturnType {
        firstName: string;
        lastName: string;
    }

    /*~ If the module also has properties, declare them here. */
    export const defaultName: string;
    export let defaultLength: number;
}
```

#### Module Plugin or UMD Plugin

[module-plugin.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html)

```ts
/*~ This is the module plugin template file. You should rename it to index.d.ts */

/*~ On this line, import the module which this module adds to */
import * as m from 'someModule';

/*~ You can also import other modules if needed */
import * as other from 'anotherModule';

/*~ Here, declare the same module as the one you imported above */
declare module 'someModule' {
    /*~ Inside, add new function, classes, or variables. You can use
     *~ unexported types from the original module if needed. */
    export function theNewMethod(x: m.foo): other.bar;

    /*~ You can also add new properties to existing interfaces from
     *~ the original module by writing interface augmentations */
    export interface SomeModuleOptions {
        someModuleSetting?: string;
    }

    /*~ New types can also be declared and will appear as if they
     *~ are in the original module */
    export interface MyModulePluginOptions {
        size: number;
    }
}
```

#### Global Plugin

[global-plugin.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-plugin-d-ts.html)

```ts
/*~ This template shows how to write a global plugin. */

/*~ Write a declaration for the original type and add new members. */
interface Number {
    toBinaryString(opts?: MyLibrary.BinaryFormatOptions): string;
    toBinaryString(callback: MyLibrary.BinaryFormatCallback, opts?: MyLibrary.BinaryFormatOptions): string;
}

/*~ If you need to declare several types, place them inside a namespace
 *~ to avoid adding too many things to the global namespace.
 */
declare namespace MyLibrary {
    type BinaryFormatCallback = (n: number) => string;
    interface BinaryFormatOptions {
        prefix?: string;
        padding: number;
    }
}
```

#### Global-modifying Modules

当一个全局修改的模块被导入的时候，它们会改变全局作用域里的值。这种模式很危险，可能造成运行时的冲突，但是我们仍然可以为它们书写声明文件。

### 调用时依赖处理

#### Dependencies on Global Libraries

If your library depends on a global library, use a `/// <reference types="..." />` directive:

```ts
/// <reference types="someLib" />      // 另外还有 path="" 这种用法，用于显示指定定义文件，但应尽量避免

function getThing(): someLib.thing;
```

#### Dependencies on Modules

If your library depends on a module, use an import statement:

```ts
import * as moment from "moment";

function getThing(): moment;
```

#### Dependencies on UMD libraries

If your global library depends on a UMD module, use a `/// <reference types="..." />` directive;

If your module or UMD library depends on a UMD library, use `import * as someLib from 'someLib';`

`reference` 对应的使用场景是全局变量库，而 `import` 则对应的是 模块式库，两者不能混用！！


### 补充说明

#### 防止命名冲突

注意，在书写全局声明文件时，允许在全局作用域里定义很多类型。我们强烈不建义这样做，当一个工程里有许多声明文件时，它会导致无法处理的命名冲突。一个简单的规则是使用库定义的全局变量名来声明命名空间类型。

#### ES6 对模块插件的影响

一些插件添加或修改已存在的顶层模块的导出部分。当然这在 CommonJS 和其它加载器里是允许的，ES6 模块被当作是不可改变的因此这种模式就不可行了。因为 TypeScript 是能不预知加载器类型的，所以没在编译时保证，但是开发者如果要转到 ES6 模块加载器上应该注意这一点。

#### ES6 对模块调用签名的影响

很多流行库，比如 Express，暴露出自己作为可以调用的函数。比如，典型的 Express 使用方法如下：

```ts
import exp = require("express");
var app = exp();
```

在 ES6 模块加载器里，顶层的对象（这里以 exp 导入）只能具有属性；顶层的模块对象永远不能被调用。

十分常见的解决方法是给这些可调用的/可构造的对象添加一个 `default` 导出。
