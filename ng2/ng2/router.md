# 路由与导航

概览

浏览器是一个熟悉的应用导航操作模型。 如果在地址栏中输入一个 URL ，浏览器就会导航到相应的页面。 如果你在页面中点击链接，浏览器就会导航到一个新的页面。 如果你点击浏览器上的前进和后退按钮，浏览器就会根据你看过的页面历史向前或向后进行导航。

Angular 的 路由器 （以下简称“路由器”）借鉴了这个模型。它把浏览器中的 URL 看做一个操作指南， 据此导航到一个由客户端生成的视图，并可以把参数传给支撑视图的相应组件，帮它决定具体该展现哪些内容。 我们可以为页面中的链接绑定一个路由，这样，当用户点击链接时，就会导航到应用中相应的视图。 当用户点击按钮、从下拉框中选取，或响应来自任何地方的事件时，我们也可以在代码控制下进行导航。 路由器还在浏览器的历史日志中记录下这些活动，这样浏览器的前进和后退按钮也能照常工作。

## 关键词汇及其含义

##### 路由器 `Router`

为激活的 URL 显示应用组件。管理从一个组件到另一个组件的导航  
Displays the application component for the active URL. Manages navigation from one component to the next.

##### 路由器模块 `RouterModule`

一个独立的 Angular 模块，用于提供所需的服务提供商，以及用来在应用视图之间进行导航的指令。  
A separate Angular module that provides the necessary service providers and directives for navigating through application views.

##### 路由数组 `Routes`

定义了一个路由数组，每一个都会把一个 URL 路径映射到一个组件。  
Defines an array of Routes, each mapping a URL path to a component.

##### 路由 `Route`

定义路由器该如何根据 URL 模式（ pattern ）来导航到组件。大多数路由都由路径和组件类构成。  
Defines how the router should navigate to a component based on a URL pattern. Most routes consist of a path and a component type.

##### 路由插座 `RouterOutlet`

该指令（ `<router-outlet>` ）用来标记出路由器该在哪里显示视图。  
The directive (`<router-outlet>`) that marks where the router should display a view.

##### 路由链接 `RouterLink`

该指令用来把一个可点击的 HTML 元素绑定到路由。点击带有绑定到 _ 字符串 _ 或 _ 链接参数数组 _ 的 `routerLink` 指令的 A 标签就会触发一次导航。  
The directive for binding a clickable HTML element to a route. Clicking an anchor tag with a `routerLink` directive that is bound to a _Link Parameters Array_ triggers a navigation.

##### 活动路由链接 `RouterLinkActive`

当 HTML 元素上或元素内的 routerLink 变为激活或非激活状态时，该指令为这个 HTML 元素添加或移除 CSS 类。  

The directive for adding/removing classes from an HTML element when an associated routerLink contained on or inside the element becomes active/inactive.

##### 激活的路由 `ActivatedRoute`

为每个路由组件提供提供的一个服务，它包含特定于路由的信息，比如路由参数、静态数据、解析数据、全局查询参数和全局碎片（ fragment ）。  
A service that is provided to each route component that contains route specific information such as route parameters, static data, resolve data, global query params and the global fragment.

##### 路由器状态 `RouterState`

路由器的当前状态包含了一棵由程序中激活的路由构成的树。它包含一些用于遍历路由树的快捷方法。  
The current state of the router including a tree of the currently activated routes in our application along convenience methods for traversing the route tree.

##### 链接参数数组 _`Link Parameters Array`_

这个数组会被路由器解释成一个路由操作指南。我们可以把一个 `RouterLink` 绑定到该数组，或者把它作为参数传给 `Router.navigate` 方法。  
An array that the router interprets into a routing instruction. We can bind a `RouterLink` to that array or pass the array as an argument to the `Router.navigate` method.

##### 路由组件 _`Routing Component`_

一个带有 `RouterOutlet` 的 Angular 组件，它根据路由器的导航来显示相应的视图。  
An Angular component with a `RouterOutlet` that displays views based on router navigations.

## 基础知识

### `<base href>`

```html
<base href="/">
```

或使用 angular API 配置 `APP_BASE_HREF`

### 从路由库中导入

```ts
import { Routes, RouterModule } from '@angular/router';
```

### 配置

```ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'crisis-center', component: CrisisCenterComponent },
  { path: 'heroes', component: HeroListComponent, data: { title: 'Heroes List' } },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

path 中 不能用斜线 `/` 开头。路由器会为我们解析和生成 URL ，以便在多个视图间导航时，可以自由使用相对路径和绝对路径。

第一个路由中的 `:id` 是一个路由参数的令牌 (Token) 。比如 `/hero/42` 这个 URL 中，“ 42 ”就是 id 参数的值。 此 URL 对应的 `HeroDetailComponent` 组件将据此查找和展现 `id` 为 42 的英雄。

第三个路由中的 `data` 属性用来存放于每个具体路由有关的任意信息。该数据可以被任何一个激活路由访问，并能用来保存诸如 页标题、面包屑以及其它只读数据。本章稍后的部分，我们将使用 resolve 守卫 来获取这些附加数据。

第四个路由中的 `empty path` 匹配各级路由的默认路径。 它还支持在不扩展 URL 路径的前提下添加路由。

第四个路由中的 `**` 代表该路由是一个 **通配符** 路径。如果当前 URL 无法匹配上我们配置过的任何一个路由中的路径，路由器就会匹配上这一个。当需要显示 404 页面或者重定向到其它路由时，该特性非常有用。

**这些路由的定义顺序** 是故意如此设计的。路由器使用 先匹配者优先 的策略来匹配路由，所以，具体路由应放在通用路由的前面。

们导出了 `routing` 常量，以便把它导入到 `app.module.ts` 文件中。在那里，我们将在 `AppModule` 的 imports 中配置 Router 模块。

### 路由插座

### 路由器链接

```html
  <h1>Angular Router</h1>
  <nav>
    <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
    <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
