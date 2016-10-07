# 组件样式

## 使用组件样式

对于我们写的每个 Angular 组件来说，除了定义 HTML 模板之外，我们还要用于模板的 CSS 样式、 指定需要的选择器、规则和媒体查询。

```ts
@Component({
  selector: 'hero-app',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-app-main [hero]=hero></hero-app-main>`,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {  }
```

组件样式在很多方面都不同于传统的全局性样式。我们放在组件样式中的选择器，只会应用在组件自身的模板中。这种模块化相对于 CSS 的传统工作方式是一个巨大的改进：

* 只有在每个组件的情境中使用 CSS 类名和选择器，才是最有意义的。
* 类名和选择器是仅属于组件内部的，它不会和应用中其它地方的类名和选择器出现冲突。
* 我们组件的样式 **不会** 因为别的地方修改了样式而被意外改变。
* 我们可以让每个组件的 CSS 代码和它的 TypeScript 代码、 HTML 代码放在一起，这将促成清爽整洁的项目结构。
* 将来我们可以修改或移除组件的 CSS 代码，而不用遍历整个应用来看它有没有被别处用到，只要看看当前组件就可以了。

## 特殊的选择器

“组件样式”中有一些从 Shadow DOM style scoping( 范围化样式 ) 领域引入的特殊选择器：

### :host

使用 `:host` 伪类选择器，用来选择组件 **宿主** 元素中的元素 (相对于组件模板 **内部** 的元素)。

这是我们能以宿主元素为目标的 **唯一** 方式。除此之外，我们将没办法指定它，因为宿主不是组件自身模板的一部分，而是父组件模板的一部分。

要把宿主样式作为条件，就要像 **函数** 一样把其它选择器放在 :host 后面的括号中。

在下一个例子中，我们把宿主元素作为目标，但是只有当它同时带有 active CSS 类的时候才会生效。

```css
:host(.active) { border-width: 3px; }
```

### :host-context

有时候，基于某些来自组件视图外部的条件应用样式是很有用的。比如，在文档的 `<body>` 元素上可能有一个用于表示样式主题 Theme 的 CSS 类，而我们应当基于它来决定组件的样式。

这时可以使用 `:host-context()` 伪类选择器。它也以类似 `:host()` 形式使用。它在当前组件宿主元素的 **祖先节点** 中查找 CSS 类，直到文档的根节点为止。在与其它选择器组合使用时，它非常有用。

在下面的例子中，只有当某个祖先元素有 CSS 类 theme-light 时，我们才会把样式应用到组件 内部 的所有 h2 元素中。

```css
:host-context(.theme-light) h2 { background-color: #eef; }
```

### /deep/

“组件样式”通常只会作用于组件自身的 HTML 上。我们可以使用 `/deep/` 选择器，来强制一个样式对各级子组件的视图也生效，它不但作用于组件的子视图，也会作用于组件的内容。

在这个例子中，我们以所有的 `<h3>` 元素为目标，从宿主元素到当前元素再到 DOM 中的所有子元素：

```css
:host /deep/ h3 { font-style: italic; }
```

`/deep/` 选择器还有一个别名 `>>>`。我们可以任意交替使用它们。

> `/deep/` 和 `>>>` 选择器只能被用在默认的仿真模式下。


## 把样式加载进组件中

我们有几种方式来把样式加入组件：

* 内联在模板的 HTML 中
* 设置 styles 或 styleUrls 元数据
* 通过 CSS 文件导入

### 元数据中的样式

```ts
@Component({
  selector: 'hero-app',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-app-main [hero]=hero></hero-app-main>`,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {  }
```

### 模板内联样式

```ts
@Component({
  selector: 'hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>`
})
```

### 元数据中的样式表 URL

```ts
@Component({
  selector: 'hero-details',
  template: `
    <h2>{{hero.name}}</h2>
    <hero-team [hero]=hero></hero-team>
    <ng-content></ng-content>`,
  styleUrls: ['app/hero-details.component.css']
})
```

> URL 是相对于应用程序根目录的，它通常是应用的宿主页面 index.html 所在的地方。这个样式文件的 URL 不是 相对于组件文件的。参见 附录 2 来了解如何指定相对于组件文件的 URL。
- - -
> 像 Webpack 这类模块打包器的用户可能会这样写：`styles: [require('my.component.css')]`   
> 注意，这时候我们是在设置 styles 属性，而不是 styleUrls 属性！是模块打包器在加载 CSS 字符串，而不是 Angular。Angular 看到的只是打包器加载它们之后的 CSS 字符串。对 Angular 来说，这跟我们手写了 styles 数组没有任何区别。

### 模板中的 link 标签

```ts
@Component({
  selector: 'hero-team',
  template: `
    <link rel="stylesheet" href="app/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team"> {{member}} </li>
    </ul>`
})
```

像 styleUrls 标签一样，这个 link 标签的 href 指向的 URL 也是相对于应用的根目录的，而不是组件文件。

### CSS @imports

我们还可以利用标准的 CSS@import 规则来把其它 CSS 文件导入到我们的 CSS 文件中。在这种情况下，URL 是相对于我们执行导入操作的 CSS 文件的。

```css
@import 'hero-details-box.css';
```

## 控制视图的包装模式

通过在组件的元数据上设置视图包装模式，我们可以分别控制每个组件的包装模式。可选的包装模式一共有三种：

* Native 模式，使用浏览器原生的 Shadow DOM 实现来为组件的宿主元素附加一个 Shadow DOM。
  (译注：不进不出，没有样式能进来，组件样式出不去。)

* Emulated 模式，默认值，通过预处理 CSS 代码来仿真 Shadow DOM 的行为，以达到把 CSS 样式局限在组件视图中的目的。
  ( 译注：只进不出，全局样式能进来，组件样式出不去 )

* None，不使用视图包装。Angular 会把 CSS 添加到全局样式中，而不会应用隔离和保护规则。
  ( 译注：能进能出。 )

通过组件元数据中的 encapsulation 属性来设置组件包装模式：

```ts
// warning: few browsers support shadow DOM encapsulation at this time
encapsulation: ViewEncapsulation.Native
```

## 查看仿真模式下生成的 CSS

当使用默认的“仿真”模式时， Angular 会对组件的所有样式进行预处理，让它们模仿出标准的 Shadow CSS 局限化规则。

```html
<hero-details _nghost-pmm-5>
  <h2 _ngcontent-pmm-5>Mister Fantastic</h2>
  <hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    <h3 _ngcontent-pmm-6>Team</h3>
  </hero-team>
</hero-detail>
```

```css
[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
  background-color: white;
  border: 1px solid #777;
}
```

这些就是我们写的那些样式被处理后的结果，于是每个选择器都被增加了 `_nghost` 或 `_ngcontent` 属性选择器。在这些附加选择器的帮助下，我们实现了本指南中所描述的这些局限化规则。

## 使用相对 URL 加载样式

具体请参见 相对于组件的路径 一章。
