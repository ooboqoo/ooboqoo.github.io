# Figma

官方教程：https://help.figma.com/  
使用帮助 /wiki/wikcnPCx22kz23WXVJSaaiMrCae  


## CheatSheet

### 快捷键

* `Command-/`  Quick Actions...
* `Command-E`  Object > Flatten Selection 基于当前展示的路径重新生成 Vector
* `Shift-Command-K`  Place Image... 支持选择多张图片然后再逐一选择填充容器
* `Control-Command-Space`  输入 Emoji 表情
* `Option-Command-C`  复制对象属性

---

* `Command-D` Edit > Duplicate 快速复制
* `Shift-箭头` 快速移动，big nudge 默认值为 10px，可在 Preferences > Nudge amount... 中调整
* `Option` 查看定位/快速复制 - 选中元素后，鼠标在元素上为快速复制，在元素外为查看定位
* `Command` 按住可快速选中子元素

### 小技巧

* 拉伸Frame时调整内部约束确保界面不变 - 按住 `Command` 键再拖动即可
* 复制某个具体样式 - 点击属性面板中某个属性的空白处选中该属性，然后 `Command-C` 复制，到目标对象 `Command-V` 粘贴
* 快速折叠Layer层级 - 快捷键 `Option-L`
* 快速平滑锚点 - 钢笔工具画完锚点后，用鼠标手动调整平滑锚点会非常不自然，直接给图形加圆角就行
* 快速定位到元素 - 颜色最右边有个快速定位按钮，可以快速定位到使用该颜色的元素
* 导入SVG
  - 复制 SVG 代码
  - 直接拖入 SVG 文件
* 改变文字的默认颜色 - Edit > Set Default Properties
* 快速查看页面的轮廓框架 - `Command-Y` Main menu › View › Outlines › Show outlines
* 在飞书中嵌入Figma页面 - Share > Get embed code，复制代码粘贴到文档，选择网页嵌入即可
* 对象转PNG - `Shift-Command-C` 复制位图，再 `Command-V` 粘贴即可

* 黑白模式 - 右侧面板 Layer 内的下拉框 由 Pass through 修改为 Luminosity 即可

### 问题处理

* 卡片投影怎么被裁掉了 - 逐层往上找 Clip content 属性，把对勾去掉就好
* 客户端面板变小了 - 检查 View > Interface Scale
* 对象的小数点始终无法去除 - 先检查 Preference > Snap to pixel grid；不行再逐级往上检查父级元素坐标是否带小数点

### 常用插件

* Component Page - 组件管理
* Coolors - 调色盘模板
* Readline - 创建红色标注
* Clean document - 清理影藏图层
* Feather Icons - 一个开源 ICON 库

* Content Reel - 信息填充(头像、文本 等)
* Better Font Picker - 预览英文字体
* SkewDat - 倾斜功能
* SmoothShadow - 调整阴影
* Wireframe - 快速创建线框图
* LaTeX Complete - 输入数学公式
* Minimap - 快速定位画布


### Desktop App

作为设计人员请务必下载 Desktop 版本

* 可以调用本地电脑字体
* 导出 PNG 功能

### Use Cases

* UI design
* UX design
* Graphic design
* Wireframing 线框图
* Diagramming
* Brainstorming
* Templates
* Remote design
* Agencies


## 界面介绍

### 工具栏

左
* 菜单 Main menu
* 移动/缩放工具 Move tools
  - 移动 Move `V`
  - 缩放 Scale `K`
* Region tools
  - Frame `F`
  - Section `⇧S`
  - Slice `S`
* Shape tools
  - Rectangle `R`
  - Line `L`
  - Arrow `⇧L`
  - Ellipse `O`
  - Polygon
  - Star
  - Place image...
* Drawing tools
  - Pen `P`
  - Pencil `⇧P`
* Text `T`
* Resources `⇧I`
* Hand tool `H`
* Add comment `C` - 任何对文件具有查看权限的人都可以使用评论工具

