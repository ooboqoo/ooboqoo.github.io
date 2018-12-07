# Browser Objects Reference

<style>td:first-child{ color: red; } td:first-child em { color: gray; }</style>

## Window Object

每个页面和 `<iframe>` 都有一个对应的 window 对象。

||
-------------|------------------------------------------------------------------------
closed       | Returns a Boolean value indicating whether a window has been closed or not
defaultStatus| Sets or returns the default text in the statusbar of a window
document     | Returns the Document object for the window (See Document object)
frameElement | Returns the `<iframe>` element in which the current window is inserted
frames       | Returns all `<iframe>` elements in the current window
history      | Returns the History object for the window (See History object)
innerHeight  | Returns the inner height of a window's content area
innerWidth   | Returns the inner width of a window's content area
length       | Returns the number of `<iframe>` elements in the current window
localStorage   | Stores data with no expiration date
sessionStorage | Stores data for one session (lost when the browser tab is closed)
location     | Returns the Location object for the window (See Location object)
name         | Sets or returns the name of a window
navigator    | Returns the Navigator object for the window (See Navigator object)
opener       | Returns a reference to the window that created the window
outerHeight  | Returns the outer height of a window, including toolbars/scrollbars
outerWidth   | Returns the outer width of a window, including toolbars/scrollbars
pageXOffset  | 页面水平滚动的像素值
pageYOffset  | 页面垂直滚动的像素值
scrollX      | pageXOffset 的别名
scrollY      | pageYOffset 的别名
parent       | Returns the parent window of the current window
screen       | Returns the Screen object for the window (See Screen object)
screenLeft   | Returns the horizontal coordinate of the window relative to the screen
screenTop    | Returns the vertical coordinate of the window relative to the screen
screenX      | Returns the horizontal coordinate of the window relative to the screen
screenY      | Returns the vertical coordinate of the window relative to the screen
self         | Returns the current window
status       | Sets or returns the text in the statusbar of a window
top          | Returns the topmost browser window

||
-------------------|------------------------------------------------------------------------------------
setTimeout(_cb, delay?, p1?..._) | Calls a function or evaluates an expression after a specified number of milliseconds
clearTimeout()     | Clears a timer set with setTimeout()
setInterval()      | Calls a function or evaluates an expression at specified intervals (in milliseconds)
clearInterval()    | Clears a timer set with setInterval()
getComputedStyle() | Gets the current computed CSS styles applied to an element
scrollBy()     | Scrolls the document by the specified number of pixels
scrollTo()     | Scrolls the document to the specified coordinates
alert()        | Displays an alert box with a message and an OK button
atob()         | Decodes a base-64 encoded string
blur()         | Removes focus from the current window
btoa()         | Encodes a string in base-64
close()        | Closes the current window
confirm()      | Displays a dialog box with a message and an OK and a Cancel button
focus()        | Sets focus to the current window
getSelection() | Returns a Selection object representing the range of text selected by the user
matchMedia()   | Returns a MediaQueryList object representing the specified CSS media query string
moveBy()   | Moves a window relative to its current position
moveTo()   | Moves a window to the specified position
open()     | Opens a new browser window
print()    | Prints the content of the current window
prompt()   | Displays a dialog box that prompts the visitor for input
resizeBy() | Resizes the window by the specified pixels
resizeTo() | Resizes the window to the specified width and height
stop()     | Stops the window from loading


## Navigator Object

The navigator object contains information about the browser.

||
--------------|-----------------------------------------------------
appCodeName   | Returns the code name of the browser
appName       | Returns the name of the browser
appVersion    | Returns the version information of the browser
cookieEnabled | Determines whether cookies are enabled in the browser
geolocation   | Returns a Geolocation object that can be used to locate the user's position
language      | Returns the language of the browser
onLine        | Determines whether the browser is online
platform      | Returns for which platform the browser is compiled
product       | Returns the engine name of the browser
userAgent     | Returns the user-agent header sent by the browser to the server

