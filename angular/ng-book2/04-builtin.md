# 指令

指令是一个 Angular 类，这个类负责创建和重塑浏览器 DOM 中的 HTML 元素，同时负责与 HTML 元素的互动。指令是 Angular 中最基本的特性之一。

Angular 模板是动态的。当 Angular 渲染它们时，它会根据 指令 提供的操作指南对 DOM 进行修改。

Angular 指令可分为三种：组件，属性型指令，结构型指令

* 组件 其实就是一个带模板的指令。它是这三种指令中最常用的，我们会写大量的组件来构建应用程序。
* 属性型指令 会修改元素的外观或行为。比如，内建指令 ngStyle 就能同时修改元素的好几个样式。
* 结构型指令 通过添加和删除 DOM 元素来改变 DOM 的布局。有三个内建的结构型指令：ngIf ngSwitch ngFor

## 组件

组件是一个带模板的指令，而且 `@Component` 装饰器实际上就是一个 `@Directive` 装饰器，只是扩展了一些面向模板的属性。

虽然组件从技术角度看就是一个指令，但是组件非常独特，并在 Angular 中位于中心地位，所以在架构概览中，我们把组件从指令中独立了出来。

## 结构型指令

### ngIf

```html
<div *ngIf='false'></div> <!-- never displayed -->
<div *ngIf='a > b'></div> <!-- displayed if a is more than b -->
<div *ngIf='str == "yes"'></div> <!-- displayed if str holds the string "yes" -->
<div *ngIf='myFunc()'></div>     <!-- displayed if myFunc returns a true value -->
```

### ngSwitch

```html
<div class='container' [ngSwitch]='myVar'>
  <div *ngSwitchWhen='"A"'>Var is A</div>
  <div *ngSwitchWhen='"A"'>Var is A again</div>     <!-- 同一项可以匹配多次 -->
  <div *ngSwitchWhen='"B"'>Var is B</div>
  <div *ngSwitchDefault>Var is something else</div> <!-- 此 default 项不是必需的 -->
</div>
```

### ngFor

```js
 *ngFor='let item of items'  // The items is the collection of items from your controller
 *ngFor='let item of items; let i = index'  // 还可以提供索引值（从 0 开始）
```
```html
<div *ngFor='let c of cities'><div class='item'>{{ c }}</div></div>
<div *ngFor='let c of cities; let i = index'><div class='item'>{{ i + 1 }} - {{ c }}</div></div>
```

对复杂的结构进行遍历示例

```js
this.peopleByCity = [
  {city: "Sao Paulo", people: [{ name: "John", age: 12 },{ name: "Angel", age: 22 }]},
  {city: "Miami", people: [{ name: "Anderson", age: 35 },{ name: "Felipe", age: 36 }]}
];
```
```html
<div *ngFor='let item of peopleByCity'>
<h3>{{ item.city }}</h3>
  <table>
    <tr><th>Name</th><th>Age</th></tr>
    <tr *ngFor='let p of item.people'><td>{{ p.name }}</td><td>{{ p.age }}</td></tr>
  </table>
</div>
```

## 属性型指令

### ngStyle

ngStyle 的静态用法跟 inline css 的写法没什么优势，但其真正强大的地方在于可以根据变量动态调整各属性值。

```html
// 利用 ngStyle 设定样式之 [style.<cssproperty>]='value'
<div [style.background-color]='"yellow"'>黄色底色 fixed</div>  <!-- 两者等效 -->
<div style="background-color: yellow;">黄色底色 fixed</div>    <!-- 两者等效 -->
<!-- 注意这里的 yellow 带了2层引号，只有1层的话被认为是变量名 -->
<!-- 注意 background-color 没有采用驼峰写法，经测试可以这样用，当然用 backgroundColor 更符合惯例 -->

// 利用 ngStyle 设定样式之 [ngStyle]
<div [ngStyle]='{color: "white", "background-color": "blue"}'>蓝底白字 fixed</div>
<!-- 注意：background-color 带引号，因为 javascript 中对象的 key 不允许出现 “-” -->

// 利用 ngStyle 的真正强大的地方在于可以根据变量动态调整
<div [style.font-size.px]='fontSize'>字体大小将根据输入值自动调整</div>
<div><input type="text" [(ngModel)]='fontSize'></div>
<!-- 对于需要提供unit的css属性，NG提供了简便的写法，即在属性名后添加单位，如 [style.font-size.%] -->
```

### ngClass

```js
[ngClass]='{"class-name": true/false[, ...]}'  // 采用对象形式赋值，key 为类名，值为 Boolean
[ngClass]='["className1", "className2", ...]'  // 还可以采用数组形式，但只能直接添加，单引号不能省
```
```html
// 静态赋值
<div [ngClass]='{bordered: false}'>不会加边框（该类不会添加）</div>
<div [ngClass]='{bordered: true}'>始终都有边框（该类始终存在）</div>
<div class="base" [ngClass]='{base: false, blue: true}'>最终结果是 class="blue"</div>
<div class="base" [ngClass]='["blue", "round"]'>在 base 基础上添加多个 class</div>
// 动态赋值
<div [ngClass]='{bordered: isBordered}'>通过变量赋值</div>
<div [ngClass]='classesObj'>直接通过 obj 赋值，注意，对于带 dash 的 key 要加引号 "class-name"</div>
```

### ngNonBindable

带 `ngNonBindable` 告诉 Angular 不要对变量进行绑定，即将 `{{ }}` 看做是普通文本。

```html
<div>
  <span>{{ content }}</span>  <!-- this.content = 'Some text' -->
  <span ngNonBindable>&larr; This is what {{ content }} rendered</span>
</div>
// 最终输出的效果：Some text ← This is what {{ content }} rendered
```