中(根据选中状态变换菜单)
* 编辑对象 Edit object - 可进入矢量编辑模式，Object 包含 形状、画笔绘制的矢量图 等
* Create component - 将元素转换为 Component 来创建可复用的元素
* Use as mask - 使用 蒙版 隐藏和显示其他图层的特定部分
* 重置实例 Reset Instance - 重置实例按钮可清除添加到实例的所有覆盖属性
* 布尔运算和扩展对象 Boolean Operations and Flatten Selection
  - 通过四个公式之一组合形状图层：Union Substract Intersect 和 Exclude，然后将 **布尔组** 视为单个形状

右
* 协作者 Multiplayer and Observation Mode
* 共享 Share
* 演示 Present
* 视图 Zoom/view options - 在这里你可以更改缩放级别和其他视图选项

#### 框架工具 Frame Tool

框架就像画板一样。你可以使用快捷键 同级新增 `A` 和 添加子Frame `F` 来新增Frame，然后在右侧面板设置框架尺寸。

### 图层面板


Layer: Every shape, text object, or image you add to the canvas has its own layer.  
Frame  
Component  
Group 
Selection   
Section?  

可以通过图标确定图层的类型
* Frame
  - 根据属性不同会有多重变种
* Group
* Component
  - Instance
* Text
* Shape
  - ...

### 属性面板

* 设计 Design
* 原型 Prototype
* 代码 Code - 查看代码（CSS / iOS / Android）

#### 设计

画布
- 背景 Background
- Local styles

xxx
- Auto layout
- Selection colors


- 对齐和分布 Alignment and Distribution  https://figmachina.com/guide/layers/alignment-and-distribution.html
- 框架的尺寸和方向 Frame Size and Orientation  https://figmachina.com/guide/layers/frame-tool.html
- 画布上的位置(X和Y) Position on the Canvas  https://figmachina.com/guide/layers/positions-and-dimensions.html
- 对象的尺寸(宽度和高度) Dimensions of the Object  https://figmachina.com/guide/layers/positions-and-dimensions.html
- 实例 Instance  https://figmachina.com/guide/components/using-components-and-instances.html
- 布局约束  Constraints  https://figmachina.com/guide/layers/using-constraints.html
- 布局网格 Layout grid  https://figmachina.com/guide/canvas/layout-grids.html
- 图层(混合模式) Layer
- 文字 Text  https://figmachina.com/guide/text/text-overview.html
- 填充(背景) Fill  https://figmachina.com/guide/styling/paints.html
- 描边 Stroke  https://figmachina.com/guide/styling/paints.html
- 图层效果 Effects  https://figmachina.com/guide/styling/effects.html
- 导出 Export  https://figmachina.com/guide/exporting/getting-started-with-exports.html

#### 原型 Prototype

打开原型面板就会进入原型模式。你可以在框架之间建立连接，模拟用户可能进行的交互。

原型面板包含4个部分
1. 触发方式 Trigger -  选择使用何种交互方式
2. 动作 Action -  决定原型如何响应用户的交互
3. 溢出方式 Overflow Behavior -  定义用户如何与超出框架边界的元素进行交互
4. 原型设置 Prototype Settings -  定义演示的设备，背景颜色和起始页面



## 基本操作

### Frames

Frames are a foundational element for your designs that act as a top-level container for most things you create in Figma.

There are a few different ways to create frames in Figma.

* Custom sizes: `F` select the frame tool then click and darg your cursor to the desired size
* Preset sizes: create frames with preset sizes by selecting the preset in the Properties panel
* Existing elements: right-clicking and selecting `Frame Selection`

### Components

Components enable you to reuse existing parts of your design, saving time on otherwise repetitive and tedious work. Components create new instances rather than copies, allowing you to override properties derectly on the canvas.

There are two aspects to a Component
* the **Master Component**, which defines the properties of the Component
* the **Instance**, which is a copy of the Component, Instances are linked to the Matser Component, so any changes you make to the Master Component will be applied to the Instance.

#### Creating components

Select the layers you want to include in your Master Component and either use the Create Component button at the top or use the right-click menu to create a new component.

