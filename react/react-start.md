# React 快速入门

## 1. Hello World

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello React!</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="node_modules/react/dist/react.js"></script>
        <script src="node_modules/react-dom/dist/react-dom.js"></script>
        <script>
            ReactDOM.render(
              React.DOM.h1(null, "Hello world!"),
              document.getElementById("app")
            );
        </script>
    </body>
</html>
```

刚才代码发生的是：在选择的 DOM 节点中渲染了一个 React 组件。渲染过程从一个顶层组件开始，顶层组件可以按需包含许多子元素(子元素还可以嵌套子元素)。

ReactDOM 对象只包含几个方法，其中 `render()` 方法是最有用的。从 0.14 版本开始，它们被从 React 对象分离出来，目的是强调应用渲染实际上属于单独的概念。

接下来，我们需要关注组件的概念。组件可以用于构建用户界面，并通过任何适当的方式进行组合。在实际应用中，你需要创建自定义组件，但在起步阶段，我们先学习使用 React 提供的一个包裹层，它用于包裹 HTML DOM 元素。该包裹层可通过 `React.DOM` 对象进行调用。

最后，我们调用了熟悉的 `document.getElementById("app")` 方法访问 DOM 节点。函数调用通过该参数告诉 React 需要把应用渲染在页面的哪个部分。因此，这是连接你所熟知的DOM 操作到 React 新大陆的一座桥梁。

### React.DOM.*

通过浏览器控制台获取 React.DOM 对象的完整属性列表。

注意 `React.DOM` 和 `ReactDOM` 的区别。前者是预定义好的 HTML 元素集合，而后者是在浏览器中渲染应用的一种途径。

`React.DOM.h1()` 方法的首个参数接收一个对象，用于指定该组件的任何属性，如 DOM 属性。

第二个参数定义了组件的子元素。最简单的子元素就是例子中的文本。此外，还可以传递更多的参数，进行子元素的组合与嵌套。

```js
React.DOM.h1({id: "my-heading"},
  React.DOM.span(null, React.DOM.em(null, "Hell"), "o"),
  " world!",
  React.DOM.i(null, 'React'),
),
```

> 如你所见，当你开始嵌套组件时，使用上述写法会很快遇到大量的函数调用和圆括号。为了简化工作，未来我们会使用 JSX 语法。

### 特殊 DOM 属性

`class` 和 `for` 不能直接在 JavaScript 中使用，因为它们都是 JS 中的关键字。取而代之的属性名是 `className` 和 `htmlFor`。

至于 `style` 属性，你不能像以往在 HTML 中那样使用字符串对其赋值，而需要使用 JS 对象取代。通过避免使用字符串的方式，可以减少跨站脚本攻击的威胁，因此这是一个广受欢迎的变化。

```js
React.DOM.h1(
    {
        className: "pretty",
        htmlFor: "me",
        style: {
            background: "black",
            color: "white",
            fontFamily: "Verdana",
        }
    },
    "Hello world!"
)
```

### 下一步：自定义组件

至此，你已经完成了 Hello World 应用的骨架。现在你知道如何：
  * 安装、设置并使用 React 库 (仅仅需要引入两个 `<script>` 标签)
  * 在选定的 DOM 节点中渲染一个 React 组件，如 `ReactDOM.render(reactWhat, domWhere)`
  * 使用内建组件，即那些常规 DOM 元素外的包裹层，如 `React.DOM.div(attributes, children)`

然而，React 真正的力量要在你开始使用自定义组件构建(并更新)应用界面后才能体现出来。下一章，我们将学习组件的具体操作。


## 2. 组件的生命周期

### 2.1 基础

Warning: A Component: React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement

创建新组件的 API 如下：

```js
var MyComponent = React.createClass({
    /* 组件详细说明 */
});
```

在上述例子中，“组件详细说明” 是一个 JavaScript 对象，该对象需要包含一个名为 `render()` 的方法以及一系列可选的方法与属性。一个基本的例子大概如下所示：

```js
var Component = React.createClass({
    render: function() {
        return React.DOM.span(null, "I'm so custom");
    }
});
```

如你所见，唯一必须要做的事情就是实现 render() 方法。该方法必须返回一个 React 组件，不能只返回文本内容。这也是上述代码片段中使用 span 组件的原因。在应用中，使用自定义组件的方法和使用 DOM 组件的方法类似：

```js
ReactDOM.render(
    React.createElement(Component),
    document.getElementById("app")
);
```

请注意，我们之前介绍的 `React.DOM.*` 方法实际上只是在 `React.createElement()` 的基础上进行了一层封装。换句话说，以下代码同样可以渲染 DOM 组件：

```js
ReactDOM.render(
    React.createElement("span", null, "Hello"),
    document.getElementById("app")
);
```

如你所见，和自定义组件使用 JavaScript 函数进行定义不同，DOM 元素是使用字符串定义的。

### 2.2 属性

你的组件可以接收属性，并根据属性值进行相对应的渲染或表现。所有属性都可以通过 `this.props` 对象获取。

```js
var Component = React.createClass({
    render: function() { return React.DOM.span(null, "My name is " + this.props.name); }
});
```

在渲染组件时，传递属性的方法如下：

```js
ReactDOM.render(
    React.createElement(Component, {name: "Bob"}),
    document.getElementById("app")
);
```

> 请把 `this.props` 视作只读属性。`Object.isFrozen(this.props) === true; // true`

