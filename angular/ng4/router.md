# Angular Router Advanced

video  https://www.youtube.com/watch?v=QLns6s02O48  
book https://leanpub.com/router

### 基本用法

```ts
const ROUTES = [
  {
    path: 'conversations/:folder',
    children: [
      { path: '', component: ConversationsCmp },
      { path: ':id', component: ConversationCmp }
    ]
  },
  {
    path: 'contacts',
    children: [
      { path: '', component: ContactsCmp },
      { path: ':id', component: ContactCmp }
    ]
  }
];

@NgModule(
  bootstrap: [MailAppCmp],
  imports: [RouterModule.forRoot(ROUTES)]
)
class MailModule { }
```

```html
<button routerLink="/contacts">Contacts</button>
<a routerLink="['/contacts', id]">Show Contact</a>
```

```ts
router.navigate(['./contacts']);
router.navigate(['./contacts', id]);
```

### 懒加载

Lazy Loading
  * Transparent
  * Links ro navigations keep working
  * Synchronous link generation

```ts
const ROUTES = [
  {
    path: 'conversations/:folder',
    children: [
      { path: '', component: ConversationsCmp },
      { path: ':id', component: ConversationCmp }
    ]
  },
  {
    path: 'contacts',
    // children: [
    //   { path: '', component: ContactsCmp },
    //   { path: ':id', component: ContactCmp }
    // ]
    loadChildren: './contacts.module'
  }
];
```

### 配置预加载

Preloading
 * Transparent
 * Pluggable
 * Platform-specific preloading
 * User-specific preloading

设定全部懒加载模块全部预加载

```ts
@NgModule(
  bootstrap: [MailAppCmp],
  imports: [
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ]
)
class MailModule { }
```

在路由表中设定

```ts
[
  { path: 'moduleA', loadChildren: './moduleA.module', data: {preload: true} },
  { path: 'moduleB', loadChildren: './moduleB.module' }
]
```

自定义预加载策略

```ts
export class PreloadSelectedModulesList implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data.preload ? load() : of(null);
  }
}

@NgModule(
  bootstrap: [MailAppCmp],
  providers: [CustomPreloadingStrategy],
  imports: [
    RouterModule.forRoot(ROUTES, {preloadingStrategy: CustomPreloadingStrategy})
  ]
)
class MailModule { }
```

### 构建工具配置 Bundling

Bundling
  * Transparent with CLI
  * Can be customized

```js
const entryPoints = [
  'main.module.ts',
  'contacts.module.ts'
];
```





