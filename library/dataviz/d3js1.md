# D3.js Part1

<script src="https://d3js.org/d3.v3.min.js"></script>

https://d3js.org/  
https://github.com/d3/d3/wiki  
https://www.dashingd3js.com/table-of-contents  

> 这里暂不采用 V4 版(2016-6)，学习用的是 V3.5.17

## 选择集与数据

选择集和数据，是 D3 最重要的基础。选择集是被选择的元素集合，例如所有的 `<p>` 元素。而数据是可视化的来源，D3 允许将数据和选择集绑定在一起，以凭借数据操作选择集。

### 4.1 选择元素

D3 中有两个选择元素的函数：
  * `select` - 返回匹配选择器的第一个元素
  * `selectAll` - 返回匹配选择器的所有元素

函数的参数可以是 CSS 选择器，也可以是 DOM 元素或元素集合。需要特别注意的是，当参数是元素或元素集合时，元素使用 select，元素集合使用 selectAll，必须一一对应，否则无法得到期望结果。

```js
d3.select("body").selectAll(".content");

var div = document.getElementById('id1');
var divs = document.getElementsByClassName('.divs');

d3.select(div);
d3.selectAll(divs);
```

### 4.2 选择集

`select` 和 `selectAll` 方法返回的对象称为 选择集 selection，添加、删除、设定网页中的元素，都得使用选择集。

#### 4.2.1 查看状态

|||
|-----------------------|-------------------------------------------------
| `selection.empty()`   | 如果选择集为空 true 非空为 false
| `selection.node()`    | 返回第一个非空元素，如果选择集为空则返回 null
| `selection.size()`    | 返回选择集中元素个数

#### 4.2.2 设定和获取属性

|||
|--------------------------------------------|-------------------------------------------------
| `selection.attr(name, value?)`             | 设置或获取选择集的属性
| `selection.property(name, value?)` | 设置或获取选择集的属性，像 input 的 value 属性 attr() 搞不定就用它
| `selection.classed(name, value?)`          | 设置或获取选择集的类，name 为类名 value 为布尔值
| `selection.style(name, value?, priority?)` | 设置或获取选择集的样式
| `selection.text(value?)`           | 设置或获取选择集的文本内容，相当于 DOM 的 innerText
| `selection.html(value?)`           | 设置或获取选择集的 HTML 内容，相当于 DOM 的 innerHTML

```js
d3.select('p').attr('id', 'para').classed({'red': true, 'bigsize': false}).style('font-size', '24px');
```

### 4.3 添加、插入和删除

|||
|------------------------------------|---------------------------------------------------------
| `selection.append(name)`           | 给选择集的每个成员追加子元素，返回更新后的选择集
| `selection.insert(name, before?)`  | 给选择集的每个成员添加子元素(插入到 before 元素前)，before 是 CSS 选择器名称
| `selection.remove()`               | 删除选择集中的成员元素

### 4.4 数据绑定

将数据绑定到 DOM 上，是 D3 最大的特色。选择集上是没有数据的，数据绑定就是使选择元素里 "含有" 数据。

|||
|----------------------------------|----------------------------------------------------------------------
| `selection.datum(value?)`        | 选择集中的每个成员都绑定相同的数据 value
| `selection.data(values?, key?)`  | 选择集与数组绑定，可以通过 key 函数改变默认的 by-index 绑定行为

绑定的数据，是通过元素的 `__data__` 属性添加的。

#### `datum()` 工作过程

在被绑定数据的选择集中添加元素后，新元素也会获得该数据。

```html
<p>Para1</p><p>Para2</p><p>Para3</p>
<script>
  var p = d3.selectAll('p');
  p.datum('Changed').text(function (d, i) { return d + ' ' + i; });
  p.append('span').style('color', 'red').text(function (d, i) { return d; });
</script>
```

#### `data()` 工作过程

`data()` 能将数组各项分别绑定到选择集的各元素上，当数组长度与元素数量不一致时，`data()` 也能处理。当数组长度大于元素数量时，为多余数据预留元素位置，以便将来插入新元素；当数组长度小于元素数量时，能获取多余元素的位置，以便将来删除。

根据数组长度和元素数量的关系，分别把各种情况归纳如下：
  * update - 数组长度 = 选择集 length
  * enter - 数组长度 > 选择集 length
  * exit - 数组长度 < 选择集 length

`data()` 返回一个对象，对象里包含 update 部分和两个方法 `enter()` `exit()`，分别可以返回 enter 和 exit 部分。

