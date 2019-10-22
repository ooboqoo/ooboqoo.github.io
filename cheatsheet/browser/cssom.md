# CSS Object Model (CSSOM)

https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/

## `x.style` 与 `window.getComputedStyle(x)`

`x.style` 是操作元素内嵌样式的接口，可读可写。`window.getComputedStyle(x)` 用于获取元素的最终计算样式，只读。

`x.style` `window.getComputedStyle()` 返回的都是 CSSStyleDeclaration 对象，属性值(如 width)变更后，获取属性时能拿到最新的值。

```js
document.body.style.backgroundColor = 'lightbule'
window.getComputedStyle(document.body).background
```

```js
// three different ways to access properties
window.getComputedStyle(el).backgroundColor;
window.getComputedStyle(el)['background-color'];  // background-color 或 backgroundColor 都行
window.getComputedStyle(el).getPropertyValue('background-color');  // backgroundColor 不行
```

```js
// Using getComputedStyle() to get styles from a pseudo-element
window.getComputedStyle(document.querySelector('.anyDiv'), '::before').width;
```


## CSSStyleDeclaration

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

```
d.getPropertyValue()     Returns the property value given a property name.
d.getPropertyPriority()  Returns the optional priority, "important".
d.setProperty()          Modifies an existing CSS property or creates a new CSS property in the declaration block.
d.removeProperty()       Removes a property from the CSS declaration block.
d.item()                 Returns a property name.
```


## CSSStyleSheet

这里才是真正操作样式表的地方，可以在这里删除一张样式表中的某条定义，然后浏览器会重新计算样式，就跟你使用 `p.removeChild(c)` 操作 DOM 一样的用法。

```js
let myRules = document.styleSheets[0].cssRules
Array.from(myRules).forEach(rule => {
  if (rule.type === CSSRule.STYLE_RULE) console.log(rule.selectorText)
})
```

