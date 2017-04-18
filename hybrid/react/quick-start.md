# 入门基础

## Hello World

```
import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';

class HelloWorldApp extends Component {
  render() { return <Text>Hello world!</Text>; }
}

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```

AppRegistry 模块用来告知 React Native 哪一个组件被注册为整个应用的根容器。一般在整个应用里 AppRegistry.registerComponent 只调用一次。

## `props` &amp; `state`

大多数组件在创建时就可以使用各种参数来进行定制。用于定制的这些参数就称为属性 props。

以常见的基础组件 `Image` 为例，可传入一个名为 source 的 prop 来指定图片地址，以及使用名为 style 的 prop 来控制尺寸。

```
render() {
  let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
  return <Image source={pic} style={{width: 193, height: 110}} />;
}
```

自定义的组件也可以使用 props。属性可以尽量提高自定义组件的复用范畴。只需在 render 函数中引用 this.props，然后按需处理即可。

```
class Greeting extends Component {
  render() {
    return <Text>Hello {this.props.name}!</Text>;
  }
}
```

`props` 是在父组件中指定，而且一经指定，在被指定的组件生命周期中不再改变。对于需要改变的数据，我们需要使用 `state`。

```
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    setInterval(() => {
      this.setState(previousState => {
        return {showText: !previousState.showText};
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return <Text>{display}</Text>;
  }
}
```


## 样式


