# tailwindcss

https://github.com/tailwindlabs/tailwindcss-intellisense/issues/72

tailwind.config.js 项目根目录需要放这个文件，否者插件完全无效，配了后，鼠标移到配置项上会有提示  
`"tailwindCSS.includeLanguages": { "typescriptreact": "javascript" }` 不配这个的话，输入时没有提示

配合 React 使用还可以参考这个库 https://github.com/emortlock/tailwind-react-ui ，有点 styled-components 的味道。

## Core Concepts

### Utility-Frist

❌ Using a traditional approach where custom designs require custom CSS  
✅ Using utility classes to build custom designs without writing CSS

* 不用再为起名烦恼了 You aren't wasting energy inventing class names.
* Your CSS stops growing. Your CSS files get bigger every time you add a new feature.
* Making changes feels safer. CSS is global and you never know what you're breaking when you make a change.

### Responsive Design

```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```

Breakpoint | prefix | Minimum width CSS
-----------|--------|--------------------------
sm         | 640px  | @media (min-width: 640px) { ... }
md         | 768px  | @media (min-width: 768px) { ... }
lg         | 1024px | @media (min-width: 1024px) { ... }
xl         | 1280px | @media (min-width: 1280px) { ... }
2xl        | 1536px | @media (min-width: 1536px) { ... }

*Mobile First*

Use unprefixed utilities to target mobile, and override them at larger breakpoints

```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

### Hover, Focus, &amp; other States

https://tailwindcss.com/docs/hover-focus-and-other-states

`hover:` `focus:` `active:` (`group` + `group-hover:`) ...

```html
<div class="group border-indigo-500 hover:bg-white hover:shadow-lg hover:border-transparent">
  <p class="text-indigo-600 group-hover:text-gray-900">Item 1</p>
  <p class="text-indigo-500 group-hover:text-gray-500">Item 2</p>
</div>
```

### Extracting Components

Dealing with duplication and keeping utility-first projects maintainable.

待学习:
* https://dev.to/hamatoyogi/how-to-build-a-react-ts-tailwind-design-system-1ppi
* https://www.smashingmagazine.com/2020/05/reusable-react-components-tailwind/

#### React Components

写一堆类名确实也挺烦的，这个时候可以抽取一个组件出来复用，就跟提取 class name 或者 styled 一样。

The first key to building good components is to start by not building any. Premature abstractions are hard to back out of.

```jsx
const FancyButton = React.forwardRef<
  React.ElementRef<'button'>,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, ref) => {
  return (
    <button
      {...rest} ref={ref}
      className={`bg-blue-400 hover:bg-blue-600 text-gray-800 px-3 rounded ${className ?? ''}`}
    />
  );
})
```

配合 https://github.com/bradlc/babel-plugin-tailwind-components 使用，开发时貌似能更简洁些。但细想了下，VS Code 插件跑不转，然后 runtime 时完全没有 tailwind 的存在了。

https://blog.logrocket.com/tailwind-css-tips-for-creating-reusable-react-components/

How to choose the right API 写得挺不错，优化下又是一篇文章

```ts
import React from 'react';
import { classNames } from '../util/classNames';
const SIZE_MAPS = {
    SMALL: 'px-2.5 text-xs',
    LARGE: 'px-3 text-sm',
};
const VARIANT_MAPS = {
    RED: 'bg-red-100 text-red-800',
    YELLOW: 'bg-yellow-100 text-yellow-800',
    GREEN: 'bg-green-100 text-green-800',
    BLUE: 'bg-blue-100 text-blue-800',
};
export function Badge(props) {
    const { children, variant, size } = props;
    return (
        <span
            className={classNames(
                'inline-flex items-center py-0.5 rounded-full font-medium leading-4 whitespace-no-wrap',
                VARIANT_MAPS[variant],
                SIZE_MAPS[size],
            )}
        >
            {children}
        </span>
    );
}
Badge.variant = VARIANT_MAPS;
Badge.size = SIZE_MAPS;
```


#### Extracting component classes with `@apply`

```css
@tailwind base;
@tailwind components;
@taiwind utilities;

@layer components {
  .btn-blue {
    @apply
      py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md
      hover: bg-blue-700
      foucs: outline-none; foucs: ring-2;
  }
}
```



## Customization

### Theme


## Getting Started



## API




