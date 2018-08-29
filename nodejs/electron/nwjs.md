# NW.js

https://nwjs.io/


## Package Your App

https://github.com/nwjs/nw.js/blob/nw32/docs/For%20Users/Package%20and%20Distribute.md#package-your-app

There two options to pack your app: plain files or zip file.

On Windows and Linux, you can put the files of your app in the same folder of NW.js binaries and then ship them to your users. Make sure _nw_ (or _nw.exe_) is in the same folder as _package.json_. Or you can put the files of your app in a folder named _package.nw_ in the same folder as nw (or nw.exe).

On Mac, put the files of your app into a folder named _app.nw_ in _nwjs.app/Contents/Resources/_ and done.


## Manifest Format

http://docs.nwjs.io/en/latest/References/Manifest%20Format/

Every app package should contain a manifest file named _package.json_ in the format of JSON.

### 必填字段

**main** 指定启动时加载的 HTML 或 JS 文件。可以是文件名、URL、或相对于此 package.json 的相对路径。

**name** 指定应用的名字，它必须是唯一的，只能含 `a-z 0-9 . _ -` 不能有空格。NW.js 会使用该名字来存储应用数据，详见 _C:/C:\Users\${username}\AppData\Local_

### 选填字段

**nodejs** 如果此项设置为 `false` 则会禁用 Node 支持

**node-man** 会先执行此 Node 脚本，然后才会加载 DOM window

**domain** Specify the host in the chrome-extension:// protocol URL used for the application. 

**bg-script** The script is executed in the background page at the start of application.

**window** 控制窗口行为

```js
{
  "id": "",             // Chrome 用于识别窗口用
  "title": "",          // 默认窗口标题，应用启动后优先显示 document.title 内容
  "icon": "logo.png",   // 窗口图标
  "show": true,         // 应用启动时是否显示/隐藏窗口
  "frame": false,       // 是否显示窗口外框
  "transparent": false, // 可以把整个窗口搞成透明，可以利用此属性做个歌词效果出来
  "position": "center", // 初始窗口定位位置  "null" | "center" | "mouse"
  "width": 1260,        // 初始窗口宽度
  "height": 650,        // 初始窗口高度
  "show_in_taskbar": true, // 是否在任务栏显示窗口
  "fullscreen": false,  // 窗口是否最大化
  "resizable": true,    // 是否可调整窗口大小
  "min_width": 800,     // 可调整最小宽度
  "min_height": 600,    // 可调整最小高度
  "max_width": 0,       // 可调整最大宽度
  "max_height": 0       // 可调整最大高度
}
```

**webkit** 控制 WebKit 特性开关

```js
{
  "double_tap_to_zoom_enabled": false,  // enable zooming with double tapping on mac with 2 fingers.
  "plugin": true  // 是否加载外部浏览器插件
}
```

**user-agent** 用于覆盖默认 HTTP 头部 `User-Agent` 字段内容

**node-remote** 指定可以调用本地 Node 的远端页面

**chromium-args** Specify chromium (content shell) command line arguments. 这个很有用

**crash_report_url** URL of the crash report server

**js-flags** 给 V8 引擎传递的参数

**inject_js_start** **inject_js_end** 用于修改每个页面的 `window`，在 DOM 解析之前 或者 `onload` 触发前执行一段代码

**dom_storage_quota** 可自定义 DOM storage 大小，Integer 类型，建议设为预期的 2 倍大小


## Advanced

### Security in NW.js

There are two kinds of frames in NW.js: node frame and normal frame.

Node frames have following extra capabilities than normal frames:
  * Access Node.js / NW.js APIs
  * Access extended DOM features, such as save as dialog, nwUserAgent attribute etc.
  * Bypass all security restrictions, such as sandboxing, same origin policy etc. For example, you can make cross origin XHR to any remote sites, or access to `<iframe>` element whose src points to remote sites in node frames.

In NW.js, frames matching ALL of the following criterias will be a node frame:
  * `nodejs` set to `true` in manifest file
  * URL of windows and frames matching `node-remote` patterns in manifest file or `chrome-extension://` protocol.
  * Frames or parent frames NOT having `nwdisable` attribute.
  * Frames or parent frames NOT in `<webview>` tag


## Command Line Options

**--user-data-dir** 指定用户数据存放目录，打开多个窗口就靠它老人家了

Windows: `%LOCALAPPDATA%/<name-in-manifest>/`  
Mac: `~/Library/Application Support/<name-in-manifest>/`  
Linux: `~/.config/<name-in-manifest>`  
