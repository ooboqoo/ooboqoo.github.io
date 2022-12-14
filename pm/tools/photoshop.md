# Photoshop 切图教程

http://www.imooc.com/learn/506  
http://www.cnblogs.com/xiaohuochai/p/4770584.html

常用操作

|||
|--------------------|-------------
| `Ctrl` + `+` / `-` | 放大/缩小
| `Alt + 滚轮`       | 基于鼠标位置缩放
| 

工具面板快捷键

|||
|---------------|-------------
| [Shift] + `V` | 移动
| [Shift] + `M` | 选区
| `H`           | 切换为移动模式，鼠标变小手


图层相关快速操作

|||
|--------------------|----------------
| `Alt + 单击眼睛`   | 仅显示当前图层
| `Ctrl + 图片某个位置`       | 激活图片位置内容对应的图层
| `Ctrl + 点击激活图层的图标` | 快速选中当前图层内容

 

## 准备篇

### 作用

我们为什么要去切图呢？这就需要说到项目流程。一个完整的项目流程是：市场进行需求分析，产品做出项目原型，UI根据项目原型出设计图，前端根据设计图制作页面，后端进行数据相关工作，网站经过测试后上线。

我们常说的切图实际上就是要把 UI 制作的设计图切成网页需要的素材。具体到网页的哪些地方需要素材呢？主要包括两类：

```text
// HTML中的 <img> 标签
<img src="img/xx.jpg" alt="">

// CSS中的 background-image 属性
{ background-image: url(../img/xx.jpg); }
```


### 界面设置

#### 新建设置

Web -> 1920*1080像素、颜色RGB+8位、背景透明

#### 移动工具设置

取消"自动选择"，"组" 改 "图层"，`Ctrl+Click` 点击页面元素即可自动选择对应图层

#### 杂项设置



#### 工作界面设置

视图(主菜单) -> 勾选 (显示 -> "智能参考线") + "标尺" + "对其"

调整面板为 "信息" "字符" "图层" "历史记录" 4大面板

调整 "信息" 面板选项：颜色选REB、坐标选像素，文档信息勾选文档大小

编辑(主菜单) -> 首选项 -> 单位与标尺 -> 单位(标尺、文字都用像素做单位)

窗口(主菜单) -> 新建工作区 -> 存储为 "Web 切图"


## 基本操作

### 简单工具操作


### 图层操作

重命名：双击图层名
为图层选择一个标志颜色：右键图层再选择颜色

### 辅助参考线

新建参考线：在标尺上按住左键拖动，`Alt` 可改变参考线方向，或者 视图 -> 新建参考线 (近似快捷键 `Alt+V+E` 牛！！)

移动参考线：在移动工具下，可以拖动某条参考线

隐藏参考线：`Ctrl + ;`

删除参考线：拖到标尺上释放


## PS 传统切图

https://helpx.adobe.com/photoshop/using/slicing-web-pages.html

### 切片工具切片

利用切片工具，将需要的图片一个个框选出来。

### 基于图层的切片

选中图层，然后 图层 -> 新建基于图层的切片

基于图层的切片可能灵活性不够，这时可以右击切片，选择 "提升到用户切片"

### 基于参考线切片

根据各图片边缘添加参考线，`切片工具 -> 基于参考线的切片` 实现自动切片，然后再一个个右键删除不要的切图。

### 隐藏自动切片

切片选择工具 -> 属性栏上点击 "隐藏自动切片"

### 保存切片

切好片后，`文件 -> 导出 -> 导出为 Web 所用格式` 根据实际选择 PNG24 或 JPN 存储


## 高级切图

### Cut&Slice me

最新版本为 v1.1.3 仅支持 CS6 和 CC 版本，不支持 CC14(自带了相关插件，没开发的必要了)

http://www.cutandslice.me/

### Adobe Generator

https://helpx.adobe.com/photoshop/using/generate-assets-layers.html

启用生成器
  * 编辑 -> 首选项 -> 增效工具 -> 勾选启用生成器
  * 文件 -> 生成 -> 勾选图像资源

自动生成切图
  * 基本操作：在图层名字后添加 `.png` `.jpg` 等后缀，即可自动生成图片
  * 修改分辨率：修改图层名字为 `200% button @2x.jpg` 即可生成 button @2x 的图片，尺寸为原2倍大小
  * 修改图片质量：修改图层名字为 `.jpg8` 即可生成质量为 80% 的图片

SVG 和 WebP 格式介绍

### 内置脚本批量导出图层

https://graphicdesign.stackexchange.com/questions/1961/batch-export-photoshop-layers-to-individual-png-files?noredirect=1&lq=1

文件 -> 导出 -> 将图层导出到文件...

这里还有一款第三方脚本，貌似速度比内置版快很多 https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast

### 复制 CSS

选择 -> 复制 CSS ，非常好用，但是对资源是有限制的。








