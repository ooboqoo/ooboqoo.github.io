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
| Command  |  ⌘   |   Win   ||
| Option   |  ⌥   |   Alt   ||
| Shift    |  ⇧   |         ||
| Control  |  ⌃   |         ||
| CapsLock |  ⇪   |         | 中/英
| Fn       |      |         |||

### 常用快键键

大部分都是简单地用 `command` 替换 `Ctrl`

|||
|-----------|---------------------------------------------------------------------- 
| Command-X | 剪切
| Command-C | 拷贝
| Command-V | 粘贴
| Command-A | 全选
| Command-F | 查找
| Command-Z | 撤销
| Command-Shift-Z  | 重做
| Command-G | 查找下一项
| Command-Shift-G  | 查找上一项
| Command-H | 隐藏窗口
| Command-Option-H | 查看最前面的应用，但是隐藏所有其他应用
| Command-M | 最小化窗口
| Command-Option-M | 最小化最前面应用的所有窗口
| Command-N | 新建
| Command-O | 打开
| Command-P | 打印
| Command-S | 保存
| Command-W | 关闭窗口
| Command-Option-W | 关闭应用的所有窗口
| Command-Q | 退出应用
| Command-Option-Esc | 强制退出
| CapsLock 或 ^Space | 切换输入法(需要手动开启这两快键键)
| Command-Space | 呼出 Spotlight
| Command-Shift-3    | 拍摄整个屏幕的屏幕快照
| Command-Shift-4    | 拍摄所选屏幕区域的屏幕快照


Finder 里没有剪切功能，使用 Command-C 再 Option+Command+V 来实现剪切

寻找 Win 下的一些快捷操作

||||
|-------------|----------------|--------------------------
| Control-F2  | Alt            | 使用键盘打开屏幕顶部菜单栏中的菜单
| Command-Tab | Alt-Tab        | 切换应用。 注: Expose 会更好用
| 



||||
|---------------|-----------------------------------------
| Control-Up    | 调度中心
| Command-Space | 聚焦

### 文本编辑



## 命令行

```bash
$ sudo shutdown -h now  # 立即关机
$ sudo shutdown -h +10  # 10分钟后关机
$ sudo halt             # sleep 吗？
$ sudo reboot           # 重启
$ sudo shutdown -r now  # 重启

$ sudo -s  # 临时升级到系统管理员
```

