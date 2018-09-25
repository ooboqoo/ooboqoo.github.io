# 知识点滴

### 按钮能拖到浏览器打开 + 文件拖到 APP 导致界面被盖掉

```js
window.addEventListener("dragover", function (e) { e.preventDefault() }, false)
window.addEventListener("drop", function (e) { e.preventDefault() }, false)
window.addEventListener("dragstart", function (e) { e.preventDefault() }, false)
```


