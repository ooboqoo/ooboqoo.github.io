# 其他类库


## react-helmet  12.7k

https://github.com/nfl/react-helmet

用以设置 `<head>` 内的一些元素，支持服务端渲染(当然会有一些附加步骤)。

```jsx
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```










