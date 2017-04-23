# Refs and the DOM

多数时候，父组件通过 `props` 来向子组件传递信息。但有时也可能希望直接控制某个子组件，React 提供了这种机制，可以实现直接控制一个 React 组件或 DOM 元素。

### When to Use Refs

以下情况下使用 "子组件引用" 是比较合适的：
  * 获取焦点、文本选择，或者是媒体播放
  * 触发动画效果
  * 集成第三方 DOM 库

如果使用声明形式就能实现功能，则应避免使用子组件引用。如直接向 Dialog 子组件传递 `isOpen` 属性，而不是调用 Dialog 的 `open()` 和 `close()` 方法。

### Adding a Ref to a DOM Element

React 通过向组件的 `ref` 特性赋值一个 callback 来实现引用。当组件加载或卸载时，该回调函数都会被调用一次。

```
<div>
  <input type="text" ref={(input) => { this.textInput = input; }} />
      // 加载时将 input 元素的引用存储到 this.textInput
      // 卸下时会将 null 赋值给 this.textInput 来释放资源
  <input type="button" value="Focus the text input" onClick={() => this.textInput.focus()} />
</div>
```

通过在 `ref` 回调函数中将引用赋值给一个类属性是最常见的一种用法。

### Adding a Ref to a Class Component

当设定自定义组件的 `ref` 属性时，自定义组件的实例会作为参数传递给回调函数。

```
<CustomTextInput ref={(input) => { this.textInput = input; }} />
```

### Refs and Functional Components

当自定义组件是通过"函数"形式定义，而不是通过"类"形式定义的时候，因为不存在类实例，所以指定 `ref` 是无效的。

但在函数式自定义组件内部还是可以正常使用 `ref` 的。

```
function MyFunctionalComponent(props) {
  let textInput = null;
  function handleClick() { textInput.focus(); }
  return (
    <div>
      <input type="text" ref={(input) => { textInput = input; }} />                // 有效
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <MyFunctionalComponent ref={(input) => { this.textInput = input; }} />;  // 无效
  }
}
```

### Don't Overuse Refs

不要滥用 `ref` 特性，如果只是想控制子组件的一些状态，基本可以通过将状态提升为父组件的一个属性来解决。

### Legacy API: String Refs

如果你以前使用过 React，那么肯定对一个老的 API -- 将一个字符串赋值给 `ref` 特性 -- 这种用法很熟悉。但这种用法有问题，在新版本中会去掉这种用法。
