# Chrome DevTools

https://developers.google.com/web/tools/chrome-devtools/


## Console

### Command Line Reference

```js
$_            // 返回最近评估的表达式的值
$0-$4         // Elements 中检查的最近五个 DOM 元素 或 Profiles 面板中检查的最近五个 JS 堆对象
$(selector)   // 等同于 document.querySelector() 函数
$$(selector)  // 调用 document.querySelectorAll() 并转为真正的数组
clear()       // 清除控制台记录
debug(foo)    // 调用指定的函数时，将触发调试程序
undebug(foo)  // 停止调试指定函数
getEventListeners(obj)  // 返回在指定对象上注册的事件侦听器
copy(foo)     // 将变量复制到剪贴板中
```

**将目标保存为一个全局变量**  右击元素并选择 "Store as global variable"

**保存 stack trace**  除了将报错截图给对方，还可以发送完成 stack trace, 右击报错提示并选择 "Save as..."

**拷贝 HTML**  在 Elements 面板选中一个元素，然后 `Ctrl + c` 搞定




