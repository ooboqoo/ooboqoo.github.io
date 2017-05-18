# 前端框架演进

http://jixianqianduan.com/frontend-javascript/2016/06/25/mnv-tech-time.html  
http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html

MVC MVP MVVM 都是流行的架构模式，这里就前端领域分析下各种框架类型演进和区别。

这些架构模式带来的好处：解耦、使代码易测试和维护；实现代码复用；实现并行开发。

## 直接 DOM 交互

HTML 是承载互联网内容数据的主要载体，而对于开发者来说，所有数据内容都可以说是通过 DOM 结构来组织的。数据的处理和操作的核心其实就是 DOM 的处理和操作。

随着网站应用的复杂化，使用原生 API 开发就显得低效且不易管理，于是 jQuery zepto 等 DOM 交互框架就出现了。

通过 DOM 交互框架可以比较高效地处理 DOM 操作和事件绑定等问题，这种高效的方式带来了效率上的提升，但随着页面结构和交互复杂性的提升，仅靠这种方式会增加维护管理的难度。


## MVC

前端 MVC 将页面上与 DOM 相关的内容抽象成 模型、视图、控制器，并对他们进行统一管理。
  * Model - 用于控制程序行为，负责管理数据和逻辑  [注1]
  * View - 负责页面 DOM 的更新 (Controller 只负责指令的分发，数据渲染由 View 层完成)
  * Controller - 接收用户输入并转换为对 Model 或 View 的指令，如根据前端路由条件从 Model 调用特定数据给某个 View 渲染

MVC 跟其他两者的区别是，Controller 层只负责指令的分发，比较轻；Model 层需负责业务逻辑；View 层直接调用 Model 渲染

注1：业务逻辑也可能放在 Controller 或 View 处理，MVC 的各种实现还是有很大差异的。

### 实例：Backbone

![MVC](./images/mvc.png "MVC")

实际项目往往采用更灵活的方式，以 Backbone.js 为例。

1. 用户可以向 View 发送指令(DOM 事件)，再由 View 直接要求 Model 改变状态。
2. 用户也可以直接向 Controller 发送指令(改变 URL 触发 hashChange 事件)，再由 Controller 发送给 View。
3. Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。


## MVP

![MVP](./images/mvp2.jpg "MVP")

P 代表 Presenter，与 Controller 有点相似，不同的是，用户在 View 上触发行为，View 通知 Presenter 来完成后面的 Model 修改和其他 View 的更新。Presenter 和 View 的操作绑定通常是双向的，View 的改变一般会触发 Presenter 动作，Presenter 的动作也会改变 View。

MVP 跟其他两者比较，View 层是最轻的，它不需要知道 Model 层的信息，而 Presenter 层是最重的。

## MVVM

![MVVM](./images/mvvm2.jpg "MVVM")

- Model 负责数据(包含远程数据抓取，有效性验证)
- View 负责具体渲染(数据显示格式调整等) [注1, 注2]
- ViewModel 负责业务逻辑，状态信息也保存在这一层

注1：MVP 中的 View 是消极的，是被调用者，而 MVVM 中的 View 则是主动的，包含了数据和事件绑定。  
注2：View 和 ViewModel 是同步的，View 接收属性并显示 + 发送用户命令到 ViewModel，两者通过指令实现绑定来建立联系。

MVVM 可认为是一个自动化的 MVP 框架，并使用了 ViewModel 代替 Presenter，即数据 Model 的调用和模板内容的渲染不需要我们主动操作，而是 ViewModel 自动来触发完成，任何用户的操作也都是通过 ViewModel 的改变来驱动的。用户进行操作时，ViewModel 会捕获数据变化，直接将变化反映到 View 层。

ViewModel 的数据操作最终在页面上以 Directive 的形式体现，通过对 Directive 的识别来渲染数据或绑定事件，管理起来更清晰。

MVVM 设计的一个很大的好处是将 MVP 中 Presenter 的工作拆分成多个小的指令步骤，然后绑定到相对应的元素中，根据相对应的数据变化来驱动触发，自动管理交互操作。同时也免去了查看 Presenter 中事件列表的工作，而且一般 ViewModel 初始化时会自动进行数据绑定，并将页面中所有的同类操作复用，大大节省了我们自己进行内容渲染和事件绑定的代码量。

### 相关内容

* Directive 翻译为指令，即 HTML 元素标签上的一些特殊属性，是自定义的执行函数
* Filter 叫过滤器或管道，`q-html="time | formatTime"`
* 表达式设计，类似普通的页面模板表达式
* ViewModel 设计
* 数据变更检测

### 数据变更检测


### 其他资料

```
<button data-bind="click: someJavaScriptFunction">Something</button> <!-- MVVM -->
<button onclick="someJavaScriptFunction();">Something</button>       <!-- Vanilla -->
```

