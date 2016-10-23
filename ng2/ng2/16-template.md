# 模板语法

使用模型-视图-控制器 (MVC) 概念来理解 Angular，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。

## HTML

几乎所有的 HTML 语法都是有效的模板语法。但 `<script>` 元素例外，它被禁用了，以阻止脚本注入攻击的风险。

有些合法的 HTML 被用在一个模板中是没有意义的，如 `<html>` `<body>` 和 `<base>`。

我们可以通过组件和指令来扩展模板中的 HTML 词汇。它们看上去就是新元素和属性。

## 插值表达式 Interpolation

我们使用插值表达式来把计算所得的字符串插入成 HTML 元素标签内的文本或对标签的属性进行赋值。

```html
<h3>{{title}} <img src="{{heroImageUrl}}" style="height:30px"></h3>
```

更一般化的说法是：括号间的素材是一个 **模板表达式** ，Angular 首先 **对它求值** 然后把它 **转换成字符串**。

## 模板表达式 Template expressions

模板表达式在 JavaScript 表达式基础上作了些修改。

JavaScript 中那些具有或可能引发副作用的表达式是被禁止的，包括：

* 赋值 (`=`, `+=`, `-=`, ...)
* `new` 运算符
* 使用 `;` 或 `,` 的链式表达式
* 自增或自减操作符 (`++` 和 `--`)

和 JavaScript 语法的其它显著不同包括：

* 不支持位运算 `|` 和 `&`
* 具有新的 **模板表达式运算符**，比如 `|` 和 `?`

### 表达式上下文

模板表达式不能引用全局命名空间中的任何东西。它们不能引用 `window` 或 `document`。它们不能调用 `console.log` 或 `Math.max`。它们被局限于只能访问来自表达式上下文中的成员。

典型的 **表达式上下文** 就是 **这个组件的实例**，它是各种绑定值的来源。

### 表达式指南

* 没有可见的副作用: 模板表达式除了目标属性的值以外，不应该改变应用的任何状态。
* 执行迅速: Angular 执行模板表达式比我们想象的要频繁，它们可能在每一次按键或鼠标移动后被调用。
* 非常简单: 组件应该自己实现应用逻辑和业务逻辑，它将让开发和测试变得更容易。
* 幂等性: 一个幂等的表达式应该总是返回完全相同的东西，直到它所依赖的值中有一个变了。


## 模板语句 Template statements

**模板语句** 用来响应由绑定目标 ( 如 HTML 元素、组件或指令 ) 触发的 **事件** 对象。

我们将在 **事件绑定** 一节看到模板语句，它出现在 `=` 号右侧的引号中，就像这样：`(event)="statement"`。

模板语句的限制较模板表达式相对宽松些，它既支持基本赋值 `=` 又支持使用分号 `;` 和逗号 `,` 把表达式串起来。

但无论如何，某些 JavaScript 语法仍然是不允许的：

* `new` 运算符
* 自增和自减运算符： `++` 和 `--`
* 操作并赋值，比如 `+=` 和 `-=`
* 位操作符 `|` 和 `&`
* 模板表达式运算符

和表达式中一样，模板语句只能引用语句上下文中的内容，典型的就是我们正在绑定事件的那个 **组件的实例**。

语句上下文可以包含组件之外的对象。**模板引用对象** 就是这些备选上下文对象中的一个。在事件绑定语句中，我们将频繁的看到被保留的 `$event` 符号，它代表来自所触发事件的“消息”或“有效载荷”。


## 绑定语法

一旦我们开始数据绑定，我们就不再跟 Attribute 打交道了，而是在设置 DOM 元素、组件和指令的 Property。

Attribute 是由 HTML 定义的，Property 是由 DOM(Document Object Model) 定义的。Attribute 初始化 DOM Property，然后它们的任务就完成了。Property 的值可以改变；Attribute 的值不能改变。

### 绑定目标

