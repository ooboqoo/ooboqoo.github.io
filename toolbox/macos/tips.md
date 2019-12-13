# 使用点滴

## 系统设置

##### Disable Dashboard on Mac

仪表盘会在多桌面(Mission Control)中独占一个桌面，感觉很烦，可以在 Mission Control 的设置页中去掉 Dashboard

##### Tab 键无法定位到确认按钮

在窗口中 Tab 键能够触及的地方，默认为 Text boxes and lists only，无法定位到 取消、确认 等按键，改为 All controlls 即可。

##### Apple Store 升级无法取消

中断的升级过程，只能看到 [RESUME] 按钮，无法取消，此时可按下 [opt] 键，就会出现 [CANCEL] 按钮。

##### Show LockScreen Message

Preferences > Security > [√] Show a message when the screen is locked

##### 低分屏字体显示优化

http://osxdaily.com/2018/09/26/fix-blurry-thin-fonts-text-macos-mojave/

macOS 在外接低分屏显示器时，容易出现字体虚化的问题，可通过逐步尝试以下方式解决

1. Preferences > General > [√] Use font smoothing when available (这步在 Retina 屏下感受明显)
2. 控制台输入 `defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO` (这步在低分屏下效果提升显著)
3. 调整平滑级别 `defaults -currentHost write -globalDomain AppleFontSmoothing -int 2` (这个效果不明显)

```bash
# 撤销上面配置项的命令
$ defaults -currentHost delete -globalDomain AppleFontSmoothing
$ defaults write -g CGFontRenderingFontSmoothingDisabled -bool YES
```

##### 4K 屏优化

Preferences > Display > Resolution 选择合适的缩放选项即可。

##### 微软雅黑

1. 复制 C:\Windows\System\Fonts\msyh.ttf 字体文件到 macOS 下并双击安装字体
2. 使用 TinkerTool 修改系统字体，或在应用中设置字体





## APFS

https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/APFS_Guide/FAQ/FAQ.html

APFS 是2017年新的文件系统，macOS 默认使用的是 case-insensitive 类型，因此同一个文件下不能同时存在 abc.txt 和 Abc.txt。其实 Linux 下分区都是区分大小写的，bash 等也是区分大小写的，所以用起来有时会感觉怪怪的。

