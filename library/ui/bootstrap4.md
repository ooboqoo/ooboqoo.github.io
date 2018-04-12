# Bootstrap V4

## 概述

### V4 变更项 Migration 

* 写法上最大的一个改变是，将原先的多层选择器压平了，子项上需要添加类，这增加了使用灵活性，但需要多写几个类名了。
* 浏览器支持方面，IE8 将不再被支持
* 好多附加属性统一移到了 utilise 模块下

### 浏览器/设备支持 Browsers & devices

移动端的 hover 都是模拟出来的，实际体验并不好，所以默认是关闭的。

出于兼容和优化不同浏览器表现，bootstrap 采用了一些 hack，这些地方验证器会报错。

### JS插件 JavaScript

所有插件都依赖 jQuery，如果单独使用一些插件的话，可能插件之间还有依赖。

几乎所有的插件都通过 data 属性来开启和配置插件功能，注意，一个元素只能开启一种插件功能。

## 布局 Layout

### Grid system

* 分3个主要的组件 — containers, rows, columns.
* 容器 — `.container` 其 `max-width` 会在不同断点发生变化，而 `.container-fluid` 宽度始终是 100%；容器支持嵌套
* Rows 用于组织行，.row { margin-left: -15px; margin-right: -15px; &::after{ .clearfix } }
* 内容应该放置于列中，但如果只有一列，那么可以直接置于 .row 下。
* Column classes 用于指示在不同尺寸屏幕下所占的宽度比例，比例是以百分比形式出现的，列间存在 gutter(padding)
* V4版将屏幕大小分成了5个等级：extra small, small, medium, large, and extra large。
* Grid tiers 是基于 min-width 的，所以小屏的定义包含了大屏的情形，如果大屏有定义则会覆盖小屏的定义。

```html
<div class="container">
  <div class="row">
    <div class="col-sm-4">One of three columns</div>
    <div class="col-sm-4">One of three columns</div>
    <div class="col-sm-4">One of three columns</div>
  </div>
</div>
```

<table>
  <thead>
    <tr>
      <th></th><th>Extra small<br><small>&lt;544px</small></th>
      <th>Small<br><small>≥544px</small></th>
      <th>Medium<br><small>≥768px</small></th>
      <th>Large<br><small>≥992px</small></th>
      <th>Extra large<br><small>≥1200px</small></th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Grid behavior</th><td>Horizontal at all times</td><td colspan="4">Collapsed to start, horizontal above breakpoints</td></tr>
    <tr>
      <th scope="row">Container width</th>
      <td>None (auto)</td>
      <td>576px</td>
      <td>720px</td>
      <td>940px</td>
      <td>1140px</td>
    </tr>
    <tr><th scope="row">Class prefix</th><td><code>.col-xs-</code></td><td><code>.col-sm-</code></td><td><code>.col-md-</code></td><td><code>.col-lg-</code></td><td><code>.col-xl-</code></td></tr>
    <tr><th scope="row"># of columns</th><td colspan="5">12</td></tr>
    <tr><th scope="row">Gutter width</th><td colspan="5">1.875rem / 30px (15px on each side of a column)</td></tr>
    <tr><th scope="row">Nestable</th><td colspan="5">Yes</td></tr>
    <tr><th scope="row">Offsets</th><td colspan="5">Yes</td></tr>
    <tr><th scope="row">Column ordering</th><td colspan="5">Yes</td></tr>
  </tbody>
</table>

Class | Description
----- | -----------
.container | 根据不同屏幕宽度会有不同的 `max-width`
.container-fluid | 宽度始终是 100%
.row | 定义一个行，如果各列的数值加起来大于12，那么会换行，但与其他行还是会有分隔的
.col-[]-[] | 如 `col-sm-4`，定义不同宽度时列所占的比例，注意列之间存在 gutter
.offset-[]-[] | 偏移，如 `.offset-lg-0` `margin-left: percentage(($columns / $grid-columns)`
.push-[]-[] | 换序，如 `push-md-3` `left: percentage(($columns / $grid-columns)`
.pull-[]-[] | 换序，如 `pull-md-9` `right: percentage(($columns / $grid-columns)`

