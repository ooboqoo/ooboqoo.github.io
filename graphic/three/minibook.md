# Three.js 入门指南

http://www.ituring.com.cn/minibook/792

## 2 照相机 Camera

### 2.1 什么是照相机

我们使用 Three.js 创建的场景是三维的，而通常情况下显示屏是二维的，那么三维的场景如何显示到二维的显示屏上呢？照相机就是这样一个抽象，它定义了三维空间到二维屏幕的投影方式。而针对投影方式的不同，照相机又分为正交投影照相机与透视投影照相机。

### 2.2 正交投影 vs 透视投影

正交投影，物体发出的光平行地投射到屏幕上，远近的方块都是一样大的；右图是透视投影，近大远小，符合我们平时看东西的感觉。

一般说来，对于制图、建模软件通常使用正交投影，这样不会因为投影而改变物体比例；而对于其他大多数应用，通常使用透视投影，因为这更接近人眼的观察效果。

### 2.3 正交投影照相机

正交投影照相机（Orthographic Camera）设置起来较为直观，它的构造函数是：

```js
THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其为视景体（Frustum）。只有在视景体内部的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。

```js
// 换个角度看世界
camera.position.set(4, -3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
```

### 2.4 透视投影照相机

```js
var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);  // THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 0, 5);
scene.add(camera);
```

## 3 几何形状 Geometry

几何形状（Geometry）最主要的功能是储存了一个物体的顶点信息。WebGL需要程序员指定每个顶点的位置，而在 Three.js 中，可以通过指定一些特征来创建几何形状，例如使用半径创建一个球体，从而省去程序员一个个指定顶点的工作量。

### 3.1 基本几何形状

#### 立方体 CubeGeometry

```js
THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
```

这里，`width` 是 x 方向上的长度；`height` 是 y 方向上的长度；`depth` 是 z 方向上的长度；后三个参数分别是在三个方向上的分段数，如 `widthSegments` 为 3 的话，代表 x 方向上水平分为三份。

#### 平面 PlaneGeometry

```js
THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

其中，`width` 是 x 方向上的长度；`height` 是 y 方向上的长度；
创建的平面在 x 轴和 y 轴所在平面内，如果需要创建的平面在x轴和z轴所在的平面内，可以通过物体的旋转来实现。

#### 球体 SphereGeometry

```js
THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
```

`radius` 是半径；`segmentsWidth` 表示经度上的切片数；`segmentsHeight` 表示纬度上的切片数；`phiStart` 表示经度开始的弧度；`phiLength` 表示经度跨过的弧度；`thetaStart` 表示纬度开始的弧度；`thetaLength` 表示纬度跨过的弧度。

#### 圆形 CircleGeometry

```js
THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
```

#### 圆柱体 CylinderGeometry

```js
THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
```

`openEnded` 是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面。

#### 正四面体 TetrahedronGeometry、正八面体 OctahedronGeometry、正二十面体 IcosahedronGeometry

```js
THREE.TetrahedronGeometry(radius, detail)
THREE.OctahedronGeometry(radius, detail)
THREE.IcosahedronGeometry(radius, detail)
```

其中，`radius` 是半径；`detail` 是细节层次（Level of Detail）的层数，对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型。这里我们不对 detail 多作展开，一般可以对这个值缺省。

#### 圆环面 TorusGeometry

```js
THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
```

圆环面就是甜甜圈的形状。 `radius` 是圆环半径；`tube` 是管道半径；`arc` 是圆环面的弧度，缺省值为 Math.PI * 2。


#### 圆环结 TorusKnotGeometry

如果说圆环面是甜甜圈，那么圆环结（TorusKnotGeometry）就是打了结的甜甜圈，其构造参数为：

```js
THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
```

### 3.2 文字形状

使用文字形状需要下载和引用额外的字体库，具体参见官网说明。这里，我们以 helvetiker 字体为例。我们在 Three.js GitHub master/examples/fonts 目录下，下载 helvetiker_regular.typeface.json 文件放在你的目录下，然后用以下方法加载：

```js
var loader = new THREE.FontLoader();
loader.load('../lib/helvetiker_regular.typeface.json', function(font) {
    var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
        font: font,
        size: 1,
        height: 1
    }), material);
    scene.add(mesh);

    // render
    renderer.render(scene, camera);
});
```

### 3.3 自定义形状

对于 Three.js 没有提供的形状，可以提供自定义形状来创建。

由于自定义形状需要手动指定每个顶点位置，以及顶点连接情况，如果该形状非常复杂，程序员的计算量就会比较大。在这种情况下，建议在 3ds Max 之类的建模软件中创建模型，然后使用 Three.js 导入到场景中，这样会更高效方便。

