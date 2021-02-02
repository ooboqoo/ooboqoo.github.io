# Figma

官方教程：https://help.figma.com/hc/en-us/categories/360002042553-Use-Figma  
帮助教学：https://figmachina.com/  

Figma 使用帮助 https://bytedance.feishu.cn/wiki/wikcnPCx22kz23WXVJSaaiMrCae  


> 作为设计人员请务必下载 Desktop 版本

## 常用功能

快速移动 [shift] 加方向箭头 可快速移动，具体移动的值在 nudge 设置，默认 10  
查看定位 在选中元素后，按下 [options] 键可看到定位信息  
快速复制 [cmd]+D  


## 基本操作

示例教程 Figma Basics

### Frames

Frames are a foundational element for your designs that act as a top-level container for most things you create in Figma.

There are a few different ways to create frames in Figma.

* Custom sizes: `F` select the frame tool then click and darg your cursor to the desired size
* Preset sizes: create frames with preset sizes by selecting the preset in the Properties panel
* Existing elements: right-clicking and selecting `Frame Selection`

### Constraints

Constraints allow you to fix elements of your design to different sides of their parent Frame. This lets you build fluid layouts to support multiple device sizes and breakpoints within the same group.

### Components

Components enable you to reuse existing parts of your design, saving time on otherwise repetitive and tedious work. Components create new instances rather than copies, allowing you to override properties derectly on the canvas.

There are two aspects to a Component
* the **Master Component**, which defines the properties of the Component
* the **Instance**, which is a copy of the Component, Instances are linked to the Matser Component, so any changes you make to the Master Component will be applied to the Instance.

#### Creating components

Select the layers you want to include in your Master Component and either use the Create Component button at the top or use the right-click menu to create a new component.

#### Asset panel

The Asset panel will house all of your components. Just drag and drop them onto the canvas to create a new instance.

### Styles

allows you to define a set of properties like color, font, and effects of an object, that can reused across your team's designs.

Select the object or text you'd like to create a Style for and click the Style icon `⚃` in the properties panel...


## Layout

Select Frame -> `Layout Grid` -> Click Icon and choose Columns -> enter 12 -> add Margin


## IconFont

Figma 中做好的图标，导出 SVG 再上传到 iconfont.cn 经常会出现样式异常。这是因为 figma 的填充模式为 *even-odd*，iconfont 识别不了。一种可行的方法是将图标导出到 sketch 中将模式改为 *non-zero*，但这效率略低。又一个 [Fill Rule Editor](https://www.figma.com/community/plugin/771155994770327940/Fill-Rule-Editor) 专门用来解决这个问题。

Fill Rule Editor 的具体使用步骤为
1. 将组成图标的所有线条与形状执行命令「 Union Selection 」，单个线条和形状跳过此步骤
2. 对合并后的图形执行 「 Outline Stroke 」
3. 打开插件，选中图形，此时插件面板中会显示图形各部分的填充模式，蓝色代表 non-zero 红色代表 even-odd，在插件面板中单击填充或描边可更改图标外观，我们要的最终效果是一个蓝色版本的图标。