### Flexbox grid system

采用 CSS’s Flexible Box module，提供更高级的布局方式，默认未开启，因为 IE9 不支持。

### Media Object

The media object is an abstract element used as the basis for building more complex and repetitive components (like blog comments, Tweets, etc). Included is support for left and right aligned content, content alignment options, nesting, and more.

The default media allow to float a media object (images, video, audio) to the left or right of a content block.

Class | Description
----- | -----------
.media | 
.media-left | 
.media-object | 
.media-heading | 
.media-body | 

### Responsive utilities

* `.hidden-[]-down` 如 `.hidden-md-down` 表示 md 时隐藏，然后小于 md 的情形也隐藏
* `.hidden-[]-up` 如 `.hidden-md-up` 表示 md 时隐藏，然后大于 md 的情形也隐藏

## 内容 Content

### Reboot

Bootstrap 在 Normalize 基础上做了增强和调整就成了 Reboot，这部分只有元素选择器，不涉及任何类定义。

### Typography

排版方面的定义，如标题、文本、列表等的详细定义：

* 对各元素的基本定义在 `_reboot.scss`
* 增强的各种类定义在 `_type.scss`
* 对齐、变形、样式、颜色等额外功能在 `_text.scss`。

### Codes

定义文件在 `_code.scss`

* `<code>`  行内代码
* `<pre>` 代码块，可以添加一个可选类 `.pre-scrollable { max-height: 340px; overflow-y: scroll;}`
* `<var>` 变量
* `<kbd>` 输入
* `<samp>` 输出 sample output from a computer program

### Images

对图形的修改都是通过添加类来实现的，在 V2 版本中曾试图修改 `<img>` 的默认行为为“不超出父元素”，但出现了问题。

* `.img-fluid {max-width: 100%; and height: auto;}`
* `.img-rounded`
* `.img-thumbnail` {padding; background-color; border; border-radius; display: inline-block; max-width: 100%;}
* `.img-circle`

图片的布局没有专门的类，而是采用通用布局类来实现的。   
Align images with the helper float classes or text alignment classes. block-level images can be centered using the `.m-x-auto` margin utility class.

### Tables

因为表格使用过于普遍，所以我们没敢修改 `<table>` 标签的默认行为，因此任何时候都需要添加 `.table` 类来应用样式。

