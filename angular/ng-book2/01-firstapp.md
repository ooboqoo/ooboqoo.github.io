## CH01 第一个示例应用

### 理解组件

**That is the idea behind components: we teach the browser new tags that have new functionality.**

组件对于 html 文件来说就是一个新的标签(tag)，对于 js 文件来说就是一个特定的组件类(Component)，而从用户角度来看，组件就是屏幕上的一小块显示区域。

## Hello World

```ts
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'hello-world',
  template: `<ul><li *ngFor='let name of names'>Hello {{ name }}</li></ul>`
})                // *ngFor 指令                      {{expression}} 定义模板变量
class HelloWorld {
  names: string[];
  constructor() {
    this.names = ['Ari', 'Carlos', 'Felipe', 'Nate'];
  }
}

@NgModule({
  declarations: [ HelloWorld ],  // 定义模块包含的组件
  imports: [ BrowserModule ],    // 定义依赖项
  bootstrap: [ HelloWorld ],     // 定义启动(顶级)组件
})
class HelloWorldAppModule {}

platformBrowserDynamic().bootstrapModule(HelloWorldAppModule);
```

## Reddit

```ts
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class Article {  // 在组件外部定义数据结构，对应 MVC 的 model (负责定义逻辑)
  title: string;  link: string;  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;  this.link  = link;  this.votes = votes || 0;
  }

  domain(): string {
    try {  const link: string = this.link.split('//')[1];  return link.split('/')[0];
    } catch (err) { return null; }
  }

  voteUp(): void { this.votes += 1; }
  voteDown(): void { this.votes -= 1; }
}

@Component({
  selector: 'reddit-article',
  inputs: ['article'],       // inputs 定义从父组件接收的传入参数
  host:   { class: 'row' },  // host 指向该组件的容器，即 <reddit-article> 元素，提供了定义容器元素属性的途径
  template: `
    <div class="left">
      <div>{{ article.votes }}</div> <div>Points</div>
    </div>
    <div class="right">
      <a class="h4" href="{{ article.link }}">{{ article.title }}</a>
      <div>({{ article.domain() }})</div>
      <a class="btn" href (click)="voteUp()"> upvote</a>
      <a class="btn" href (click)="voteDown()"> downvote</a>
    </div>
    `
})
class ArticleComponent {  // 尽量将逻辑从组件移到模型定义，遵循 MVC 的 “Fat Models, Skinny Controllers” 原则
  article: Article;
  voteUp(): boolean { this.article.voteUp(); return false; }  // 通过 `return false` 阻止链接的默认跳转行为
  voteDown(): boolean { this.article.voteDown(); return false; }
}

@Component({
  selector: 'reddit',
  template: `
    <form>
      <h3>Add a Link</h3>
      <div>
        <!-- `#id` 这种被称为 resolve 的语法用于绑定元素，如下行的值可以通过 newtitle.vale 获取 -->
        <label for="title">Title:</label> <input name="title" #newtitle>
        <label for="link">Link:</label> <input name="link" #newlink>
      </div>
      <button (click)='addArticle(newtitle, newlink)'>Submit link</button> <!-- `(event)` 用于绑定事件 -->
    </form>
    <reddit-article *ngFor='let article of sortedArticles()' [article]='article'></reddit-article>
  `                                                       // 又一种数据绑定类型 [inputName]='inputValue'
})
class RedditApp {
  articles: Article[];
  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    // `${expression}` 是 es6 的模板变量表示形式，而 ng2 的模板变量表示形式是 `{{exp.}}`，注意区分
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value  = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}

@NgModule({
  declarations: [ RedditApp, ArticleComponent ],
  imports: [ BrowserModule ],
  bootstrap: [ RedditApp ]
})
class RedditAppModule {}

platformBrowserDynamic().bootstrapModule(RedditAppModule);
```

## 小结

Much of writing Angular 2 apps is just as we did above:

1. Split your app into components
2. Create the views
3. Define your models
4. Display your models
5. Add interaction
