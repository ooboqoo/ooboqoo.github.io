# Flutter Widgests

<style>td:first-child { color: red; }</style>

https://flutter.dev/docs/development/ui/widgets

每个可见的组件的设计规范说明看这 https://material.io/components/ 实际设计页面时可以先在这找到组件，并通过链接找到 Flutter 中的实现。


## Core Widgets

Any app can use the widgets library but only Material apps can use the Material Components library.

|          | Material        | Cupertino
-----------|-----------------|-------------------------------------------------
App Setup  | `MaterialApp`   | `CupertinoApp`
Page Setup | `Scaffold`      | `CupertinoPageScaffold`
Appbar     | `AppBar`        | `CupertinoNavigationBar`




|                     | Standard                    | Material
----------------------|-----------------------------|---------------------------------------
Layout                | `Container` `Row` `Column`  |
Row / Column Children | `Flexible` `Expanded`
Content Containers    | `Stack`                     | `Card`
Repeat Elements       |  `ListView` `GridView`      | `ListTile`
Content Types         | `Text` `Image` `Icon`
User Input            | `Form` `FormField` `GestureDectector` | `TextField` `Radio` `Checkbox` <br> `Switch` `Slider` `InkWell` <br> `IconButton` `RaisedButton` `FlatButton` <br> `DropdownButton` `FloatingActionButton`


`SingleChildScrollView`

`ClipRRect`
 

`DecoratedBox`


`SizedBox`





### App / Page Setup

|||
----------------------|------------
MaterialApp           | 
CupertinoApp          | 
Scaffold              | 
CupertinoPageScaffold | 

MaterialApp / CupertinoApp
* Typically the root widget in your app
* Does a lot of “behind-the-scenes” setup work for your app
* Allows you to configure a global theme for your app
* Sets up navigation behavior (e.g. animations) for your app

Scaffold / CupertinoPageScaffold
* Typically used as a frame for a page in your app
* Provides a background, app bar, navigation tabs, etc
* Only use one scaffold per page!


|||
-------------|--------------------------------------------------------------------------------------------
AppBar       | a horizontal bar typically shown at the top of an app
BottomAppBar | a horizontal bar typically shown at the bottom of an app
FloatingActionButton | a circular button typically shown in the bottom right corner of the app
Drawer       | a vertical panel that is typically displayed to the left of the body (and often hidden on phones)
BottomNavigationBar  | a horizontal array of buttons typically shown along the bottom of the app
SnackBar     | a temporary notification typically shown near the bottom of the app using the `ScaffoldState.showSnackBar()`
BottomSheet  | an overlay typically shown near the bottom of the app. A bottom sheet can either be persistent, in which case it is shown using the `ScaffoldState.showBottomSheet()` method, or modal, in which case it is shown using the `showModalBottomSheet()` function




### Layout

||||
------------|----------|----------------------------------------------------------------------------------
Container   | Standard | Adds padding, margins, borders, background color, or other decorations to a widget
Row         | Standard | 
Column      | Standard | 


PS : Some widgets don't have a const constructor at all. Such as Container. But in the case of Container you could simply use a DecoratedBox instead, which is basically what Container use under the hood. The advantage here is that DecoratedBox do have a const constructor.

Container
* Extremely versatile widget!
* Can be sized (width, height, maxWidth, maxHeight), styled (border, color, shape, ...) and more
* Can take a child (but doesn’t have to) which you also can align in different ways
* You’ll use this widget quite often

Container
* Add padding, margins, borders
* Change background color or image
* Contains a single child widget, but that child can be a Row, Column, or even the root of a widget tree

```dart
Widget _buildImageColumn() => Container(
  decoration: BoxDecoration(color: Colors.black26, ),
  child: Column(
    children: [
      _buildImageRow(1),
      _buildImageRow(3),
    ],
  ),
);
```


Row / Column
* Must-use if you need multiple widgets sit next to each other horizontally or vertically
* Limited styling options => Wrap with a Container (or wrap child widgets) to apply styling
* Children can be aligned along main-axis and cross-axis (see separate cheat sheet)