数据绑定的目标可能是 ( 元素 | 组件 | 指令 ) 的 Property、事件，或 ( 极少数情况下 ) 一个 Attribute 名。

绑定类型  | 范例
--------- | -----------
Property  | `<div [ngClass] = "{selected: isSelected}"></div>`
事件      | `<button (click) = "onSave()">Save</button>`
双向      | `<input [(ngModel)]="heroName">`
Attribute | `<button [attr.aria-label]="help">help</button>`
CSS 类    | `<div [class.special]="isSpecial">Special</div>`
样式      | `<button [style.color] = "isSpecial ? 'red' : 'green'">`

## 属性绑定

```html
<!-- 最常用的属性绑定是把元素的属性设置为组件中属性的值。 -->
<img [src]="heroImageUrl">
<!-- 另一个例子是当组件说它 isUnchanged( 未改变 ) 时禁用一个按钮 -->
<button [disabled]="isUnchanged">Cancel is disabled</button>
<!-- 另一个例子是设置指令的属性 -->
<div [ngClass]="classes">[ngClass] binding to the classes property</div>
<!-- 另一个例子是设置一个自定义组件的模型属性 ( 这是父子组件之间通讯的重要途径 )  -->
<hero-detail [hero]="currentHero"></hero-detail>
```

### 单向输入

属性绑定是 **单向绑定**，值只能从组件中的属性，流动到目标元素的属性。

> 如果我们不得不读取目标元素上的属性或调用它的某个方法，我们得用 `viewChild` 和 `contentChild`。

### 绑定目标


### 消除副作用

我们的表达式也可能会调用一个具有副作用的属性或方法。但 Angular 没法知道这一点，也没法防止我们误用。

表达式中可以调用像 getFoo() 这样的方法。如果 getFoo() 改变了什么，而我们把它绑定在什么地方，我们就可能把自己坑了。
Angular 可能显示也可能不显示变化后的值。Angular 还可能检测到变化，并抛出一个警告型错误。

### 别忘了方括号

括号会告诉 Angular 要计算模板表达式。如果我们忘了括号，Angular 就会把这个表达式当做一个字符串常量看待，并且用该字符串来初始化目标属性。它 **不会** 计算这个字符串。

### 属性绑定还是插值表达式？

```html
<!-- 下列绑定做的事情完全相同 -->
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>
```

在多数情况下，插值表达式是一个更方便的备选项。实际上，在渲染视图之前，Angular 就把这些插值表达式翻译成了对应的属性绑定形式。

### 内容安全

假设有下面这样一段恶意代码：

```html
evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
```

幸运的是，Angular 数据绑定对危险的 HTML 早有防备。在显示它们之前，会先对内容进行无害化处理。


## HTML 属性、class 和 style 绑定

模板语法为那些不太适合使用属性绑定的场景提供了专门的单向数据绑定形式。

### Attribute 绑定

我们可以通过 Attribute 绑定 来直接设置 Attribute 的值。

ARIA, SVG 和 table 中的 `colspan/rowspan` 等 Attribute。它们是纯粹的 Attribute，没有对应的属性可供绑定。

```html
<tr><td [attr.colspan]="1 + 1">One-Two</td></tr> <!-- 格式 [attr.attributeName]="expression" -->
```

### CSS 类绑定

借助 CSS 类绑定，我们可以从元素的 class Attribute 上添加和移除 CSS 类名。

CSS 类绑定在语法上类似于属性绑定，完整格式为 `[class.class-name]` 其中后面的`.class-name` 是可选的。

```html
<div class="bad curly special">Bad curly special</div> <!-- 没有使用绑定的写法 -->
<div class="bad curly special" [class]="badCurly">Bad curly</div>
  <!-- 这是一个或者全有或者全无的替换型绑定，如果 badCurly 有值，前面的所有 class 都会被覆盖 -->
<div class="special others" [class.special]="!isSpecial">This one is not so special</div>
  <!-- 绑定到一个特定的类名，这种绑定不会影响 others 类名 -->
```

