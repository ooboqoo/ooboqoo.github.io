# Fiber


## 

https://www.youtube.com/watch?v=7YhdqIR2Yzo&list=PLxRVWC-K96b0ktvhd16l3xA6gncuGP7gJ


### JSX (The basic concepts of React)

熟悉3个概念
* React components
* React elements
* Component instances (`React.Component` 才有这个概念 `type ReactInstance = Component<any> | Element;` )

```jsx
const App = () => <div>App component</div>;
```
1. The JSX gets converted to `React.createElement` functions calls

```js
// Babel outputs
const App = () => React.createElement("div", null, "App component");
// function createElement<P extends {}>(
//     type: FunctionComponent<P> | ComponentClass<P> | string,
//     props?: Attributes & P | null,
//     ...children: ReactNode[]
// ): ReactElement<P>;
```

2. Each of those functions returns an object (`JSX.Element`) similar to the object below

```js
// console.log(App())
{
    $$typeof: Symbol(react.element),
    key: null,
    props: {children: "App component"},
    ref: null,
    type: "div",
    _owner: null,
    _store: {},
    _self: null,
    _source: null,
}
```

3. `<App />` React is calling this component behind the scenes

* FunctionComponent - React calls it directly with the assigned props
* ComponentClass - React creates a new instance of it and call its `render()` method

```js
// console.log(<App />)  // React.createElement(App, null)
{
    $$typeof: Symbol(react.element),
    key: null,
    props: {},
    ref: null,
    type: f App(),
    _owner: null,
    _store: {validated: false},
    _self: null,
    _source: null,
}
```

### Reconciliation & Virtual DOM & Diffing algorithm

All React does is create a tree of elements.

This is very fast, because React elements are just plain JavaScript objects.

This is happening when we call the `render()` method.

This tree of elements is kept in memory, it is the **virtual DOM**.

The next thing to do is to sync the virtual DOM with the real DOM.

During the initial render, there is no other way than to insert the full tree.

What if the tree of elements changes? React can't just re-render the whole tree. We will have two tree: the old and the new one. React compares the trees and finds the smallest number of operations to transform one tree into the other. This is handled by the **Diffing algorithm**.

The Diffing algorithm assumptions
1. Two elements of different types will produce different trees.
2. When we have a list of child elements which often changes, we should provide an unique "key" as a prop.

### Rendering

Rendering is handled by packages called renderers (ReactDOM, ReactNative, etc.)

Most of the actual implementation lives in the renderers.

They begin the reconciliation process. They generate the tree of elements and insert it wherever it has to be inserted.

You can create your own renderer using the react-test-renderer package.


## React Fiber

### React Fiber Architecture

https://github.com/acdlite/react-fiber-architecture





### Video

Timestamps:

0:00 Introduction  
0:54 Old reconciler – Stack  
2:02 What does Fiber do?  
2:32 Two Fiber phases (render phase and commit phase)  
4:24 Fiber 'tag' property  
5:30 Fibers vs React elements  (fibers represent elements and other things as well)  
6:20 Fiber relationships ('child', 'sibling' and 'return' properties)  
8:20 What is work?  
9:49 Fiber trees (current and workInProgress)  
10:57 Effects  
13:32 How React processes a Fiber tree  
16:24 Fiber 'alternate' property  
16:56 React Fiber usage (Error boundaries, Suspense, Concurrent Mode)  
17:56 Ending  

Current React (>= 16) reconciler based on Fiber.

Fiber focuses on Animations and Responsiveness.

It can:
* split work into chunks and prioritize tasks
* pause work and come back to it later
* reuse work or abort it if it's not needed

Old reconciler - Stack
* stack was *synchronous*
* worked like a stack
* had to work until the "stack" was empty

Fiber makes React *faster*, but it makes React *smarter* as well. Fiber also improves the development of React.

React process Fibers (*units of work*) and we end up with "finished work". This work is later commited resulting in visible changes in the DOM.

2 reconciler phases:
* render phase (processing)
	- this phase is *asynchronous*
	- tasks can be *prioritized*, work can be *paused*, *discarded* and so on
	- internal functions like `beginWork()` and `completeWork()` are being called
* commit phase (committing)
	- `commitWork()` is being called
	- this phase is *synchronous* and cannot be interrupted

Fiber properties (1)
* Fiber always has a 1-1 relationship with "something" (component instance, DOM node, etc.)
* type of "something" is stored inside the `tag` property
* the `stateNode` property holds the reference

Aren't Fibers really similar to React elements?
* Fibers are often created from React elements  `createFiberFromElement` `createFiberFromFragment` `createFiberFromText`
* They even share the type and key properties
* While React elements are re-created every time, Fibers are being *reused* as often as possible
* Most Fibers are created during the *initial mount*

> Virtual DOM  https://legacy.reactjs.org/docs/faq-internals.html 
>
> The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.
>
> Since “virtual DOM” is more of a pattern than a specific technology, people sometimes say it to mean different things. In React world, the term “virtual DOM” is usually associated with React elements since they are the objects representing the user interface. React, however, also uses internal objects called “fibers” to hold additional information about the component tree. They may also be considered a part of “virtual DOM” implementation in React.

Fiber properties (2)
* `child` `sibling` `return` Fiber relationships
* Fibers also form a *tree*
* single `child` - reference to the first child

<image src="images/fiber-relationship.png" />

What exactly is *WORK*?
* state change is a work
* lifecycle function is a work
* changes in the DOM is a work
* --
* work can be handled directly or *scheduled* for the future
* using *time slicing*, work can be split into chunks
* *high priority* work like animations can be scheduled in such way they are handled ASAP `requestAnimationFrame()`
* *low priority* work like network requests can be delayed `requestIdleCallback()`

