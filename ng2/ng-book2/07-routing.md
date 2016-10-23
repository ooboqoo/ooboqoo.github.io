# 路由

## How client-side routing works

### The beginning: using anchor tags

```html
<a name="about"><h1>About</h1></a>
```

The about route for an SPA would be something like http://something/#/about. This is what is known as hash-based routing.

### using `<router-outlet>`

We are are able to use the `router-outlet` directive in our template because we imported the `RouterModule` in our `NgModule`.

### using `[routerLink]`

```html
<a [routerLink]="['home']">Home</a>
  <!-- 字符串外面再套一层数组，看起来比较怪，通过数组，我们可以方便地指定多级路由 -->
```

## Route Parameters

```ts
const routes: Routes = [
  { path: 'articles/:id', component: ArticlesComponent }
];
```

```ts
import { ActivatedRoute } from '@angular/router';
// ....
export class ArticleComponent {
  id: string;
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }
}
```

## Music Search App

```html
<!-- 这里事件绑定的写法值得学习，做个笔记 -->
<p>
  <input type="text" #newquery [value]="query" (keydown.enter)="submit(newquery.value)">
  <button (click)="submit(newquery.value)">Search</button>
</p>
```



