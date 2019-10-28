# Optimizing Performance


## PureComponent & memo()


`PureComponent` 只有在组件 props 有更新时才会重新渲染，`memo()` 则用于函数组件，效果一样。

`PureComponent` 只负责比较 props 的第一层属性变化，如果要进行更可控的方式，那么可以使用生命周期函数 `shouldComponentUpdate`。





```jsx
// 优化前，每次 count 变化触发重新渲染时，Foo Bar 内的 console.log 都会被触发

function Foo() {
  console.log('Foo render')
  return null
}

class Bar extends Component {
  render() {
    console.log('Bar render')
    return null
  }
}

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Foo />
      <Bar />
    </div>
  )
}

// 优化后，count 的变化不会触发 console.log

const Foo = memo(function Foo() {  // memo()
  console.log('Foo render')
  return null
})

class Bar extends PureComponent {  // PureComponent
  render() {
    console.log('Bar render')
    return null
  }
}

class Bar extends Component {     // shouldComponentUpdate()
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  render() {
    console.log('Bar render')
    return null
  }
}
```


