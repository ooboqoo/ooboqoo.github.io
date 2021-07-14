# React with TypeScript

https://github.com/typescript-cheatsheets/react-typescript-cheatsheet


## 常用类型

```ts
FC<Props>

RefObject<T>        // current 只读
MutableRefObject<T> // current 可写
Ref<T>              // current 只读且可能为 null

RefForwardingComponent<T, P>  // React.forwardRef 包裹的组件类型

// 常用来包裹样式组件用，一搬需要透传所有 props 给原生 HTML 组件（下方有示例）
HTMLAttributes<T>
XXXHTMLAttributes<T>

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ReactChild = ReactElement | ReactText;
type ReactText = string | number;


```


```tsx
export type PrimaryButtonPropsType = { foo: string; }
function PrimaryButton(props: PrimaryButtonPropsType & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {foo, ...rest} = props
  return <button style={primaryButtonStyle} {...rest} />;
}
```





## Props

`readonly`

https://jkchao.github.io/typescript-book-chinese/typings/readonly.html#reactjs


#### Inline type annotation

```ts
const TextField = ({
  label,
  text,
  onTextChange
} : {
  label: string;
  text: string;
  onTextChange: (text: string) => void;
}) => {
  // ...
};
```

#### Type alias

```ts
type Props = {
  label: string;
};

const TextField = ({label} : Props) => {
  // ...
};
```

#### Interface

```ts
interface Props {
  label: string;
}
```

#### `FC` type

```ts
const TextField: React.FC<Props> = (props) => {
  // ...
};
```

#### Extending a standard type

方式1，使用 `extends`

```ts
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
```

方式2，使用 `&`。Alternatively we can use a type alias and intersection to achieve the same effect.

```ts
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};
```


## Basic Cheatsheet

### Setup

```bash
$ yarn create react-app my-app --template typescript
```

```ts
import * as React from 'react';
import * as ReactDom from 'react-dom';

// tsconfig.js 设置 `"allowSyntheticDefaultImports": true` 后就可以采用下面的写法
import React from 'react';
import ReactDom from 'react-dom';
```

### Getting Started

#### Function Components

参见 Props 部分。

#### Hooks

##### `useState`

Type inference works very well most of the time.

```ts
const [user, setUser] = React.useState<IUser | null>(null);
```

##### `useRef`

Have two options when creating a ref container that does not have an initial value:

```ts
const ref1 = useRef<HTMLElement>(null!);       // make `ref1.current` ready-only
const ref2 = useRef<HTMLElement | null>(null); // make `ref2.current` mutable
```

```ts
function TextInputWithFocusButton() {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

##### `useEffect`

When using `useEffect`, take care not to return anything other than a function or `undefined`.

##### `useReducer`

```ts
type AppState = {}
type Action =
  | { type: "SET_ONE"; payload: string }
  | { type: "SET_TWO"; payload: number };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_ONE":
      return {
        ...state,
        one: action.payload // `payload` is string
      };
    case "SET_TWO":
      return {
        ...state,
        two: action.payload // `payload` is number
      };
    default:
      return state;
  }
}
```

##### Custom Hooks

https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions

```ts
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```


### Class Components


```ts
type MyProps = {
  message: string;
};
type MyState = {
  count: number;
};

class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    count: 0,
  };
  render() {
    return (<div>{this.props.message} {this.state.count}</div>);
  }
}
```

```ts
class App extends React.Component<{ message: string }, { count: number}> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amount: number) => {
    this.setState(state => ({count: state.count + amount}));
  };
}
```

#### Typing defaultProps

```ts
type Props = { age: number } & typeof defaultProps;
const defaultProps = {
  who: 'Jhone',
};
const Greet = (props: Props) => {
  // ...
};
Greet.defaultProps = defaultProps;
```

函数组件暂时不要用 `React.FC`，有点问题。

```ts
type GreetProps = typeof Greet.defaultProps & { age: number; };

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    name: 'world',
  };
  // ...
}
```

#### Types or Interfaces?

interfaces are different from types in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

* Always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions.
* Consider using `type` for your React Component Props and State, because it is more constrained.

Types are useful for union types (e.g. type MyType = TypeA | TypeB) whereas Interfaces are better for declaring dictionary shapes and then implementing or extending them.

#### Useful React Prop Type Examples

```ts
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesn't accept strings
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>; // to impersonate all the props of a button element without its ref
}
```

### Forms and Events

可以借助 IDE 来添加类型定义。

### Context


### forwardRef/createRef

createRef:

```ts
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

forwardRef:

```ts
type Props = { children: React.ReactNode; type: "submit" | "button" };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```


### Portal

Sometimes it’s useful to insert a child into a different location in the DOM. 
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.



## Advanced Cheatsheet

### 泛型

#### React.FC

`React.FC<P>` 不支持配合泛型使用，替代方案是直接使用 `PropsWithChildren<P>`

```ts
// 不支持这种用法
const Example: React.FC<Props<T>> = props => { ... }

// 直接使用 React.FC 中的 PropsWithChildren
const Example: <P = {}>(props: React.PropsWithChildren<Props<T>>) => { ... }
```

实际代码示例

```ts
interface Props<T extends string | number> {
  input: T;
  transform: (input: T) => number;
}

const Example = <T extends string | number>(props: PropsWithChildren<Props<T>>) => {
  const { input, transform } = props;
  return <div>{transform(input)} </div>;
};
```

#### React.memo

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087

React.memo 会导致泛型信息丢失，解决方法：

```ts
// 这种用法比较简洁
const MemoizedComponent = React.memo(InnerComponent) as typeof InnerComponent;

// 这种用法更规整
const memo: <T>(c: T) => T = React.memo;
const MemoizedComponent = memo(InnerComponent);
```

出现泛型类型信息丢失的场景示例：

```ts
interface Props<T extends string | number> {
  input: T;
  transform: (input: T) => number;
}

const Example = <T extends string | number>(props: Props<T>) => {
  const { input, transform } = props;
  return <div>{transform(input)} </div>;
};
const MemorizedExample = React.memo(Example);

const e1 = <Example input={'string'} transform={s => s.length} />;
// Error: Property 'length' does not exist on type 'string | number'.
const e2 = <MemorizedExample input={'string'} transform={s => s.length} />;
```

#### React.forwardRef

React.forwardRef 泛型信息丢失的问题，与 React.memo 有几分相似，但没法直接使用 `typeof InnerComponent` 偷懒，需要自己再重新写一遍类型。

```ts
// 接上面 React.memo 的示例，具体代码略...

const ExampleWithRef: <T extends string | number>(
  props: Props<T> & { ref: any },
) => JSX.Element = React.forwardRef(Example);

const myRef = React.createRef();
const e3 = <ExampleWithRef input={'string'} transform={s => s.length} ref={myRef} />;
```