In the second example, you are referring to a function that has to be in the global scope.  
In the first example, you are referring to a property of the current view model.

Yes, it's a subtle distinction, but it is an important one. 

## Virtual DOM


## MNV*


## MVC 设计模式补充

MVC 模式（Model-View-Controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

MVC 模式的目的是实现一种动态的程序设计，使后续对程序的修改和扩展简化，并且使程序某一部分的重复利用成为可能。除此之外，此模式通过对复杂度的简化，使程序结构更加直观。软件系统通过对自身基本部分分离的同时也赋予了各个基本部分应有的功能。专业人员可以通过自身的专长分组：

* 控制器 Controller - 负责转发请求，对请求进行处理。
* 视图 View - 界面设计人员进行图形界面设计。
* 模型 Model - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。

视图：在视图中其实没有真正的处理发生，不管这些数据是联机存储的还是一个雇员列表，作为视图来讲，它只是作为一种输出数据并允许用户操纵的方式。

模型：模型表示企业数据和业务规则。在 MVC 的三个部件中，模型拥有最多的处理任务。例如它可能用象 EJBs 和 ColdFusionComponents 这样的构件对象来处理数据库。被模型返回的数据是中立的，就是说模型与数据格式无关，这样一个模型能为多个视图提供数据。由于应用于模型的代码只需写一次就可以被多个视图重用，所以减少了代码的重复性。

控制器：控制器接受用户的输入并调用模型和视图去完成用户的需求。所以当单击 Web 页面中的超链接和发送 HTML 表单时，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。


### MVC的优点

#### 1.低耦合性

视图层和业务层分离，这样就允许更改视图层代码而不用重新编译模型和控制器代码，同样，一个应用的业务流程或者业务规则的改变只需要改动 MVC 的模型层即可。因为模型与控制器和视图相分离，所以很容易改变应用程序的数据层和业务规则。

#### 2.高重用性和可适用性

随着技术的不断进步，现在需要用越来越多的方式来访问应用程序。MVC 模式允许你使用各种不同样式的视图来访问同一个服务器端的代码。它包括任何 WEB（HTTP）浏览器或者无线浏览器（wap），比如，用户可以通过电脑也可通过手机来订购某样产品，虽然订购的方式不一样，但处理订购产品的方式是一样的。由于模型返回的数据没有进行格式化，所以同样的构件能被不同的界面使用。例如，很多数据可能用 HTML 来表示，但是也有可能用 WAP 来表示，而这些表示所需要的命令是改变视图层的实现方式，而控制层和模型层无需做任何改变。

#### 3.较低的生命周期成本

MVC 使开发和维护用户接口的技术含量降低。

#### 4.快速的部署

使用 MVC 模式使开发时间得到相当大的缩减，它使程序员（Java 开发人员）集中精力于业务逻辑，界面程序员（HTML 和 JSP 开发人员）集中精力于表现形式上。

#### 5.可维护性

分离视图层和业务逻辑层也使得 WEB 应用更易于维护和修改。

#### 6.有利于软件工程化管理

由于不同的层各司其职，每一层不同的应用具有某些相同的特征，有利于通过工程化、工具化管理程序代码。


## 动手写 MVVM 框架

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MVVM</title>
</head>

<body>
  <div id="app">
    <div (click)="changeTest">{{test}}</div>
  </div>

  <script src="./mvvm.js"></script>
  <script>
    const vm = new MVVM({
      el: '#app',
      data: {
        test: '您初始化了所有的dom节点',
      },
      method: {
        changeTest: function(e) { this.test = '点击了'; }
      },
      directive: {

      },
      filter: {

      },
    });
  </script>
</body>

</html>
```

```js
/**
 * 绑定仿 Angular2 语法，其他仿 Vue2
 */

const propBindReg = /\[([A-z0-9]*)\]/i;  // 属性绑定
const eventBindReg = /\([A-z0-9]*\)/i;   // 事件绑定
const interpolateReg = /{{(.*)}}/i;      // 插值语法

class MVVM {
  constructor(config) {
    /**
     * $ 开头的属性，代表系统变量，但外部可存取
     * _ 开头的属性，代表框架内部变量，外部不能存取
     */
    this.$el = typeof(config.el) === 'string' ? document.querySelector(config.el) : config.el;
    this.$config = config;
    this._virtualDom = {};
    
    Object.assign(this, config.data, config.method, config.directive, config.filter);
    this._defineGetterSetter();
    this._parseTemplate();
    this._render();
  }

  _defineGetterSetter() {
    for (let key in this.$config.data) {
      Object.defineProperty(this, key, {
        set: (value) => {
          this[key] = value;
          this._render();
        },
      });
    }
  }

  _parseTemplate() {
    const template = this.$el.innerHTML;
    // todo: 待完成模板解析代码
  }

  _render() {
    // todo: 带完成
  }
}

// 简单导出到全局变量
window.MVVM = MVVM;
```