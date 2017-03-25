# 生命周期钩子

## 组件生命周期

每个组件都有一个被 Angular 管理的生命周期。

Angular 创建它，渲染它，创建并渲染它的子组件，在它被绑定的属性发生变化时检查它，并在它从 DOM 中被移除前销毁它。

Angular 提供了 **生命周期钩子**，把这些关键生命时刻暴露出来，赋予我们在它们发生时采取行动的能力。

除了那些组件内容和视图相关的钩子外，指令有相同生命周期钩子。

> 只有组件和指令才有，普通的类不具有钩子，如写 service 时就无法用生命周期钩子。

## 组件生命周期钩子

通过实现一个或多个 Angular `core` 库里定义的 生命周期钩子 接口，开发者可以介入该生命周期中的这些关键时刻。

每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上 `ng` 前缀构成的。如 `OnInit` 接口的钩子方法叫 `ngOnInit`。

## 生命周期的顺序

当 Angular 使用构造函数新建一个组件或指令后，就会按下面的顺序在特定时刻调用这些生命周期钩子方法：

#### `ngOnChanges`

目的：当 Angular (重新)设置数据绑定输入属性时响应。该方法接受当前和上一属性值的 `SimpleChanges` 对象。   
时机：当被绑定的 **输入属性** 的值发生变化时调用，首次调用一定会发生在 `ngOnInit` 之前。

#### `ngOnInit`

目的：在 Angular 第一次显示数据绑定和设置指令 / 组件的输入属性之后，初始化指令 / 组件。   
时机：在第一轮 `ngOnChanges` 完成之后调用，只调用一次。

> 构造函数中除了使用简单的值对局部变量进行初始化之外，什么都不应该做。`ngOnInit` 才是组件获取初始数据的好地方。  
> 另外，在指令的构造函数完成之前，那些被绑定的输入属性还都没有值。所以我们也无法在构造函数中完成需要基于输入属性的值来初始化的任务。

#### `ngDoCheck`

目的：检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。   
时机：在每个 Angular 变更检测周期中调用，`ngOnChanges` 和 `ngOnInit` 之后。

> `ngDoCheck` 被非常频繁的调用，使用必须非常小心。

#### `ngAfterContentInit` 只适用于组件

目的：当把内容投影进组件之后调用。   
时机：第一次 `NgDoCheck` 之后调用，只调用一次。

#### `ngAfterContentChecked` 只适用于组件

目的：每次完成被投影组件内容的变更检测之后调用。   
时机：`ngAfterContentInit` 和每次 `NgDoCheck` 之后调用。

#### `ngAfterViewInit` 只适用于组件

目的：初始化完组件视图及其子视图之后调用。   
时机：第一次 `ngAfterContentChecked` 之后调用，只调用一次。

#### `ngAfterViewChecked` 只适用于组件

目的：每次做完组件视图和子视图的变更检测之后调用。   
时机：`ngAfterViewInit` 和每次 `ngAfterContentChecked` 之后调用。

> Angular 会频繁的调用 AfterViewChecked，甚至在并没有需要关注的更改时也会触发。所以务必把这个钩子写得尽可能精简。

#### `ngOnDestroy`

目的：当 Angular 每次销毁指令 / 组件之前调用并清理。在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。   
时机：在 Angular 销毁指令 / 组件之前调用。

> 这里是用来释放那些不会被垃圾收集器自动回收的各类资源的地方。取消那些对可观察对象和 DOM 事件的订阅。停止定时器。注销该指令曾注册到全局服务或应用级服务中的各种回调函数。如果不这么做，就会有导致内存泄露的风险。

## 接口是可选的

从纯技术的角度讲，接口对 JavaScript 和 TypeScript 的开发者都是可选的。JavaScript 语言本身没有接口。Angular 在运行时看不到 TypeScript 接口，因为它们在编译为 JavaScript 的时候已经消失了。

Angular 会去检测我们的指令和组件的类，一旦发现钩子方法被定义了，就调用它们。

虽然如此，我们还是强烈建议你在 TypeScript 指令类中添加接口，以获得强类型和 IDE 等编辑器带来的好处。

## 其它生命周期钩子

Angular 的其它子系统除了有这些组件钩子外，还可能有它们自己的生命周期钩子。

第三方库也可能会实现它们自己的钩子，以便让我们这些开发者在使用时能做更多的控制。


## 生命周期练习

### 打印全部钩子

```txt
-- Lifecycle Hook Log --
>>>action: Create PeekABooComponent
#1 name is not known at construction
#2 OnChanges: name initialized to "Windstorm"
#3 OnInit
#4 DoCheck
#5 AfterContentInit
#6 AfterContentChecked
#7 AfterViewInit
#8 AfterViewChecked
>>>action: Update Hero
#9 DoCheck
#10 AfterContentChecked
#11 AfterViewChecked
#12 OnChanges: name changed to "Windstorm!"
#13 DoCheck
#14 AfterContentChecked
#15 AfterViewChecked
>>>action: Destroy PeekABooComponent
#16 DoCheck
#17 AfterContentChecked
#18 AfterViewChecked
#19 OnDestroy
```

### 窥探 OnInit 和 OnDestroy

```ts
import { Directive, OnInit, OnDestroy } from '@angular/core';
let nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive({selector: '[mySpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  private id: number;
  ngOnInit() { console.log(`${this.id = nextId++} onInit`); }
  ngOnDestroy() { console.log(`${this.id} onDestroy`); }
}
```

我们可以把这个侦探指令写到任何原生元素或组件元素上，它将与所在的组件同时初始化和销毁。

下例中每个“侦探”的出生和死亡也同时标记出了存放英雄的那个 div 的出生和死亡。

```html
<div *ngFor="let hero of heroes" mySpy class="heroes">{{hero}}</div>
```

### OnChanges

```ts
ngOnChanges(changes: SimpleChanges) {
  console.log(changes);
}
// 输出格式
{                // type: SimpleChanges
  inputValue：{  // type: SimpleChange
    currentValue: "after change",
    previousValue: "before change",
  }
}
```

## 变更检测

Adding `ChangeDetectionStrategy.OnPush` told Angular only to re-render when the input property changes, so it does no longer re-render when we change the property programmatically from within the controller.























