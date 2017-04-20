# Flow

Flow 与 TS 比较，我觉得最大的优势就是提供了一种渐进的类型增强吧，其实真没啥必要，这样反而搞得不伦不类。

## 开始使用

1. 初始化项目 flow 配置，即添加 `.flowconfig` 配置文件
2. 通过 `flow` 命令启动后台进程(首次启动会全面检查项目相关文档，后面会进行增量检查)
3. 在需要监控的 js 文档头部添加 `// @flow` 指令
4. 编写代码
5. 运行 `flow` 命令进行增量检查(vscode 插件会在文件保存时自动进行检查，但不是边输入边检查)

## Typing React with Flow

### Adding types for React Component `props`

原先采用的 `propTypes` 全部用更直观的 `props:` 属性替换.

You can also specify defaultProps as a static class property and Flow’s inference will handle the rest for you.

```js
class MyComponent extends Component {
  props: {                   // 因为 props 属性由外部决定，所以这里仅是一个纯粹的类型定义
    prop1: string,           // 这里用的对象格式，故用 `,` 注意跟 ts 的接口作区别
    prop2: number,           // 这是个可选属性，因为后续提供了默认值，所以不用重复强调其可选特性
  };

  static defaultProps = {
    prop2: "foo"
  };
}
```

### Adding types for React Component `state`

```js
class MyComponent extends Component {
  state = {        // 这里的 state 是实实在在的初始化，不是类型定义，但 flow 会自动推断类型
    foo: 1,
    bar: true,
    baz: 'three',
  };
}

// 如果非要显式定义类型，那么可以这样做：
class MyComponent extends Component {
  state: {
    foo: number,
    bar: boolean,
    baz: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      foo: 1,
      bar: true,
      baz: 'three',
    };
  }
}
```

### Explicitly specifying React Component generics

还可以通过显示指定 `Component` 的泛型来进行类型定义，这个用法基本就跟 ts 一样了。

```js
type DefaultProps = { prop: string };  // 发现 Flow interface 也支持的，那写法跟 TS 可以完全统一了
type Props        = { prop: string };
type State        = { prop: string };

class MyComponent extends Component<DefaultProps, Props, State> {
  static defaultProps = { prop: "foo" };
  state = { prop: "bar" };
}
```

### Adding types for React events

```js
class MyComponent extends React.Component {
  onEvent(event: Event) { /* ... */ }
  onMouseEvent(event: MouseEvent) { /* ... */ }
  onButtonEvent(event: Event & { currentTarget: HTMLButtonElement }) { /* ... */ }
}
```

### Adding types for React refs

```
class MyComponent extends React.Component {
  button: HTMLButtonElement;

  render() {
    return <button ref={el => this.button = el}>Toggle</button>;
  }
}
```

### Adding types to React lifecycle methods

```
type Props = { /* ... */ };
type State = { /* ... */ };

class MyComponent extends React.Component<void, Props, State> {
  componentDidUpdate(prevProps: Props, prevState: State) {
    // ...
  }
}
```

### Adding types to React functional components

```
// @flow
let MyComponent = (props: { foo: string }) => {
  return <div>{props.foo}</div>
};

let a = <MyComponent />;            // Error!
let b = <MyComponent foo="bar" />;  // Works!
```
