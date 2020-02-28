# Flutter SDK API

https://api.flutter.dev/


## Libraries

```dart
import 'package:flutter/gestures.dart';
import 'package:flutter/widgets.dart';

```



## Dart



## Framework

_flutter/lib/src/widgets/framework.dart_

__inflate__  _/ɪnˈfleɪt/_  v.使充气,使膨胀; 抬高(物价); 吹嘘  
__diagnostic__  _/ˌdaɪəɡˈnɒstɪk◂/_  a.(用于)诊断的  
__a constellation of__  _/ˌkɒnstəˈleɪʃən/_  一群,一组  
__concrete__  _/ˈkɒŋkriːt/_  n.混凝土 a.具体的  

### Key

Generally, a widget that is the only child of another widget does not need an explicit key.

Using a `GlobalKey` as the widget's `key` allows the element to be moved around the tree (changing parent) *without losing state*. When a new widget is found (its key and type do not match a previous widget in the same location), but there was a widget with that same global key elsewhere in the tree in the previous frame, then that widget's element is *moved to* the new location.

```dart
export 'package:flutter/foundation.dart' show Key, LocalKey, ValueKey;
class UniqueKey extends LocalKey { }
class ObjectKey extends LocalKey { }
abstract class GlobalKey<T extends State<StatefulWidget>> extends Key { }
```

### Widget

__defunct__  _/dɪˈfʌŋkt/_  a.不再存在的,停止运作的  

`Widget` describes the configuration for an `Element`.

Widgets can be inflated into elements, which manage the underlying render tree.

Widgets themselves have no mutable state (all their fields must be `final`).

If you wish to associate mutable state with a widget, consider using a `StatefulWidget`, which creates a `State` object via `StatefulWidget.createState()` whenever it is inflated into an element and incorporated into the tree.

A given widget can be included in the tree zero or more times. Each time a widget is placed in the tree, it is inflated into an `Element`.

The `key` property controls how one widget replaces another widget in the tree. If the `runtimeType` and`key` properties of the two widgets are `operator==`, respectively, then the new widget replaces the old widget by updating the underlying element by calling `Element.update()` with the new widget. Otherwise, the old element is removed from the tree, the new widget is inflated into an element, and the new element is inserted into the tree.

```dart
// WIDGETS
abstract class Widget extends DiagnosticableTree {
  @protected Element createElement();
  static bool canUpdate(Widget oldWidget, Widget newWidget) { }
}
```

A `StatelessWidget` is a widget that describes part of the user interface by building a constellation of other widgets that describe the user interface more concretely. The building process continues recursively until the description of the user interface is fully concrete (e.g., consists entirely of `RenderObjectWidget`s, which describe concrete `RenderObject`s).

`StatelessWidget.build()` *must only depend on*: the fields of the widget, which themselves must not change over time, and any ambient state obtained from the `context` using `BuildContext.dependOnInheritedWidgetOfExactType()`.

```dart
abstract class StatelessWidget extends Widget {
  const StatelessWidget({ Key key }) : super(key: key);
  @override StatelessElement createElement() => StatelessElement(this);
  @protected Widget build(BuildContext context);
}
```

`State` is information that (1) can be read synchronously when the widget is built and (2) might change during the lifetime of the widget. It is the responsibility of the widget implementer to ensure that the `State` is promptly notified when such state changes, using `State.setState()`.

`StatefulWidget` instances themselves are immutable and store their mutable state either in separate `State` objects that are created by the `createState` method, or in objects to which that `State` subscribes, for example `Stream` or `ChangeNotifier` objects, to which references are stored in final fields on the `StatefulWidget` itself.

```dart
abstract class StatefulWidget extends Widget {
  const StatefulWidget({ Key key }) : super(key: key);
  @override StatefulElement createElement() => StatefulElement(this);
  @protected State createState();
}

enum _StateLifecycle { created, initialized, ready, defunct, }
abstract class State<T extends StatefulWidget> extends Diagnosticable {
  BuildContext get context => _element;
  StatefulElement _element;
  @protected void setState(VoidCallback fn) {
    // ...
    _element.markNeedsBuild();
  }
}
```

