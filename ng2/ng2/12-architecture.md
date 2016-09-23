# 架构概览

我们是这样写 Angular 应用的：用带 Angular 扩展语法的 HTML 写 **模板**，用 **组件** 类管理这些模板，用 **服务** 添加应用逻辑，并在 **模块** 中打包发布组件与服务。

然后，我们通过 **引导根模块** 来启动该应用。Angular 在浏览器中接管、展现应用内容，并根据我们提供的操作指令响应用户交互。

Angular 应用中的 8 个主要构造块：

* 模块 (Modules)
* 组件 (Components)
* 模板 (Templates)
* 元数据 (Metadata)
* 数据绑定 (Data Binding)
* 指令 (Directives)
* 服务 (Services)
* 依赖注入 (Dependency Injection)

掌握这些构造块，我们就可以开始使用 Angular 2 编写应用程序了。

## 模块

Angualr 应用是模块化的，并且 Angular 有自己的模块系统，它被称为 **Angular 模块** 或 **NgModules**。

每个 Angular 应用至少有一个模块(根模块)，习惯上命名为 AppModule 。

**根模块** 在一些小型应用中可能是唯一的模块，不过大多数应用可能会有很多 **特性模块**，它们由一组领域类、工作流、或紧密相关的功能聚合而成。

Angular 模块(无论是根模块还是特性模块)都是一个带有 **@NgModule** 装饰器的类。

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({            // NgModule 是一个装饰器工厂函数，它接收一个用来描述模块属性的元数据对象
  imports: [ BrowserModule ],// 导入其他模块以使用它们导出的视图类
  providers:    [ Logger ],  // 注册外部服务供应商，创建的服务实例能被模块中的任何部分访问，相对应的是组件级服务
  declarations: [ AppComponent ],   // 声明本模块中拥有的视图类：组件、指令和管道，这里不该出现导入模块的视图类
  exports:      [ ],                // 导出视图类，此为 declaration 的子集。根模块不需要导出任何东西。
  bootstrap:    [ AppComponent ]    // 标识出应用的主视图(根组件)，只有根模块才能设置 bootstrap 属性
})                             // NG 模块系统使用的是 imports 和 exports
export class AppModule { }     // JS 模块系统使用的是 import  和 export
```

##### Angular 模块 vs. JavaScript 模块

Angular 模块（一个用 @NgModel 装饰的类）是 Angular 的基础特性。

JavaScript 还有自己的模块系统，它用来管理一组 JavaScript 对象。 它和 Angular 的模块体系是完全不同而且完全无关的。

我们需要同时使用 Angular 和 JavaScript 的模块化系统。

##### Angular libraries

Angular 发布了一组 JavaScript 模块。每个 Angular 库的名字都带有 @angular 前缀。我们可以用 npm 包管理工具安装它们，并且用 JavaScript 的 import 语句导入它们的某些部件。

## 组件

组件负责控制屏幕上的一小块地方，我们称之为视图。

我们在类中定义组件的应用逻辑 (它被用来为视图提供支持)。组件通过一些由属性和方法组成的 API 与视图交互。

## 模板

我们通过组件自带的模板来定义视图。模板以 HTML 形式存在，用来告诉 Angular 如何渲染组件(视图)。

```html
<h2>Hero List</h2>
<p><i>Pick a hero from the list</i></p>
<ul>
  <li *ngFor="let hero of heroes" (click)="selectHero(hero)">{{hero.name}}</li>
</ul>
<hero-detail *ngIf="selectedHero" [hero]="selectedHero"></hero-detail>
```

## 元数据

元数据告诉 Angular 如何处理一个类。

```ts
@Component({
  selector:    'hero-list',
  templateUrl: 'app/hero-list.component.html',
  providers:   [ HeroService ]
})
export class HeroListComponent implements OnInit { /* . . . */ }
```

上例中的 HeroListComponent 在使用装饰器 (decorator) 来附加元数据之前，只是一个普通的类。

直到我们使用装饰器 @Component 来附加元数据，Angular 才知道 HeroListComponent 是个组件。

这种架构所决定的是：必须往代码中添加元数据，以便 Angular 知道该做什么。

## 数据绑定

如果没有框架，我们就得自己把数据值推送到 HTML 控件中，并把用户的反馈转换成动作和值更新。 如果手工写代码来实现这些推 / 拉逻辑，肯定会枯燥乏味、容易出错，读起来简直是噩梦——写过 jQuery 的程序员大概都对此深有体会。

```
      | <-------- {{value}} ---------- |              // 插值表达式 
 DOM -| <---- [property]="value" ----- |- Component   // 属性绑定
      | ---- (event)="handler()" ----> |              // 事件绑定
      | <-- [(ngModel)]="property" --> |              // 双向数据绑定(属性绑定+事件绑定)
