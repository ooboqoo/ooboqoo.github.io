# Webpack 概念

https://doc.webpack-china.org/concepts/



本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### 入口 entry


### 输出 output


### loader


### 插件 plugins




## Asset Management

webpack 最酷的特点是，不仅可以打包 js 文件，还可以打包 .css .jpg .woff .xml 等资源。

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
      {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
      {test: /\.(csv|tsv)$/, use: ['csv-loader']},
      {test: /\.xml$/, use: ['xml-loader']},
    ]
  }
};
```

src/index.js

```js
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
```

src/style.css

```css
@font-face {
  font-family: 'MyFont';
  src:  url('./my-font.woff2') format('woff2'),
        url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

.hello {
  color: red;
  font-family: 'MyFont';
  background: url('./icon.png');
}
```

webpack 这一特性，给资源组织带来了新的变化，资源可以以组件形式组织，而不再需要像以前一样依赖全局的资源目录。

```diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png 
```


