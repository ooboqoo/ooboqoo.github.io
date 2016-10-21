# 模板语法

使用模型-视图-控制器 (MVC) 概念来理解 Angular，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。

### HTML

几乎所有的 HTML 语法都是有效的模板语法。但 `<script>` 元素例外，它被禁用了，以阻止脚本注入攻击的风险。

有些合法的 HTML 被用在一个模板中是没有意义的，如 `<html>` `<body>` 和 `<base>`。

我们可以通过组件和指令来扩展模板中的 HTML 词汇。它们看上去就是新元素和属性。

### 插值表达式 Interpolation

我们使用插值表达式来把计算所得的字符串插入成 HTML 元素标签内的文本或对标签的属性进行赋值。

```html
<h3>{{title}} <img src="{{heroImageUrl}}" style="height:30px"></h3>
```

更一般化的说法是：括号间的素材是一个 **模板表达式** ， Angular 首先 **对它求值** 然后把它 **转换成字符串**。

### 模板表达式 Template expressions

模板表达式在 JavaScript 表达式基础上作了些修改。

JavaScript 中那些具有或可能引发副作用的表达式是被禁止的，包括：

* 赋值 (`=`, `+=`, `-=`, ...)
* `new` 运算符
* 使用 `;` 或 `,` 的链式表达式
* 自增或自减操作符 (`++` 和 `--`)

和 JavaScript 语法的其它显著不同包括：

* 不支持位运算 `|` 和 `&`
* 具有新的 **模板表达式运算符**，比如 `|` 和 `?`

#### 表达式上下文

模板表达式不能引用全局命名空间中的任何东西。它们不能引用 `window` 或 `document`。它们不能调用 `console.log` 或 `Math.max`。它们被局限于只能访问来自表达式上下文中的成员。

典型的 **表达式上下文** 就是 **这个组件的实例**，它是各种绑定值的来源。

#### 表达式指南

* 没有可见的副作用: 模板表达式除了目标属性的值以外，不应该改变应用的任何状态。
* 执行迅速: Angular 执行模板表达式比我们想象的要频繁，它们可能在每一次按键或鼠标移动后被调用。
* 非常简单: 组件应该自己实现应用逻辑和业务逻辑，它将让开发和测试变得更容易。
* 幂等性: 一个幂等的表达式应该总是返回完全相同的东西，直到它所依赖的值中有一个变了。


### 模板语句 Template statements

**模板语句** 用来响应由绑定目标 ( 如 HTML 元素、组件或指令 ) 触发的 **事件** 对象。

我们将在 **事件绑定** 一节看到模板语句，它出现在 `=` 号右侧的引号中，就像这样：`(event)="statement"`。

模板语句的限制较模板表达式相对宽松些，它既支持基本赋值 `=` 又支持使用分号 `;` 和逗号 `,` 把表达式串起来。

但无论如何，某些 JavaScript 语法仍然是不允许的：

* `new` 运算符
* 自增和自减运算符： `++` 和 `--`
* 操作并赋值，比如 `+=` 和 `-=`
* 位操作符 `|` 和 `&`
* 模板表达式运算符

和表达式中一样，语句只能引用语句上下文中的内容，典型的就是我们正在绑定事件的那个 **组件的实例**。

语句上下文可以包含组件之外的对象。**模板引用对象** 就是这些备选上下文对象中的一个。在事件绑定语句中，我们将频繁的看到被保留的 `$event` 符号，它代表来自所触发事件的“消息”或“有效载荷”。


### 绑定语法

一旦我们开始数据绑定，我们就不再跟 Attribute 打交道了，而是在设置 DOM 元素、组件和指令的 Property。

Attribute 是由 HTML 定义的，Property 是由 DOM(Document Object Model) 定义的。Attribute 初始化 DOM Property，然后它们的任务就完成了。Property 的值可以改变；Attribute 的值不能改变。

#### 绑定目标

数据绑定的目标可能是 ( 元素 | 组件 | 指令 ) 的 Property、事件，或 ( 极少数情况下 ) 一个 Attribute 名。

绑定类型  | 范例
--------- | -----------
Property  | `<div [ngClass] = "{selected: isSelected}"></div>`
事件      | `<button (click) = "onSave()">Save</button>`
双向      | `<input [(ngModel)]="heroName">`
Attribute | `<button [attr.aria-label]="help">help</button>`
CSS 类    | `<div [class.special]="isSpecial">Special</div>`
样式      | `<button [style.color] = "isSpecial ? 'red' : 'green'">`

### 属性绑定

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

#### 单向 输入

属性绑定是 **单向绑定**，值只能从组件中的属性，流动到目标元素的属性。

> 如果我们不得不读取目标元素上的属性或调用它的某个方法，我们得用 `viewChild` 和 `contentChild`。

#### 绑定目标


#### 消除副作用

我们的表达式也可能会调用一个具有副作用的属性或方法。但 Angular 没法知道这一点，也没法防止我们误用。

表达式中可以调用像 getFoo() 这样的方法。如果 getFoo() 改变了什么，而我们把它绑定在什么地方，我们就可能把自己坑了。
Angular 可能显示也可能不显示变化后的值。Angular 还可能检测到变化，并抛出一个警告型错误。

#### 别忘了方括号

括号会告诉 Angular 要计算模板表达式。如果我们忘了括号，Angular 就会把这个表达式当做一个字符串常量看待，并且用该字符串来初始化目标属性。它 **不会** 计算这个字符串。

#### 属性绑定还是插值表达式？

```html
<!-- 下列绑定做的事情完全相同 -->
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>
```

在多数情况下，插值表达式是一个更方便的备选项。实际上，在渲染视图之前，Angular 就把这些插值表达式翻译成了对应的属性绑定形式。

#### 内容安全

假设有下面这样一段恶意代码：

```html
evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
```

幸运的是，Angular 数据绑定对危险的 HTML 早有防备。在显示它们之前，会先对内容进行无害化处理。


### HTML 属性、class 和 style 绑定

模板语法为那些不太适合使用属性绑定的场景提供了专门的单向数据绑定形式。

#### Attribute 绑定

我们可以通过 Attribute 绑定 来直接设置 Attribute 的值。

ARIA, SVG 和 table 中的 `colspan/rowspan` 等 Attribute。它们是纯粹的 Attribute，没有对应的属性可供绑定。

```html
<tr><td [attr.colspan]="1 + 1">One-Two</td></tr> <!-- 格式 [attr.attributeName]="expression" -->
```

#### CSS 类绑定

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


#### 样式绑定



### 事件绑定



### 双向数据绑定

### 内置指令


### * 与 <template>

### 模板引用变量

### 输入输出属性

### 模板表达式操作符





