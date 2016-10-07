# Http 客户端

现代浏览器支持两种基于 HTTP 的 API ： XMLHttpRequest (XHR) 和 JSONP。少数浏览器还支持 Fetch。

Angular HTTP 库简化了 XHR 和 JSONP API 的编程，这就是本章所要讲的。

## 演示

* HTTP 客户端 : 使用可观察对象的《英雄指南》
* HTTP 客户端 : 使用承诺的《英雄指南》
* JSONP 客户端 : Wikipedia ，从一个不支持 CORS 的服务获取数据
* JSONP 客户端 : Wikipedia ，使用可观察对象的操作符减少服务端调用

这些演示由根组件 AppComponent 统一演示。

```ts
// app/app.component.ts

import { Component }         from '@angular/core';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';
@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
    <hero-list-promise></hero-list-promise>
    <my-wiki></my-wiki>
    <my-wiki-smart></my-wiki-smart>
  `
})
export class AppComponent { }
```

## 提供 HTTP 服务

```ts
// app/app.module.ts (v1)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```









