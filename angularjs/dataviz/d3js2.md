# D3.js Part2

<script src="https://d3js.org/d3.v3.min.js"></script>

## 动画

过渡和动画都是动态效果，但它们是有区别的：
  * 过渡效果的起始状态和目标状态都很明确，元素或从起始状态缓缓变为目标状态，时间是确定的
  * 动画的起始状态和目标状态不明确，通常不用指定，并且时间通常是不确定的

## 交互

D3 能创建交互式图表，选择集有一个 `on()` 方法用来设定事件的监听器。当事件被触发时，可通过 `d3.event` 读取事件的属性。

添加事件监听器时，新的监听器会覆盖旧的。如果需要给同一事件添加多个监听器，可通过使用 `.` 扩展事件名来规避。

另外需要注意的是，不能对过渡对象设置监听器，如果需要设定监听器，需要在调用 transition() 之前。

```js
// 添加多个监听器
selection.on('click.first', function () {  })
         .on('click.second', function () {  });
// 删除监听器
selection.on('click', null);
// 不能对过渡对象设置监听器
svg.select('circle').transition()  // transition() 方法返回一个过渡对象
   .on('click', function () {  })  // 报错，过渡对象没有 on() 方法
```

### 交互示例

#### 鼠标

```js
.on('mouseover', function(d,i) {
  d3.select(this).attr('fill', 'yellow');  // 注意这里 this 的用法，this 指向事件被触发元素
})
.on('mouseout', function(d,i) {
  d3.select(this).transition().duration(500).attr('fill', 'steelblue');
});
```

#### 键盘

#### 触屏操作

### 事件

### 行为

## 数据导入和导出

```js
d3.json('data.json', function (error, data) {
  // 数据处理
});
```

## 布局

从字面来理解 "布局"，容易让人误解，也许我们称之为 **数据转换** 更为合适。

假设有一个数据 [10, 20, 30, 40]，如果想利用此数组绘制成饼状图，直接使用数组的数据是不行的，需要将数据 "转换" 成起始角度和终止角度，如将 10 转换成 0~0.2pi，如此才能绘制饼状图。布局的意义就在于**计算出方便绘图的数据**。至于如何绘制，则与布局无关。

在前面章节中，制作了柱形图、散点图、折线图，这三种图表足够简单，不需要进行复杂的数据转换。需要使用布局来制作的图表，会涉及一些数学运算，而开发者一般不希望为此去查阅数学书籍。有了布局，一切都会变得简单。

D3 总共提供了 12 个布局：饼状图 Pie 力导向图 Force 弦图 Chord 树状图 Tree 集群图 Cluster 捆图 Bundle 打包图 Pack 直方图 Histogram 分区图 Partition 堆栈图 Stack 矩阵树图 Treemap 层级图 Hierarchy。其中层级图不能直接使用，集群图、打包图、分区图、树状图、矩形树图是由层级图扩展来的。如此一来，能够直接使用的布局是 11 个。

布局的使用遵循以下顺序：确定初始数据 -> 转换数据 -> 绘制。

### 饼状图

饼状图 Pie Chart，简称饼图，通过将圆划分为几个扇形，来描述数量或百分比的关系。

饼状图布局 Pie Layout 能根据 "一系列数值" 计算出 "一系列对象"，每一个对象都包含起始角和终止角等绘制饼状图所需的数据。

|||
|---------------------------|----------------------------------------------------------------------
| `d3.layout.pie()`         | 创建一个饼图布局
| `pie(values,index?)`      | 转换数据，转换后的每个对象都包含起始和终止角度
| `pie.value(accessor?)`    | 设定或获取值访问器，如果省略参数，则返回当前的值访问器
| `pie.sort(comparator?)`   | 设定或获取比较器，用于排序
| `pie.startAngle(angle?)`  | 设定或获取饼图的起始角度，默认为 0
| `pie.endAngle(angle?)`    | 设定或获取饼图的终止角度，默认为 2PI

