# Building Layouts


## Diagram the layout

The first step is to break the layout down to its basic elements:

* Identify the rows and columns.
* Does the layout include a grid?
* Are there overlapping elements?
* Does the UI need tabs?
* Notice areas that require alignment, padding, or borders.






## Creating responsive apps

https://flutter.dev/docs/development/ui/layout/responsive

There are two basic approaches to creating Flutter apps with responsive design:

#### Use the `LayoutBuilder` class

From its `builder` property, you get a `BoxConstraints` object. Examine the constraint’s properties to decide what to display. For example, if your `maxWidth` is greater than your width breakpoint, return a `Scaffold` object with a row that has a list on the left. If it’s narrower, return a `Scaffold` object with a drawer containing that list. You can also adjust your display based on the device’s height, the aspect ratio, or some other property. When the constraints change (for example, the user rotates the phone, or puts your app into a tile UI in Nougat), the build function runs.

#### Use the `MediaQuery.of()` method in your build functions

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