* `.table` { width: 100%; background-color；th,td { padding } ... }
* `.table-inverse` 黑底白字
* `.table-striped` 斑马纹
* `.table-bordered` 显示边框
* `.table-hover` 鼠标滑过时加底色
* `.table-sm` 将 padding 减半
* `.table-active / success / info / warning / danger`
* `.table-responsive` 在小于 768px 的屏幕上开启表格横向滚动
* `.table-reflow` 使行与列对调，除非表格很规整，否则慎用
* `.thead-default` 灰底黑字表头，不加的话没有底色，这个类名取得不怎么好，带有欺骗性
* `.thead-inverse` 黑底白字表头 .thead-inverse th {color: #fff; background-color: #373a3c;}

### Figures

如果要显示一块内容(如图片)且需要带标题，那么请使用 `<figure>` 标签。

The `<figure>` tag specifies self-contained content, like illustrations, diagrams, photos, code listings, etc.  
While the content of the `<figure>` element is related to the main flow, its position is independent of the main flow, and if removed it should not affect the flow of the document.

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid img-rounded" alt="a figure.">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```

## 组件 Components

### 警告框 Alerts
警告框组件通过提供一些灵活的预定义消息，为常见的用户动作提供反馈消息。

* `.alert` { padding: 15px; margin-bottom: 1rem; border: 1px solid transparent; border-radius: .25rem;}
* `.alert-success / info / warning / danger` 
* `.alert-link` { font-weight: 700; }
* `.alert-heading` { color: inherit; }
* `.alert-dismissible { padding-right: 35px; }` 调整关闭标签位置
* `.fade { opacity: 0; transition: opacity .15s linear; }`
* `.fade.in { opacity: 1; }` 使用 fade 主要是增加关闭效果，不用不影响动作

```html
<!-- 无插件，纯样式效果 -->
<div class="alert alert-success">
  <h4 class="alert-heading">Well done!</h4>
  <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
</div>

<!-- 使用插件，带关闭按钮 -->
<div class="alert alert-warning alert-dismissible fade in">
  <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
</div>
```

### 路径导航 Breadcrumb

在一个带有层次的导航结构中标明当前页面的位置。各路径间的分隔符会通过 `::before` 自动添加。

* `.breadcrumb` { padding; margin-bottom: 1rem; list-style: none; background-color; border-radius }
* `.breadcrumb-item` { float: left; } .breadcrumb-item + .breadcrumb-item::before { content: "/"; }
* `.active` .breadcrumb-item.active { color: #818a91; }

```html
<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="#">Home</a></li>
  <li class="breadcrumb-item"><a href="#">Library</a></li>
  <li class="breadcrumb-item active">Data</li>
</ol>

<!-- 不用列表也正常工作 -->
<nav class="breadcrumb">
  <a class="breadcrumb-item" href="#">Home</a>
  <a class="breadcrumb-item" href="#">Library</a>
  <span class="breadcrumb-item active">Data</span>
</nav>
```

### 按钮 Buttons

* `.btn` { display: inline-block; ...; vertical-align: middle; cursor: pointer; border; padding; }
* `.btn-primary / secondary / success / info / warning / danger`
* `.btn-outline-primary / secondary / success / info / warning / danger`
* `.btn-link` 去掉底色和边框，只显示跟普通链接一样的样式
* `.btn-lg / sm` .btn-group-lg>.btn, .btn-lg { padding; border-radius; font-size: 1.25rem; } / 0.875rem
* `.btn-block` { display: block; width: 100%; } 100%宽，适合小屏
* `.active / :active` 没什么特别的效果，重在语义吧
* `.disabled` 如果是 button 元素，则可以直接添加 disabled 属性，而其他元素则可以使用 .disabled 类。<br> .btn.disabled, .btn:disabled { cursor: not-allowed; opacity: .65; }

```html
<a class="btn btn-primary" href="#" role="button">Link</a>
<button class="btn btn-primary" type="submit">Button</button>
<input class="btn btn-primary" type="button" value="Input">
<input class="btn btn-primary" type="submit" value="Submit">
```

### 按钮组 Button group

* `.btn-group / .btn-group-vertical` 使按钮紧密地叠在一起，然后再在两侧加圆角，做成一个按钮组
* `.btn-toolbar` 用来将多个 group 组织到一起的，没添加啥特别的效果（往左靠了靠，组间加了点间距），重在结构组织吧
* `.btn-group-lg / sm` 加大 / 缩小 标签组

```html
<div class="btn-toolbar">
  <div class="btn-group">
    <button type="button" class="btn btn-secondary">1</button>
    <button type="button" class="btn btn-secondary">2</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-secondary">3</button>
  </div>
</div>
```

### 卡片 Cards

V4 版新引入的组件，用于替换原先的 panels, wells, and thumbnails.

* `.card` 相对定位 + 带圆角的边框
* `.card-img` 带4个圆角
* `.card-img-top` 左上、右上带圆角
* `.card-img-bottom` 左下、右下带圆角
* `.card-img-overlay` 描述的不是图片，而是将图片作为底色时，上面的叠加层 <br>.card-img-overlay { position: absolute; top: 0; right: 0; bottom: 0; left: 0; padding: 1.25rem; }
* `.card-block` { padding: 1.25rem; &::after {.clearfix} } card 内的区块，用于组织内容
* `.card-title`  { margin-bottom: .75rem; } 给标题加下边距
* `.card-subtitle` { margin-top: -.375rem; margin-bottom: 0; } 副标题
* `.card-text` .card-text:last-child { margin-bottom: 0; }
* `.card-link` .card-link+.card-link { margin-left: 1.25rem; } :hover { text-decoration:none; }
* `.card-header` 底色 + 分隔线
* `.card-header-tabs` 为应用 nav-tabs 把边距去掉了
* `.card-header-pills` 为应用 nav-pills 去掉了相应的边距
* `.card-footer` 底色 + 分隔线
* 
* `.card-inverse` 反色
* `.card-primary / success / info / warning / danger` 
* `.card-outline-primary / success / info / warning / danger` 无底色版本 
* `.card-group` 无间隔多列，但 .card 有边框用于分隔
* `.card-deck-wrapper` { margin-right; margin-left: -1.25rem; } 套在 .card-deck 外层，flex 布局中不需要这个类
* `.card-deck` 甲板，有间隔、变宽的多列 { display: table; width: 100%; border-spacing: 1.25rem 0; ... }
* `.card-columns` 采用分栏技术的多列 { column-count: 3; ... }
* `.card-blockquote`

```html
<div class="card card-inverse">
  <img class="card-img" src="..." alt="Card image">
  <div class="card-img-overlay">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>

<div class="card-deck-wrapper">
  <div class="card-deck">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
  </div>
</div>

<div class="card text-xs-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs pull-xs-left">
      <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
      <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
    </ul>
  </div>
  <div class="card-block">
    <h4 class="card-title">Special title treatment</h4>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 图片轮播 Carousel

* `.carousel` 不带滑动效果的轮播
* `.carousel.slide` 带左右滑动效果的轮播
* `.carousel-inner` 组件 - 内容
* `.carousel-item` 组件 - 内容 - 单个 slide
* `.carousel-caption` 组件 - 内容 - 单个 slide - 说明
* `.carousel-indicators` 组件 - 位置指示器
* `.carousel-control.left / .right` 组件 - 控制按钮，加了浅灰过渡效果，难看
* `.icon-prev / .icon-next` 组件 - 控制按钮 - 箭头
* `.active` 需要给 indicator 和 item 分别添加该类来初始化轮播

API:

* `.carousel(options)`
* `.carousel('cycle')`
* `.carousel('pause')`
* `.carousel(number)`
* `.carousel('prev')`
* `.carousel('next')`

配置项：可以通过 data 属性或 JS代码 来配置轮播，如 `data-interval="8000"`

> 注意1：轮播采用的是 CSS3 动画，虽然 IE9 不支持 transition，但 BS 团队并不打算引入 jQuery fallback。  
> 注意2：必须要有一个 `.carousel-item.active` 来进行初始化，否则轮播不显示

```html
<div id="carousel-example" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel-example" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example" data-slide-to="1"></li>
    <li data-target="#carousel-example" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active"><img src="900x500.svg" alt="First slide">
      <div class="carousel-caption"><h3>...</h3><p>...</p></div>
    </div>
    <div class="carousel-item"><img src="900x500.svg" alt="Second slide"></div>
    <div class="carousel-item"><img src="900x500.svg" alt="Third slide"></div>
  </div>
  <a class="left carousel-control" href="#carousel-example" data-slide="prev">
      <span class="icon-prev"></span></a>
  <a class="right carousel-control" href="#carousel-example" data-slide="next">
      <span class="icon-next"></span></a>
</div>
```

### 折叠 Collapse

通过 `data-toggle` 指定折叠按钮，通过 `href` 或 `data-target` 指定控制目标。该组件主要就是 js 代码。

```html
<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample">Link with href</a>
<button data-toggle="collapse" data-target="#collapseExample">Button with data-target</button>
<div class="collapse" id="collapseExample">
  <div class="card card-block">Paragraph1<p>Paragraph2</p></div>
</div>

<!-- 折叠组 / 手风琴效果，每次只显示一项，目前该项还依赖 v3 panel，待更新 -->
<div id="accordion">
  <h4><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
      Collapsible Group Item #1</a></h4>
  <div id="collapseOne" class="collapse in">
      Anim pariatur cliche reprehenderit, enim eiusmod high life.</div>
  <h4><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" class="collapsed">
      Collapsible Group Item #2</a></h4>
  <div id="collapseTwo" class="collapse">
      Anim accusamus terry richardson ad squid.</div>
</div>
```

### 下拉列表 Dropdowns

* `.dropdown` .dropdown, .dropup { position: relative; }
* `.dropdown-toggle` 添加向下箭头
* `.dropdown-toggle-split` 采用箭头分离式下拉列表时，减小 padding 使其看起来更紧凑
* `.dropdown-menu` { position: absolute; top: 100%; left: 0; z-index: 1000; display: none;
    float: left; min-width: 160px; text-align: left; list-style: none; background-color: #fff; ... }
* `.dropdown-item` { display: block; width: 100%; clear: both; white-space: nowrap; ... }
* `.dropdown-divider` 添加分隔条

```html
<div class="dropdown">
  <button data-toggle="dropdown">Dropdown Example</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>

<!-- 箭头分离式设计 -->
<div class="btn-group">  // .btn-group 带了 position: relative 所以可以不用 .dropdown
  <button class="btn">Button</button>
  <button class="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>
  <div class="dropdown-menu">
    ...
  </div>
</div>
```

### 表单 Forms

* `.form-inline` 表单类 - 单行布局 .form-inline .form-group { display: inline-block; }
* `.form-group` 表单组类 { margin-bottom: 1rem; } 可配合 `<fieldset>` `<div>` 使用
* `.form-control` 表单控件类 { width: 100%; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem; }
* `.form-control-lg / sm`
* `.form-control-static` 静态表单控件，即以文本替换表单控件 `<p class="form-control-static">some text</p>`
* `.input-group` 输入框组
* `.input-group-addon` 作为输入项的附件，放置于前后可分别用于提示或单位显示，具体实现比较复杂
* // 布局类，与 grid 配合使用
* `.col-form-label` 微调标签上下间距 { padding-top: .5rem; padding-bottom: .5rem; }
* `.col-form-label-lg / sm`
* `.col-form-legend` 左右分布时，将 `<legend>` 的字体调小成普通 label 的样式
* // 单选/复选类
* `.form-check` div.form-check 用于组织 单选/多选框 + label，提供整体的显示样式
* `.form-check-label` 与 div.form-check 配合使用
* `.form-check-input` 与 div.form-check 配合使用
* `.form-check-inline` 选项框横向排列，需要去掉 div.form-check 并用其替换 `.form-check-label`
* // 表单验证类
* `.has-success / warning / danger` 添加边框效果 `.has-success .form-control { border-color }`
* `.form-control-success  / warning / danger` 添加图标 `.has-success .form-control-success {background-image}`
* `.form-control-feedback` 根据验证样式修改文字颜色 .has-[] .form-control-feedback { color }

注意：所有单选和复选框必须用 label 包裹，这样不仅增大了可点击区域，还使得可以不用借助 js 就能实现一些样式调整。  
Bootstrap 还提供了更进一步的定制类型，本笔记暂未收录。


```html
<form>
  <!-- 验证样式示例 -->
  <div class="form-group has-success">
    <label class="col-form-label" for="inputSuccess1">Input with success</label>
    <input type="text" class="form-control form-control-success" id="inputSuccess1">
    <div class="form-control-feedback">Success! You've done it.</div>
    <small class="form-text text-muted">Example help text that remains unchanged.</small>
  </div>
  <!-- 用 grid 布局 -->
  <div class="form-group row">
    <label for="smFormGroupInput" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control form-control-sm" id="smFormGroupInput"
          placeholder="you@example.com">
    </div>
  </div>
  <!-- .form-check 演示 -->
  <fieldset class="form-group row">
    <legend class="col-form-legend col-sm-2">Radios</legend>
    <div class="col-sm-10">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
              value="option1" checked> Option one</label>
      </div>
  </fieldset>
  <!-- .form-check-inline 演示 -->
  <fieldset class="form-group row">
    <legend class="col-form-legend col-sm-2">Checkbox</legend>
    <div class="col-sm-10">
      <label class="form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"> 1
      </label>
      <label class="form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"> 2
      </label>
      <label class="form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"> 3
      </label>
    </div>
  </fieldset>
</form>

<!-- 单行表单 + 输入组 -->
<form class="form-inline">
  <div class="form-group">
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
      <div class="input-group-addon">.00</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Transfer cash</button>
</form>
```

### 巨屏 Jumbotron

* `jumbotron` { padding: 2rem 1rem; margin-bottom: 2rem; background-color: #eceeef; border-radius: .3rem; }
* `jumbotron-fluid` 在 jumbotron 基础上 { padding-right: 0; padding-left: 0; border-radius: 0; }

### 列表 List group

* `.list-group` 列表
* `.list-group-item` 列表项
* `.list-group-item.disabled` 将列表项转换成不可点击状态
* `.list-group-item-action` 将列表项转换成可点击的效果
* `.list-group-item-heading` 列表项内容 - 标题
* `.list-group-item-text` 列表项内容 - 文本

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">
    <h5 class="list-group-item-heading">List group item heading</h5>
    <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. </p>
  </a>
  <button type="button" class="list-group-item list-group-item-action disabled">Vestibulum at eros</button>
</div>
```

### 模态弹窗 Modal

* `.modal` { position: fixed; top right bottom left: 0; z-index: 1050; display: none; overflow: hidden; outline: 0; }
* `.fade / .fade.in` 控制隐藏和显示过渡效果，如果不用也能正常工作
* `.modal-dialog` 弹窗 { max-width: [px]; margin: [px] auto; position: relative; }
* `.modal-dialog.modal-lg / sm` 
* `.modal-content` 弹窗 - 内容
* `.modal-header` 弹窗 - 内容 - 标题栏，常包含一个标题和一个关闭按钮
* `.modal-title` 弹窗 - 内容 - 标题栏 - 标题
* `.modal-body` 弹窗 - 内容 - 主题内容区
* `.modal-body > container-fluid` 弹窗 - 内容 - 主题内容区 - 建立一个容器以利用 grid 布局
* `.modal-footer` 弹窗 - 内容 - 尾栏，常包含一些按钮

默认只支持单个弹窗显示，如果需要多弹窗支持，需要自己编写代码；  
请将弹窗代码置于顶层，如果放到其他元素里面，可能会影响其外观和行为；  
更多的应用细节可能需要 js 代码配合，本笔记暂未涉及。

Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

```html
<!-- Button trigger modal -->
<button class="btn" data-toggle="modal" data-target="#myModal">Launch demo modal</button>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">content here.</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

### 导航 Navs

* `.nav` 导航 { list-style: none; padding-left: 0; margin-bottom: 0;}
* `.nav-inline` 导航 - 横向排列，统一 li+li 与 a+a 的风格：   
    .nav-item + .nav-item {display: inline-block;} / .nav-link + .nav-link {margin-left: 1rem;}
* `.nav-tabs` 应用 tab 样式
* `.nav-pills` 应用 pill 样式
* `.nav.nav-pills.nav-stacked` tab 和 pill 样式都是横向显示的，如果想变回竖向排列，加 .nav-stacked
* `.nav-item` 导航分项
* `.nav-link` { display: inline-block; }
* `.nav-link.active` 
* `.nav-link.disabled` 

```html
<!-- 形式1 - 列表 -->
<ul class="nav nav-inline">
  <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
</ul>
<!-- 形式2 - 链接 -->
<nav class="nav nav-inline">
  <a class="nav-link active" href="#">Active</a>
  <a class="nav-link" href="#">Link</a>
  <a class="nav-link disabled" href="#">Disabled</a>
</nav>

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home">Home</a></li>
  <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile">Profile</a></li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" id="dropdown1-tab" href="#dropdown1" data-toggle="tab">@fat</a>
      <a class="dropdown-item" id="dropdown2-tab" href="#dropdown2" data-toggle="tab">@mdo</a>
    </div>
  </li>
</ul>
<!-- Tab panes --> <!-- dropdown 部分 js 代码有 bug 待更新 -->
<div class="tab-content">
  <div class="tab-pane active" id="home" role="tabpanel">1...</div>
  <div class="tab-pane" id="profile" role="tabpanel">2...</div>
  <div class="tab-pane" id="dropdown1" role="tabpanel">@fat...</div>
  <div class="tab-pane" id="dropdown2" role="tabpanel">@mdo...</div>
</div>
```

### 导航条 Navbar

导航条在普通导航的基础上添加了其他元素，主要目的就是用来做顶部导航条的。

* `.navbar` 需要同时再指定一个颜色主题 .navbar { position: relative; padding: .5rem 1rem; border-radius }
* `.navbar-dark / light` 颜色主题
* `.navbar-full` 去掉圆角
* `.navbar-fixed-top / bottom` 固定到顶部 / 底部   
  { position: fixed; right: 0; left: 0; z-index: 1030; border-radius: 0; } + top / bottom: 0;
* `.navbar-brand` 内容 - 标记
* `.navbar-nav` 内容 - 导航，使用列表时需要 .nav 配合来去边距和列表符 `<ul class="nav navbar-nav">`
* `.navbar-toggler` 内容 - 折叠/展开按钮
* `.navbar-divider` 内容 - 分隔符

```html
<nav class="navbar navbar-light bg-faded">
  <button class="navbar-toggler" data-toggle="collapse" data-target="#exCollapsingNavbar">&#9776;</button>
  <form class="form-inline pull-xs-right">
    <input class="form-control" type="text" placeholder="Search">
    <button class="btn btn-outline-info" type="submit">Search</button>
  </form>
  <div class="collapse" id="exCollapsingNavbar">
    <div class="bg-inverse p-a-1">
      <h4>Collapsed content</h4>
      <span class="text-muted">Toggleable via the navbar brand.</span>
    </div>
  </div>
</nav>
```

### 分页 Pagination

跟 btn-group 或 navbar 有几分相似，就是一排紧凑的按钮 + 四周圆角。

* `.pagination` 
* `.pagination-lg / sm`
* `.page-item`
* `.page-link`
* `.disabled`
* `.active`

```html
<nav>
  <ul class="pagination pagination-sm">
    <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
  </ul>
</nav>
```

### 弹框 Popovers

该组件是 Tooltips 的放大版，依赖 Tooltips 插件，也需要手动初始化

```html
<button class="btn btn-danger" data-toggle="popover" data-placement="bottom" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
<!-- 上面的弹框需要再次点击按钮才关闭，而下方的弹窗，只要在其他地方点击一下就会自动关闭 -->
<a tabindex="0" class="btn btn-danger" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">Dismissible popover</a>

<script>$('[data-toggle="popover"]').popover()</script>
```

### 进度条 Progress

IE9 不支持 `<progress>` 标签，但可以使用 `<div class="progress">` 实现。

* `.progress` 
* `.progress-bar` 
* `.progress-striped` 
* `.progress-animated` 
* `.progress-success / info / warning / danger` 

```html
<progress class="progress progress-striped progress-animated" value="25" max="100"></progress>
```

### 滚动侦测 Scrollspy

* 高亮需要 nav 元素配合。
* 不管是监测什么元素，都需要被监测对象具有 position:relative 属性，一般多为监测 body 元素，如果不是，那么被监测对象还需要设置 height 和 overflow-y:scroll。

```html
<nav id="navbar-example" class="navbar navbar-default">
  <h3 class="navbar-brand">Project Name</h3>
  <ul class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link" href="#fat">@fat</a></li>
    <li class="nav-item"><a class="nav-link" href="#mdo">@mdo</a></li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#one">one</a>
        <a class="dropdown-item" href="#two">two</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#three">three</a>
      </div>
    </li>
  </ul>
</nav>
<div data-spy="scroll" data-target="#navbar-example" data-offset="0"
    style="position: relative; height: 120px; overflow-y: scroll;">
  <h4 id="fat">@fat</h4><p>1<br>2<br>3<br>4<br>5</p>
  <h4 id="mdo">@mdo</h4><p>1<br>2<br>3<br>4<br>5</p>
  <h4 id="one">one</h4><p>1<br>2<br>3<br>4<br>5</p>
  <h4 id="two">two</h4><p>1<br>2<br>3<br>4<br>5</p>
  <h4 id="three">three</h4><p>1<br>2<br>3<br>4<br>5</p>
</div>
```

### 标记 Tag

* `.tag`
* `.tag-pill` { border-radius }
* `.tag-default / primary / success / info / warning / danger` 

### 提示 Tooltips

提示插件需要 Tether 支持，须在 bootstrap.js 之前先引入，另外，出于性能考虑，如需使用还需要手动初始化。  
感觉其实没鸟用，还这么麻烦，直接 title 不是也一样提示吗。

```html
<p>Some text <a href="#" data-toggle="tooltip" data-placement="bottom" title="title" data-original-title="original">tips1</a> text <a href="#" data-toggle="tooltip" title="" data-original-title="Another tooltip">tips2</a> end.</p>

<script src="jquery.min.js"></script>
<script src="tether.min.js"></script>
<script src="bootstrap.min.js"></script>
<script>$('[data-toggle="tooltip"]').tooltip();</script>
```

### 工具类 Utility classes

Bootstrap includes dozens of utilities—classes with a single purpose. They’re designed to reduce the frequency of highly repetitive declarations in your CSS while allowing for quick and easy development.

#### Spacing

The classes are named using the format: `{property}-{sides}-{size}`

Where *property* is one of:

* `m` - for classes that set `margin`
* `p` - for classes that set `padding`

Where *sides* is one of:

* `t` - for classes that set `margin-top` or `padding-top`
* `b` - for classes that set `margin-bottom` or `padding-bottom`
* `l` - for classes that set `margin-left` or `padding-left`
* `r` - for classes that set `margin-right` or `padding-right`
* `x` - for classes that set both `*-left` and `*-right`
* `y` - for classes that set both `*-top` and `*-bottom`
* `a` - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *size* is one of:

* `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
* `1` - (by default) for classes that set the `margin` or `padding` to `$spacer-x` or `$spacer-y`
* `2` - (by default) for classes that set the `margin` or `padding` to `$spacer-x * 1.5` or `$spacer-y * 1.5`
* `3` - (by default) for classes that set the `margin` or `padding` to `$spacer-x * 3` or `$spacer-y * 3`

(You can add more sizes by adding entries to the `$spacers` Sass map variable.)

`.m-x-auto` 用于水平居中。{ margin-right: auto!important; margin-left: auto!important; }

```scss
.m-t-0 { margin-top: 0 !important; }
.m-l-1 { margin-left: $spacer-x !important; }
.p-x-2 { padding-left: ($spacer-x * 1.5) !important; padding-right: ($spacer-x * 1.5) !important; }
.p-a-3 { padding: ($spacer-y * 3) ($spacer-x * 3) !important; }
```

#### Text alignment

* `.text-justify` 
* `.text-nowrap` 
* `.text-[xs / sm / md / lg / xl]-[left / center / right]` 

#### Text transform

* `.text-lowercase` 
* `.text-uppercase` 
* `.text-capitalize`

#### Font weight and italics

* `.font-weight-bold` 
* `.font-weight-normal` 
* `.font-italic` 

#### Contextual colors and backgrounds

* `.text-muted / primary / success / info / warning / danger`
* `.bg-inverse / primary / success / info / warning / danger`

#### Widths

* `.w-100` { width: 100% }

#### CSS display

* `.d-block`
* `.d-inline`
* `.d-inline-block`

#### Responsive floats

* `.pull-[xs/sm/md/lg/xl]-[left/right/none]` 

#### Responsive embeds

* `.embed-responsive`
* `.embed-responsive-16by9` 利用了 margin padding 的参照是以宽度为基准这一点来设计布局
* `.embed-responsive-21by9`
* `.embed-responsive-4by3` { padding-bottom: percentage(3 / 4); }
* `.embed-responsive-1by1`
* `.embed-responsive-item`

```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
```

#### 其他
* `.clearfix` 
* `.invisible` 
* `.pos-f-t` position elements at the top of the viewport and make them as wide as the viewport
* `.text-hide` 
