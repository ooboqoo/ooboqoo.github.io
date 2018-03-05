# macOS 速查表

https://help.apple.com/macbookprothunderbolt3/late-2016/?lang=zh-cn#/apd10f8d1038


## 触控板

https://support.apple.com/zh-cn/HT204895

默认设置很多都需要改，以下是根据个人喜好调整之后的操作清单：

|||
|----------|--------------------------------------------------------------------------------------------
| 轻点点按 | 在偏好设置中启用 "轻点来点按"，可用轻点代替常规点按
| 普通点按 | 按下触控板的任意位置，能听到 "啵" 的一声，即常规鼠标的单击效果
| 用力点按 | 用力点按真得要很用力，听到 "啵" 的一声后再往下按出第二次 "啵" 才完成，可配置用三指轻按替代
| 两指轻点/点按 | 打开快捷键菜单，轻点菜单不消失，点按松开菜单即消失
| 两指滚动 | 两指上下滑动来滚动
| 两指缩放 | 张开或捏合大拇指与食指可放大或缩小照片和网页
| 两指轻扫 | 用来浏览网页、文稿等内容 — 如同在书中翻页
| 两指轻点两下 | 智能缩放
| 三指轻点     | 查看更多信息，如点按文字调用字典来查看定义
| 三指向上轻扫 | 调度中心
| 三指向下轻扫 | 应用 Expose
| 三指左右轻扫 | 若要从一个全屏幕应用切换到另一个
| 四指或五指捏合 | 启动台
| 四指或五指张开 | 显示桌面


## 快键键

https://support.apple.com/zh-cn/HT201236

### 按键对照表

|  macOS   | Icon | Windows | Remark
|----------|:----:|---------|---------
| command  |  ⌘   |   Win   ||
| option   |  ⌥   |   Alt   ||
| shift    |  ⇧   |         ||
| control  |  ⌃   |         ||
| caps lock|  ⇪   |         | 中/英
| fn       |      |         |||

### 常用快键键

大部分都是简单地用 `command` 替换 `Ctrl`

|||
|-----------|---------------------------------------------------------------------- 
| command+X | 剪切
| command+C | 拷贝
| command+V | 粘贴
| command+A | 全选
| command+F | 查找
| command+Z | 撤销
| shift+command+Z  | 重做
| command+G | 查找下一项
| shift+command+G  | 查找上一项
| command+H | 隐藏窗口
| option+command+H | 查看最前面的应用，但是隐藏所有其他应用
| command+M | 最小化窗口
| option+command+M | 最小化最前面应用的所有窗口
| command+N | 新建
| command+O | 打开
| command+P | 打印
| command+S | 保存
| command+W | 关闭窗口
| option+command+W | 关闭应用的所有窗口
| command+Q | 退出应用
| option+command+Esc | 强制退出
| control+space | 切换输入法
| command+space | 呼出 Spotlight
| shift+command+3    | 拍摄整个屏幕的屏幕快照
| shift+command+4    | 拍摄所选屏幕区域的屏幕快照

寻找 Win 下的一些快捷操作

||||
|-------------|----------------|--------------------------
| control+F2  | Alt            | 使用键盘打开屏幕顶部菜单栏中的菜单
| command+tab | Alt+Tab        | 切换应用。 注: Expose 会更好用

其他重要功能快捷键

||||
|-------------------|-----------------------------------------
| control+up        | 调度中心
| control+down      | Expose
| control+left / control+right | 切屏
| command+space     | 聚焦
| option+command+D  | 显示/隐藏程序坞
| control+command+D | 词典
| fn+fn             | Siri
| command+,         | 打开当前应用的偏好设置

### Finder

Finder 里没有剪切功能，使用 command+C 再 option+command+V 来实现剪切

### Safari

|||
|-----------------|---------------------------------
| command+L       | 选中地址栏
| fn+left / command+up    | 到页面顶部
| fn+right / command+down | 到页面底部
| command+Left    | 后退
| command+Right   | 前进
| shift+command+] | 标签页切换
| shift+command+[ | 标签页切换
| space           | 下翻一屏
| shift+space     | 上翻一屏
| command+Y       | 浏览历史
| command+shift+T | 重新打开最近关闭的标签页

### 文本编辑

|||
|-------------|---------------------------------
| command+B   | 加粗 Bold
| command+I   | 斜体 italicize
| command+U   | 下划线 underline
| control+A   | Move to beginning of line/paragraph
| control+B   | Move one character backward
| control+D   | Delete the character in front of the cursor
| control+E   | Move to end of line/paragraph
| control+F   | Move one character forward
| control+H   | Delete the character behind the cursor
| control+K   | Delete from the character in front of the cursor to the end of the line/paragraph
| control+L   | Center the cursor/selection in the visible area
| control+N   | Move down one line
| control+O   | Insert a new line after the cursor
| control+P   | Move up one line
| control+T   | Transpose the character behind the cursor and the character in front of the cursor
| control+V   | Move down one page

## 命令行

```bash
$ sudo shutdown -h now  # 立即关机
$ sudo shutdown -h +10  # 10分钟后关机
$ sudo halt             # sleep 吗？
$ sudo reboot           # 重启
$ sudo shutdown -r now  # 重启

$ sudo -s  # 临时升级到系统管理员
```

