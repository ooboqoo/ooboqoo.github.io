# Angular2  Cheat Sheet

#### 引导 Bootstrapping

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Bootstraps the app, using the root component from the specified `NgModule`.
// 使用 JIT 编译器引导一个 AppModule 模块定义的应用
platformBrowserDynamic().bootstrapModule(AppModule);
```

#### Angular 模块 NgModules

```ts
import { NgModule } from '@angular/core';

// Defines a module that contains components, directives, pipes, and providers.
// 定义一个模块，其中包括组件、指令、管道和提供商。
@NgModule({
  declarations: ...,
  imports: ...,
  exports: ...,
  providers: ...,
  bootstrap: ...
})
class MyModule {}

// List of components, directives, and pipes that belong to this module.
// 一个数组，包括从属于当前模块的组件、指令和管道。
declarations: [MyRedComponent, MyBlueComponent, MyDatePipe]

// List of modules to import into this module. Everything from the imported modules is available to `declarations` of this module.
// 一个数组，包括被导入到当前模块中的所有模块。被导入模块的所有内容可用于 declarations 中。
// Specifies a list of modules whose exported directives/pipes should be available to templates in this module. This can also contain ModuleWithProviders.
imports: [BrowserModule, SomeOtherModule]

// List of components, directives, and pipes visible to modules that import this module.
// 一个数组，包括对导入当前模块的模块可见的组件、指令、管道。该数组是 declarations+imports 的子集。
// Specifies a list of directives/pipes/modules that can be used within the template of any component that is part of an Angular module that imports this Angular module.
// 这里的内容只影响导入该模块的模块的组件的 template，还可以将导入的模块(如模块1)再在这里导出，这样的话，导入本模块的模块(如模块2)的组件就可以直接使用模块1的内容了。
exports: [MyRedComponent, MyDatePipe, SomeOtherModule]

// List of dependency injection providers visible both to the contents of this module and to importers of this module.
// 一个数组，用于声明依赖注入提供商，对当前模块及导入当前模块的模块可见。
// 存在这样一种情况，模块1同时导入了模块2和模块3，导入的模块都定义了一个同样的 providerX，而模块1中某组件需要注入 providerX，但本模块并未定义 providerX，那会出现什么情况呢，试验的结论是，以 imports 数组中后定义的模块为准。
providers: [MyService, { provide: ... }]

// List of components to bootstrap when this module is bootstrapped.
// 一个数组，包括由当前模块引导时应该引导的组件
bootstrap: [MyAppComponent]
```

#### 模板语法 Template syntax

```ts
// Binds property `value` to the result of expression `firstName`.
// 把属性 value 绑定到表达式 firstName 的结果。
`<input [value]="firstName">`

// Binds attribute `role` to the result of expression `myAriaRole`.
// 把 role 这个 Attribute 绑定到表达式 myAriaRole 的结果。
`<div [attr.role]="myAriaRole">`

// Binds the presence of the CSS class `extra-sparkle` on the element to the truthiness of the expression `isDelightful`.
// 把元素是否出现 CSS类 extra-sparkle，绑定到一个表达式 isDelightful 的结果(true or false)。
`<div [class.extra-sparkle]="isDelightful">`

// Binds style property `width` to the result of expression `mySize` in pixels. Units are optional.
// 把样式的width属性绑定到表达式mySize的结果，以px为单位。这个单位是可选的。
`<div [style.width.px]="mySize">`

// Calls method `readRainbow` when a click event is triggered on this button element (or its children) and passes in the event object.
// 当按钮(及其子元素)上的 click 事件被触发时，调用 readRainbow 方法，并把事件对象作为参数传入。
`<button (click)="readRainbow($event)">`  // 注意这里是 <element onclick="script"> 的写法，所以方法要带括号

// Binds a property to an interpolated string, equivalent to: `<div [title]="'Hello ' + ponyName">`
// 把属性绑定到一个插值表达式字符串，它等价于： <div [title]="'Hello ' + ponyName">
`<div title="Hello {{ponyName}}">`  // 问题，什么时候加 []

// Binds text content to an interpolated string, for example, "Hello Seabiscuit".
// 把文本内容绑定到一个插值表达式，比如 "Hello Seabiscuit".
`<p>Hello {{ponyName}}</p>`

// Sets up two-way data binding. Equivalent to: `<my-cmp [title]="name" (titleChange)="name=$event">`
// 设置双向数据绑定。等价于：<my-cmp [title]="name" (titleChange)="name=$event">
`<my-cmp [(title)]="name">`

// Creates a local variable `movieplayer` that provides access to the `video` element instance in data-binding and event-binding expressions in the current template.
// 创建一个局部变量 movieplayer ，它提供到 video 元素实例的访问，可用于当前模板中的数据绑定和事件绑定表达式中。
`<video #movieplayer ...> <button (click)="movieplayer.play()"> </video>`

