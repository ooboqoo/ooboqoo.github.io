# DevTools


## 安装

https://reactjs.org/blog/2019/08/15/new-react-devtools.html

## 使用

https://react-devtools-tutorial.now.sh/

图标颜色
* 蓝色，表示正在运行生产版本 production version
* 红色，表示网站正在使用开发版本  development version

## 调试类组件

修改 state




## 调试钩子

* 修改 `props` 值
* 修改 `useState` 钩子数值




## Profiler






## Hooks

A Hook is a function provided by React, let's hook into React features from function Components.

* Use all React features without a class.
* Reuse stateful logic between components.
* Opt-in and 100% backwards-compatible.


`key` 的妙用

```jsx
// `ProgressBar` 不需要知道 `currentIndex`，但是 `currentIndex` 变化时，`ProgressBar` 需要重新渲染，此时就可利用 `key`
<ProgressBar
  key={currentIndex + isPlaying}
  time={SLIDE_DURATION}
  animate={isPlaying}
/>
```

input 并不需要都配一个 ref



