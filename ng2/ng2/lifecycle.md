# 生命周期钩子

## 组件生命周期

## 组件生命周期钩子

指令和组件的实例有一个生命周期：新建、更新和销毁。通过实现一个或多个 Angular `core` 库里定义的 生命周期钩子 接口，开发者可以介入该生命周期中的这些关键时刻。

每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上 `ng` 前缀构成的。比如， `OnInit` 接口的钩子方法叫做 `ngOnInit`。

## 生命周期的顺序

当 Angular 使用构造函数新建一个组件或指令后，就会按下面的顺序在特定时刻调用这些生命周期钩子方法：

#### `ngOnChanges`

目的：当 Angular (重新)设置数据绑定输入属性时响应。该方法接受当前和上一属性值的 `SimpleChanges` 对象。   
时机：当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在 `ngOnInit` 之前。

#### `ngOnInit`

目的：在 Angular 第一次显示数据绑定和设置指令 / 组件的输入属性之后，初始化指令 / 组件。   
时机：在第一轮 `ngOnChanges` 完成之后调用，只调用一次。

#### `ngDoCheck`

目的：检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。   
时机：在每个 Angular 变更检测周期中调用， `ngOnChanges` 和 `ngOnInit` 之后。

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

#### `ngOnDestroy`

目的：当 Angular 每次销毁指令 / 组件之前调用并清理。在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
时机：在 Angular 销毁指令 / 组件之前调用。

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
// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive({selector: '[mySpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  constructor(private logger: LoggerService) { }
  ngOnInit()    { this.logIt(`onInit`); }
  ngOnDestroy() { this.logIt(`onDestroy`); }
  private logIt(msg: string) {
    this.logger.log(`Spy #${nextId++} ${msg}`);
  }
}
```

我们可以把这个侦探指令写到任何原生元素或组件元素上，它将与所在的组件同时初始化和销毁。
下面是把它附加到用来重复显示英雄数据的这个 div 上。

```html
<div *ngFor="let hero of heroes" mySpy class="heroes">{{hero}}</div>
```

每个“侦探”的出生和死亡也同时标记出了存放英雄的那个 div 的出生和死亡。钩子记录中的结构看起来是这样的：

### OnChanges

```ts
ngOnChanges(changes: SimpleChanges) {
  for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);
    this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  }
}
```


## 变更检测

Adding `ChangeDetectionStrategy.OnPush` told Angular only to re-render when the input property changes, so it does no longer re-render when we change the property programmatically from within the controller.