// The `*` symbol turns the current element into an embedded template. Equivalent to: `<template [myUnless]="myExpression"><p>...</p></template>`
// *符号表示当前元素将被转变成一个内嵌模板。等价于：<template [myUnless]="myExpression"><p>...</p></template>
`<p *myUnless="myExpression">...</p>`

// 通过名叫 myCardNumberFormatter 的管道，转换表达式的当前值 cardNumber
`<p>Card No.: {{cardNumber | myCardNumberFormatter}}</p>`

// The safe navigation operator (`?`) means that the `employer` field is optional and if `undefined`, the rest of the expression should be ignored.
// 安全导航运算符(?.)表示 employer 字段是可选的，如果它是 undefined，表达式剩下的部分将被忽略
`<p>Employer: {{employer?.companyName}}</p>`

// An SVG snippet template needs an `svg:` prefix on its root element to disambiguate the SVG element from an HTML component.
// SVG模板需要在它们的根节点上带一个 `svg:` 前缀，以消除模板中 HTML元素和 SVG元素的歧义
`<svg: rect x="0" y="0" width="100" height="100"/>`

// An `<svg>` root element is detected as an SVG element automatically, without the prefix.
// <svg>元素在无需前缀的情况下，也能被自动检测为SVG。
`<svg>
  <rect x="0" y="0" width="100" height="100"/>  
</svg>`
```

#### 内建指令 Built-in directives

```ts
import { CommonModule } from '@angular/common';

// Removes or recreates a portion of the DOM tree based on the `showSection` expression.
`<section *ngIf="showSection">`

// Turns the li element and its contents into a template, and uses that to instantiate a view for each item in list.
`<li *ngFor="let item of list">`

// Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of `conditionExpression`.
`<div [ngSwitch]="conditionExpression">
  <template [ngSwitchCase]="case1Exp">...</template>
  <template ngSwitchCase="case2LiteralString">...</template>
  <template ngSwitchDefault>...</template>
</div>`
// 我能看懂的是下面这样的，上面的具体待考
`<div class='container' [ngSwitch]='myVar'>
  <div *ngSwitchWhen='"A"'>Var is A</div>
  <div *ngSwitchWhen='"A"'>Var is A again</div>     <!-- 同一项可以匹配多次 -->
  <div *ngSwitchWhen='"B"'>Var is B</div>
  <div *ngSwitchDefault>Var is something else</div> <!-- 此 default 项不是必需的 -->
</div>`

// Binds the presence of CSS classes on the element to the truthiness of the associated map values. The right-hand expression should return {class-name: true/false} map.
`<div [ngClass]="{active: isActive, disabled: isDisabled}">`
```

#### 表单 Forms

```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  // FormsModule 提供 ngModel, ngForm, ngSubmit 等指令
  // ReactiveFormsModule 提供 formControl, formGroup 等指令

// Provides two-way data-binding, parsing, and validation for form controls.
// 提供双向绑定，为表单控件提供解析和验证。
`<input [(ngModel)]="userName">`
```

#### 类装饰器 Class decorators

```ts
import { Directive, ... } from '@angular/core';

// Declares that a class is a component and provides metadata about the component.
// 声明当前类是一个组件，并提供关于该组件的元数据。
@Component({...})
class MyComponent() {}

// Declares that a class is a directive and provides metadata about the directive.
// 声明当前类是一个指令，并提供关于该指令的元数据。
@Directive({...}) 
class MyDirective() {}

// Declares that a class is a pipe and provides metadata about the pipe.
// 声明当前类是一个管道，并且提供关于该管道的元数据。
@Pipe({...})
class MyPipe() {}

