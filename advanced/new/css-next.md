# CSS Next

<style>h2 code, h3 code { color: #39B549; font-size: .75em; }</style>
<script>ooboqoo.contentsRegExp = /H[123]/;</script>

## Custom properties (CSS variables)  `C49 / E16 / S09 / F31`

https://medium.freecodecamp.org/everything-you-need-to-know-about-css-variables

```css
/* 定义变量  `--` 开头 */
:root {
  --main-bg-color: brown;
}

/* 使用变量  var() 函数 */
div {
  background-color: var(--main-bg-color);
}
```

CSS variables are resolved with the normal inheritance and cascade rules.

```html
<!-- 基本用法 -->
<style>
  div { --color: red; }
  .red { color: var(--color); }
</style>
<body>
  <div>some text in div</div>                 // 这里的颜色为默认色
  <div class="red">some text in div.red</div> // 这里的文字显示为红色
</body>
```

```html
<!-- 行内定义示例 -->
<html style="--color: red">
  <style>
    body { color: var(--color) }
  </style>
</html>
```

```html
<!-- 层叠计算规则依然有效 -->
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>
<body>
  <p>What's my color?</p>  // blue
  <div>and me?</div>       // green
  <div id='alert'>
    What's my color too?   // red
    <p>color?</p>          // red
  </div>
</body>
```

无效值的处理

```css
:root { --color: 20px; }
p { background-color: red; }
/*1*/ p { background-color: var(--color); } /* 因为 20px 是无效的，最终计算结果会取默认值 transparent */
/*2*/ p { background-color: 20px; } /* 注意，如果是这样直接指定无效值，则会被忽略，最终计算结果是上面的 red */
```

Be Careful While Building Single Tokens

```css
--size: 20;
font-size: var(--size)px; /* 计算结果是 '20 px' 注意中间的空格，这是无效的 */
font-size: calc(var(--size) * 1px) /* 这样的计算结果是 '20px' 是有效的 */
```

#### 项目示例

Project 1: Creating Component Variations using CSS Variables

```css
/* 不适用变量的版本 */
.btn {
  padding: 2rem 4rem;
  border: 2px solid black;
  background: transparent;
  font-size: 0.6em;
  border-radius: 2px;
}
.btn:hover {
  cursor: pointer;
  background: black;
  color: white;
}

.btn.red {
  border-color: red
}
.btn.red:hover {
  background: red
}
.btn.green {
  border-color: green
}
.btn.green:hover {
  background: green
}

/* 使用变量的版本 */
.btn {
  padding: 2rem 4rem;
  border: 2px solid var(--color, black);
  background: transparent;
  font-size: 0.6em;
  border-radius: 2px;
 }
 .btn:hover {
  cursor: pointer;
  background: var(--color, black);
  color: white;
 }
.btn.red {
  --color: red
}
.btn.green {
  --color: green
}
```

Project 2: Themed Sites with CSS Variables

只要使用 JS 修改变量值，整个样式会重新计算，即所谓的是响应式的。

```js
const root = document.documentElement
const themeBtns = document.querySelectorAll('.theme > button')

themeBtns.forEach((btn) => {
  btn.addEventListener('click', handleThemeUpdate)
})

function handleThemeUpdate (e) {
  switch(e.target.value) {
    case 'dark': 
      root.style.setProperty('--bg', 'black')
      root.style.setProperty('--bg-text', 'white')
      break
    case 'calm':
       root.style.setProperty('--bg', '#B3E5FC')
       root.style.setProperty('--bg-text', '#37474F')
      break
    case 'light':
      root.style.setProperty('--bg', 'white')
      root.style.setProperty('--bg-text', 'black')
      break
  }
}
```

<div class="demo" id='cssVarP2'>
  <div class="theme">
    <button onclick="handleThemeUpdate('dark')">dark</button>
    <button onclick="handleThemeUpdate('light')">light</button>
  </div>
  <article style="background-color: var(--bg, white); color: var(--bg-text, black)">
    <div style="font-size: 24px; font-weight: bold;">Hello World</div>
    Lorem ipsum dolor sit amet. Aenean commodo ligula eget dolor. Aenean massa.
  </article>
  <script>
    function handleThemeUpdate (value) {
      const root = document.querySelector('#cssVarP2')
      switch(value) {
        case 'dark':
          root.style.setProperty('--bg', 'black')
          root.style.setProperty('--bg-text', 'white')
          break
        case 'light':
          root.style.setProperty('--bg', 'white')
          root.style.setProperty('--bg-text', 'black')
          break
      }
    }
  </script>
</div>



## Dark Mode in CSS  `C x / E x / S12.1 / F67`

https://css-tricks.com/dark-modes-with-css/

```css
@media (prefers-color-scheme: dark) {
  img {
    opacity: .75;
    transition: opacity .5s ease-in-out;
  }
  img:hover {
    opacity: 1;
  }
}
```




