# Chrome DevTools

https://developers.google.com/web/tools/chrome-devtools/


## Console

### Command Line Reference

```js
$_            // 返回最近评估的表达式的值
$0-$4         // Elements 中检查的最近五个 DOM 元素 或 Profiles 面板中检查的最近五个 JS 堆对象
$(selector)   // 等同于 document.querySelector() 函数
$$(selector)  // 等同于调用 document.querySelectorAll()
clear()       // 清除控制台记录
debug(foo)    // 调用指定的函数时，将触发调试程序
undebug(foo)  // 停止调试指定函数
getEventListeners(obj)  // 返回在指定对象上注册的事件侦听器
```




