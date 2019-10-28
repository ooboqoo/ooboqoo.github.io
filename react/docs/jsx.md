# JSX In Depth

https://reactjs.org/docs/jsx-in-depth.html

JSX 其实只是 `React.createElement(component, props, ...children)` 的语法糖。可以使用[在线Babel编译器](https://babeljs.io/repl/#?presets=react)查看编译过程。

```jsx
<MyButton color="blue" shadowSize={2}>Click Me</MyButton>

// 编译后得到
React.createElement(MyButton, {color: 'blue', shadowSize: 2}, 'Click Me')
```


## Specifying The React Element Type

### React Must Be in Scope

JSX 标记的开头部分指明了 React 元素类型。首字母大写的类型指明这是一个 React 元素，编译后标记会被转换成对对应变量的引用，所以当你使用 `<Foo />` 时，要确保 `Foo` 在作用范围内。

因为 JSX 会被编译为 `React.createElement` 的形式，所以还须确保 `React` 也在作用域范围内。

### Using Dot Notation for JSX Type

当一个模块中定义了多个 React 组件时，可以直接使用 `.` 运算符，即，可以像 `<MyComponents.DatePicker />` 这样直接用。

使用 `.` 运算符时，不管字母是否大写，都没有问题，如 `Comps.Comp` `Comps.comp` `comps.Comp` `comps.comp`

```jsx
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}
import * as MyComponents from './MyComponents'  // 或者这样，文件内定义了多个 export

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

### User-Defined Components Must Be Capitalized

为了区分 built-in 元素和自定义元素，React 规定，所有自定义组件首字母必须大写。两者的编译结果是不同的。

```jsx
<Hello />  编译为  React.createElement(Hello, null);
<hello />  编译为  React.createElement("hello", null);
```

### Choosing the Type at Runtime

当需要在运行时动态确定组件时，须确保符合 "首字母大写" 的规范，必要时可以通过中间变量转换。

```jsx
const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];  // 必须先转换为首字母大写的形式
  return <SpecificStory story={props.story} />;
}
```

## Props in JSX

JSX 中有多种指定 `props` 的形式：用 `{}` 包裹的JS 表达式；或者是字符串。

```jsx
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

注意，像 `if` `for` 这些语句结构是无法出现在 JSX 中的，如果需要，那么只能加在 JSX 外面。

如果一个属性没有赋值，那么默认就是 true，这跟 HTML 的默认行为保持了一致。

```jsx
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

React 把 ES6 的扩展符 `...` 拓展到了对象上(未来会加入ES标准，目前为 stage3)，指定对象属性时可以用到，特别是传递已有 props 时非常方便。

```jsx
const props = {firstName: 'Gavin', lastName: 'Wang'};
<Greeting {...props} />
```


## Children in JSX

组件开始标记和关闭标记中间的部分内容，会以 `props.children` 属性传递给组件。有多种指定 children 的形式。

```jsx
// 字符串
<MyComponent>Hello world!</MyComponent>

// 组件嵌套
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>

// JS 表达式
function Item(props) { return <li>{props.message}</li>; }
function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return <ul>{todos.map((message) => <Item key={message} message={message} />)}</ul>;
}

// 函数 (见下面说明)
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));  // 调用函数
  }
  return <div>{items}</div>;
}
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

默认情况下，JSX 中的表达式会通过计算输出 string 或 React element，但是 `props.children` 跟其他属性一样，可以接受任意的数据类型，所以传递回调函数也是不奇怪的。

另外，`false` `null` `undefined` `true` 这些也是合法的 children，实际会被直接忽略，所以下面这些效果都是一样的。

```jsx
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```
