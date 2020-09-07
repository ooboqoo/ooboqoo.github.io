# styled-components

JSX 让我们能用 JS 写 HTML，Styled Compoents 让我们能用 JS 来写(组织) CSS。从此各种 CSS DSL 都将被 JS 终结。

让样式组件成为开发的基本单元。

把要基于 classNames 才能实现的样式关联去掉，用纯 CSS 的方式去书写 React 组件。






* Official Site  https://styled-components.com/
* Awesome Styled Components  https://github.com/styled-components/awesome-styled-components


Jupiter 开箱即用的支持 CSS Modules，但我们更推荐优先采用 CSS Modules 的继承者、在『模块化』上更进一步的 styled-components，来实现类似的需求。



## 安装配置

### create-react-app

https://styled-components.com/docs/tooling#babel-macro

```js
// improt styled from 'styled-compoents';  改成
import styled from 'styled-components/macro';
```

这样用，在开发时，就能看到直观的类名了。

```html
<div class="sc-AxjAm ljuoB">直接使用 styled-components 看到的类名是这样的</div>
<div class="style__Sidebar-sc-1hbiuqx-0 icsJmy">使用 styled-components/macro，可看到直观的类名：文件名__组件名-其他</div>
如果看这还嫌冗余，可以把文件名也去掉，具体配置文件见下面的 babel-plugin-macros.config.js
<div class="Sidebar-sc-1hbiuqx-0 icsJmy">隐藏文件名后的效果</div>
```

_babel-plugin-macros.config.js_

```js
module.exports = {
  // Other macros config...

  styledComponents: {
    fileName: false
  },
}
```


## 栗子

### 简单的栗子

使用 Styled Components 之前的写法：使用 *类名* 建立 *HTML 元素* 与 *样式* 之间的联系。

```jsx
<h1 className="title">Hello World</div>
```

```css
h1.title {
  font-size: 1.5em;
  color: purple;
}
```

借助 styled-components 你可以定义一个拥有它们自己的封装风格的 Component，然后你就可以在你的代码中自由使用这个 Component 了。

```js
import styled from 'styled-componets';

const Title = styled.h1`
  font-size: 1.5em;
  color: purple;
`;
```

```jsx
<Title>Hello World</Title>
```

> styed-components 的基本思想是通过移除样式和组件之间的映射关系来达到最佳实践。  
> HTML 标签 + 类名 -> 组件名 （ tagName + className -> ComponentName )

### 应用中的栗子

```jsx
<HeaderWrapper>
    <Logo/>
    <Nav>
        <NavItem className='left active'>首页</NavItem>
        <NavItem className='left'>下载App</NavItem>
        <NavItem className='right'>
            <i className="iconfont">&#xe636;</i>
        </NavItem>
        <SearchWrapper>
            <NavSearch></NavSearch>
            <i className='iconfont'>&#xe614;</i>
        </SearchWrapper>
    </Nav>
    <Addition>
        <Button className='writting'><i className="iconfont">&#xe615;</i>来参加</Button>
        <Button className='reg'>注册</Button>
    </Addition>
</HeaderWrapper>
```

```js
//style.js
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    z-index: 1;
    position: relative;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100px;
    height: 56px;
    background: url(${logoPic});
    background-size: contain;
`;

export const Nav = styled.div`
    width: 960px;
    height: 100%;
    padding-right: 70px;
    box-sizing: border-box;
    margin: 0 auto;
`;
```

### 补充一个栗子(组件和容器)

在 styled-components 中，将最简单只包含样式的结构称为 **组件 Components**，将包含业务逻辑的称为 **容器 Containers**。
* 组件：描述如何展现。Components = How things look
* 容器：描述业务逻辑。Containers = How things work

```jsx
class Sidebar extends React.Component {
  componentDidMount() {
    fetch('/url').then(res => {
      this.setState({items: res.items})
    })
  }
  render() {
    return (
      <div className="sidebar">
        {
          this.state.items.map(item => <div className="sidebar__item">{item}</div>)
        }
      </div>
    )
  }
}
```

```jsx
class SidebarContainer extends React.Component {
  componentDidMount() {
    fetch('/url').then(res => {
      this.setState({items: res.items})
    })
  }
  render() {
    return (
      <Sidebar>
        {
          this.state.items.map(item => <SidebarItem>{item}</SidebarItem>)
        }
      </Sidebar>
    )
  }
}
```




