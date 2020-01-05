# Inside Flutter


这是篇介绍 Flutter 框架内部实现原理的文章。Flutter 使用组合大量 Widget 来构建用户界面。Flutter 采用的是比较激进的组合策略，即通过嵌套多层功能单一的 Widget 来实现界面逻辑，而不是将很多属性塞到一个 Widget 中来简化 Widget 树。这种策略必然导致数量庞大的 Widgets，于是 Flutter 引入了诸多优化策略：实现了次线性性能的 layout and building widgets；确保高效 树更新(tree surgery) 的数据结构；以及一些其他的常量因子优化(constant-factor optimizations)。另外，还允许开发者利用回调来创建高性能的无限滚动列表（只处理当前显示的那几条列表，其余不可见的列表都不会实际加载）。


## Flutter's Layers

```
 | Material    implement Material Design
 | Widgets     immutable, light
 | Rendering   mutable, because recalculate coordinate is kind of heavy
 ⩛ dart:ui     kind of low level
```


## Aggressive composability

__compose__  _/kəmˈpəʊz/_  v.组成,构成; 作曲,创作,构图  
__composition__  _/ˌkɒmpəˈzɪʃən/_  n.组成,构成,组合方式  
__composability__  可组合性  
__aggressive__  _/əˈɡresɪv/_  a.好斗的,挑衅的啊; 有闯劲的,积极进取的  
__render tree__  渲染树，由 render objects 组成的数状结构  
__geometry__  n.几何学; 形状,外形,几何图形,几何结构  

Flutter 最大的特点是，一切皆 Widget，UI 由众多 Widget 组合而成，而这些 Widget 本身也是由更基础的 Widget 组合而成的。例如，`Padding` 是一个独立 Widget 而不是作为其他 Widget 中的一个属性。正因为此，Flutter 应用将包含数量庞大的 Widget。

所有的 Widget 逐级往下分解，最终都是由 `RenderObjectWidget` 组成的，它对应了渲染树中的一个 `RenderObject`。渲染树保存了界面的几何信息，在布局和绘图时会使用这些信息。开发者不需要直接操作渲染树。

为了支持 Widget 层的这种激进的组合行为，Flutter 在 Widget 层 和 render tree 层 用了很多高效的算法和优化，下文将做介绍。

### Sublinear layout

_flutter/lib/src/rendering/object.dart_

__sublinear algorithms__  次线性算法，就是时间复杂度优于 O(n) 的算法  
__specialization__  n.某个专业领域; 专精,专注于特定领域的行为

要取得好的性能的关键肯定是高效的算法，而这其中又属布局阶段的算法最为重要。一些框架使用了 O(N<sup>2</sup>) 的算法，而 Flutter 则实现了线性性能的首次布局，后续更新则进一步压缩到次线性级。

(这里只是大概描述，具体须看代码实际实现)每一帧 Flutter 都会执行一次布局操作，且布局算法在一次传递中完成。*约束信息(constraints)* 以调用子节点 `layout()` 的方式，以参数形式从父节点向子节点传递，子节点递归执行自身的布局操作，并以 `layout()` 返回值的形式，将本节点的 *几何信息(geometry)* 返回给父节点。几何信息一经确定，本帧内不会再动。

在布局期间，从父节点流向子节点的唯一信息是约束信息，从子节点流向父节点的唯一信息是几何信息。此 *协议(protocol)* 确保了布局的高效性，另外还有一些优化点，通过以下不变量可减轻布局阶段的工作量：
* 如果一个节点没有被标记为脏，且从父节点传递的约束信息也没变，`!_needsLayout && constraints == _constraints` 那么就直接返回，即上次计算的本子树的布局信息还有效，不用重新执行布局操作。
* 如果父节点告诉子节点 `parentUsesSize = false`，子节点尺寸的变更不需要触发父节点的重新布局
* *强约束(tight constraints)* 指的是确定值约束(而不是范围)，这种情况下子节点动了，父节点不需要重新计算，因为没得选
* 子节点还可以声明自己只基于父节点传递的约束计算自身的几何信息，这样，子节点重新布局也无须触发父节点的布局操作。实际代码为 `if (_relayoutBoundary != this) { markParentNeedsLayout(); }` 即不会将父节点标记为脏。

注：实际的布局任务控制由 `owner._nodesNeedingLayout` 这个 `List<RenderObject>` 记录，owner 为 `PipelineOwner`。

### Sublinear widget building

_flutter/lib/src/widgets/framework.dart_

__projection__  _/prəˈdʒekʃən/_  n.预测,预估; 投射,放映  
__reprojection pattern__  重投影,二次投影  
__unidirectional__  _/,jʊnɪdə'rɛkʃənl/_ a.单向的  

