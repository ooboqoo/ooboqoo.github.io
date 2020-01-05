# Properties



## Flex

```dart
// flex.dart  包含 `Row` `Column` `Flex` 这些弹性布局部件使用的一些属性值
class RenderFlex extends RenderBox {
  RenderFlex({
    List<RenderBox> children,
    Axis direction = Axis.horizontal,
    MainAxisSize mainAxisSize = MainAxisSize.max,
    MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
    CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
    TextDirection textDirection,
    VerticalDirection verticalDirection = VerticalDirection.down,
    TextBaseline textBaseline,
  });
}

enum MainAxisSize {min, max}
enum MainAxisAlignment {start, end, center, spaceBetween, spaceAround, spaceEvenly}
enum CrossAxisAlignment {start, end, center, stretch, baseline}
```

```dart
// flutter/lib/src/painting/basic_types.dart
enum Axis {horizontal, vertical}
VerticalDiretion {up, down}
AxisDirection {up, right, down, left}
```



## Box

*flutter/lib/src/painting/edge_insets.dart*

```dart
/// An immutable set of offsets in each of the four cardinal directions.
class EdgeInsets {
  const EdgeInsets.fromLTRB(this.left, this.top, this.right, this.bottom);
  const EdgeInsets.all(double value);
  const EdgeInsets.only({this.left = 0.0, this.top = 0.0, this.right = 0.0, this.bottom = 0.0});
  const EdgeInsets.symmetric({double vertical = 0.0, double horizontal = 0.0});
  EdgeInsets.fromWindowPadding(ui.WindowPadding padding, double devicePixelRatio);
}
```

### BoxDecoration

*flutter/lib/src/painting/box_decoration.dart*

```dart
/// An immutable description of how to paint a box.
class BoxDecoration extends Decoration {
  const BoxDecoration({
    this.color,          // background color
    this.image,          // background image
    this.border,
    this.borderRadius,
    this.boxShadow,
    this.gradient,
    this.backgroundBlendMode,
    this.shape = BoxShape.rectangle,
  });

  /// Creates a copy of this object but with the given fields replaced with the new values.
  BoxDecoration copyWith({
    Color color,
    DecorationImage image,
    BoxBorder border,
    BorderRadiusGeometry borderRadius,
    List<BoxShadow> boxShadow,
    Gradient gradient,
    BlendMode backgroundBlendMode,
    BoxShape shape,
  }) {
    return BoxDecoration(
      color: color ?? this.color,
      image: image ?? this.image,
      border: border ?? this.border,
      borderRadius: borderRadius ?? this.borderRadius,
      boxShadow: boxShadow ?? this.boxShadow,
      gradient: gradient ?? this.gradient,
      backgroundBlendMode: backgroundBlendMode ?? this.backgroundBlendMode,
      shape: shape ?? this.shape,
    );
  }
}
```

*flutter/lib/src/painting/border_radius.dart*

```dart
class BorderRadius extends BorderRadiusGeometry {
  const BorderRadius.all(Radius radius);
  BorderRadius.circular(double radius) : this.all(Radius.circular(radius));
  const BorderRadius.vertical({Radius top = Radius.zero, Radius bottom = Radius.zero});
  const BorderRadius.horizontal({Radius left = Radius.zero, Radius right = Radius.zero});
  const BorderRadius.only({
    this.topLeft = Radius.zero,
    this.topRight = Radius.zero,
    this.bottomLeft = Radius.zero,
    this.bottomRight = Radius.zero,
  });
}
```

*flutter/lib/src/painting/box_border.dart*

```dart
enum BoxShape {rectangle, circle}

class Border extends BoxBorder {
  const Border({this.top, this.right, this.bottom, this.left});  // 全部带 = BorderSide.none
  factory Border.all({
    Color color = const Color(0xFF000000),
    double width = 1.0,
    BorderStyle style = BorderStyle.solid,
  }) {
    final BorderSide side = BorderSide(color: color, width: width, style: style);
    return Border.fromBorderSide(side);
  }
}
```