### 2.3 propTypes

Warning: Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.

在你的组件中，可以添加一个名为 `propTypes` 的属性，以声明组件需要接收的属性列表及其对应类型。

```js
var Component = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
    },
    render: function() {
        return React.DOM.span(null, "My name is " + this.props.name);
    }
});
```

虽然也可以不使用 propTypes ，但是使用 propTypes 有以下两方面的好处。
  * 通过预先声明组件期望接收的参数，让组件可配置的属性一目了然。
  * React 会在运行时验证属性值的有效性。

可以在控制台输入 `Object.keys(React.PropTypes).join('\n')` 列出 PropTypes 的可用属性列表。

在组件中声明 propTypes 是可选的，这也意味着你可以在这里选择列出部分而非所有属性。

#### 默认属性

```
var Component = React.createClass({
    propTypes: {
        firstName: React.PropTypes.string.isRequired,
        middleName: React.PropTypes.string,
        familyName: React.PropTypes.string.isRequired,
        address: React.PropTypes.string,
    },
    getDefaultProps: function() { return {middleName: '', address: 'n/a'}; },
    render: function() {/* ... */}
});

// 以上写法以过时，用下面这种写法
class Demo extends Component {
  props: {
    firstName: string,
    lastName: string,
    address: string,
  };
  static defaultProps = {address: 'n/a'}
  render() { return <p>{this.props.firstName + this.props.lastName + this.props.address}</p>; }
}
```

### 2.4 state

前面的例子都是纯静态/无状态的，旨在给你一种使用组件块组合界面的思路。不过 React 正的闪光点出现在应用数据发生改变的时候(也是传统的浏览器 DOM 操作和维护变得复杂的地方)。React 有一个称为 state 的概念，也就是组件渲染自身时用到的数据。当 state 发生改变时，React 会自动重建用户界面。因此，在 `render()` 初始化构造界面后，不需要再关心界面变化，而只需要关心数据的变化即可。

和 `this.props` 的取值方式类似，你可以通过 `this.state` 对象取得 state。在更新 state 时，可以使用 `this.setState()` 方法。当 `this.setState()` 被调用时，React 会调用你的 `render()` 方法并更新界面。

调用 `setState()` 后的界面更新是通过一个队列机制高效地进行批量修改的，直接改变 `this.state` 会导致意外行为的发生，因此你不应该这么做。和前面的 `this.props` 类似，可以把 `this.state` 当作只读属性。类似地，永远不要自行调用 `this.render()` 方法——而是将其留给 React 进行批处理，计算最小的变化数量，并在合适的时机调用 `render()`。

### 2.6 事件处理

出于性能、便捷性与合理性考虑，React 使用了自身的合成事件系统。

为了包裹并规范浏览器事件，React 使用了合成事件来消除浏览器之间的不一致情况。有了 React 的帮助，现在你可以依靠 `event.target` 在所有浏览器中取得想要的值了。这就是在 TextAreaCounter 代码片段中，你只需要使用 `ev.target.value` 就可以正常工作的原因。与此同时，取消事件的 API 在所有浏览器中都通用了； `event.stopPropagation()` 和 `event.preventDefault()` 甚至在老版本 IE 浏览器中也可以生效。

这种语法轻松地把视图和事件监听绑定在一起。虽然其语法看起来就像传统的内联事件处理器一样，但背后的实现原理并非如此。事实上，React 基于性能考虑，使用了事件委托。

此外，React 在事件处理中使用驼峰法命名，因此你需要使用 `onClick` 代替 `onclick`。

如果你出于某种原因需要使用原生的浏览器事件，可以使用 `event.nativeEvent`，但估计你不太可能会用得上。

还有一件事情需要注意。`onChange` 事件（在文本框例子中已经用到）的行为和你预期中是一样的：当用户输入时触发，而不是像原生 DOM 事件那样，在用户结束输入并把焦点从输入框移走时才触发。

### 2.7 props 与 state

属性是一种给外部世界设置组件的机制，而状态则负责组件内部数据的维护。因此，如果与面向对象编程进行类比的话，`this.props` 就像是传递给类构造函数的参数，而 `this.state` 则包含了你的私有属性。

### 2.9 从外部访问组件

让你的 React 应用和外界进行通信的一种方法，是在使用 `ReactDOM.render()` 方法进行渲染时，把引用赋值给一个变量，然后在外部通过该变量访问组件：