||
---------------|-------------------------------------------------------
javaEnabled()  | Specifies whether or not the browser has Java enabled
taintEnabled() | Removed in JavaScript version 1.2. Specifies whether the browser has data tainting enabled


## Screen Object

The screen object contains information about the visitor's screen.

||
------------|-----------------------------------------------------------------
availHeight | Returns the height of the screen (excluding the Windows Taskbar)
availWidth  | Returns the width of the screen (excluding the Windows Taskbar)
colorDepth  | Returns the bit depth of the color palette for displaying images
height      | Returns the total height of the screen
pixelDepth  | Returns the color resolution (in bits per pixel) of the screen
width       | Returns the total width of the screen


## History Object

The History interface allows to manipulate the browser session history 会话历史。

||
-------|----------------
length | The number of URLs in the history list
state  | The current state object

||
------------|--------------------------------------------------------------------------
back()      | 相当于点击后退按钮，会导致页面更新，会在 `window` 上触发 `popstate` 事件
forward()   | 相当于点击前进按钮，会导致页面更新，会在 `window` 上触发 `popstate` 事件
go(_num_)   | 更灵活的前进后退，如 退一 `go(-1)` 进二 `go(2)`
pushState(_stateObj, title, url?_)    | Pushes the given data with the title and URL onto the session history. <br>不会导致页面更新，不会触发事件，提供了 url 会更新 url，title 目前浏览器都忽略
replaceState(_stateObj, title, url?_) | Updates the session history by the given data, title, and if provided, URL.


## Location Object

The location object contains information about the current URL.

||
----------|----------------------------------------
hash      | Sets or returns the anchor part (#) of a URL
host      | Sets or returns the hostname and port number of a URL
hostname  | Sets or returns the hostname of a URL
href      | Sets or returns the entire URL
origin    | Returns the protocol, hostname and port number of a URL
pathname  | Sets or returns the path name of a URL
port      | Sets or returns the port number of a URL
protocol  | Sets or returns the protocol of a URL
search    | Sets or returns the querystring part of a URL

||
----------|-------------------------------
assign()  | Loads a new document
reload()  | Reloads the current document
replace() | Replaces the current document with a new one


## Storage

含 `Window.sessionStorage` `Window.localStorage`

||
----------|----------------------------------------
s.length    | 返回数据条数，只读
||
s.clear()            | 删除所有数据，始终返回 `undefined`
s.key(_index_)       | 返回第 index 条记录的键名，出界就返回 `null`
s.getItem(_keyName_) | 返回键名对应的记录 (string 类型)，如果 key 不存在就返回 `null`
s.setItem(_key_, _value_) | 新建或修改记录，注意该方法可能抛异常(当存储空间不够时，异或是...)，返回 `undefind`
s.removeItem(_keyName_)   | 移除一条记录，不管有没有记录被移除，该方法始终返回 `undefined`

## Console

||
-----------------------------------|----------------------------------------
console.log(...args)               | 输出一段信息 [注]
console.dir(obj)                   | 查看某个对象的属性，试试 `log` 和 `dir` 一个 HTML 元素看看差别
console.table(data, columns?)      | 以表格形式展现数据，data 必须为对象或数组
console.assert(assertion, ...args) | 断言失败打印错误，断言成功就啥都不做
||
console.time(label='default')      | 开启一个计时器(以记录一段操作的耗时)
console.timeEnd(label='default')   | 结束一个计时器并在控制台打印结果(只打印无返回)

注： 格式说明符 Summary of formatting specifiers

||
:--------:|----------------------------------------------------------
`%s`      | Element which substitutes is converted to a string
`%d` `%i` | Element which substitutes is converted to an integer
`%f`      | Element which substitutes is converted to a float
`%o`      | Element is displayed with optimally useful formatting
`%O`      | Element is displayed with generic JavaScript object formatting
`%c`      | Applies provided CSS
