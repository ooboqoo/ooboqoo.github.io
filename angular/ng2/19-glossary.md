# 词汇表

### 指令

指令是一个 Angular 类，这个类负责创建和重塑浏览器 DOM 中的 HTML 元素，同时负责与 HTML 元素的互动。指令是 Angular 中最基本的特性之一。

指令几乎都是关联到 HTML 元素或属性(element or attribute)的。我们通常会把这些关联的 HTML 元素或属性当做指令本身。当 Angular 在 HTML 模板中遇到一个指令的时候，它就会找出一个与该指令相匹配的类，创建此类的实例，然后把浏览器中这部分 DOM 的控制权交给它。

你可以为自定义指令指定自定义的 HTML 标签 ( 比如 <my-directive>) ，然后，就可以像写原生 HTML 一样把这些自定义标签放到 HTML 模板里了。这样，指令就变成了 HTML 本身的拓展。

指令包括了以下三个类别：

* 组件 (Component): 用来把程序逻辑和 HTML 模板组合起来，渲染出应用程序的视图。组件一般表示成 HTML 元素的形式，它们是构建 Angular 应用程序的基本单元。可以预见，开发人员将会写很多很多组件。
* 属性型指令 (Attribute Directive)：可以监控和修改其它 HTML 元素、HTML 属性 (Attribute)、DOM 属性 (Property)、组件 的行为。它们一般表示为 HTML 元素的属性 (Attibute)，故名。
* 结构型指令 (Structural Directive)：负责塑造或重塑 HTML 布局。这一般是通过添加、删除或者操作 HTML 元素及其子元素来实现的。