update enter exit 是非常重要的概念，在 D3 中会大量出现。

```html
<p>p1</p><p>p2</p><p>p3</p>
<script>
  var dataset = [3, 6, 9, 12, 15];
  var p = d3.selectAll('p');
  var update = p.data(dataset);
  console.log(update);
  console.log(update.enter());
  console.log(update.exit());
</script>
```

#### 4.4.3 自定义 data() 绑定顺序

通过 data() 的第二个参数改变默认的 by-index 绑定行为，该参数是一个函数，称为键函数 key function。

原理分析：When D3 tries to match DOM and data, it will use that key function **to extract identifier**

注：**只有在选择集原来已经绑定有数据的情况下，使用键函数才有效果**。

```html
<p>p1</p><p>p2</p><p>p3</p>
<script>
  var persons = [{id: 1, name: '用户1'}, {id: 2, name: '用户2'}, {id: 3, name: '用户3'}];
  var p = d3.selectAll('p');
  p.data(persons).text(function (d) { return d.id + ' : ' + d.name; });
  persons = [{id: 2, name: '用户2new'}, {id: 3, name: '用户3new'}, {id: 1, name: '用户1new'}];
  // 更新数据方式1，会使 用户1 跑到最后
  //p.data(persons).text(function (d) { return d.id + ' : ' + d.name; });
  // 更新数据方式2，虽然数据顺序换了，但显示顺序不影响
  //p.data(persons, function(d) { return d.id; }).text(function (d) { return d.id + ' : ' + d.name; });
</script>
```

### 4.5 选择集的处理

#### enter 的处理方法

通常，从服务器获取数据后，网页中是没有与之对应的元素的，因此，一个常见的用法是：选择一个空集，然后使用 `.enter().append()` 的形式来添加足够数量的元素。

```js
var dataset = [10, 20, 30, 10, 50];
d3.selectAll('p').data(dataset).enter().append('p').text(function (d) { return d; });
```

#### exit 的处理方法

如果存在多余的元素，没有数据与之对应，那么需要删除元素，使用 `.exit().remove()` 方法即可。

```js
dataset = [10, 20, 30];  // 接上例，数据减少
var update = d3.selectAll('p').data(dataset);
update.text(function (d) { return d; });
update.exit().remove();
```

#### 处理模板

从上面两例，可以总结出一个通用的处理模板，而不用关心数组长度和元素数量之间的差异：

```js
function update(selection, dataset) {
  var update = selection.data(dataset);
  var enter = update.enter();
  var exit = update.exit();
  update.text(function (d) { return d; });
  enter.append('p').text(function (d) { return d; });
  exit.remove();
}
```

#### 选择集的其他处理

* `selection.filter()` - 根据被绑定的数据对选择集中的元素进行过滤
* `selection.sort()` - 根据被绑定的数据重新排列选择集中的元素
* `selection.each()` - 对选择集中的每一项分别处理
* `selection.call()` - 将选择集自身作为参数，传递给某一函数(即调用该函数)

### 4.6 数组和其他数据结构

需要被可视化的数据常以数组的形式存在，虽然 JavaScript 中提供了不少操作数组的方法，但不是为了数据可视化而存在的，因此 D3 根据数据可视化的需求封装了不少数组处理函数。

#### 排序和求值

```js
var arr = [54, 23, 77, 11, 34];
arr.sort(d3.ascending);   // 递增比较函数
arr.sort(d3.descending);  // 递减比较函数

d3.min(arr);     // 返回最小值 d3.min(arr, accessor?)
d3.max(arr);     // 返回最大值 d3.max(arr, accessor?)
d3.extent(arr);  // 返回最小值和最大值 [min, max]

// 还有很多，暂略
```

#### 操作数组

#### 映射 Map

#### 集合 Set

#### 嵌套结构 Nest

### 4.7 柱状图

<style>
  .chart div { font: 10px sans-serif; background-color: steelblue; text-align: right;
               padding: 3px; margin: 1px; color: white; }
</style>
<div class="chart"></div>
<script>
(function drawBar() {
  if (typeof(d3) === 'undefined') { return setTimeout(drawBar, 100); }
  var data = [30, 86, 168, 281, 303, 365];
  d3.select(".chart").selectAll("div").data(data).enter().append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });
})();
</script>