Flutter’s widget building algorithm is sublinear. After being built, the widgets are held by the *element tree*, which retains the logical structure of the user interface. The element tree is necessary because the widgets themselves are immutable, which means *they cannot remember their parent or child relationships with other widgets*. The element tree also holds the *state objects* associated with stateful widgets.

In response to user input, an element can become *dirty*, for example if the developer calls `setState()` on the associated state object. The framework keeps a *list* of dirty elements and jumps directly to them during the *build phase*, skipping over clean elements. During the build phase, information flows unidirectionally down the element tree, which means each element is visited at most *once* during the build phase. Once cleaned, an element cannot become dirty again because, by induction, all its ancestor elements are also clean.

```dart
// 
```

正因为 Widget 是不可变的，如果父节点重新构建(rebuild)之后还是返回的原先的 widget (这个时候只判断 runtimeType 和 key 是不够的，需要判断引用，即必须是 *同一个对象*)，那么只要子节点 element 没有被标记为脏，就不用重新构建。开发人员可以将子节点的 widget 存为一个成员变量 member variable，这样就可以充分利用此项优化，从而将变更的工作量减到最小。

```dart
class MyPageState extends State<<MyHomePage> {
  int _counter = 0;
  Widget logger2 = Logger2();
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Text('$_counter'),
      Logger(),
      logger2
    ]);
  }
}
class Logger extends StatelessWidget {
  Widget build(BuildContext context) {
    print('Logger1');    // 每次改状态都会打印
    return Container();
  }
}
class Logger2 extends StatelessWidget {
  Widget build(BuildContext context) {
    print('Logger2');    // 只打印一次
    return Container();
  }
}
```

构建(build) 阶段，为了避免向上遍历查找 `InheritedWidget`s，每个 `Element` 实例都维护了两个成员 `_inheritedWidgets` 哈希表 和 `_dependencies` 哈希集合。这个信息会从树顶往下逐级传递，其实最后大多数元素指向的都是同一张表。

```dart
abstract class Element extends DiagnosticableTree implements BuildContext {
  Map<Type, InheritedElement> _inheritedWidgets;
  Set<InheritedElement> _dependencies;
}
```

### Linear reconciliation

_flutter/lib/src/widgets/framework.dart_

__reconcile__  _/ˈrekənsaɪl/_  v.调和,使和谐一致,相吻合; 使和好,调解  
__reconciliation__  _/ˌrekənsɪliˈeɪʃən/_  n.调和,一致  the action of making one view or belief compatible with another
线性协调  

跟传统的框架不同，Flutter 并没有采用 tree-diffing 算法，而是通过时间复杂度为 O(N) 的算法独立地检查每个 element 的子节点来决定 *whether to reuse elements*。

通常的做法是从新旧子列表的头部和尾部开始对每一个 Widget 的 `runtimeType` 和 `key` 进行匹配，这样就可能找出两个列表间不匹配的那块区域。然后将旧子列表中该范围内的子项根据它的 `key` 放入一个哈希表中。再遍历新的子列表以寻找该范围内能够匹配哈希表中的 `key` 的子项。无法匹配的旧子项会被丢弃，无法匹配的新子项需要调用 `newWidget.createElement()` 创建，匹配到的子项直接复用。

The child list reconciliation algorithm optimizes for the following cases:
* The old child list is empty
* The two lists are identical
* There is an insertion or removal of one or more widgets in exactly one place in the list
* If each list contains a widget with the same key, the two widgets are matched

以上描述地不是很清楚/精确，再概括下整个过程：
* 一个 Element 节点被标记为 `dirty = true`
* 调用 Element 节点对应的 Widget 实例的 `build()`
* 根据 `build()` 返回的 `List<Widget>` 和原有的 `List<Element>` 利用上面描述的逻辑进行调和，

```dart
abstract class ComponentElement extends Element {
  Element updateChild(Element child, Widget newWidget, dynamic newSlot) { }
}
abstract class RenderObjectElement extends Element {
  List<Element> updateChildren(
    List<Element> oldChildren,
    List<Widget> newWidgets,
    { Set<Element> forgottenChildren }
  ) {
    // 这里的代码用到了上面描述的算法
  }
}
```


### Tree surgery

__tree surgery__  对树做外科手术，这里特指利用 `GlobalKey` 特性实现的 element 跨级复用  
*Rreusing elements is so valuable* that Flutter supports *non-local tree mutations* that *preserve state and layout information*. `GlobalKey`s and non-local tree mutations are used extensively by developers to achieve effects such as hero transitions and navigation.

```dart
class Element {
  Element inflateWidget(Widget newWidget, dynamic newSlot) {
    final Key key = newWidget.key;
    if (key is GlobalKey) {
      fnial Element newChild = _retakeInactiveElement(key, newWidget);
      if (newChild != null) {
        // ...
        return updatedChild;
      }
      final Element newChild = newWidget.createElement();
    }
  }
}
```


