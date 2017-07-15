# AngularJS 教程

V1.5 开始往 Angular2 靠了，所以还是学习 V1.4 吧。

英文 https://code.angularjs.org/1.4.11/docs/guide/  
中文 http://www.angularjs.net.cn/tutorial/1.html  

挺好的一个中文教程：https://www.gitbook.com/book/hairui219/learning_angular/details

## 简介

Angular 尝试通过扩展 HTML 来弥合 "静态HTML" 与 "Web应用" 之间的鸿沟，这种扩展是通过 **指令 directive** 这种结构实现的。

Angular attempts to minimize the impedance mismatch between document centric HTML and what an application needs by creating new HTML constructs. Angular teaches the browser new syntax through a construct we call directives.

### 一个完整的前端解决方案

### Angular 的适用场景

Angular 通过更高层次的抽象来简化应用的开发。和其他的抽象一样，它也以损失灵活性为代价。换句话说，Angular 并不是适合任何应用的开发，Angular 侧重于构建 CRUD 应用，绝大多数WEB应用都是CRUD应用。但对于像 Games and GUI editors 之类的应用，会进行频繁且复杂的 DOM 操作，因此并不适合用 Angular 来构建，像 jQuery 这种更低层次抽象的库会更合适。

### Angular 之道

Angular是建立在这样的信念之上的：声明式的代码适用于构建用户界面，而命令式的代码更擅长展现业务逻辑。

Angular 帮你避免以下痛点：注册回调、直接操作DOM、读写UI上数据、编写大量初始化代码

## 概念概览

|||
|----------------|-------------------------------------------------------------------------------------------
| 模板 Template  | 带有 Angular 扩展标记的 HTML
| 指令 Directive | 自定义的属性和元素，用于扩展 HTML 的行为
| 模型 Model     | 用于展现给用户并且与用户互动的数据
| 作用域 Scope   | 存储模型 Model 的语境 context。模型放在这个语境中才能被控制器、指令和表达式等访问到
| 表达式 Expression | 模板中可以通过它来访问作用域 Scope 中的变量和函数
| 编译器 Compiler   | 用来编译模板 Template，并实例化 instantiate 其中的指令 Directive 和表达式 Expression
| 过滤器 Filter     | 在呈现数据之前格式化表达式 Expression 的值
| 视图 View         | 用户看到的内容，即 DOM
| 数据绑定 Data Binding         | 同步模型 Model 和视图 View 中的数据
| 控制器 Controller             | 视图 View 背后的业务逻辑
| 依赖注入 Dependency Injection | 创建并连接对象和函数
| 注入器 Injector | 用来实现依赖注入 Injection 的容器
| 模块 Module     | 存放各种部件的容器，包含控制器，服务，过滤器，配置注射器的指令
| 服务 Service    | 独立于视图(View)的、可复用的业务逻辑

### 首个例子：数据绑定

```html
<div ng-app ng-init="qty=1;cost=2">
  <b>Invoice:</b>
  <div>
    Quantity: <input type="number" min="0" ng-model="qty">
  </div>
  <div>
    Costs: <input type="number" min="0" ng-model="cost">
  </div>
  <div>
    <b>Total:</b> {{qty * cost | currency}}
  </div>
</div>
```

### 添加 UI 逻辑：控制器

```js
angular.module('invoice1', [])
.controller('InvoiceController', function() {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = ['USD', 'EUR', 'CNY'];
  this.usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };

  this.total = function total(outCurr) {
    return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
    return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };
});
```

```html
<div ng-app="invoice1" ng-controller="InvoiceController as invoice">
  <b>Invoice:</b>
  <div>
    Quantity: <input type="number" min="0" ng-model="invoice.qty" required >
  </div>
  <div>
    Costs: <input type="number" min="0" ng-model="invoice.cost" required >
    <select ng-model="invoice.inCurr">
      <option ng-repeat="c in invoice.currencies">{{c}}</option>
    </select>
  </div>
  <div>
    <b>Total:</b>
    <span ng-repeat="c in invoice.currencies">
      {{invoice.total(c) | currency:c}}
    </span>
    <button class="btn" ng-click="invoice.pay()">Pay</button>
  </div>
</div>
```

![](https://code.angularjs.org/1.4.11/docs/img/guide/concepts-databinding2.png)

### 与视图无关的业务逻辑：服务  Service

`finance2.js`

```js
angular.module('finance2', [])
.factory('currencyConverter', function() {
  var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };
  var convert = function (amount, inCurr, outCurr) {
    return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
  };

  return {
    currencies: currencies,
    convert: convert
  };
});
```

`invoice2.js`

```js
angular.module('invoice2', ['finance2'])  // 声明模块 invoice2 依赖模块 finance2
.controller('InvoiceController', ['currencyConverter', function(currencyConverter) {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = currencyConverter.currencies;

  this.total = function total(outCurr) {
    return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };
}]);
```

![](https://code.angularjs.org/1.4.11/docs/img/guide/concepts-module-service.png)

### 访问后端

```js
angular.module('finance3', [])
.factory('currencyConverter', ['$http', function($http) {
  ...
  var refresh = function() {
    var url = YAHOO_FINANCE_URL_PATTERN.
               replace('PAIRS', 'USD' + currencies.join('","USD'));
    return $http.jsonp(url).success(function(data) {
      var newUsdToForeignRates = {};
      angular.forEach(data.query.results.rate, function(rate) {
        var currency = rate.id.substring(3,6);
        newUsdToForeignRates[currency] = window.parseFloat(rate.Rate);
      });
      usdToForeignRates = newUsdToForeignRates;
    });
  };
  ...
}]);
```