自定义形状使用的是 Geometry 类，它是其他如 CubeGeometry 等几何形状的父类，其构造函数是：`THREE.Geometry()`，我们以创建一个梯台为例：

```js
// 初始化几何形状
var geometry = new THREE.Geometry();

// 设置顶点位置
// 顶部4顶点
geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, 1));
geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
// 底部4顶点
geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, 2));
geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

// 设置顶点连接情况
// 顶面
geometry.faces.push(new THREE.Face3(0, 1, 3));
geometry.faces.push(new THREE.Face3(1, 2, 3));
// 底面
geometry.faces.push(new THREE.Face3(4, 5, 6));
geometry.faces.push(new THREE.Face3(5, 6, 7));
// 四个侧面
geometry.faces.push(new THREE.Face3(1, 5, 6));
geometry.faces.push(new THREE.Face3(6, 2, 1));
geometry.faces.push(new THREE.Face3(2, 6, 7));
geometry.faces.push(new THREE.Face3(7, 3, 2));
geometry.faces.push(new THREE.Face3(3, 7, 0));
geometry.faces.push(new THREE.Face3(7, 4, 0));
geometry.faces.push(new THREE.Face3(0, 4, 5));
geometry.faces.push(new THREE.Face3(0, 5, 1));
```

## 4 材质 Material

## 5 网格 Mesh

## 6 动画 Animation

## 7 外部模型

使用 Three.js 创建常见几何体是十分方便的，但是对于人或者动物这样非常复杂的模型使用几何体组合就非常麻烦了。因此，Three.js 允许用户导入由 3ds Max 等工具制作的三维模型，并添加到场景中。

### 7.1 支持格式

Three.js 有一系列导入外部文件的辅助函数，是在 three.js 之外的，使用前需要额外下载，在 https://github.com/mrdoob/three.js/tree/master/examples/js/loaders 可以找到。

`*.obj` 是最常用的模型格式，导入 `*.obj` 文件需要 OBJLoader.js；导入带 `*.mtl` 材质的 `*.obj` 文件需要 MTLLoader.js 以及 OBJMTLLoader.js。另有 PLYLoader.js、STLLoader.js 等分别对应不同格式的加载器，可以根据模型格式自行选择。

目前，支持的模型格式有：`*.obj` `*.obj, *.mtl` `*.dae` `*.ctm` `*.ply` `*.stl` `*.wrl` `*.vtk`

### 7.2 无材质的模型

首先，下载 OBJLoader.js 并在HTML的引入：

```html
<script type="text/javascript" src="OBJLoader.js"></script>
```

然后，我们需要使用建模软件导出一个 `*.obj` 模型。这里，我们在 3ds Max 中创建一个茶壶，将其放置在原点处并设置半径为 3。导出成 port.obj，在选项中，如果选择了 Export materials，会生成一个同名的 `*.mtl` 文件。在本例中，我们不需要导出材质，因此可以不选中这项。

在 init 函数中，创建 loader 变量，用于导入模型：

```js
var loader = new THREE.OBJLoader();

// loader导入模型的时候，接受两个参数，第一个表示模型路径，第二个表示完成导入后的回调函数
loader.load('../lib/port.obj', function(obj) {
  // 如果没有下行设置，可以看到在某些角度时，好像有些面片没有被绘制出来，因而后方的茶嘴似乎穿越到前方了
  // 这是因为默认的情况下，只有正面的面片被绘制，而如果需要双面绘制，需要这样设置：
  obj.traverse(function(child) {
      if (child instanceof THREE.Mesh) { child.material.side = THREE.DoubleSide; }
  });
  meshRef = obj; //储存到全局变量中
  scene.add(obj);
});
```

### 7.3 有材质的模型

模型的材质可以有两种定义方式，一种是在代码中导入模型后设置材质，另一种是在建模软件中导出材质信息。下面，我们将分别介绍这两种方法。

导入模型后在回调函数中设置模型的材质：

```js
var loader = new THREE.OBJLoader();
loader.load('../lib/port.obj', function(obj) {
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            });
        }
    });

    meshRef = obj;
    scene.add(obj);
});
```

从建模软件中导出模型时，在选项中选中 `Export materials`，最终导出 `port.obj` 模型文件以及 `port.mtl` 材质文件。

现在，我们不再使用 OBJLoader.js，而是使用 MTLLoader.js 与 OBJMTLLoader.js，并且要按改顺序引用：

```html
<script type="text/javascript" src="MTLLoader.js"></script>
<script type="text/javascript" src="OBJMTLLoader.js"></script>
```

```js
var loader = new THREE.OBJMTLLoader();
loader.addEventListener('load', function(event) {
    var obj = event.content;
    mesh = obj;
    scene.add(obj);
});
loader.load('../lib/port.obj', '../lib/port.mtl');
```

## 8 光与影

## 9 着色器