```html
<style>
  .chart div { font: 10px sans-serif; background-color: steelblue; text-align: right;
               padding: 3px; margin: 1px; color: white; }
</style>
<div class="chart"></div>
<script>
  var data = [30, 86, 168, 281, 303, 365];
  d3.select(".chart").selectAll("div").data(data).enter().append("div")
    .style("width", function(d) { return d + "px"; }).text(function (d) { return d; });
</script>
```

## 比例尺和坐标轴

### 定量比例尺

**线性比例尺 Linear Scale** 是常用比例尺，与线性函数类似，计算线性的对应关系。

**指数比例尺 Power Scale** 和 **对数比例尺 Log Scale** 中的很多方法和线性比例尺是一样的，名称和作用都是相同的。但是，指数比例尺多一个 exponent() 用于指定指数；对数比例尺多一个 base() 用于指定底数。

**量子比例尺 Quantize Scale** 的定义域是连续的，值域是离散的，根据输入值的不同，结果是其对应的离散值。与量子比例尺十分类似的是 **分位比例尺 Quantile Scale**，也是用于将连续的定义域区分成段，每一段对应到一个离散的值上。两者主要的不同，就在于分段的方式。量子比例尺的分段值只与定义域的起始值和结束值有关，其中间有多少其他数值都没有影响，分段值取其算术平均值。而分位比例尺的分段值与定义域中存在的数值都有关。

阈值又叫临界值，是指一个效应能够产生的最低值或最高值。**阈值比例尺 Threshold Scale** 是通过设定阈值，将连续的定义域映射到离散的值域里，与量子比例尺和分位比例尺相似。

```js
// 线性比例尺
var linear = d3.scale.linear()    // 创建一个线性比例尺
               .domain([0, 500])  // 定义域
               .range([0, 100]);  // 值域
console.log(linear(50), linear(250), linear(450));  // 10 50 90

// 指数比例尺
var pow = d3.scale.pow().exponent(3);  // 创建指数为3的指数比例尺
console.log(pow(2), pow(3));  // 8 27
pow.exponent(0.5);
console.log(pow(2), pow(3));  // 1.414 1.732
pow.exponent(3).domain([0, 3]).range([0, 90]);  // 指数比例尺可以叠加线性比例尺 [注]
console.log(pow(1.5), pow(2)); // 11.25 26.6667
// 注：实际效果相当于
linear.domain([0, Math.pow(3, 3)]).range([0, 90]);
console.log(linear(Math.pow(1.5, 3)));  // 11.25

// 量子比例尺
var quantize = d3.scale.quantize()
    .domain([0, 10]).range(['red', 'green', 'blue', 'yellow', 'black']);
console.log(quantize(3),quantize(5.99),quantize(6));  // green blue yellow
```

比例尺应用示例

```js
var quantize = d3.scale.quantize().domain([50, 0]).range(['#888', '#666', '#444', '#222', '#000']);
var r = [45, 35, 25, 15, 5];
var svg = d3.select('#quantize').append('svg').attr('width', 200).attr('height', 100);
svg.selectAll('circle').data(r).enter().append('circle')
  .attr('cx', function (d, i){ return 50 + i * 40; }).attr('cy', 50)
  .attr('r', function (d, i) { return d; }).attr('fill', function (d) { return quantize(d); });
```

<div id='quantize'></div>
<script>
(function drawCicle() {
  if (typeof(d3) === 'undefined') { return setTimeout(drawCicle, 120); }
  var quantize = d3.scale.quantize().domain([50, 0]).range(['#ff6f69', '#ffcc5c', '#ffeead', '#96ceb4', '#f00']);
  var r = [45, 35, 25, 15, 5];
  var svg = d3.select('#quantize').append('svg').attr('width', 300).attr('height', 100);
  svg.selectAll('circle').data(r).enter().append('circle')
    .attr('cx', function (d, i){ return 50 + i * 40; }).attr('cy', 50)
    .attr('r', function (d, i) { return d; }).attr('fill', function(d) { return quantize(d); })
    .attr('opacity', 0.8);
})();
</script>

### 序数比例尺

定量比例尺的定义域都是连续的，值域有连续的也有离散的。序数比例尺 Ordinal Scale 的定义域和值域都是离散的。

### 坐标轴

