# Webpack4

https://webpack.js.org/guides/  
https://doc.webpack-china.org/concepts/


## Getting Started

```bash
$ mkdir webpack-demo && cd webpack-demo
$ npm init -y
$ npm install --save-dev webpack   # 推荐安装到项目目录下
$ npm run build  # 在创建以下文件后运行 webpack 打包
```

dist/index.html

```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
 </html>
```

src/index.js

```js
function component() {
  var element = document.createElement('div');
  element.innerHTML = 'Hello webpack';
  return element;
}
document.body.appendChild(component());
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

package.json

```js
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```


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