```
var myTextAreaCounter = ReactDOM.render(
    React.createElement(TextAreaCounter, {defaultValue: "Bob",}),
    document.getElementById("app")
);

myTextAreaCounter.setState({text: "Hello outside world!"});  // 正常应避免这种用法
var reactAppNode = ReactDOM.findDOMNode(myTextAreaCounter);
reactAppNode.parentNode === document.getElementById('app');  // true
```

现在你可以通过 `myTextAreaCounter` 访问组件的方法和属性，就像在组件内部使用 `this` 访问一样。你甚至可以在 JavaScript 控制台中操控这个组件。

### 2.11 生命周期方法

`componentWillMount()` 在新节点插入 DOM 结构之前触发。

`componentDidMount()` 在新节点插入 DOM 结构之后触发。

`componentWillReceiveProps()` 组件接收到新的 props 变更时触发，提供一种拦截机制。

`shouldComponentUpdate(newProps, newState)` 在 `componentWillUpdate()` 之前触发，给你一个机会返回 false 以取消更新组件，这意味着 `render()` 方法将不会被调用。这在性能关键型的应用场景中非常有用。

`componentWillUpdate(nextProps, nextState)` 当你的组件再次渲染时，在 `render()` 方法前调用。

`componentDidUpdate(oldProps, oldState)` 在 `render()` 函数执行完毕，且更新的组件已被同步到 DOM 后立即调用。初始化渲染时不会触发。

`componentWillUnmount()` 在组件从 DOM 中移除时立刻触发。

### 2.16 PureRenderMixin

React 的最新版本提供了 `React.PureComponent` 基础类，因此无需引入该插件(现在插件全部被干掉了...)。


## 4. JSX

### 4.6 在 JSX 中使用 JavaScript

在构建界面时经常会使用变量、条件判断和循环。JSX 允许你在标记语言中使用 JavaScript 语法，因此不必引入额外的模板语法。在使用时，只需要在 JavaScript 代码外部包裹一层花括号就可以了。

### 4.12 JSX 和 HTML 的区别

* 在 HTML 中，有一些标签不需要闭合；但在 JSX（XML）中，所有标签都要闭合
* 你不能在 JSX 中使用 class 和 for 属性（它们都是 ECMAScript 中的保留字），需要使用 className 和 htmlFor 作为代替
* style 属性接收一个对象值，而不是用分号分隔的字符串。CSS 属性名字使用驼峰命名法，而不是使用破折号分隔。
* 在 JSX 中，所有属性都需要使用驼峰法命名。但所有以 `data-` 和 `aria-` 开头的属性都是例外，其命名方式和 HTML 相同。

### 4.13 JSX 和表单


## 8. Flux

与其说 Flux 是一个代码库，不如说它是一种组织（架构）应用数据的思想。

### 8.1 理念

在 Flux 的理念中，应用的核心就是数据。数据存储于 Store 中。你的 React 组件（View，视图）从 Store 中读取数据并进行渲染。用户与应用之间的交互行为会产生 Action（比如点击按钮）。Action 会导致 Store 中的数据发生变化，进而影响 View。这个循环一直持续进行。在循环中，数据流动是单向的（unidirectional）。这种单向数据流的优点是更容易进行跟踪、推理与调试。

在上述架构的基础之上，还有一些变种与延伸版本，包括更多 Action、多重 Store 以及Dispatcher 等。

### 8.3 Store

#### 界定

该如何界定是使用 Flux Store 还是使用借助属性的非 Flux 实现呢？ Store 为所有的数据需 求提供了一站式服务，使你从属性传递中解脱出来，但与此同时也降低了组件的可重用 性。现在，你不能在另一个完全不同的场景中直接重用 Excel 组件了，因为在组件中从 CRUDStore 获取数据的逻辑已经被硬编码。即便如此，只要新的场景中使用了类似 CRUD 的逻辑（这是有可能的，否则你为何需要可编辑的数据表格呢？），你还是可以让组件从 Store 中获取数据。谨记一点：在应用中可以根据需要使用任意数量的 Store。

对于那些底层组件，比如按钮和表单输入元素，最好不要使用 Store。因为对于这些组 件来说，使用传递属性的方式更加方便。那些处于两个极端间的组件类型都属于灰色 地带［从最简单的按钮（比如 <Button> ）到最顶层负责管理所有内容的父组件（比如 <Whinepad> ）］，由你来界定是否使用 Flux。 <Form> 组件是应该像之前那样连接到 CRUD Store 还是应该和 Store 隔离使其可重用呢？你可以根据手头上的任务以及将来重用该组件 的可能性，作出最合适的选择。

### 总结

大功告成！现在，你的应用中使用了下列技术栈：

* React 组件，用于定义 UI；
* JSX，用于组合组件；
* Flux，用于组织数据流；
* 不可变数据；
* Babel，帮助我们使用最新的 ECMAScript 特性；
* Flow，用于进行类型检查和语法检查；
* ESLint，用于检查更多的错误与代码约定；
* Jest，用于进行单元测试。