|||
|----------------------------------|----------------------------------------------------------------------
| `d3.svg.axis()`                  | 创建一个默认的新坐标轴
| `axis(selection)`                | 将坐标轴应用到指定的选择集上
| `axis.scale(scale?)`             | 设定或获取坐标轴的比例尺
| `axis.orient(orientation?)`      | 设定或获取坐标轴的方向，有4个值 top bottom left right
| `axis.ticks(num?)`               | 设定或获取坐标轴的刻度的分段数，默认为 10
| `axis.tickValues(values?)`       | 设定或获取坐标轴的指定刻度，具体用法见下方示例
| `axis.tickSize(inner?,outer?)`   | 设定或获取坐标轴的内外刻度的长度，默认都为 6
| `axis.innerTickSize(size?)`      | 设定或获取坐标轴的内刻度的长度，内刻度指不是两端的刻度
| `axis.outerTickSize(size?)`      | 设定或获取坐标轴的外刻度的长度，外刻度指两端的刻度
| `axis.outerFormat(format?)`      | 设定或获取刻度文本的格式
| `axis.tickPadding(format?)`      | 设定或获取刻度的刻度标记和刻度文本之间的间距


```js
axis.tickPadding(-1);    // 设定刻度文本与刻度标记之间的间距为 -1px
axis.outerTickSize(50)   // 设定(首尾)刻度标记长度为 50px
```

坐标轴的主直线是由 `<path>` 绘制的，刻度是由 `<line>` 绘制的，刻度文字是由 `<text>` 绘制的。

建议单独新建一个 `<g>` 元素来组织坐标轴的组件，而不要直接放到 `<svg>` 里。

```html
<style>
  .axis path, .axis line { fill: none; stroke: black; shape-rendering: crispEdges; }
  .axis text { font-size: 11px; }
</style>
<script>
  var svg = d3.select('body').append('svg').attr('width', 800).attr('height', 600);

  var xScale = d3.scale.linear().domain([0, 10]).range([0, 300]);
  var axis = d3.svg.axis().scale(xScale).orient('bottom').tickValues([0, 1, 3, 9, 12, 15]);

  var gAxis = svg.append('g').attr('class', 'axis').attr('transform', 'translate(10, 10)'); //移到(10,10)
  axis(gAxis);     // 方式1
  gAxis.call(axis) // 方式2，这种用法更常见
</script>
```

<div class="axisDemo"></div>
<style>
  .axis path, .axis line { fill: none; stroke: black; shape-rendering: crispEdges; }
  .axis text { font-size: 11px; }
</style>
<script>
(function drawAxis() {
  if (typeof(d3) === 'undefined') { return setTimeout(drawAxis, 150); }
  var svg = d3.select('.axisDemo').append('svg').attr('width', 600).attr('height', 30);

  var xScale = d3.scale.linear().domain([0, 10]).range([0, 300]);
  var axis = d3.svg.axis().scale(xScale).orient('bottom').tickValues([0, 1, 3, 9, 12, 15]);

  var gAxis = svg.append('g').attr('class', 'axis').attr('transform', 'translate(10,10)');
  gAxis.call(axis);
})();
</script>

散点图案例：

```js
var center = [[0.5, 0.5], [0.7, 0.8], [0.4, 0.9], [0.11, 0.32], [0.88, 0.25]];  // 圆心数据
var width = 500, height = 500, xAxisWidth = 300, yAxisWidth = 300, padding = {t:30, r:30, b:30, l:30};
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var xScale = d3.scale.linear()
  .domain([0, 1.2 * d3.max(center, function (d) { return d[0]; })]).range([0, xAxisWidth]);
var yScale = d3.scale.linear()
  .domain([0, 1.2 * d3.max(center, function (d) { return d[1]; })]).range([0, yAxisWidth]);

var cirlce = svg.selectAll("circle").data(center).enter().append("circle")
  .attr("fill", "black").attr("r", 5 )
  .attr("cx", function (d) { return padding.l + xScale(d[0]); })
  .attr("cy", function (d) { return height - padding.b - yScale(d[1]); });

var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
yScale.range([yAxisWidth, 0]);
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
svg.append("g").attr("class", "axis")
  .attr("transform", "translate(" + padding.l + "," + (height - padding.b) + ")").call(xAxis);
svg.append("g").attr("class", "axis")
  .attr("transform", "translate(" + padding.l + "," + (height - padding.b - yAxisWidth) + ")")
  .call(yAxis);
```


## 绘制图形

D3 本身没有作图的功能，它只能为我们计算出作图所需的数据。因此实际作图需要指定一个画板，这个画板就是 SVG 元素。

SVG 中的路径是最强大的，可以表示其他所有图形，但是计算路径值比较复杂，为此，D3 提供了数量众多的路径生成器。









<script>ooboqoo.contentsRegExp = /H[123]/;</script>