```dart
abstract class ProxyWidget extends Widget {
  const ProxyWidget({ Key key, @required this.child }) : super(key: key);
  final Widget child;
}
abstract class InheritedWidget extends ProxyWidget {
  const InheritedWidget({ Key key, Widget child }) : super(key: key, child: child);
  @override InheritedElement createElement() => InheritedElement(this);
  @protected bool updateShouldNotify(covariant InheritedWidget oldWidget);
}
```


```dart
abstract class RenderObjectWidget extends Widget {
  @override RenderObjectElement createElement();
  @protected RenderObject createRenderObject(BuildContext context);
  @protected void updateRenderObject(BuildContext context, covariant RenderObject renderObject) { }
  @protected void didUnmountRenderObject(covariant RenderObject renderObject) { }
}
```



### Element

```dart
enum _ElementLifecycle { initial, active, inactive, defunct, }
abstract class BuildContext {
  // ...
}
abstract class Element extends DiagnosticableTree implements BuildContext {
  Element _parent;
  @override bool operator ==(Object other) => identical(this, other);
  dynamic get slot => _slot;
  int get depth => _depth;
  Widget get widget => _widget;  // The configuration for this element.
  BuildOwner get owner => _owner;

  bool _debugIsInScope(Element target) {
    Element current = this;
    while (current != null) {
      if (target == current)
        return true;
      current = current._parent;
    }
    return false;
  }

  @mustCallSuper
  void mount(Element parent, dynamic newSlot) {
    assert(_debugLifecycleState == _ElementLifecycle.initial);
    assert(widget != null);
    assert(_parent == null);
    assert(parent == null || parent._debugLifecycleState == _ElementLifecycle.active);
    assert(slot == null);
    assert(depth == null);
    assert(!_active);
    _parent = parent;
    _slot = newSlot;
    _depth = _parent != null ? _parent.depth + 1 : 1;
    _active = true;
    if (parent != null) // Only assign ownership if the parent is non-null
      _owner = parent.owner;
    if (widget.key is GlobalKey) {
      final GlobalKey key = widget.key;
      key._register(this);
    }
    _updateInheritance();
    assert(() {
      _debugLifecycleState = _ElementLifecycle.active;
      return true;
    }());
  }

  @override
  T dependOnInheritedWidgetOfExactType<T extends InheritedWidget>({Object aspect}) {
    assert(_debugCheckStateIsActiveForAncestorLookup());
    final InheritedElement ancestor = _inheritedWidgets == null ? null : _inheritedWidgets[T];
    if (ancestor != null) {
      assert(ancestor is InheritedElement);
      return dependOnInheritedElement(ancestor, aspect: aspect);
    }
    _hadUnsatisfiedDependencies = true;
    return null;
  }
}
abstract class ComponentElement extends Element { }
class StatelessElement extends ComponentElement { }
class StatefulElement extends ComponentElement {
  StatefulElement(StatefulWidget widget) : _state = widget.createState(), super(widget) {
    _state._element = this;
    _state._widget = widget;
  }
  @override Widget build() => state.build(this);
  State<StatefulWidget> get state => _state;
}
abstract class ProxyElement extends ComponentElement { }
class InheritedElement extends ProxyElement { }
abstract class RenderObjectElement extends Element { }
```



## Foundation

### ChangeNotifier

文档里有说明 dispatching notifications 时时间复杂度时 O(N<sup>2</sup>)，这个主要是为了实现：”dispatching 过程中添加的 listener 本轮不生效，删除的本轮立即生效“，正常页面运行中 listener 没几个，也就是 `List.from()` 套 `List.contain()`，总工作量很小，对性能没啥影响。




