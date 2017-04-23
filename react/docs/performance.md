# Optimizing Performance

React 内部已经做了大量优化来提升性能。当然，你还可以做得更好。

### Use The Production Build

* For single-file builds, we offer production-ready `.min.js` versions.
* For Brunch, you need to add the `-p` flag to the `build` command.
* For Browserify, you need to run it with `NODE_ENV=production`.
* For Create React App, you need to run `npm run build` and follow the instructions.
* For Rollup, you need to use the `replace` plugin before the `commonjs` plugin so that development-only modules are not imported.
* For Webpack, you need to add this to plugins in your production config:

```
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```

### Profiling Components with Chrome Timeline

1. Load your app with `?react_perf` in the query string (for example, http://localhost:3000/?react_perf).
2. Open the Chrome DevTools "Timeline" tab and press "Record".
3. Perform the actions you want to profile. Don't record more than 20 seconds or Chrome might hang.
4. Stop recording.
5. React events will be grouped under the "User Timing" label.

### Avoid Reconciliation

React / React Native 使用了 "virtual DOM" 技术来避免非不要的 DOM 更新。

每当一个组件的 `props` 或 `state` 更新，React 就需要去检查 virtual DOM 以决定是否需要更新 actual DOM。

此时你可以在生命周期钩子 `shouldComponentUpdate` 中返回 `false` 来告诉 React 不要更新来避免不必要的对比工作。默认都是 `true`，另外，禁用更新后，其隶属组件也不会被更新。

```
// 手动控制那些属性变更后需要更新组件
shouldComponentUpdate(nextProps, nextState) {
  if (this.props.color !== nextProps.color) { return true; }
  if (this.state.count !== nextState.count) { return true; }
  return false;
}
```

### `shouldComponentUpdate` In Action

详细讲解了 virtual DOM [工作机制](https://facebook.github.io/react/docs/optimizing-performance.html#shouldcomponentupdate-in-action)

### `React.PureComponent`

如果你只是希望 React 对 `props` 和 `state` 下的成员进行 "浅比较 shallow comparison"，那么你不用自定义 `shouldComponentUpdate`，因为这种情况很普遍，所以 React 提供了一个 helper 类 `PureComponent` 来处理此类情况。

但一定要注意的是，如果成员是引用类型的话，更改(而不是重新赋值)这些成员，并不会触发 DOM 更新，譬如下面这样：

```
class ListOfWords extends React.PureComponent {  // 点击按钮没有效果，如果去掉 Pure 就正常
  render() { return <div>{this.props.words.join(',')}</div>; }
}

export default class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {words: ['marklar']};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const words = this.state.words;
    words.push('marklar');
    this.setState({words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} > 添加 </button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

### The Power Of Not Mutating Data

上例中的问题，可以通过以下方法解决，即不是修改数组本身，而是创建一个新的数组并替换掉原数组：

```
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```

### Using Immutable Data Structures

Immutable.js 库则提供了一种更加通用的解决方案。It provides immutable, persistent collections that work via structural sharing:

* Immutable: once created, a collection cannot be altered at another point in time.
* Persistent: new collections can be created from a previous collection and a mutation such as set. The original collection is still valid after the new collection is created.
* Structural Sharing: new collections are created using as much of the same structure as the original collection as possible, reducing copying to a minimum to improve performance.

Immutability makes tracking changes cheap. A change will always result in a new object so we only need to check if the reference to the object has changed.

Immutable data structures provide you with a cheap way to track changes on objects, which is all we need to implement shouldComponentUpdate. This can often provide you with a nice performance boost.