*Swapping* Fiber tree
* `current` what's on screen
* `workInProgress` draft

The result of the render phase is not only a *tree of Fibers*, but also a *list of Effects*.

What's an Effect?  // Effects 在 render 阶段生成，在 commit 阶段执行
* mutating the DOM / calling specific lifecycle methods
* Effects heavily depend of the Fiber
* for Host components (div span etc.) -> updating the DOM
* for Class components -> calling lifecycle methods
* Lifecycle methods like `render()` and `shouldComponentUpdate()` are part of the render phase
* Effects are tracked using properties like `firstEffect`, `lastEffect`, `nextEffect`, etc.

How are Effects applied?
* During the commit phase, React goes through all Effects and applies them to component instances.
* This results in changes visible to the user
* React does all of that in a *single pass*

How React process a Fiber tree?
* This is done using a `while` loop (Work loop)

<image src="images/fiber-tree-loop.png" width="400" />

Fiber properties (3) - `alternate`
* points to the Fiber on the other end of the pair
* help Fibers to be reused

React Fiber usage
* Error boundaries
	- catch blocks of components
	- `getDerivedStateFromError()`
	- `componentDidCatch()`
* `Suspense` and "Concurrent Mode"


### code

页面 -> DOM tree -> Fiber tree : 用户看到的是渲染的页面，其实浏览器内部维护了一个 DOM tree；同理 React 内部维护了一个 Fiber tree

_packages/react-reconciler/src/ReactFiber.js_

```ts
interface FiberNode {
  // Instance
  tag: WorkTag;       // Tag identifying the type of fiber.
  key: null | string; // 就是我们外面传的那个 key
  elementType: any;   // The value of element.type which is used to preserve the identity during reconciliation of this child.
  type: any;          // The resolved function/class/ associated with this fiber.
                      // 看着 elementType 和 type 都是一样的，如 MyAPP Counter "div" "h1" 这样
  stateNode: any;     // The local state associated with this fiber. 即，对应的 DOM 节点

  // Fiber
  return: Fiber | null; // Conceptual aliases parent. The Fiber to return to after finishing processing this one.

  child: Fiber | null;  // Singly Linked List Tree Structure.
  sibling: Fiber | null;
  index: number;

  ref: RefObject | ??;
  refCleanup: null | (() => void);

  pendingProps: any;
  memoizedProps: any; // The props used to create the output.
  updateQueue: mixed; // A queue of state updates and callbacks.
  memoizedState: any; // Hooks 的状态就存在这
  dependencies: ;

  mode: ;

  // Effect
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Fiber[] | null;

  lanes: Lanes;
  childLanes: Lanes;

  alternate: Fiber | null; // This is a pooled version of a Fiber. Every fiber that gets updated will eventually have a pair. There are cases when we can clean up pairs to save memory if we need to.
}

type Fiber = FiberNode,

enum WorkTag {
  FunctionComponent = 0;
  ClassComponent = 1;
  IndeterminateComponent = 2; // Before we know whether it is function or class
  HostRoot = 3; // Root of a host tree. Could be nested inside another node.
  HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
  HostComponent = 5; // 注：DOM 元素，如 div p span 等
  HostText = 6; // 注：文本
  Fragment = 7;
  // ...
}
```

_packages/react-reconciler/src/ReactFiberRoot.js_

```ts
interface FiberRootNode {
  tag: RootTag;
  containerInfo: Element | DocumentFragment;  // DOM div#root
  current: FiberNode;
  // current.memoizedState: RootState;

}

enum RootTag {
  LegacyRoot = 0;
  ConcurrentRoot = 1;
}

interface RootState {
  element: ReactNodeList;
  isDehydrated: boolean;
  cache: ;
}
```

```ts
interface ReactElement {
  $$typeof: symbol;
  key: string | null;
  props: any;
  ref: RefObject | null;
  type: string | JSXElementConstructor<any>; // "h1"
  _owner: FiberNode;
  _store: ; // { validated: true }
  _self: null;
  _source: null;
}
type ReactNode = ReactElement | string | ...;
```

### Fiber 工作原理

问：为什么这几个文件都有几千行代码  
答：这些文件都很长，因为不知道如何拆分，就直接按照3个阶段将代码分别放在3个文件了

_packages/react-reconciler/src/ReactFiberBeginWork.js_ downwards the tree

```ts
function beginWork(
  current: Fiber | null,  // what current is on the screen
  workInProgress: Fiber,  // the draft we will work on here
  renderExpirationTime: ExpirationTime,
): Fiber | null {
  console.log('begin work on', workInProgress.type)  // 每个 FiberNode 都会打印一次
  // ...
}

function updateFragment(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
) {
  const nextChildren = workInProgress.pendingProps;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
```

_packages/react-reconciler/src/ReactFiberCompleteWork.js_ upwards the tree

```ts
function completeWork(
  current: Fiber | null,  // what current is on the screen
  workInProgress: Fiber,  // the draft we will work on here
  renderExpirationTime: ExpirationTime,
): Fiber | null {
  // ...
}
```

_packages/react-reconciler/src/ReactFiberCommitWork.js_ make changes to the DOM

```ts
function commitWork(current: Fiber | null, finishedWork: Fiber): void {
  // ...
}
```


## React Hooks

```js
const React = {
	//...
	__currentDispatcher: null,

	useState(initialState) {
		return React.__currentDispatcher.useState(initialState);
	},
	// ...
}
```

```js
// Inside React DOM
const previousDispatcher = React.__currentDispatcher;
React.__currentDispatcher = ReactDOMDispatcher;
let result;
try {
	result = Component(props);
} finally {
	React.__currentDispatcher = previousDispatcher;
}
```







