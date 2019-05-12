# react-native-vector-icons

https://github.com/oblador/react-native-vector-icons

## Installation

1. Run: `$ npm install react-native-vector-icons --save`
2. For each platform (iOS/Android/Windows) you plan to use, follow one of the options for the corresponding platform.

### Android

#### Option: With Gradle (recommended)

This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

To customize the files being copied, add the following instead:

```
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```


## `Icon` Component
You can either use one of the bundled icons above or roll your own custom font. 

```js
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
```

### Properties
Any [Text property](http://facebook.github.io/react-native/docs/text.html) and the following: 

| Prop      |                                  Description                           |  Default  |
|-----------|------------------------------------------------------------------------|-----------|
|**`size`** |Size of the icon, can also be passed as `fontSize` in the style object. |    `12`   |
|**`name`** |What icon to show, see Icon Explorer app or one of the links above.     |   *None*  |
|**`color`**|Color of the icon.                                                      |*Inherited*|

### Styling
Since `Icon` builds on top of the `Text` component, most [style properties](http://facebook.github.io/react-native/docs/style.html) will work as expected, you might find it useful to play around with these:

* `backgroundColor`
* `borderWidth`
* `borderColor`
* `borderRadius`
* `padding`
* `margin`
* `color`
* `fontSize`

NOTE: On android `Text` doesn't currently support `border*` styles, to circumvent this simply wrap your `Icon` with a `View`.  

By combining some of these you can create for example : 

![type](https://cloud.githubusercontent.com/assets/378279/7667570/33817554-fc0d-11e4-9ad7-4eb60139cfb7.png)
![star](https://cloud.githubusercontent.com/assets/378279/7667569/3010dd7e-fc0d-11e4-9696-cb721fe8e98d.png)

## `Icon.Button` Component
A convenience component for creating buttons with an icon on the left side. 

```
import Icon from 'react-native-vector-icons/FontAwesome';
const myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

const customTextButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998">
    <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
  </Icon.Button>
);
```

![buttons](https://cloud.githubusercontent.com/assets/378279/7667568/2e9021b2-fc0d-11e4-8e68-cf91c329a6f4.png)

### Properties

Any [`Text`](http://facebook.github.io/react-native/docs/text.html), [`TouchableHighlight`](http://facebook.github.io/react-native/docs/touchablehighlight.html) or [`TouchableWithoutFeedback`](http://facebook.github.io/react-native/docs/touchablewithoutfeedback.html) property in addition to these:

| Prop          | Description | Default |
|---------------|-------------|---|
|**`color`**    |Text and icon color, use `iconStyle` or nest a `Text` component if you need different colors.|`white`|
|**`size`**     |Icon size.                                                                     |`20`|
|**`iconStyle`**|Styles applied to the icon only, good for setting margins or a different color.|`{marginRight: 10}`|
|**`backgroundColor`**|Background color of the button.                     |`#007AFF`|
|**`borderRadius`**   |Border radius of the button, set to `0` to disable. |   `5`   |
|**`onPress`**        |A function called when the button is pressed.       |  *None* |

## Usage as PNG image/source object

Convenient way to plug this in into other components that rely on bitmap images rather than scalable vector icons. Takes the arguments `name`, `size` and `color` as described above.

```
Icon.getImageSource('user', 20, 'red').then((source) => this.setState({ userIcon: source }));
```

For a complete example check out the `TabBarExample` project.