> 虽然这是一个切换单一类名的好办法，但我们通常更喜欢使用 `NgClass` 指令来同时管理多个类名。


### 样式绑定

通过 样式绑定 ，我们可以设置内联样式。完整格式为 `[style.style-property]` 其中后面的 `.style-property` 是可选的。

```html
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button> <!-- 如果有单位的话加在最后面 -->
```

> 虽然这是一个设置单一样式的好办法，但我们通常更喜欢使用 NgStyle 指令 来同时设置多个内联样式。
> 
> 注意，一个 样式属性 命名方法可以用 **中线命名法**，像上面的一样 也可以用 **驼峰式命名法**，比如 fontSize。

## 事件绑定

事件绑定语法由等号左侧带圆括号的 **目标事件**，和右侧一个引号中的 **模板语句** 组成。下列事件绑定监听按钮的点击事件。无论什么时候，发生点击时，都会调用组件的 onSave() 方法。

```html
<button (click)="onSave()">Save</button>
```

### 目标事件

圆括号中的名称 ——如 (click) ——标记出了目标事件。

**元素事件** 可能是更常见的目标，但 Angular 会先看这个名字是否能匹配上已知指令的事件属性。

如果这个名字没能匹配到元素事件或已知指令的输出型属性，Angular 就会报“未知指令”错误。

### `$event` 和事件处理语句

在事件绑定中，Angular 会为目标事件设置事件处理器。当事件发生时，这个处理器会执行模板语句。

事件绑定会通过一个 **名叫 $event 的事件对象** 传达关于此事件的信息(包括数据值)。

事件对象的形态取决于目标事件。如果目标事件是一个原生 DOM 元素事件， $event 就是一个 DOM 事件对象 ，它有像 target 和 target.value 这样的属性。

如果这个事件属于指令(回想一下：组件是指令的一种)，那么 $event 便具有指令中生成的形态。

### 使用 EventEmitter 实现自定义事件

指令使用典型的 Angular `EventEmitter` 来触发自定义事件。指令调用 `EventEmitter.emit(payload)` 来触发事件，传进去的消息载荷可以是任何东西。父指令通过绑定到这个属性来监听这个事件，并且通过 $event 对象来访问这个载荷。

```ts
// HeroDetailComponent.ts
template: `<button (click)="delete()">Delete</button>`
  // ...
@Output() deleteRequest = new EventEmitter<Hero>();
delete() { this.deleteRequest.emit(this.hero); }
```

### 模板语句有副作用

deleteHero 方法有一个副作用：它删除了一个英雄。模板语句的副作用不仅没问题，反而正是我们所期待的。


## 双向数据绑定

> 要使用 ngModel 做双向数据绑定，得先把 FormsModule 导入我们的模块并把它加入 NgModule 装饰器的 imports 数组。

### `[(ngModel)]` 内幕

```html
<input
  [ngModel]="currentHero.firstName"
  (ngModelChange)="currentHero.firstName=$event">
```

Angular 会把 `[(x)]` 语法去掉语法糖，变成了一个供属性绑定用的输入属性 x ，和一个供事件绑定用的输出属性 xChange。Angular 通过在模板表达式的原始字符串后面追加上 =$event，来构建出供事件绑定用的模板语句。

利用这一行为，我们也可以自己写出具有双向绑定功能的指令。

```ts
[(x)]="e" <==> [x]="e" (xChange)="e=$event"
```

## 内置指令

前一个版本的 Angular 中包含了超过 70 个内置指令。社区贡献了更多，这还没算为内部应用而创建的无数私有指令。

在 Angular2 中我们不需要那么多指令。使用更强大、更富有表现力的 Angular 绑定系统，我们其实可以达到同样的效果。

我们仍然可以从简化复杂任务的指令中获益。Angular 发布时仍然带有内置指令，只是没那么多了。我们仍会写自己的指令，只是没那么多了。下面这部分就检阅一下那些最常用的内置指令。

### `NgClass`