<div id="piechart"></div>
<script>
(function drawPie() {
  if (typeof(d3) === 'undefined') { return setTimeout(drawPie, 150); }
  var width  = 400, height = 400;
  var svg = d3.select("#piechart").append("svg").attr("width", width).attr("height", height);
  var dataset = [ ["小米",60.8], ["三星",58.4], ["联想",47.3], ["苹果",46.6], ["华为",41.3], ["酷派",40.1] ];
  var pie = d3.layout.pie().value(function(d){ return d[1]; });
  var piedata = pie(dataset); console.log(piedata);

  var outerRadius = width / 3, innerRadius = 0;

  //创建弧生成器
  var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  var color = d3.scale.category20();

  //添加对应数目的弧组，即<g>元素
  var arcs = svg.selectAll("g").data(piedata).enter().append("g")
                .attr("transform","translate("+( width/2 )+","+ ( height/2 ) +")");

  //添加弧的路径元素
  arcs.append("path").attr("fill", function(d,i) { return color(i); })
      .attr("d",function(d){ return arc(d);  /* 使用弧生成器 */ });

  //添加弧内的文字元素
  arcs.append("text").attr("transform",function(d){
      var x = arc.centroid(d)[0] * 1.4;
      var y = arc.centroid(d)[1] * 1.4;
      return "translate(" + x + "," + y + ")";
  }).attr("text-anchor","middle").text(function(d){
      //计算市场份额的百分比
      var percent = Number(d.value)/d3.sum(dataset,function(d){ return d[1]; }) * 100;
      return percent.toFixed(1) + "%";
  });

  //添加连接弧外文字的直线元素
  arcs.append("line").attr("stroke","black")
      .attr("x1",function(d){ return arc.centroid(d)[0] * 2; })
      .attr("y1",function(d){ return arc.centroid(d)[1] * 2; })
      .attr("x2",function(d){ return arc.centroid(d)[0] * 2.2; })
      .attr("y2",function(d){ return arc.centroid(d)[1] * 2.2; });

  //添加弧外的文字元素
  arcs.append("text").attr("transform", function(d) {
      var x = arc.centroid(d)[0] * 2.5;
      var y = arc.centroid(d)[1] * 2.5;
      return "translate(" + x + "," + y + ")";
  }).attr("text-anchor","middle").text(function(d){ return d.data[0]; });
})();
</script>

```js
var width  = 400, height = 400;
var svg = d3.select("#piechart").append("svg").attr("width", width).attr("height", height);
var dataset = [ ["小米",60.8], ["三星",58.4], ["联想",47.3], ["苹果",46.6], ["华为",41.3], ["酷派",40.1] ];
var pie = d3.layout.pie().value(function(d){ return d[1]; });
var piedata = pie(dataset); console.log(piedata);

var outerRadius = width / 3, innerRadius = 0;

//创建弧生成器
var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
var color = d3.scale.category20();

//添加对应数目的弧组，即<g>元素
var arcs = svg.selectAll("g").data(piedata).enter().append("g")
              .attr("transform","translate("+( width/2 )+","+ ( height/2 ) +")");

//添加弧的路径元素
arcs.append("path").attr("fill", function(d,i) { return color(i); })
    .attr("d",function(d){ return arc(d);  /* 使用弧生成器 */ });

//添加弧内的文字元素
arcs.append("text").attr("transform",function(d){
    var x = arc.centroid(d)[0] * 1.4;
    var y = arc.centroid(d)[1] * 1.4;
    return "translate(" + x + "," + y + ")";
}).attr("text-anchor","middle").text(function(d){
    //计算市场份额的百分比
    var percent = Number(d.value)/d3.sum(dataset,function(d){ return d[1]; }) * 100;
    return percent.toFixed(1) + "%";
});

//添加连接弧外文字的直线元素
arcs.append("line").attr("stroke","black")
    .attr("x1",function(d){ return arc.centroid(d)[0] * 2; })
    .attr("y1",function(d){ return arc.centroid(d)[1] * 2; })
    .attr("x2",function(d){ return arc.centroid(d)[0] * 2.2; })
    .attr("y2",function(d){ return arc.centroid(d)[1] * 2.2; });

//添加弧外的文字元素
arcs.append("text").attr("transform", function(d) {
    var x = arc.centroid(d)[0] * 2.5;
    var y = arc.centroid(d)[1] * 2.5;
    return "translate(" + x + "," + y + ")";
}).attr("text-anchor","middle").text(function(d){ return d.data[0]; });
```

## 地图

## 交互进阶

## 地图进阶



