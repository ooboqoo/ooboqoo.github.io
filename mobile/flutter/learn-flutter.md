# Learn Flutter



## Widget & Flutter Internals


* Widget Tree    Configuration(rebuilds frequently)
* Element Tree   Links widgets with rendered objects(rarely rebuilds)
* Render Tree    Rendered objects on the screen(rarely rebuilds)

state 对象是挂在 Element 上的，而不是 Widget 上。调用 `setState` 时，会调用 `build` 重新生成 Widget 节点，而 Element 并不需要重新生成，只需更新下到新 Widget 节点的引用即可。


`key` 属性


## 

### Navigation Basics

* Screens(or Routes, Pages) are just widgets
* Flutter Navigator allows you to switch (push/pop/replace) between pages
* named routes and unnamed routes

### Passing Data

* Data can be passed between pages via arguments
* Data can be passed back too(via Future)
* Data can be anything

### Tabs

* You can add tabs in the AppBar or at the bottom of the page
* Tabs allow you to switch between different stacks(i.e. no popping)

### Drawers & Dialogs

* Drawers (side muenus) also allow you to switch between different stacks
* Drawers and other dialogs (e.g. alerts, modal bottom sheet) can be closed via Navigator.pop()


### Flutter Interact 2019

When debugging layout issues, the key fields to look at are the size and constraints fields. The constraints flow down the tree, and the sizes flow back up.


github/samples
flutter.dev
meterial theming
google fonts
rive



