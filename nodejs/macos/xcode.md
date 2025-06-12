# Xcode

## Develop in Swift Tutorials

https://developer.apple.com/tutorials/develop-in-swift/welcome-to-develop-in-swift-tutorials

* How to use Xcode, Apple’s advanced tool for developing apps
* The basics of Swift, Apple’s modern programming language, which is designed to be easy to learn and fun to use
* A foundation in SwiftUI, which helps you build great-looking apps with the power of Swift




## Xcode

三大界面模块：navigator 导航区 + editor 代码编辑区 + preview 预览区


## 打包 APP

Xcode 「Product」-》「Archive」-> {Distribute App} -> {Copy App}


## 打包 dmg


https://www.bilibili.com/video/BV1wi4y1S7QJ/?spm_id_from=333.337.search-card.all.click&vd_source=f9e36835843450ab8a4cb669b15342c0


* 打开磁盘工具
* 新建映像：文件 -》新建空白映像 `存储为：xxx.dmg  位置：选桌面  格式：Mac OS 扩展  大小：比应用程序大几个 MB` 这样会生成两个文件
* 配置镜像内容：打开磁盘图标的入口，然后拖入应用和 Application 替身，再配置背景图片
* 从磁盘工具，在左侧导航选择刚才那个映像，右键选择“基于应用新建映像”，格式选择“只读”，就生成我们要的 dmg 了


