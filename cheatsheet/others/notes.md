# 杂项

上传文件要使用 `formdata` 包装

同一个 EventTarget 注册了多个相同的 EventListener，那么重复的实例会被抛弃。

当使用 `addEventListener()` 为一个元素注册事件的时候，句柄里的 `this` 值同 `currentTarget`，而 `target` 是直接接受事件的子元素。

`scrollIntoView()` 使 div 底部滚动到视窗。

在 webpack 里所有的文件都是模块。loader 的作用就是把文件转换成 webpack 可以识别的模块。

关于事件循环，执行下一个 task 之前总会清空 microtask

npm 新旧版本覆盖可能会造成迷之问题，这个时候可以试试删除 node_module 目录再重装


`getBoundingClientRect()` 用于获取元素宽高以及距离页面边框距离，十分方便。

stage 0 到 4 的含义：

stage 0 is "i've got a crazy idea",  
stage 1 is "this idea might not be stupid",  
stage 2 is "let's use polyfills and transpilers to play with it",  
stage 3 is "let's let browsers implement it and see how it goes",  
stage 4 is "now it's javascript".

移动端优化常用 CSS 属性：

```css
user-select: none; // 禁止文字被选中
outline:none; // 去除点击外边框,点击无轮廓
-webkit-touch-callout: none; // 长按链接不弹出菜单
-webkit-tap-highlight-color: rgba(0,0,0,0); // 去除点击高亮
```

鼠标禁用 `.disabled { pointer-events: none; }`  
less 中的 calc 问题：`height: calc(~"100% - 50px");`  
`vh` 在部分浏览器中包含地址栏部分，小心使用。

