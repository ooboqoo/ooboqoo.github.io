# Chrome DevTools

https://developers.google.com/web/tools/chrome-devtools/


## Console

### Command Line Reference

https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference

Command Line API 包含一个用于执行以下常见任务的便捷函数集合：选择和检查 DOM 元素，以可读格式显示数据，停止和启动分析器，以及监控 DOM 事件。

```js
// 选择和检查 DOM 元素
$_            // 返回最近评估的表达式的值
$0-$4         // Elements 中检查的最近五个 DOM 元素 或 Profiles 面板中检查的最近五个 JS 堆对象
$(selector)   // 等同于 `document.querySelector()` 函数
$$(selector)  // 相当于调用 `document.querySelectorAll()` 并转为真正的数组
$x(path)      // 返回一个与给定 XPath 表达式匹配的 DOM 元素数组

// 可读格式显示数据
copy(foo)     // 将指定对象的字符串表示形式复制到剪贴板
clear()                // 同 `console.clear()`, 清除控制台记录
dir(object)            // 同 `console.dir()` 方法
dirxml(object)         // 同 `console.dirxml()`, 输出以 XML 形式表示的指定对象
table(data, columns?)  // 同 `console.table()`
keys(object)    // 同 `Object.keys()`
values(objext)  // 同 `Object.values()`

debug(foo)    // 调用指定的函数时，将触发调试程序
undebug(foo)  // 停止调试指定函数
inspect(obj | func)  // 在相应的面板中打开并选择指定的元素或对象
getEventListeners(obj)  // 返回在指定对象上注册的事件侦听器

monitor(func)    // 调用指定函数时，控制台会输出函数名调用参数信息
unmonitor(func)  // 停止监控指定函数
monitorEvents(object, events?: [string])  // 在指定对象上发生指定事件时，打印 Event 对象
unmonitorEvents(object, events?)          // 停止针对指定对象和事件的事件监控

profile(name?)     // 
profileEnd(name?)  // 
```

**命令换行(暂不执行)**  在控制台中按 Shift + Enter 以开始一个新行

**将目标保存为一个全局变量**  右击元素并选择 "Store as global variable"

**保存 stack trace**  除了将报错截图给对方，还可以发送完成 stack trace, 右击报错提示并选择 "Save as..."

**拷贝 HTML**  在 Elements 面板选中一个元素，然后 `Ctrl + c` 搞定