```

### 路由器状态

在导航时的每个生命周期成功完成时，路由器会构建出一个 ActivatedRoute 组成的树，它表示路由器的当前状态。 我们可以在应用中的任何地方用 Router 服务及其 routerState 属性来访问当前的 RouterState 值。

路由器状态为我们提供了从任意激活路由开始向上或向下遍历路由树的一种方式，以获得关于父、子、兄弟路由的信息。

## 范例应用

### 里程碑 #1：从路由器开始

```ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent }
];

export const appRoutingProviders: any[] = [  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

我们还导出了一个空的 `appRoutingProviders` 数组，以便将来可以在 `app.module.ts` 中注册路由器的依赖。 现在我们还不用注册任何提供商，不过很快就需要了。

#### 定义一些路由

路由器必须用“路由定义”的列表进行配置。

我们的第一个配置中定义了由两个路由构成的数组，它们分别通过路径 (path) 导航到了 CrisisListComponent 和 HeroListComponent 组件。

每个定义都被翻译成了一个 Route 对象。该对象有一个 path 字段，表示该路由中的 URL 路径部分，和一个 component 字段，表示与该路由相关联的组件。

当浏览器的 URL 变化时或在代码中告诉路由器导航到一个路径时，路由器就会翻出它用来保存这些路由定义的注册表。

#### 在 `APPMODULE` 中注册路由

本应用的启动点位于 /app 目录下的 main.ts 文件中。

我们从 app.routing.ts 文件中导入了 routing 令牌，并把它添加到了 imports 数组中。

我们导入了 CrisisListComponent 和 HeroListComponent 组件，并把它们加入了 declarations 数组中，它们将被注册到 AppModule 中。

我们还导入了 appRoutingProviders 数组，并把它加入了 providers 数组中。

```ts
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }                  from './app.component';
import { routing, appRoutingProviders }  from './app.routing';

import { HeroListComponent }    from './hero-list.component';
import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
```

在 AppModule 中注册路由器模块会让该路由器在应用的任何地方都能被使用。

#### 壳组件 AppComponent

##### RouterLink binding

##### RouterLinkActive 绑定

`RouterLinkActive` 指令会基于当前的 `RouterState` 对象来为激活的 `RouterLink` 切换 CSS 类。 这会一直沿着路由树往下进行级联处理，所以父路由链接和子路由链接可能会同时激活。要改变这种行为，可以把 `[routerLinkActiveOptions]` 绑定到 `{exact: true}` 表达式。 如果使用了 `{ exact: true }` ，那么只有在其 URL 与当前 URL 精确匹配时才会激活指定的 `RouterLink`。

### 路由器指令集

`RouterLink`、`RouterLinkActive` 和 `RouterOutlet` 是由 `RouterModule` 包提供的指令。现在它已经可用于我们自己的模板中。

app.component.ts 目前看起来是这样的：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
```

### “起步阶段”总结

我们得到了一个非常基本的、带导航的应用，当用户点击链接时，它能在两个视图之间切换。我们已经学会了如何：

* 加载路由库
* 往壳组件的模板中添加一个导航条，导航条中有一些 A 标签、 routerLink 指令和 routerLinkActive 指令
* 往壳组件的模板中添加一个 router-outlet 指令，视图将会被显示在那里
* 用 RouterModule.forRoot 配置路由器模块
* 设置路由器，使其合成“ HTML 5 ”模式的浏览器 URL 。

## 里程碑 #2 英雄特征区

### 英雄 特性区的路由配置

我们推荐的方式是为每个特性区创建它自己的路由配置文件。

```ts
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

export const heroesRouting: ModuleWithProviders = RouterModule.forChild(heroesRoutes);
```

现在，我们的 Heroes 模块有路由了，我们得用 路由器 注册它们。 我们像在 app.routing.ts 中那样导入 RouterModule ，但这里稍微有一点不同。 在设置 app.routing.ts 时，我们使用了静态的 `forRoot` 方法来注册我们的路由和全应用级服务提供商。 在特性模块中，我们要改用 `Router.forChild` 静态方法。

## 里程碑 #3 危机中心

### 带子路由的“危机中心”

我们将按照下列模式组织 危机中心 的目录结构。

* 每个特性区位于它自己的定义了模块的目录中
* 每个特性区有它自己的根组件
* 每个特性区的根组件有它自己的 `<router-outlet>` 及其子路由
* 特性区的路由很少交叉（如果还有的话）