The `MainAxisAlignment` and `CrossAxisAlignment` classes offer a variety of constants for controlling alignment.

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Image.asset('images/pic1.jpg'),
    Image.asset('images/pic2.jpg'),
  ],
);
```

### Row / Column Children

|||
------------|------------
Flexible    | 
Expanded    | expands a child of a `Row`, `Column`, or `Flex` so that the child fills the available space

Flexible / Expanded
* Also see separate cheat sheet attached to lecture about Row / Column / Flexible / Expanded
* Helps you size the child widgets of Row / Column

```dart
Row(
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Expanded(child: Image.asset('images/pic1.jpg'), ),
    Expanded(flex: 2, child: Image.asset('images/pic2.jpg'), ),
    Expanded(child: Image.asset('images/pic3.jpg'), ),
  ],
);
```


### Content Containers

||||
---------|----------|--------------------------------------
Stack    | Standard | Overlaps a widget on top of another
Card     | Material | Organizes related info into a box with rounded corners and a drop shadow

Stack
* Used to position items on top of each other (along the Z axis)
* Widgets can overlap
* You can position items in absolute space (i.e. in a coordinate space) via the Positioned() widget

Card
* A container with some default styling (shadow, background color, rounded corners)
* Can take one child (can be anything)
* Typically used to output a single piece / group of information

### Repeat Elements

`Row` and `Column` are basic primitive widgets for horizontal and vertical layouts—these low-level widgets allow for maximum customization. Flutter also offers specialized, higher level widgets that might be sufficient for your needs. For example, instead of `Row` you might prefer `ListTile`, an easy-to-use widget with properties for leading and trailing icons, and up to 3 lines of text. Instead of `Column`, you might prefer `ListView`, a column-like layout that automatically scrolls if its content is too long to fit the available space.


||||
----------|----------|--------------------------------------
ListView  | Standard | Lays widgets out as a scrollable list
GridView  | Standard | Lays widgets out as a scrollable grid
ListTile  | Material | Organizes up to 3 lines of text, and optional leading and trailing icons, into a row

ListView / GridView
* Used to output lists (or grids) of items
* Like a Column() but scrollable (Column is not)
* Can be laid out vertically (default) and horizontally
* Use ListView.builder() to get optimized item rendering for very long lists

ListTile
* A pre-styled container / Row() that allows you to achieve a typical “list-item look”
* Offers various slots for widgets (e.g. at the beginning, a title, at the end)
* Not a must-use but can be handy for a default list-item look

### Content Types

|||
-------|------------
Text   | 
Image  | 
Icon   | 

Text
* A widget that simply outputs some text on the screen
* Text can be styled (font family, font weight, font size etc)
* Text behavior can be controlled (e.g. clipping if it’s too long)

Image
* Used to render an image on the screen
* Supports different sources (included in app, web image, ...)
* Can be configured to size itself in different ways into a wrapping container

Icon
* Renders an Icon onto the screen
* Flutter ships with many default Material (Android) and iOS icons which you can use
* There also is an IconButton() widget in case you need a button with an icon

### User Input

|||
----------------|------------
TextField       | 
RaisedButton    | 
FlatButton      | 
GestureDetector | 实现用户交互的功能
InkWell         | 在 GestureDetector 的基础上添加了视觉反馈

TextField
* Renders an editable text field where the user can enter (type) information
* Many, many configuration options (e.g. autocorrection, error messages, labels, styles)
* Supports different kinds of keyboard (email, number, normal text, ...)

RaisedButton / FlatButton / IconButton
* Differently styled buttons that handle user taps
* A custom function that should execute upon a tap can (and has to be) provided
* Can be styled / customized

GestureDetector / InkWell
* GestureDetector allows you to wrap ANY widget with touch listeners (e.g. double tap, long tap)
* InkWell does the same but adds a visual ripple effect upon touches (effect can be configured)
* You can build your own buttons / touchable widgets with these widgets


```dart
String title;

TextField(
  decoration: InputDecoration(labelText: 'Amount'),
  onChanged: (val) {
    amountInput = val;
  },
)
```

```dart
final titleController = TextEditingController();

TextField(
  decoration: InputDecoration(labelText: 'Title'),
  controller: titleController,
)
```