### Constant-factor optimizations

__agnostic__  _/æɡˈnɒstɪk/_  a.不可知论者的 n.不可知论  
__paradigm__  _/ˈpærədaɪm/_  n.范式  

除了以上大的优化策略，下述优化也对性能产生了重大影响。

#### Child-model agnostic

跟其他多数框架不同，Flutter 的渲染树并没有对如何操作子成员做任何规定，也就是说，框架不作规定，子类可以自由发挥。譬如，`RenderBox` 只有一个抽象方法 `visitChildren()`，而不是给出具体的 `firstChild` `nextSibling` 之类的具体接口定义。

#### Visual render tree, logical widget tree

渲染树在计算布局时，是不考虑阅读方向(reading direction) 的，坐标系都是从左向右递增的。但实际应用中必须支持从右往左递增的这种需求，所以在 Widget 中是支持的，在信息从 widget tree 流向 render tree 的过程中会进行坐标系转换。

#### Text handled by a specialized render object

Flutter 引入了一个特别的 `RenderParagraph` render object 来处理文本，它始终处于渲染树的叶子节点位置。这主要是因为文本渲染的复杂性，通过 `RenderParagraph` 抽离文本渲染逻辑，确保了 `RenderObject` 系列的纯粹性。`RenderParagraph` 可规避非必要的文本重排，只要父节点给的约束信息没变，就不用重复计算。

#### Observable objects

Flutter 中同时使用了 观察者模型 和 响应式模式。很明显，响应式模式应用最为广泛，但在一些 leaf data structures 上也使用了观察者模型。如动画，`Animation` 会在值变化时通知观察者 `RenderObject`，所以很多动画可以直接跳过 build 阶段直接进行绘制。


### Separation of the Element and RenderObject trees

__isomorphic__  _/,aɪsə'mɔrfɪk/_  a.[数]同构的,同形态的  

Flutter 下面存在三棵树，部件树、元素树、渲染树。元素树是最核心的，渲染树只是它的一个衍生品，而部件树其实说成是“从开发人员视角看到的元素树”更为确切。严格上说，内存中不存在部件树，父子部件之间并没有建立关联。

The `RenderObject` and `Element` (Widget) trees in Flutter are isomorphic (strictly speaking, the `RenderObject` tree is a subset of the `Element` tree). An obvious simplification would be to combine these trees into one tree. However, in practice there are a number of benefits to having these trees be separate:

* Performance.
* Clarity.
* Type safety.





## Infinite Scrolling

### Viewport-aware layout

__viewport__  

### Building widgets on demand






__sliver__  

__parallax__  
__constraint__  


## API Ergonomics

此部分的大概在讲：你看我们的 API 设计的多屌，让你撸代码比鲁棒还爽！

__ergonomics__  人机工程学  
__paradigm__  _/ˈpærədaɪm/_  n.样板,范式  
__interpolation__  插值  


### Specializing APIs to match the developer's mindset

Flutter 的 API 设计是对开发者友好的，从开发者的视角(思维模式)来设计 API。

如 Flutter 没有对子元素进行具体的建模，开发者可以基于具体使用场景对 “一个元素可以接受什么样的子元素”，“支持什么样的子元素操作” 等进行具体设定。具体来说，`Widget` `Element` `RenderObject` 这3个顶层基类没有对子节点做具体的建模，每个子类（从这3个基类派生的类）可以根据自身特定对其子节点做具体规定。

再譬如，当用户想在 `row.children` 中插入一块动态扩容的空白时，第一想法可能是使用 `Expanded(child: SizedBox.shrink())`，但当他们搜索 space 时就会发现已经提供了现成的 `Spacer`。


### Explicit arguments

Widget 构造函数全部使用命名参数。当方法存在多个参数时，也更倾向使用命名参数，尤其是存在布尔型的参数时。

### Paving over pitfalls

对传参做到最大限度的容忍，能在内部处理的问题就不报错。

### Reporting error cases aggressively

尽早、详尽地报告错误。

### Reactive paradigm

*render tree 会对 widget tree 的变更作出响应*

Flutter 的渲染层(rendering layer) 是基于可变树实现的，这使得布局和绘制非常高效。但基于可变树的 API 存在一个问题，创建树和更新树的操作存在很大的差异。让开发直接操作渲染树的话不优雅也很容易出错。

Flutter 通过引入部件层(wigget layer)，将渲染树的创建和更新操作合并成了一步 (tree description setp `build()`)，开发人员只负责描述界面配置，以及在需要更新时提供新的配置信息，由框架负责渲染树的具体创建和更新动作。

### Interpolation

通过插值实现 A 状态到 B 状态的自然过渡动画。




