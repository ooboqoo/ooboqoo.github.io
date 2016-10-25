# HTTP

现在，它们想要从服务器获取英雄数据，然后让用户添加、编辑和删除英雄，并且把这些修改结果保存回服务器。

在这一章中，我们要让应用程序学会通过 HTTP 调用来访问远程服务器上相应的 Web API。

```ts
class Http {
constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions)
request(url: string|Request,    options?: RequestOptionsArgs) : Observable<Response>
get(    url: string,            options?: RequestOptionsArgs) : Observable<Response>
post(   url: string, body: any, options?: RequestOptionsArgs) : Observable<Response>
put(    url: string, body: any, options?: RequestOptionsArgs) : Observable<Response>
delete( url: string,            options?: RequestOptionsArgs) : Observable<Response>
patch(  url: string, body: any, options?: RequestOptionsArgs) : Observable<Response>
head(   url: string,            options?: RequestOptionsArgs) : Observable<Response>
options(url: string,            options?: RequestOptionsArgs) : Observable<Response>
}
```

Performs http requests using `XMLHttpRequest` as the default backend.

## 准备 HTTP 服务

## Http Promise

```ts
// app/hero.service.ts (updated getHeroes and new class members)

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';  // 导入 toPromise 操作符
import { Hero } from './hero';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);  // 调用 HTTP 的 Reponse 对象的 json 方法，以提取出其中的数据
  }                                       // 这个由 json 方法返回的对象只有一个 data 属性

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
  /** 删除一个英雄 */
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);  // 这是一个关键的步骤！我们必须预料到 http 请求会失败
  }
  /** 添加英雄 */
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  /** 保存英雄详情 */
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);      // for demo purposes only
    return Promise.reject(error.message || error);  // 通过一个被拒绝 (rejected) 的承诺 (promise)
  }                                                 // 来把该错误用一个用户友好的格式返回给调用者
}
```

 
## 可观察对象 Observable

Http 服务中的每个方法都返回一个 HTTP Response 对象的 Observable 实例。

我们的 HeroService 中把那个 Observable 对象转换成了 Promise，并把这个承诺返回给了调用者。这一节，我们将学会直接返回 Observable，并且讨论何时以及为何那样做会更好。

### 背景

一个可观察对象是一个事件流，我们可以用数组型操作符（函数）来处理它。

Angular 内核中提供了对可观察对象的基本支持。开发人员可以自己从 RxJS 可观察对象库中引入操作符和扩展。

前述 HeroService 在 http.get 返回的 Observable 后面串联了一个 toPromise 操作符。该操作符把 Observable 转换成了 Promise，并且我们把那个“承诺”返回给了调用者。

转换成承诺通常是更好地选择，我们通常会要求 http.get 获取单块数据。只要接收到数据，就算完成。使用承诺这种形式的结果是让调用方更容易写，并且承诺已经在 JavaScript 程序员中被广泛接受了。

但是请求并非总是“一次性”的。我们可以开始一个请求，并且取消它，再开始另一个不同的请求——在服务器对第一个请求作出回应之前。 像这样一个 **请求 - 取消 - 新请求** 的序列用承诺是很难实现的，但接下来我们会看到，它对于可观察对象却很简单。

### 按名搜索

```ts
// app/hero-search.service.ts

import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { Hero }           from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`app/heroes/?name=${term}`)
               .map((r: Response) => r.json().data as Hero[]);
  }
}
```

HeroSearchService 中的 http.get() 调用和 HeroService 中的很相似，只是这次带了查询字符串。显著的不同是：我们不再调用 toPromise，而是直接返回可观察对象。

```html
// app/hero-search.component.html

<div id="search-component">
  <h4>Hero Search</h4>
  <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
  <div>
    <div *ngFor="let hero of heroes | async"
         (click)="gotoDetail(hero)" class="search-result" >
      {{hero.name}}
    </div>
  </div>
</div>
```

当用户在搜索框中输入时，一个 keyup 事件绑定会调用该组件的 search 方法，并传入新的搜索框的值。

`*ngFor`为该组件的 heroes 属性重复 hero 对象。这也没啥特别的。但是，接下来我们看到 heroes 属性现在是英雄列表的 Observable 对象，而不再只是英雄数组。`*ngFor`不能用可观察对象做任何事，除非我们在它后面跟一个 async pipe (AsyncPipe) 。这个 async 管道会订阅到这个可观察对象，并且为 `*ngFor` 生成一个英雄数组。

该创建 HeroSearchComponent 类及其元数据了。

```ts
// app/hero-search.component.ts

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: [ 'hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();  // Subject 是一个可观察的事件流中的生产者
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)       // 实际发起请求的间隔不小于 300ms
      .distinctUntilChanged()  // 确保不会重复请求同一个搜索词
      .switchMap(term => term  // 过滤掉历史请求的返回消息
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
```

### 导入 RxJS 操作符

Angular 的基本版 Observable 实现中，RxJS 操作符是不可用的。我们得导入它们，以扩展 Observable。

```ts
// app/rxjs-extensions.ts

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
```

我们在顶级的 AppModule 中导入 rxjs-extensions 就可以一次性加载它们。

```ts
import './rxjs-extensions';
```

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