*flutter/lib/src/painting/borders.dart*

```dart
enum BorderStyle { none, solid }

@immutable
class BorderSide {
  this.color = const Color(0xFF000000),
  this.width = 1.0,
  this.style = BorderStyle.solid,
}
```

*flutter/lib/src/painting/box_fit.dart*

```dart
enum BoxFit {fill, contain, cover, fitWidth, fitHeight, none, scaleDown}
```

*flutter/lib/src/painting/gradient.dart*

```dart
class Gradient {}
class LinearGradient {
  const LinearGradient({
    this.begin = Alignment.centerLeft,
    this.end = Alignment.centerRight,
    @required List<Color> colors,
    List<double> stops,
    this.tileMode = TileMode.clamp,
    GradientTransform transform,
  });
}
class RadialGradient {
  const RadialGradient({
    this.center = Alignment.center,
    this.radius = 0.5,
    @required List<Color> colors,
    List<double> stops,
    this.tileMode = TileMode.clamp,
    this.focal,
    this.focalRadius = 0.0,
    GradientTransform transform,
  });
}
```



## TextStyle

```dart
// dart.ui
class TextStyle {
  TextStyle({
    Color color,
    TextDecoration decoration,
    Color decorationColor,
    TextDecorationStyle decorationStyle,
    double decorationThickness,
    FontWeight fontWeight,
    FontStyle fontStyle,
    TextBaseline textBaseline,
    String fontFamily,
    List<String> fontFamilyFallback,
    double fontSize,
    double letterSpacing,
    double wordSpacing,
    double height,
    Locale locale,
    Paint background,
    Paint foreground,
    List<Shadow> shadows,
    List<FontFeature> fontFeatures,
  });
}

enum FontStyle {normal, italic}
class FontWeight { /* w100, w200, w300, w400, w500, w600, w700, w800, w900, normal=w400, bold=w700 */}
enum TextAlign {left, right, center, justify, start, end}
enum TextBaseline {alphabetic, ideographic}
class TextDecoration { /* none, underline, overline, lineThrough */}
enum TextDecorationStyle {solid, double, dotted, dashed, wavy}
enum TextDirection {rtl, ltr}
enum PlaceholderAlignment {baseline, aboveBaseline, belowBaseline, top, bottom, middle}
```

```dart
class ParagraphStyle {
  ParagraphStyle({
    TextAlign textAlign,
    TextDirection textDirection,
    int maxLines,
    String fontFamily,
    double fontSize,
    double height,
    FontWeight fontWeight,
    FontStyle fontStyle,
    StrutStyle strutStyle,
    String ellipsis,
    Locale locale,
  });
}
```


## MediaQuery

*flutter/lib/src/widgets/media_query.dart*

```dart
enum Orientation { portrait, landscape }

class MediaQueryData {
  MediaQueryData.fromWindow(ui.Window window)
    : size = window.physicalSize / window.devicePixelRatio,
      devicePixelRatio = window.devicePixelRatio,
      textScaleFactor = window.textScaleFactor,
      platformBrightness = window.platformBrightness,
      padding = EdgeInsets.fromWindowPadding(window.padding, window.devicePixelRatio),
      viewPadding = EdgeInsets.fromWindowPadding(window.viewPadding, window.devicePixelRatio),
      viewInsets = EdgeInsets.fromWindowPadding(window.viewInsets, window.devicePixelRatio),
      systemGestureInsets = EdgeInsets.fromWindowPadding(window.systemGestureInsets, window.devicePixelRatio),
      physicalDepth = window.physicalDepth,
      accessibleNavigation = window.accessibilityFeatures.accessibleNavigation,
      invertColors = window.accessibilityFeatures.invertColors,
      disableAnimations = window.accessibilityFeatures.disableAnimations,
      boldText = window.accessibilityFeatures.boldText,
      highContrast = false,
      alwaysUse24HourFormat = window.alwaysUse24HourFormat;
}

class MediaQuery extends InheritedWidget {}
```

