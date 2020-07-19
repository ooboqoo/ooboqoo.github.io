# MobX


https://cn.mobx.js.org/  
https://github.com/mobxjs/mobx-react#api-documentation

MobX is a battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP). The philosophy behind MobX is very simple.

对于应用开发中的常见问题，React 和 MobX 都提供了最优和独特的解决方案。React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

我始终觉得 Mutable 的开发方式永远是易于理解、上手难度最低的方式，而 Immutable 的开发方式是易维护、比较稳定的方式。这两者没必要非此即彼，MobX + React 可以认为很好的将两者整合在一起，在需要性能的地方可以采用 Immutable 的方式，而在不需要性能的地方，可以用 Mutable 的方式快速开发。


**Context 是数据共享的方案，Store 是数据托管的方案**
* 数据共享 -- 有一些基础的配置信息需要向下传递，比如说 Theme。子组件只需要读取，然后做对应的渲染。换句话说数据的控制权在上层组件，是上层组件共享数据给下层组件，数据流通常是单向的。
* 数据托管 -- 组件之间需要通讯，比如A组件需要修改B组件的东西，这种情况下常见的做法就是将公共的数据向上一层存放，也就是托管给上层，但是这个控制权却在下层组件。其实这就是全局 Store，也就是 Redux 这类库做的事情。可以看出来数据流通常是双向的，这就可以算作数据托管。






```js
// 页面使用装饰器引入，装饰器的 name 与 store、action 配置一致
import { observer, inject } from 'mobx-react';

@inject('demoStore', 'demoAction')
@observer
class DemoPage extends Components {
  render() {
    const { demoStore, demoAction } = this.props;
    return <div ... />
  }
}
```


## 快速起步

### Hooks + TypeScript

https://levelup.gitconnected.com/react-hooks-mobx-todolist-c138eb4f3d04

```bash
$ yarn create react-app my-mobx-demo --template typescript
$ yarn add mobx mobx-react-lite
# and then add `"experimentalDecorators": true` to tsconfig
```

```ts
export class TodoList {
  @observable.shallow list: TodoItem[] = [];

  constructor(todos: string[]) {
    todos.forEach(this.addTodo);
  }

  @action
  addTodo = (text: string) => {
    this.list.push(new TodoItem(text));
  }

  @action
  removeTodo = (todo: TodoItem) => {
    this.list.splice(this.list.indexOf(todo), 1);
  }

  @computed
  get finishedTodos(): TodoItem[] {
    return this.list.filter(todo => todo.isDone);
  }

  @computed
  get openTodos(): TodoItem[] {
    return this.list.filter(todo => !todo.isDone);
  }
}
```

```ts
export default class TodoItem {
  id = Date.now();

  @observable text: string = '';
  @observable isDone: boolean = false;

  constructor(text: string) {
      this.text = text;
  }

  @action
  toggleIsDone = () => {
      this.isDone = !this.isDone
  }

  @action
  updateText = (text: string) => {
      this.text = text;
  }
}
```

```tsx
import { createContext } from 'react';
import {TodoList} from "../stores/todo-list";

export const StoreContext = createContext<TodoList>({} as TodoList);
export const StoreProvider = StoreContext.Provider;
```

```tsx
const todoList = new TodoList([
  'Should Starting Writing in React',
  'Should Learn MobX',
  'Should Watch Once Piece :)'
]);

ReactDOM.render(
  <StoreProvider value={todoList}>
    <App/>
  </StoreProvider>,
  document.getElementById('root')
);
```

```ts
export const useStore = (): TodoList => useContext(StoreContext);
```

```tsx
export const TodoList = () => {
  const todoList = useStore();

  return useObserver(() => (
    <div className="todo-list">
      <div className="open-todos">
        <span>Open Todos</span>
        {todoList.openTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo}/>)}
      </div>
      <div className="finished-todos">
        <span>Finished Todos</span>
        {todoList.finishedTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo}/>)}
      </div>
    </div>
  ));
};
```





