# Building Layouts


> Widgets are classes used to build UIs.  
> Widgets are used for both layout and UI elements.  
> Compose simple widgets to build complex widgets.  

The core of Flutter’s layout mechanism is widgets. In Flutter, almost everything is a widget—even layout models are widgets.



## Diagram the layout

The first step is to break the layout down to its basic elements:

* Identify the rows and columns.
* Does the layout include a grid?
* Are there overlapping elements?
* Does the UI need tabs?
* Notice areas that require alignment, padding, or borders.



## Lay out a widget

```dart
// Non-Material apps
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white),
      child: Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 32,
            color: Colors.black87,
          ),
        ),
      ),
    );
  }
}
```



## Lay out multiple widgets vertically and horizontally

One of the most common layout patterns is to arrange widgets vertically or horizontally. You can use a `Row` widget to arrange widgets horizontally, and a `Column` widget to arrange widgets vertically.


## Common layout widgets

### Container

```dart
Widget _buildImageColumn() => Container(
  decoration: BoxDecoration(
    color: Colors.black26,
  ),
  child: Column(
    children: [
      _buildImageRow(1),
      _buildImageRow(3),
    ],
  ),
);
```

### GridView

```dart
Widget _buildGrid() => GridView.extent(
    maxCrossAxisExtent: 150,
    padding: const EdgeInsets.all(4),
    mainAxisSpacing: 4,
    crossAxisSpacing: 4,
    children: _buildGridTileList(30));

// The images are saved with names pic0.jpg, pic1.jpg...pic29.jpg.
// The List.generate() constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Container> _buildGridTileList(int count) => List.generate(
    count, (i) => Container(child: Image.asset('images/pic$i.jpg')));
```

### ListView

### Stack

### Card

### ListTile




## Box constraints

Generally, there are three kinds of boxes, in terms of how they handle their constraints:
* be as big as possible, e.g.  `Center` and `ListView`.
* be the same size as their children, e.g. `Transform` and `Opacity`.
* be a particular size, e.g. `Image` and `Text`.

Some widgets, e.g. `Container`, vary from type to type based on their constructor arguments. `Container` defaults to  be as big as possible, but if you give it a width, it tries to honor that.

### Unbounded constraints

A box that tries to be as big as possible won’t function usefully when given an unbounded constraint and, in debug mode, such a combination throws an exception that points to this file.

If you nest a vertically scrolling `ListView` inside a horizontally scrolling `ListView`, the inner one tries to be as wide as possible, which is infinitely wide.

### Flex

Flex boxes themselves (`Row` and `Column`) behave differently based on whether they are in bounded constraints or unbounded constraints in their given direction. In bounded constraints, they try to be *as big as possible* in that direction. In unbounded constraints, they try to *fit their children* in that direction. 


## Creating responsive apps

https://flutter.dev/docs/development/ui/layout/responsive

* In responsive UI we don’t use hard-coded values for dimension and positions.
* Use `MediaQuery` to get the real-time size of the window.
* Use `Flexible` and `Expanded` widgets to get a flexible UI that works with percentage.
* Use `LayoutBuilder` to get the `ConstraintBox` of the parent widget.
* You can get the orientation of the device using `MediaQuery` or `OrientationBuilder`.

There are two basic approaches to creating Flutter apps with responsive design:

### Use the `LayoutBuilder` class

From its `builder` property, you get a `BoxConstraints` object. Examine the constraint’s properties to decide what to display. For example, if your `maxWidth` is greater than your width breakpoint, return a `Scaffold` object with a row that has a list on the left. If it’s narrower, return a `Scaffold` object with a drawer containing that list. You can also adjust your display based on the device’s height, the aspect ratio, or some other property. When the constraints change (for example, the user rotates the phone, or puts your app into a tile UI in Nougat), the build function runs.

### Use the `MediaQuery.of()` method in your build functions

This gives you the size, orientation, etc, of your current app. This is more useful if you want to make decisions based on the complete context rather than on just the size of your particular widget. Again, if you use this, then your build function automatically runs if the user somehow changes the app’s size.

Other useful widgets and classes for creating a responsive UI:

AspectRatio
CustomSingleChildLayout
CustomMultiChildLayout
FittedBox
FractionallySizedBox
LayoutBuilder
MediaQuery
MediaQueryData
OrientationBuilder