// Declares that a class has dependencies that should be injected into the constructor when the dependency injector is creating an instance of this class.
// 声明当前类有一些依赖，当依赖注入器创建该类的实例时，这些依赖应该被注入到构造函数中。
@Injectable()
class MyService() {}
```

#### 指令配置项 Directive configuration

```ts
@Directive({
  // Specifies a CSS selector that identifies this directive within a template.
  // Supported selectors include `element`, `[attribute]`, `.class`, and `:not()`.
  // Does not support parent-child relationship selectors.
  selector: '.cool-button:not(a)',

  // List of dependency injection providers for this directive and its children.
  providers: [MyService, { provide: ... }],
})
```

#### 组件配置项 Component configuration

`@Component` extends `@Directive`, so the `@Directive` configuration applies to components as well

```ts
@Component({
  slector: ...,
  providers: ...,
  moduleId: module.id,  // 如果设置了，templateUrl 和 styleUrl 会相对于组件进行地址解析。
  viewProviders: [MyService, { provide: ... }],  // 注册组件级别的服务供应商
  template: 'Hello {{name}}',         // 二选一，内嵌模板
  templateUrl: 'my-component.html',   // 二选一，外部模板
  styles: ['.primary {color: red}'],  // 二选一，内嵌css
  styleUrls: ['my-component.css'],    // 二选一，外部css
})
```

 Item | Descriptiom 
----- | -----------
`moduleId` | If set, the `templateUrl` and `styleUrl` are resolved relative to the component.
`viewProviders` | List of dependency injection providers scoped to this component's view.
`template` / `templateUrl` | Inline template or external template URL of the component's view.
`styles` / `styleUrls` | List of inline CSS styles or external stylesheet URLs for styling the component’s view.

#### 字段装饰器  Class field decorators for directives and components

```ts
import { Input, ... } from '@angular/core';

// Declares an input property that you can update via property binding
// (example: `<my-cmp [myProperty]="someExpression">`).
// 声明一个输入属性，以便我们可以通过属性绑定更新它。
@Input() myProperty;

// Declares an output property that fires events that you can subscribe to with an event binding
// (example: `<my-cmp (myEvent)="doSomething()">`).
// 声明一个输出属性，以便我们可以通过事件绑定进行订阅。
@Output() myEvent = new EventEmitter();

// Binds a host element property to a directive/component property.
// 把宿主元素的属性(比如CSS类：valid)绑定到指令/组件的属性(比如：isValid)。
@HostBinding('[class.valid]') isValid;

// Subscribes to a host element event (`click`) with a directive/component method (`onClick`),
// optionally passing an argument (`$event`).
// 通过指令/组件的方法(例如onClick)订阅宿主元素的事件(例如click)，可选传入一个参数($event)。
@HostListener('click', ['$event']) onClick(e) {...}

// Binds the first result of the component content query (`myPredicate`) to a property (`myChildComponent`) of the class.
// 把组件内容查询(myPredicate)的第一个结果绑定到类的 myChildComponent 属性。
@ContentChild(myPredicate) myChildComponent;

// Binds the results of the component content query (`myPredicate`) to a property (`myChildComponents`) of the class.
// 把组件内容查询(myPredicate)的全部结果，绑定到类的 myChildComponents 属性。
@ContentChildren(myPredicate) myChildComponents;

// Binds the first result of the component view query (`myPredicate`) to a property (`myChildComponent`) of the class. Not available for directives.
// 把组件视图查询(myPredicate)的第一个结果绑定到类的 myChildComponent 属性。对指令无效。
@ViewChild(myPredicate) myChildComponent;

// Binds the results of the component view query (`myPredicate`) to a property (`myChildComponents`) of the class. Not available for directives.
// 把组件视图查询(myPredicate)的全部结果绑定到类的 myChildComponents 属性。对指令无效。
@ViewChildren(myPredicate) myChildComponents;
```

#### 变更检测与生命周期钩子  Directive and component change detection and lifecycle hooks

implemented as class methods. 作为类方法实现。示例：

```ts
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'my-dashboard',
  template: `<h2>dashboard</h2>`,
})
export class DashboardComponent implements OnInit {
  constructor() {  }
  ngOnInit(): void {  }
}
```

```ts
// Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
// 类的构造函数须在所有其它生命周期钩子之前调用。使用它来注入依赖，但构造函数只能用来初始化实例而不应该负责其他任务。
constructor(myService: MyService, ...) { ... }

// Called after every change to input properties and before processing content or child views.
// 在输入属性每次变化了之后、开始处理内容或子视图之前被调用。
ngOnChanges(changeRecord) { ... }

// Called after the constructor, initializing input properties, and the first call to `ngOnChanges`.
// 在执行构造函数、初始化输入属性、第一次调用完 ngOnChanges 之后调用。
ngOnInit() { ... }

// Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
// 每当检查组件或指令的输入属性是否变化时调用。通过它，可以用自定义的检查方式来扩展变更检测逻辑。
ngDoCheck() { ... }

// Called after `ngOnInit` when the component's or directive's content has been initialized.
// 当组件或指令的内容已经初始化、ngOnInit 完成之后调用。
ngAfterContentInit() { ... }

// Called after every check of the component's or directive's content.
// 在每次检查完组件或指令的内容之后调用。
ngAfterContentChecked() { ... }

// Called after `ngAfterContentInit` when the component's view has been initialized. Applies to components only.
// 当组件的视图已经初始化完毕，每次 ngAfterContentInit 之后被调用。只适用于组件。
ngAfterViewInit() { ... }

