# HTTP

我们希望在访问外部数据时，网页继续可用，http 请求需采用异步方式。常用的有3种方式：Callbacks、Promises、Observables。

在 Angular2 中更倾向使用 可观察者对象 Observables，本章也采用此方式。

## Using @angular/http

我们通过导入 @angular/http 来使用

```ts
import { Http, Response, RequestOptions, Headers } from '@angular/http';
```

### import from @angular/http

示例中我们导入 `HttpModule` 这是一个便利使用各模块的集合

```ts
import { HttpModule } from '@angular/http';

@NgModule({
  // ...
  imports: [ HttpModule ],
 })
class HttpAppModule {  }
```

然后就可以向组件注入 Http 服务了：

```ts
class MyFooComponent {
  constructor(public http: Http) {  }
  makeRequest(): void {
    // do something with this.http ...
  }
}
```

## A Basic Request

```ts
import { Component }      from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'simple-http',
  template: `
    <h2>Basic Request</h2>
    <button type="button" (click)="makeRequest()">Make Request</button>
    <div *ngIf="loading">loading...</div>
    <pre>{{data | json}}</pre>
    `
})
export class SimpleHTTPComponent {
  data: Object;
  loading: boolean;
  constructor(public http: Http) { }
  makeRequest(): void {
    this.loading = true;
    this.http.request('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }
}
```

## Writing a YouTubeSearchComponent

## @angular/http API

### Making a POST request

```ts
makePost(): void {
  this.loading = true;
  this.http.post(
    'http://jsonplaceholder.typicode.com/posts',
    JSON.stringify({ body: 'bar', title: 'foo', userId: 1 })  // post 第二个参数是对象字符串
  ).subscribe((res: Response) => {
    this.data = res.json();
    this.loading = false;
  });
}
```

`http.post` 返回的是一个 Observable 对象，该对象在接收到服务器响应后会抛出一个 Response 对象，Response 对象有一个 `.json()` 方法用于提取数据，提取的数据是仅包含 `data` 属性的对象，真正的数据存放在 `data` 属性所指向的对象中。
 