Since components function the same way as frames, you can add layout grids within your components and even apply constraints to elements that are relative to the grid.

#### Asset panel

The Asset panel will house all of your components. Just drag and drop them onto the canvas to create a new instance.

#### 命名

If you use a *slash-separated naming convention*, we will group those components together in the Instance menu. 

### Styles

Two of Figma's most powerful features are components and styles. They let you reuse UI objects and attributes so you can maintain designs systematically at scale.




### 图形编辑

正常情况下删除锚点会同时删除对应边，使用 `Shift-Del` 只删除锚点但保留边。


### 文字

一行文本可以包含多个颜色

使用苹方简体 PingFang SC，在文本属性里面可以找到 Traditional Forms 选项，打上勾就可以显示为繁体字。

文字支持 Letter Case 属性，可以快速转换大小写状态，调整英文句子很方便。

### IconFont

Figma 中做好的图标，导出 SVG 再上传到 iconfont.cn 经常会出现样式异常。这是因为 figma 的填充模式为 *even-odd*，iconfont 识别不了。一种可行的方法是将图标导出到 sketch 中将模式改为 *non-zero*，但这效率略低。又一个 [Fill Rule Editor](https://www.figma.com/community/plugin/771155994770327940/Fill-Rule-Editor) 专门用来解决这个问题。

Fill Rule Editor 的具体使用步骤为
1. 将组成图标的所有线条与形状执行命令「 Union Selection 」，单个线条和形状跳过此步骤
2. 对合并后的图形执行 「 Outline Stroke 」
3. 打开插件，选中图形，此时插件面板中会显示图形各部分的填充模式，蓝色代表 non-zero 红色代表 even-odd，在插件面板中单击填充或描边可更改图标外观，我们要的最终效果是一个蓝色版本的图标。





## 属性面板

### 排列与分布 Alignment & Distribution

【排列】

快捷键 `Alt` + `W` Top / `A` Left / `S` Bottom / `D` Right / `V` Vertical / `H` Horizontal

当选择对个对象时，直接点击按钮为组内排序，按住 `Shift` 则会把被选择的多个对象作为一个整体，相对于 parent 进行排列。注：`Shift` 无法与上述快捷键组合使用。

【分布】

* Tidy up vertical selection (one dimension)
* Tidy up horizontal selection (one dimension)
* Tidy up (two dimensions)

【Smart Selection】

https://help.figma.com/hc/en-us/articles/360040450233

调整元素位置 - 选中多个间距一致的元素后，就会在元素中间出现小圆圈，拖动即可

当高度或者间距太小时，都不会出现 Reorder 的 pink ring，此时可临时调大，调整完顺序后再调回去

用鼠标拖动调整间距时，可配合 `Shift` 按键来切换成 big nudge 模式（以 10px 为单位调整）

### 位置 Position & Dimension & Rotation

https://help.figma.com/hc/en-us/articles/360039956914-Adjust-alignment-rotation-and-position

旋转时按住 `Shift` 可以 15 步进旋转。

三维定位：Layer 具有3个维度 XYZ，Z axis 体现在左侧的 Layer panel 里的顺序，排前面的 z-index 越大。

#### Constrain proportions

拖动修改尺寸时，`Shift` 可保持比例，`Option` 可将原来的左上角基准修改为中心基点。

#### 方程式 Equations

Figma 中的数值是支持公式的，具体支持 `+` `-` `*` `/` `^` `()`，如 `Mixed + 100`。

### Constraints

Constraints allow you to fix elements of your design to different sides of their parent Frame. This lets you build fluid layouts to support multiple device sizes and breakpoints within the same group.

### Styles

Local style、Local components 这些都跟文件绑定。

allows you to define a set of properties like color, font, and effects of an object, that can reused across your team's designs.

Select the object or text you'd like to create a Style for and click the Style icon `⚃` in the properties panel...

### Auto Layout

https://help.figma.com/hc/en-us/articles/360040451373

### Layout

Select Frame -> `Layout Grid` -> Click Icon and choose Columns -> enter 12 -> add Margin