// Called after every check of the component's view. Applies to components only.
// 每次检查完组件的视图之后调用。只适用于组件。
ngAfterViewChecked() { ... }

// Called once, before the instance is destroyed.
// 在所属实例被销毁前，只调用一次。
ngOnDestroy() { ... }
```

#### 依赖注入配置项  Dependency injection configuration

```ts
// Sets or overrides the provider for `MyService` to the `MyMockService` class.
// 把 MyService 类的提供商设置或改写为 MyMockService。
{ provide: MyService, useClass: MyMockService }

// Sets or overrides the provider for `MyService` to the `myFactory` factory function.
// 把 MyService 的提供商设置或改写为 myFactory 工厂函数。
{ provide: MyService, useFactory: myFactory }

// Sets or overrides the provider for `MyValue` to the value `41`.
// 把 MyValue 的提供商设置或改写为值 41。
{ provide: MyValue, useValue: 41 }
```

#### 路由与导航 Routing and navigation

```ts
import { Routes, RouterModule, ... } from '@angular/router';

// Configures routes for the application. Supports static, parameterized, redirect, and wildcard routes.
// Also supports custom route data and resolve.
// 为应用配置路由。支持静态、参数化、重定向和通配符路由。还支持自定义路由数据和解析。
const routes: Routes = [
  { path: 'path/:routeParam', component: MyComponent },
  { path: 'staticPath', component: ... },
  { path: '', component: HomeComponent },
  { path: '**', component: ... },
  { path: 'oldPath', redirectTo: '/staticPath' },
  { path: ..., component: ..., data: { message: 'Custom' } }
]);
const routing = RouterModule.forRoot(routes);

// Marks the location to load the component of the active route.
// 标记一个位置(容器)，用于加载当前激活路由的组件。
`<router-outlet></router-outlet>`             // 一个模板中只能有一个未命名插座
`<router-outlet name="aux"></router-outlet>`  // 路由器支持多个命名插座并存

// Creates a link to a different view based on a route instruction consisting of a route path,
// required and optional parameters, query parameters, and a fragment.
// To navigate to a root route, use the `/` prefix; for a child route, use the `./`prefix;
// for a sibling or parent, use the `../` prefix.
// 基于路由指令创建指向不同视图的链接，由路由路径、必选参数、可选参数、查询参数和片段（fragment）组成。
// 添加“/”前缀可以导航到根路由。添加“./”前缀可以导航到子路由。添加“../sibling”前缀可以导航到兄弟路由或父路由。
<a routerLink="/path">
<a [routerLink]="[ '/path', routeParam ]">
<a [routerLink]="[ '/path', { matrixParam: 'value' } ]">
<a [routerLink]="[ '/path' ]" [queryParams]="{ page: 1 }">
<a [routerLink]="[ '/path' ]" fragment="anchor">

// The provided classes are added to the element when the `routerLink` becomes the current active route.
// 当 routerLink 被激活时，就把指定的 CSS 类添加到该元素上。
<a [routerLink]="[ '/path' ]" routerLinkActive="active">

// An interface for defining a class that the router should call first to determine if it should activate this component. Should return a boolean or an Observable/Promise that resolves to a boolean.
// 一个用来定义类的接口，路由器会首先调用它来决定是否应该激活该组件。
// 应该返回布尔值或能解析为布尔值的可观察对象(Observable)或承诺(Promise)。
// 检查路由访问权
class CanActivateGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean { ... }
}
{ path: ..., canActivate: [CanActivateGuard] }

// 一个用来定义类的接口，路由器在导航后会首先调用它来决定是否应该取消该组件的激活状态。
// 询问是否丢弃未保存的修改
class CanDeactivateGuard implements CanDeactivate<T> {
  canDeactivate(
    component: T,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean { ... }
}
{ path: ..., canDeactivate: [CanDeactivateGuard] }

// 一个用来定义类的接口，路由器会首先调用它来决定是否应该激活该子路由。
// 检查子路由访问权
class CanActivateChildGuard implements CanActivateChild {
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean { ... }
}
{ path: ..., canActivateChild: [CanActivateGuard], children: ... }

// 一个用来定义类的接口，路由器会在渲染该路由之前先调用它来解析路由数据。
// 预先获取路由数据
class ResolveGuard implements **Resolve**<T> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any { ... }
}
{ path: ..., resolve: [ResolveGuard] }

// 一个用来定义类的接口，路由器会首先调用它来决定一个延迟加载的模块是否应该被加载。
// 在加载特性模块之前进行检查
class CanLoadGuard implements CanLoad {
  canLoad(
    route: Route
  ): Observable<boolean>|Promise<boolean>|boolean { ... }
}
{ path: ..., canLoad: [CanLoadGuard], loadChildren: ... }
```
