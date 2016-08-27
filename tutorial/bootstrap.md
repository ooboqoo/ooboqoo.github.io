# Bootstrap V4

## 概述

### V4 变更项 Migration 

* 写法上最大的一个改变是，将原先的多层选择器压平了，所以好多子项上需要添加类
* 浏览器支持方面，IE8 将不再被支持
* 好多附加属性统一移到了 utilise 模块下

### 浏览器/设备支持 Browsers & devices

Sticky :hover/:focus on mobile  
移动端的 hover 都是模拟出来的，实际体验并不好，所以默认是关闭的。

Validators  
出于兼容和优化不同浏览器表现，bootstrap 采用了一些 hack，这些地方验证器会报错。

### JS插件 JavaScript

所有插件都依赖 jQuery，如果单独使用一些插件的话，可能插件之间还有依赖。

几乎所有的插件都通过 data 属性来开启和配置插件功能，注意，一个元素只能开启一种插件功能。

## 布局 Layout

### Grid system

#### Containers

* `.container` 其 `max-width` 会在不同断点发生变化
* `.container-fluid` 宽度始终是 100%

容器是最基本的布局元素，用于与 grid 系统配合使用。容器支持嵌套，但多数时候并不需要嵌套。

#### 如何使用

  * There are three major components—containers, rows, and columns.
  * Containers—`.container` for fixed width or `.container-fluid` for full width—center your site’s contents and help align your grid content.
  * Rows are horizontal groups of columns that ensure your columns are lined up properly.
  * Content should be placed within columns, and only columns may be immediate children of rows.
  * Column classes indicate the number of columns you’d like to use out of the possible 12 per row. So if you want three equal-width columns, you’d use `.col-sm-4`.
  * Column `width`s are set in percentages, so they’re always fluid and sized relative to their parent element.
  * Columns have horizontal `padding` to create the gutters between individual columns.
  * There are five grid tiers, one for each [responsive breakpoint](/layout/overview/#responsive-breakpoints): extra small, small, medium, large, and extra large.
  * Grid tiers are based on minimum widths, meaning they apply to that one tier and all those above it (e.g., `.col-sm-4` applies to small, medium, large, and extra large devices).
  * You can use predefined grid classes or Sass mixins for more semantic markup.

```html
<div class="container">
  <div class="row">
    <div class="col-sm-4">One of three columns</div>
    <div class="col-sm-4">One of three columns</div>
    <div class="col-sm-4">One of three columns</div>
  </div>
</div>
```

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th></th>
        <th class="text-xs-center">
          Extra small<br>
          <small>&lt;544px</small>
        </th>
        <th class="text-xs-center">
          Small<br>
          <small>≥544px</small>
        </th>
        <th class="text-xs-center">
          Medium<br>
          <small>≥768px</small>
        </th>
        <th class="text-xs-center">
          Large<br>
          <small>≥992px</small>
        </th>
        <th class="text-xs-center">
          Extra large<br>
          <small>≥1200px</small>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="text-nowrap" scope="row">Grid behavior</th>
        <td>Horizontal at all times</td>
        <td colspan="4">Collapsed to start, horizontal above breakpoints</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Container width</th>
        <td>None (auto)</td>
        <td>576px</td>
        <td>720px</td>
        <td>940px</td>
        <td>1140px</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Class prefix</th>
        <td><code>.col-xs-</code></td>
        <td><code>.col-sm-</code></td>
        <td><code>.col-md-</code></td>
        <td><code>.col-lg-</code></td>
        <td><code>.col-xl-</code></td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row"># of columns</th>
        <td colspan="5">12</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Gutter width</th>
        <td colspan="5">1.875rem / 30px (15px on each side of a column)</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Nestable</th>
        <td colspan="5">Yes</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Offsets</th>
        <td colspan="5">Yes</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Column ordering</th>
        <td colspan="5">Yes</td>
      </tr>
    </tbody>
  </table>
</div>

Class | Description
----- | -----------
.container | 根据不同屏幕宽度会有不同的 `max-width`
.container-fluid | 宽度始终是 100%
.row | 定义一个行，如果各列的数值加起来大于12，那么会换行，但与其他行还是会有分隔的
.col-[]-[] | 如 `col-sm-4`，定义不同宽度时列所占的比例
.offset-[]-[] | 偏移，如 `.offset-lg-0` `margin-left: percentage(($columns / $grid-columns)`
.push-[]-[] | 换序，如 `push-md-3` `left: percentage(($columns / $grid-columns)`
.pull-[]-[] | 换序，如 `pull-md-9` `right: percentage(($columns / $grid-columns)`

### Flexbox grid system

采用 CSS’s Flexible Box module，提供更高级的布局方式，默认未开启，因为 IE9 不支持。

### Media Object

Class | Description
----- | -----------
.media | 
.media-left | 
.media-object | 
.media-body | 
.media-heading | 

### Responsive utilities

* `.hidden-[]-down` 如 `.hidden-md-down` 表示 md 时隐藏，然后小于 md 的情形也隐藏
* `.hidden-[]-up` 如 `.hidden-md-up` 表示 md 时隐藏，然后大于 md 的情形也隐藏

<table class="table table-bordered table-striped responsive-utilities">
    <thead>
      <tr>
        <th></th>
        <th>
          Extra small devices
          <small>Portrait phones (&lt;544px)</small>
        </th>
        <th>
          Small devices
          <small>Landscape phones (≥544px - &lt;768px)</small>
        </th>
        <th>
          Medium devices
          <small>Tablets (≥768px - &lt;992px)</small>
        </th>
        <th>
          Large devices
          <small>Desktops (≥992px - &lt;1200px)</small>
        </th>
        <th>
          Extra large devices
          <small>Desktops (≥1200px)</small>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>.hidden-xs-down</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-sm-down</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-md-down</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-lg-down</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-visible">Visible</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-xl-down</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-xs-up</code></th>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-sm-up</code></th>
        <td class="is-visible">Visible</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-md-up</code></th>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-lg-up</code></th>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-hidden">Hidden</td>
        <td class="is-hidden">Hidden</td>
      </tr>
      <tr>
        <th scope="row"><code>.hidden-xl-up</code></th>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-visible">Visible</td>
        <td class="is-hidden">Hidden</td>
      </tr>
    </tbody>
</table>

## 内容 Content

### Reboot

Bootstrap 在 Normalize 基础上做了增强和调整，这部分只有元素选择器，不涉及任何类定义。

### Typography

排版方面的定义，如标题、文本、列表等的详细定义：

* 对各元素的基本定义在 `_reboot.scss`
* 增强的各种类定义在 `_type.scss`
* 对齐、变形、样式、颜色等额外功能在 `_text.scss`。

### Codes

定义文件在 `_code.scss`

* `<code>`  行内代码
* `<pre>` 代码块，可以添加一个可选类 `.pre-scrollable`
* `<var>` 变量
* `<kbd>` 输入
* `<samp>` 输出

### Images

对图形的修改都是通过添加类来实现的，在 V2 版本中曾试图修改 `<img>` 的默认行为为“不超出父元素”，但出现了问题。

* `.img-fluid {max-width: 100%; and height: auto;}`
* `.img-rounded`
* `.img-thumbnail`
* `.img-circle`

图片的布局没有专门的类，而是采用通用布局类来实现的。   
Align images with the helper float classes or text alignment classes. block-level images can be centered using the .m-x-auto margin utility class.

### Tables

因为表格使用过于普遍，所以我们没敢修改 `<table>` 标签的默认行为，所以任何时候都需要添加 `.table` 类来应用样式。

* `.table`
* `.table-inverse`
* `.table-striped`
* `.table-bordered`
* `.table-hover`
* `.table-sm` 将 padding 减半
* `.table-active / success / info / warning / danger`
* `.table-responsive` 在小于 768px 的屏幕上开启表格横向滚动
* `.table-reflow` 使横向的表头变成第一列，除非表格很规整，否则慎用
* `.thead-default`
* `.thead-inverse`

### Figures

如果要显示一块内容(如图片)且需要带标题，那么请使用 `<figure>` 标签。

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid img-rounded" alt="a figure.">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```

## 组件 Components

### 警告框 Alerts
警告框组件通过提供一些灵活的预定义消息，为常见的用户动作提供反馈消息。

* `.alert` 
* `.alert-success / info / warning / danger` 
* `.alert-link` { font-weight: 700; }
* `.alert-heading` { color: inherit; }

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

在一个带有层次的导航结构中标明当前页面的位置。各路径间的分隔符会自动添加。

* `.breadcrumb`
* `.breadcrumb-item`
* `.active` .breadcrumb-item.active { color: $breadcrumb-active-color; }

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
  <a class="breadcrumb-item" href="#">Data</a>
  <span class="breadcrumb-item active">Bootstrap</span>
</nav>
```

### 按钮 Buttons

* `.btn`
* `.btn-primary / secondary / success / info / warning / danger`
* `.btn-outline-primary / secondary / success / info / warning / danger`
* `.btn-link` 去掉底色和边框，只显示跟普通链接一样的样式
* `.btn-lg / sm` 
* `.btn-block` { display: block; width: 100%; }
* `.active / :active`
* `.disabled` 如果是 button 元素，则可以直接添加 disabled 属性，而其他元素则可以使用 .disabled 类

```html
<a class="btn btn-primary" href="#" role="button">Link</a>
<button class="btn btn-primary" type="submit">Button</button>
<input class="btn btn-primary" type="button" value="Input">
<input class="btn btn-primary" type="submit" value="Submit">
<input class="btn btn-primary" type="reset" value="Reset">
```

### 按钮组 Button group

* `.btn-group / .btn-group-vertical`
* `.btn-toolbar` 说是用来将多个 group 组织到一起的，感觉没什么用 { margin-left: -.5rem; }
* `.btn-group-lg / sm`

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
* `.card-img-overlay` 描述的不是图片，而是将图片作为底色时，上面的叠加层
* `.card-block` { padding: 1.25rem; }
* `.card-title` 
* `.card-subtitle` 
* `.card-text` 
* `.card-link` 
* `.card-header` 底色 + 分隔线
* `.card-header-tabs` 
* `.card-header-pills` 
* `.card-footer` 底色 + 分隔线
* 
* `.card-inverse`
* `.card-primary / success / info / warning / danger` 
* `.card-outline-primary / success / info / warning / danger` 无底色版本 
* `.card-group` 无间隔多列
* `.card-deck-wrapper` 
* `.card-deck` 甲板，有间隔的多列
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

* `.carousel` 
* `.carousel-inner` 
* `.carousel-item` 
* `.carousel-caption`

API:

* `.carousel(options)`
* `.carousel('cycle')`
* `.carousel('pause')`
* `.carousel(number)`
* `.carousel('prev')`
* `.carousel('next')`

> 注意1：轮播采用的是 CSS3 动画，虽然 IE9 不支持 transition，但 BS 团队并不打算引入 jQuery fallback。  
> 注意2：必须要有一个 `active` 类来进行初始化，否则无法正常工作

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

配置项：  
Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in `data-interval=""`.

### 折叠 Collapse

通过 `data-toggle` 指定折叠按钮，通过 `href` 或 `data-target` 指定控制目标。该组件主要就是 js 代码。

```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample">
      Link with href</a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample">
      Button with data-target</button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-block">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>

<!-- 折叠组，panel 类不存在，但删除会影响 JS，具体以后用到再研究 -->
<div id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading" id="headingOne">
      <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
        Collapsible Group Item #1</a></h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" id="headingTwo">
      <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" 
        class="collapsed">Collapsible Group Item #2</a></h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
    </div>
  </div>
</div>
```

### 下拉列表 Dropdowns

```html
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Dropdown Example</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>

<!-- 箭头分离式设计，可能会有更新，貌似有点问题 -->
<div class="btn-group">
  <button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">Button</button>
  <button class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>
  <div class="dropdown-menu">
    ...
  </div>
</div>
```

### 表单 Forms

* `.form-control` { width: 100%; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem; }
* `.form-group` { margin-bottom: 1rem; }
* `.radio`
* `.radio-inline`
* `.checkbox`
* `.checkbox-inline`
* `.has-success / warning / danger` 添加边框效果 `.has-success .form-control { border-color }`
* `.form-control-success  / warning / danger` 添加图标 `.has-success .form-control-success {background-image}`

```html
<form>
  <div class="form-group row">
    <label for="smFormGroupInput" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control form-control-sm" id="smFormGroupInput"
          placeholder="you@example.com">
    </div>
  </div>
  <div class="form-group has-success">
    <label class="col-form-label" for="inputSuccess1">Input with success</label>
    <input type="text" class="form-control form-control-success" id="inputSuccess1">
    <div class="form-control-feedback">Success! You've done it.</div>
    <small class="form-text text-muted">Example help text that remains unchanged.</small>
  </div>
</form>
```

### 输入框组 Input group

```html
<div class="input-group">
  <span class="input-group-addon" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>
```

### 巨屏 Jumbotron

* `jumbotron` 
* `jumbotron-fluid` 在 jumbotron 基础上去掉 padding 和 border-radius

### 列表 List group

### 模态窗口 Modal

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

* `.nav` 
* `.nav-inline` 
* `.nav-tabs` 
* `.nav-pills` 
* `.nav.nav-pills.nav-stacked` 
* `.nav-item` 
* `.nav-link` 
* `.nav-link.active` 
* `.nav-link.disabled` 

```html
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home">Home</a></li>
  <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile">Profile</a></li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item active" id="dropdown1-tab" href="#dropdown1" data-toggle="tab">@fat</a>
      <a class="dropdown-item active" id="dropdown2-tab" href="#dropdown2" data-toggle="tab">@mdo</a>
    </div>
  </li>
</ul>
<!-- Tab panes --> <!-- dropdown 部分有bug待更新 -->
<div class="tab-content">
  <div class="tab-pane active" id="home" role="tabpanel">1...</div>
  <div class="tab-pane" id="profile" role="tabpanel">2...</div>
  <div class="tab-pane" id="dropdown1" role="tabpanel">@fat...</div>
  <div class="tab-pane" id="dropdown2" role="tabpanel">@mdo...</div>
</div>
```

### 导航条 Navbar

* `.navbar`
* `.navbar-brand` 
* `.navbar-nav` 
* `.navbar-toggler` 
* `等` 

导航条在普通导航的基础上添加了其他元素，主要目的就是用来做顶部导航条的，不像普通导航用途更为广泛。

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

### Pagination


### Popovers

### Progress

### Scrollspy

### Tag

### Tooltips

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
* `.embed-responsive-16by9`
* `.embed-responsive-21by9`
* `.embed-responsive-4by3`
* `.embed-responsive-1by1`

#### 其他
* `.clearfix` 
* `.invisible` 
* `.pos-f-t` position elements at the top of the viewport and make them as wide as the viewport
* `.text-hide` 






