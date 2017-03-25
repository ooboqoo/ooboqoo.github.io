# 快速起步

这份“快速起步”的目标是基于 TypeScript 构建并运行一个超级简单的 Angular 应用，同时，它还会建立一个用于本指南中这些范例代码的公用开发环境。

## 项目配置

典型的 Angular 项目需要一系列配置文件:

* package.json 用来标记出本项目所需的 npm 依赖包。
* tsconfig.json 定义了 TypeScript 编译器如何从项目源文件生成 JavaScript 代码。
* typings.json 为那些 TypeScript 编译器无法识别的库提供了额外的定义文件。
* systemjs.config.js 为模块加载器提供了该到哪里查找应用模块的信息，并注册了所有必备的依赖包。

## 创建模块

我们用 NgModules 把 Angular 应用组织成了一些功能相关的代码块。Angular 本身也被拆成了一些独立的 Angular 模块。

每个 Angular 应用都至少有一个模块：根模块 ，在这里它叫做 AppModule 。

```ts
// app/app.module.ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ BrowserModule ]
})
export class AppModule { }
```

## 创建组件

组件是 Angualr 应用的基本构造块。每个组件都会通过与它相关的模板来控制屏幕上的一小块（视图）。

```ts
// app/app.component.ts
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>`
})
export class AppComponent { }

// app/app.module.ts 更新
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
@NgModule({
  imports:      [ BrowserModule ],  // 定义依赖模块
  declarations: [ AppComponent ],   // 定义模块包含的组件
  bootstrap:    [ AppComponent ]    // 定义启动(顶级)组件
})
export class AppModule { }
```

## 定义引导文件

```ts
// app/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
```

应用的引导过程 与 创建模块 或者 展现视图 是相互独立的关注点。

引导过程是与平台有关的，启动 App 与展现视图是两个相互分离的关注点。把这些关注点混在一起会增加不必要的复杂度。通过使用不同的引导器 (bootstraper) 来在不同的环境中启动 AppComponent，测试组件也变得更容易。

## 定义宿主页面

```html
<html>
  <head>
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 1. Load libraries -->
    <script src="node_modules/core-js/client/shim.min.js"></script>  <!-- 浏览器 es6 补丁 -->
    <script src="node_modules/zone.js/dist/zone.js"></script>        <!-- angular2 依赖项 -->
    <script src="node_modules/reflect-metadata/Reflect.js"></script> <!-- angular2 依赖项 -->
    <script src="node_modules/systemjs/dist/system.src.js"></script> <!-- 模块加载器 -->
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>
```