```

Angular 支持数据绑定，一种让模板的各部分与组件的各部分相互合作的机制。我们往模板 HTML 中添加绑定标记，来告诉 Angular 如何连接两者。

##### 双向数据绑定

```ts
`<input [(ngModel)]="hero.name" name="name">`  // 当在表单中使用 [(ngModel)] 时，必须要定义 name 属性。
```

双向数据绑定：这是很重要的第四种绑定形式，它在 `ngModel` 指令这个单一标记中同时实现了属性绑定和事件绑定的功能。

在双向绑定中，数据属性的值会从具有属性绑定的组件传到输入框。通过事件绑定，用户的修改被传回到组件，属性值被更新。
- - -

Angular 在每个 JavaScript 事件周期中一次性处理**所有的**数据绑定，它会从组件树的根部开始，递归处理全部子组件。

数据绑定在模板与对应组件的交互中扮演了一个很重要的角色。   
数据绑定在父组件与子组件的通讯中也同样重要。

## 指令

Angular 模板是动态的。当 Angular 渲染它们时，它会根据指令提供的操作指南对 DOM 进行修改。

指令是一个带有“指令元数据”的类。在 TypeScript 中，要通过 @Directive 装饰器把元数据附加到类上。

Angular 指令可分为三种：组件，属性型指令，结构型指令

* 组件 其实就是一个带模板的指令。它是这三种指令中最常用的，我们会写大量的组件来构建应用程序。
* 属性型指令 会修改元素的外观或行为。比如，内建指令 `ngStyle` 就能同时修改元素的好几个样式。
* 结构型指令 通过添加和删除 DOM 元素来改变 DOM 的布局。有三个内建的结构型指令：`ngIf` `ngSwitch` `ngFor`

## 服务

> 简单讲，服务就是一个完成特定功能的类定义。

几乎任何东西都可以是一个服务。典型的服务是一个类，具有专注的、良好定义的用途。它应该做一件具体的事情，并把它做好。

一些典型的服务如：日志服务；数据服务；消息总线；税款计算器；应用程序配置

服务没有什么特别属于 Angular 的特性。Angular 对于服务也没有什么定义。
它甚至都没有定义服务的基类，也没有地方注册一个服务。
即便如此，服务仍然是任何 Angular 应用的基础。组件就是最大的服务消费者。

```ts
// logger.service.ts
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}

// hero.service.ts
export class HeroService {
  private heroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  getHeroes() {
    this.backend.getAll(Hero).then( (heroes: Hero[]) => {
      this.logger.log(`Fetched ${heroes.length} heroes.`);
      this.heroes.push(...heroes); // fill cache
    });
    return this.heroes;
  }
}
```

服务无处不在。

我们更倾向于让组件保持精简。组件不需要从服务器获得数据、不需要验证输入，也不需要直接往控制台写日志。它们把这些任务委托给了服务。

组件的任务就是提供用户体验，仅此而已。它介于 视图 和 应用逻辑 之间。设计良好的组件为数据绑定提供属性和方法，把那些其他对它们不重要的事情都委托给服务。

Angular 让我们能更轻易的把应用逻辑拆分到服务，**并通过 依赖注入 来在组件中使用这些服务**。

## 依赖注入

“依赖注入”是提供类的新实例时采用的一种依赖解决方案，它负责处理类所需的全部依赖。大多数依赖都是服务。Angular 也使用依赖注入的方式提供我们需要的组件以及这些组件所需的服务。

Angular 能通过查看构造函数的参数类型，来得知组件需要哪些服务。
当 Angular 创建组件时，会首先为组件所需的服务找一个注入器（Injector）。

**注入器是一个维护服务实例的容器**，存放着以前创建的服务实例。
如果容器中还没有所请求的服务实例，注入器就会创建一个服务实例，并且添加到容器中，然后把这个服务返回给 Angular。
当所有的服务都被解析完并返回时， Angular 会以这些服务为参数去调用组件的构造函数。这就是依赖注入。

注入器创建服务实例时，通过 `providers` 登记项来查找服务的定义，我们可以在**模块上或组件上**注册提供商。

我们通常会把提供商添加到 **根模块** 上，以便任何地方使用的都是服务的同一个实例。

或者，也可以将提供商添加到组件层，注册在组件级表示该组件的每一个新实例都会有一个 (在该组件注册的) 服务的新实例。

需要记住的关于依赖注入的要点是：

* 依赖注入渗透在整个 Angular 框架中，并且被到处使用。
* 注入器（ Injector ） 是本机制的核心。
* 注入器负责维护一个 **容器**，用于存放它创建过的服务实例。
* 注入器能使用 提供商 创建一个新的服务实例。
* 提供商 是一个用于创建服务的“配方”。
* 把 提供商 注册到注入器。

## 其他重要特性

我们学到的这些只是关于 Angular 应用程序的八个主要构造块的基础知识，要使用 Angular 2 ，以这些作为开端就绰绰有余了。 但它仍然没有包含我们需要知道的全部。

这里是一个简短的、按字母排序的列表，列出了其它重要的 Angular 特性和服务。它们大多数已经 (或即将) 包括在这份开发文档中：

**动画**：用 Angular 的动画库让组件动起来，而不需要对动画技术或 CSS 有深入的了解。

**变更检测**：“变更检测”文档会告诉你 Angular 是如何决定组件的属性值变化和什么时候该更新到屏幕的。以及它是如何用 zones 来拦截异步行为并执行变更检测策略。

**事件**：“事件”文档会告诉你如何使用组件和服务发布以及订阅事件。

**表单**：通过基于 HTML 的验证和脏检查机制支持复杂的数据输入场景。

**HTTP**：通过这个 HTTP 客户端，可以与服务器通讯，以获得数据、保存数据和触发服务端动作。

**生命周期钩子**：通过实现生命周期钩子接口，可以切入组件生命中的几个关键点：从创建到销毁。

**管道**：在模板中使用管道转换成可显示的值，以增强用户体验。比如这个 currency 管道表达式：`price | currency:'USD':true
`

**路由器**：在应用程序客户端导航，并且不离开浏览器。

**测试**：用 Angular 的 测试库 针对各个应用部件执行单元测试， 让它们好像在和 Angular 框架交互一样。







