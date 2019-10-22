# React 入门实例教程

http://www.ruanyifeng.com/blog/2015/03/react.html

教程配套练习资源下载：

```bash
$ git clone https://github.com/ruanyf/react-demos.git
```

### ReactDOM.render()

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

### JSX 语法

JSX 是一个 JavaScript 语法扩展。它类似于模板语言，但它具有 JavaScript 的全部能力。JSX 最终会被编译为 React.createElement() 函数调用，返回称为 “React 元素” 的普通 JavaScript 对象。

JSX 语法允许 HTML 与 JavaScript 的混写。

JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析。

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```


### 元素

React 元素是构成 React 应用的基础砖块。人们可能会把元素与广为人知的“组件”概念相互混淆。元素描述了你在屏幕上想看到的内容。React 元素是不可变对象。

```js
const element = <h1>Hello, world</h1>;
```

通常我们不会直接使用元素，而是从组件中返回元素。

### 组件

React 组件是可复用的小的代码片段，它们返回要在页面中渲染的 React 元素。组件可以返回其他组件、数组、字符串和数字。组件名称应该始终以大写字母开头（`<Wrapper />` 而不是 `<wrapper />`）。


React 允许将代码封装成组件 component，然后像插入普通 HTML 标签一样，在网页中插入这个组件。`React.createClass` 方法就用于生成一个组件类。

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

* 所有组件类都必须有自己的 render 方法，用于输出组件。
* 组件类的第一个字母必须大写，否则会报错，比如 HelloMessage 不能写成 helloMessage。
* 组件类只能包含一个顶层标签，否则也会报错。

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="John">` ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 `this.props` 对象上获取，比如 name 属性就可以通过 `this.props.name` 读取。

添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className`，`for` 属性需要写成 `htmlFor`，这是因为 `class` 和 `for` 是 JavaScript 的保留字。


### props

props 即 properties，是 React 组件的输入。它们是从父组件向下传递给子组件的数据。props 是只读的。

### props.children

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点

`this.props.children` 的值有三种可能，处理 `this.props.children` 的时候要小心。

* 如果当前组件没有子节点，它就是 undefined;
* 如果有一个子节点，数据类型是 object；
* 如果有多个子节点，数据类型就是 array。

React 提供一个工具方法 `React.Children` 来处理 `this.props.children`。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 undefined 还是 object。

```
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

### `PropTypes` & `getDefaultProps`

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。组件类的 `PropTypes` 属性，就是用来验证组件实例的属性是否符合要求。此外，`getDefaultProps` 方法可以用来设置组件属性的默认值。

```
var MyTitle = React.createClass({
  propTypes: {                                 // 设置属性验证
    title: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {                // 设置默认值
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

ReactDOM.render(
  <MyTitle title={123} />,                     // 调整这里测试不同情况下的行为
  document.body
);
```

### 获取真实的 DOM 节点

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM (virtual DOM)。只有当它插入文档以后，才会变成真实的 DOM。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM 上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性。

```
const MyComponent = React.createClass({
  handleClick() { alert( this.refs.myTextInput.value); },
  render() { return (
    <div>
      <input type="text" ref="myTextInput" />
      <input type="button" value="Alert input value" onClick={this.handleClick} />
    </div>
  );}
});

ReactDOM.render(<MyComponent />, document.getElementById('example'));
```

上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 `ref` 属性，然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点。

需要注意的是，由于 `this.refs.[refName]` 属性获取的是真实 DOM，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。

### `state`

`state` 和 `props` 之间最重要的区别是：`props` 由父组件传入，而 `state` 由组件本身管理。组件不能修改 `props`，但它可以修改 `state`。


组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI。

```
const LikeButton = React.createClass({
  getInitialState() { return {liked: false}; },                       // 这是初始化实例属性的方法
  toggleLike(event) { this.setState({liked: !this.state.liked}); },
  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.toggleLike}> You {text} this. Click to toggle.</p>
    );
  }
});

ReactDOM.render(<LikeButton />, document.getElementById('example'));
```

由于 `this.props` 和 `this.state` 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，`this.props` 表示那些一旦定义，就不再改变的特性，而 `this.state` 是会随着用户互动而产生变化的特性。

### 表单

React 有两种不同的方式来处理表单输入。

如果一个 input 表单元素的值是由 React 控制，就其称为受控组件。当用户将数据输入到受控组件时，会触发修改状态的事件处理器，这时由你的代码来决定此输入是否有效（如果有效就使用更新后的值重新渲染）。如果不重新渲染，则表单元素将保持不变。

一个非受控组件，就像是运行在 React 体系之外的表单元素。当用户将数据输入到表单字段（例如 input，dropdown 等）时，React 不需要做任何事情就可以映射更新后的信息。然而，这也意味着，你无法强制给这个表单字段设置一个特定值。

在大多数情况下，你应该使用受控组件。



用户在表单填入的内容，属于用户跟组件的互动，所以不能用 `this.props` 读取。而要定义一个 `onChange` 事件的回调函数，通过 `event.target.value` 读取用户输入的值。textarea、select、radio 等元素都属于这种情况。

```
const Input = React.createClass({
  getInitialState() { return {value: 'Hello!'}; },
  handleChange(event) { this.setState({value: event.target.value}); },
  render() {
    const value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.getElementById('example'));
```

### 组件生命周期方法

生命周期方法，用于在组件不同阶段执行自定义功能。在组件被创建并插入到 DOM 时（即挂载中阶段（mounting）），组件更新时，组件取消挂载或从 DOM 中删除时，都有可以使用的生命周期方法。


组件的生命周期分成三个状态：

```
Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM
```

React 为每个状态都提供了两种处理函数，`will` 函数在进入状态之前调用，`did` 函数在进入状态之后调用，三种状态共计五种处理函数:

```
componentWillMount()
componentDidMount()
componentWillUpdate(<object>nextProps, <object>nextState)
componentDidUpdate(<object>prevProps, <object>prevState)
componentWillUnmount()
```

此外，React 还提供两种特殊状态的处理函数。

```
componentWillReceiveProps(<object>nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(<object>nextProps, <object>nextState)：组件判断是否重新渲染时调用
```

应用示例：

```
const Hello = React.createClass({
  getInitialState() { return { opacity: 1.0 }; },
  componentDidMount() {
    setInterval( () => {
      let opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) { opacity = 1.0; }
      this.setState({ opacity: opacity });
    }, 100);
  },
  render() {
    return (
      <div style={{opacity: this.state.opacity}}> Hello {this.props.name} </div>
    );
  }
});

ReactDOM.render(<Hello name="world"/>, document.getElementById('example'));
```

### key

“key” 是在创建元素数组时，需要用到的一个特殊字符串属性。key 帮助 React 识别出被修改、添加或删除的 item。应当给数组内的每个元素都设定 key，以使元素具有固定身份标识。理想情况下，key 应该从数据中获取，对应着唯一且固定的标识符，例如 post.id。

### Ref

### 事件

使用 React 元素处理事件时，有一些语法上差异：

* React 事件处理器使用 camelCase（驼峰式命名）而不使用小写命名。
* 通过 JSX，你可以直接传入一个函数，而不是传入一个字符串，来作为事件处理器。

### 协调

当组件的 props 或 state 发生变化时，React 通过将最新返回的元素与原先渲染的元素进行比较，来决定是否有必要进行一次实际的 DOM 更新。当它们不相等时，React 才会更新 DOM。这个过程被称为“协调”。

### Ajax

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState` 方法重新渲染 UI。