CSS 类绑定 是添加或删除 单个 类的最佳途径。当我们想要同时添加或移除 多个 CSS 类时，NgClass 指令可能是更好的选择。

```html
<div [ngClass]="{ 'saveable': canSave, 'modified': !isUnchanged }">This div is saveable and special</div>
```

### `NgStyle`

我们可以基于组件的状态动态设置内联样式。 绑定到 NgStyle 可以让我们同时设置很多内联样式。

样式绑定 是设置 单一 样式值的简单方式，如果我们要同时设置 多个 内联样式， NgStyle 指令可能是更好的选择。

```html
<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
```

### `NgIf`

通过把 NgIf 指令绑定到一个真值表达式，我们可以把一个元素的子树 ( 元素及其子元素 ) 添加到 DOM 上。

```html
<div *ngIf="currentHero">Hello, {{currentHero.firstName}}</div>
```

#### 可见性和 NgIf 不是一回事

我们可以通过 类绑定 或 样式绑定 来显示和隐藏一个元素的子树(元素及其子元素)。隐藏一个子树和用 NgIf 排除一个子树是截然不同的。

当我们隐藏一个子树时，它仍然留在 DOM 中。子树中的组件及其状态仍然保留着。即使对于不可见属性，Angular 也会继续检查变更。子树可能占用相当可观的内存和运算资源。

当 NgIf 为 false 时，Angular 从 DOM 中实际移除了这个元素的子树。它销毁了子树中的组件及其状态，也潜在释放了可观的资源，最终让用户体验到更好的性能。

### `NgSwitch`

当需要从 **一组** 可能的元素树中根据条件显示 **一个** 时，我们就把它绑定到 `NgSwitch`。Angular 将只把选中的元素树放进 DOM 中。

```html
<span [ngSwitch]="toeChoice">
  <span *ngSwitchCase="'Eenie'">Eenie</span>
  <span *ngSwitchCase="'Meanie'">Meanie</span>
  <span *ngSwitchDefault>other</span>
</span>
```

### `NgFor`

```html
<div *ngFor="let hero of heroes">{{hero.fullName}}</div>
```

赋值给 `*ngFor` 的字符串并不是一个 **模板表达式**，它是一个 **微语法** ——由 Angular 自己解释的小型语言。

`ngFor` 指令支持一个可选的 `index` ，它在迭代过程中会从 0 增长到“当前数组的长度”。

```
<div *ngFor="let hero of heroes; let i=index">{{i + 1}} - {{hero.fullName}}</div>
```

`ngFor` 指令有时候会性能较差，特别是在大型列表中。对一个条目的一点小更改、移除或添加，都会导致级联的 DOM 操作。

如果我们给它一个 **追踪** 函数，Angular 就可以避免这种折腾。追踪函数告诉 Angular：我们知道两个具有相同 hero.id 的对象其实是同一个英雄。

```ts
trackByHeroes(index: number, hero: Hero) { return hero.id; }
```

```html
<div *ngFor="let hero of heroes; trackBy:trackByHeroes">({{hero.id}}) {{hero.fullName}}</div>
```


## `*` 与 `<template>`

`*` 是一种语法糖，它让那些需要借助模板来修改 HTML 布局的指令更易于读写。NgFor、NgIf 和 NgSwitch 都会添加或移除元素子树，这些元素子树被包裹在 `<template>` 标签中。

我们没有看到 `<template>` 标签，那是因为这种 `*` 前缀语法让我们忽略了这个标签，而把注意力直接聚焦在所要包含、排除或重复的那些 HTML 元素上。

### 展开 `*ngIf`

```html
<hero-detail *ngIf="currentHero" [hero]="currentHero"></hero-detail>
```

```html
<template [ngIf]="currentHero">
  <hero-detail [hero]="currentHero"></hero-detail>
</template>
```

### 展开 `*ngSwitch`

