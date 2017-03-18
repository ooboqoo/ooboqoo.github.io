# 发布第三方包

## 同项目的方式

> 感觉这种方式不怎么好

With the `tsconfig.json` having `"outDir": "../"`. So the `.ts` files in the `./src` directory build out to the root directory. After building your project looks something like this:

```txt
my-module
|--package.json
`--src
|  |--index.ts
|  |--tsconfig.json
|  `--nested
|     |--index.ts
|     `--sourceFile.ts
|--index.d.ts
|--index.js
`--nested
   |--index.d.ts
   |--index.js
   |--sourceFile.d.ts
   `--sourceFile.js
```

The node and typscript module loading will then follow the `index.js` and `index.d.ts` files respectively to resolve the module and typings.

## 单独发布

目录结构：

```txt
my-module
|--package.json
|--package-dist.json
|--tsconfig.json
`--dist
|  |--package.json
|  |--index.ts
|  |--index.d.ts
|  `--nested
|--index.ts
`--nested
```

package.json

```json
{
  "name": "name",
  "version": "1.0.0",
  "description": "description",
  "author": "author",
  "license": "MIT",
  "scripts": {
    "clean": "rmdir dist /s/q && mkdir dist",
    "publish": "npm run clean && copy package-dist.json dist\\package.json && tsc",
    "push": "npm run publish && git push"
  },
  "repository": {
    "type": "git",
    "url": "http://path/to/project.git"
  },
  "devDependencies": {
    "typescript": "^2.1.5"
  }
}
```

package-dist.json

```json
{
  "name": "name",
  "version": "1.0.0",
  "description": "description",
  "main": "index.js",
  "typings": "index.d.ts",
  "author": "author",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "http://path/to/project.git"
  },
  "peerDependencies": {
    "@angular/common": "^2.2.1",
    "@angular/core": "^2.2.1"
  }
}
```

tsconfig.json

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "inlineSources": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": true,
        "declaration": true,
        "lib": ["dom","es6"],
        "outDir": "dist"
    }
}
```
