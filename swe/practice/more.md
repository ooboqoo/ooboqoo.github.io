# 杂碎知识点

#### sessionStorage

每个 tab 页的 sessionStorage 都是独立的，无法通过 sessionStorage 实现标签页之间的通信。可以利用 `localStorage` 以及监听 `window` 上 `storage` 事件来解决。

#### 外链文件名后跟 `?` 并带参数的作用

```
<link href="/css/main.css?v=20110526" rel="Stylesheet">
<script src="/js/app.js?20110526"></script>
```

问：上面链接外部的css或js文件名后跟了一个“?”，并带上一个参数，作用是什么呢？  
答：js或css带参数,是为了避免旧的浏览器缓存继续生效；特别是在大型站中随时可能会更改局部css文件，为了避免浏览器刷新而继续使用旧的CSS缓存文件，在使用时往往会带上一个动态参数。