```html
<span [ngSwitch]="toeChoice">
  <!-- with *NgSwitch -->
  <span *ngSwitchCase="'Eenie'">Eenie</span>
  <span *ngSwitchCase="'Meanie'">Meanie</span>
  <span *ngSwitchDefault>other</span>
  <!-- with <template> -->
  <template [ngSwitchCase]="'Eenie'"><span>Eenie</span></template>
  <template [ngSwitchCase]="'Meanie'"><span>Meanie</span></template>
  <template ngSwitchDefault><span>other</span></template>
</span>
```

### 展开 `*ngFor`

```html
<hero-detail *ngFor="let hero of heroes; trackBy:trackByHeroes" [hero]="hero"></hero-detail>
```

```html
<template ngFor let-hero [ngForOf]="heroes" [ngForTrackBy]="trackByHeroes">
  <hero-detail [hero]="hero"></hero-detail>
</template>
```


## 模板引用变量

模板引用变量 是模板中对 DOM 元素或指令的引用。它能在原生 DOM 元素中使用，也能用于 Angular 组件。

```html
<input #phone placeholder="phone number">
<button (click)="callPhone(phone.value)">Call</button>
```

```html
<form (ngSubmit)="onSubmit(theForm)" #theForm="ngForm">
  <label for="name">Name</label>
  <input name="name" required [(ngModel)]="currentHero.firstName">
  <button type="submit" [disabled]="!theForm.form.valid">Submit</button>
</form>
```


## 输入输出属性

我们要重点突出下绑定 **目标** 和绑定 **源** 的区别。

绑定的 **目标** 是在 `=` 左侧的部分，**源** 则是在 `=` 右侧的部分。

绑定的 **目标** 是绑定符：`[]`、`()` 或 `[()]` 中的属性或事件名，**源** 则是引号 `" "` 中的部分或插值符号 `{{ }}` 中的部分。

**源** 指令中的每个成员都会自动在绑定中可用。我们不需要特别做什么，就能在模板表达式或语句中访问指令的成员。

访问 **目标** 指令中的成员则 **受到限制**。我们只能绑定到那些显式标记为 **输入** 或 **输出** 的属性。

### 声明输入和输出属性

我们既可以通过装饰器，又可以通过元数据数组来指定输入 / 输出属性。但别同时用！

```ts
@Input()  hero: Hero;
@Output() deleteRequest = new EventEmitter<Hero>();
```

```ts
@Component({
  inputs: ['hero'],
  outputs: ['deleteRequest'],
})
```

### 输入 / 输出属性别名

```html
<div (myClick)="clickMessage=$event">click with myClick</div>
```

```ts
@Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...

@Directive({
  outputs: ['clicks:myClick']  // propertyName:alias
})
```


## 模板表达式操作符

模板表达式语言使用了 JavaScript 语法的一个子集，并补充了几个用于特定场景的特殊操作符。这里我们讲其中的两个：**管道** 和 **安全导航操作符**。

### 管道操作符 `|`

管道是一个简单的函数，它接受一个输入值，并返回转换结果。它们很容易用于模板表达式中。

```html
<div>Title through uppercase pipe: {{title | uppercase}}</div>

<!-- 多个管道串连使用 -->
<div>Title through a pipe chain: {{title | uppercase | lowercase}}</div>

<!-- 还能对它们使用参数 -->
<div>Birthdate: {{currentHero?.birthdate | date:'longDate'}}</div>

<!-- json 管道是特别设计来帮助我们调试绑定的 -->
<div>{{currentHero | json}}</div>
```

### 安全导航操作符 ( ?. ) 和空属性路径

Angular 的 安全导航操作符 (?.) 是一种便利的方式，当属性路径中出现 null 和 undefined 值，保护视图渲染器，让它免于失败。

```
The current hero's name is {{currentHero.firstName}}
// 当 currentHero 为定义时会抛出错误：
// TypeError: Cannot read property 'firstName' of null in [null]

The null hero's name is {{nullHero?.firstName}}  // 加了安全导航操作符后就不会报错
```
