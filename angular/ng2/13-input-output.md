# 数据显示 &amp; 用户输入

## 显示数据

利用插值表达式和其它形式的属性绑定机制，把数据显示到 UI 上。

在 Angular 中最典型的数据显示方式，就是把 HTML 模板中的控件绑定到 Angular 组件的属性。

### 通过插值表达式显示组件的属性

```ts
template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero}}</h2>
  `
```

Angular 会自动从组件中提取 title 和 myHero 属性的值，并且把这些值插入浏览器中。一旦这些属性发生变化，Angular 就会自动刷新显示。严格来说，“重新显示”是在某些与视图有关的异步事件之后发生的，比如：按键、定时器或收到异步 XHR 响应。

注意，我们从没调用过 new 来创建 AppComponent 类的实例，是 Angular 替我们创建了它。那么它是如何创建的呢？
当我们通过 main.ts 中的 AppComponent 类启动时，Angular 在 index.html 中查找一个 `<my-app>` 元素，然后实例化一个 AppComponent，并将其渲染到 `<my-app>` 标签中。

#### 内联 (inline) 模板还是模板文件？

到底选择内联 HTML 还是独立 HTML 取决于：个人喜好、具体状况和组织级策略。  
无论用哪种风格，模板中的数据绑定在访问组件属性方面都是完全一样的。

#### 初始化：使用构造函数还是变量？

这也只是个人偏好和组织策略的问题。我们在本章中只是简单的采纳了“变量赋值”的风格，这样要阅读的代码会少一点。(其实使用 TypeScript 转译后的效果是一样的，变量都会被移入构造函数成为属性，如果使用 `let` 会报错。也就是说，只是看起来是变量而已，其实变量就是省略了 public 的属性。)

### 通过 NgFor 显示数组型属性

```ts
@Component({
  selector: 'my-app',
  template: `
    <li *ngFor="let hero of heroes"> {{ hero }} </li>`  // heroes 是一个 “模板输入变量”
})
export class AppComponent {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
}
```

#### 为数据创建一个类

我们在组件内部直接定义了数据，作为演示还可以，但它显然不是最佳实践，甚至是一个很不好的实践。

现在，我们绑定到了一个字符串数组。在真实的应用中偶尔这么做。但绝大多数时候，我们会绑定到一些对象数组上。

我们来把英雄名字的数组转换成 Hero 对象的数组。但首先得有一个 Hero 类。

```ts
export class Hero {
  constructor(
    public id: number,
    public name: string) { }
}
```

它可能看上去不像是有属性的类，但确实有。我们利用的是 TypeScript 提供的简写形式(正式称谓为：**参数属性**)——用构造函数的参数直接定义属性。`public id: number` 这个简写语法做了很多：

* 定义了一个构造函数参数及其类型
* 定义了一个同名的公开属性
* 当我们 new 出该类的一个实例时，把该属性初始化为相应的参数值

最后，我们让组件中的 heroes 属性返回这些 Hero 对象的数组。

```ts
heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(13, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];
```

### 通过 NgIf 实现按条件显示

```ts
// 假设在有大量的英雄——比如大于 3 位的情况下，我们想要显示一条消息
`<p *ngIf="heroes.length > 3">There are many heroes!</p>`
```

双引号中的 **模板表达式**，看起来很像 JavaScript，但它也只是 “像” JavaScript。

Angular 并不是在显示和隐藏这条消息，它是在从 DOM 中添加和移除这些元素。在这个范例中，它们 (在性能上) 几乎等价。但是如果我们想要有条件地包含或排除“一大堆”带着很多数据绑定的 HTML，性能上的区别就会更加显著。

### 小结

现在我们知道了如何：

* 用带有双花括号的 插值表达式 Interpolation 来显示组件的一个属性
* 用 NgFor 来显示条目列表
* 用一个 TypeScript 类来为我们的组件描述 **数据模型** 并显示模型的各个属性。
* NgIf 用来根据一个布尔表达式有条件的显示一段 HTML

## 用户输入

### 绑定到用户输入事件

我们可以使用 Angular 事件绑定机制来响应任何 DOM 事件。  
语法非常简单。我们只要把 DOM 事件的名字包裹在圆括号中，然后用一个放在引号中的“模板语句”对它赋值就可以了。

```ts
`<button (click)="onClickMe()">Click me!</button>`
  // 等号左边的 (click) 表示把该按钮的点击事件作为 *绑定目标*
  // 等号右边，引号中的文本是一个 *模板语句*，其语法是 JavaScript 语法的一个受限子集，但也添加了少量“小花招”。
```

写绑定时，我们必须知道 **模板语句** 的 **执行上下文**。出现在模板语句中的各个标识符，全都属于一个特定的上下文对象。这个对象通常都是控制此模板的 Angular 组件。

### 通过 `$event` 对象取得用户输入

```ts
// 这里的实现不够漂亮，直接把 DOM 事件对象传到方法里的做法有一个严重的问题：方法需要关注过多模板细节。
@Component({
  selector: 'key-up1',
  template: `
    <input (keyup)="onKey($event)">  <!-- $event 是模板语法里的系统变量，指向当前事件对象 -->
    <p>{{values}}</p>`
})
export class KeyUpComponent_v1 {
  values = '';
  onKey(event: KeyboardEvent) { this.values += event.target.value + ' | '; }
}
```

### 从一个模板引用变量中获得用户输入

还有另一种方式，不用通过 $event 变量来获得用户数据。

Angular 有一个叫做 **模板引用变量** 的语法特性。这些变量给了我们直接访问元素的能力。通过在标识符前加上井号 `#`，我们就能定义一个模板引用变量。

```ts
@Component({
  selector: 'loop-back',
  template: `
    <input #box (keyup)="0">  <!-- keyup 其实什么也没做，添加异步事件响应只为触发 Angular 来更新绑定 -->
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```

```ts
// 改写前面示例，该方案最漂亮的一点是：组件代码从视图中获得了干干净净的数据值，再也不用了解 $event 变量及其结构了
@Component({
  selector: 'key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) { this.values += value + ' | '; }
}
```

### 按键事件过滤 

```ts
`<input #box (keyup.enter)="values=box.value">`  // 只有按下回车键才会更新
```

当绑定到 (keyup) 事件的时候，我们的事件处理语句会听到每一次按键。我们应该先过滤一下按键，比如每一个 $event.keyCode，并且只有当这个按键是回车键的时候才更新 values 属性。

Angular 可以为我们过滤键盘事件，它有一个关于键盘事件的特殊语法。通过绑定到 `keyup.enter` 伪事件，就只会监听回车键的事件。

### blur 事件

```ts
`<input #box (blur)="values=box.value">`  // 失去焦点时更新
```
