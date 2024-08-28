# tailwindcss

https://github.com/tailwindlabs/tailwindcss-intellisense/issues/72

tailwind.config.js 项目根目录需要放这个文件，否者插件完全无效，配了后，鼠标移到配置项上会有提示  
`"tailwindCSS.includeLanguages": { "typescriptreact": "javascript" }` 不配这个的话，输入时没有提示

配合 React 使用还可以参考这个库 https://github.com/emortlock/tailwind-react-ui ，有点 styled-components 的味道。


Tailwind 相较 inline CSS 优势

* *基于约束的设计* 使用内联样式每个值都是魔术数字，使用功能类则是从预定义的「设计系统」中选择样式，这使得构建统一的 UI 变得更加容易
* *响应式设计* 在内联样式中您不能使用媒体查询，但 Tailwind 的「响应式功能类」非常容易构建响应式页面
* *hover focus 等状态* 内联样式无法设置 hover 或者 focus 这样的装填，使用 Tailwind 的「状态变体」功能类可以非常容易地为这些状态设置样式


## Versions

### V4

https://tailwindcss.com/blog/tailwindcss-v4-alpha 2024-3-27

* A new engine, built for speed
    - Up to 10x faster
    - Rust where it counts
* Unified toolchain: v4 isn’t just a plugin anymore — it’s an all-in-one tool for processing your CSS. We’ve integrated Lightning CSS directly into the framework so you don’t have to configure anything about your CSS pipeline.
* Designed for the modern web
* Composable variants
* Zero-configuration content detection
* CSS-first configuration

### V3

JIT mode (Just-In-Time) is an alternative way to generate the CSS that, instead of generating all possible classes and then removing all those that are not being used, parses the content of HTML files and instantly generates only those classes that are needed and used.

This technical improvement has made it possible to introduce numerous new variants and utility classes, as well as the ability to create utility classes on the fly with arbitrary values not set in the configuration.

Starting with version 3, JIT mode has become the default.






## Tailwind UI

https://adamwathan.me/tailwindcss-from-side-project-byproduct-to-multi-mullion-dollar-business/

https://wangpan/s/17PYZ1fPyERD2JgTslDqqMg?pwd=j5ba 下载

* 2015 年 Adam 在开发 Digest 项目时，Bootstrap4-aplpha 刚发布，Bootstrap4 放弃了 Less 转投 Sass，Adam 不想写 Sass 就开始自己写 Less，这个过程中发现 实用类 比组件样式更灵活、更易移植，这启发了 utility-first 哲学
* 几年后 Adam 和 Steve 开发 KiteTail 项目，Adam 努力使样式 “项目无关“，并在 YouTube 上展示其中的实用类样式
* 2017年的万圣节之夜，Tailwind CSS 正式发布，获得了积极的关注
* 2018-12 出版了书籍 Refactoring UI，让 Adam 赚了很多钱，Adam 开始全职搞 Tailwind
* 2019-05-13 v1 正式发布
* 2019年，Adam 和 Steve 探索了多种关于 Tailwind 商业化的想法，最终（2019-03）他们决定推出 Tailwind UI
* 2020-02 Tailwind UI early access 发布
* 2023年8月份 Tailwind UI 的总收入超过 200万美元，团队



### Tailwind UI 库

Since it's launch in 2017, Tailwind CSS has grown substantially in popularity with the developer community, mainly because it provides developers the flexibility to build custom interfaces without being bound by any UI kit rules.

However, too much choice may cause decision paralysis. Tailwind components and template collections provide fully responsive UI components and page templates. These collections allow you to *copy and paste HTML snippets directly into your codebase to use or modify*.

Tailwind UI 库比较（基本没内嵌js能力，纯静态内容，需要拷贝后自己封装React组件）
* [daisyUI](https://daisyui.com/) 30k  daisyUI adds class names (`btn` `card` `toggle`) to Tailwind CSS for all common UI components.
* [tailwindcomponents](https://tailwindcomponents.com/) 是个组件市场，多但乱 is an community-contributed collection of free or paid Tailwind UI templates and components.
* [TW Elements](https://tw-elements.com/) 部分收费还不便宜，但完成度挺高
* Material Tailwind  3.2k  2021年初开始开发，开源免费




## Core Concepts

### Utility-Frist

❌ Using a traditional approach where custom designs require custom CSS  
✅ Using utility classes to build custom designs without writing CSS

* 不用再为起名烦恼了 You aren't wasting energy inventing class names.
* Your CSS stops growing. Your CSS files get bigger every time you add a new feature.
* Making changes feels safer. CSS is global and you never know what you're breaking when you make a change.




CSS Frameworks like Bootstrap provide a series of predefined classes for elements such as buttons or tables.

```html
<!-- Bootstrap -->
<button type="button" class="btn btn-primary">Primary</button>
<table class="table table-striped table-bordered">...</table>

<!-- Tailwind CSS -->
<button type="button" class="pointer-events-auto ml-8 rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Primary</button>
```




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

通过 `[data-theme]` 来控制主题

```css
import 'tailwindcss';

@theme {
    --color-canvas: var(--color-white);
    --color-fg: var(--color-black);
    --color-fg-soft: var(--color-gray-600);
    --color-btn: var(--color-indigo-600);
    --color-btn-text: var(--color-white);
}

[data-theme='midnight'] {
    --color-canvas: var(--color-slate-900);
    --color-fg: var(--color-white);
    --color-fg-soft: var(--color-slate-400);
    --color-btn: var(--color-slate-700);
    --color-btn-text: var(--color-white);
}

[data-theme='electric']
    --color-canvas: var(--color-black);
    --color-fg: var(--color-white);
    --color-fg-soft: var(--color-gray-400);
    --color-btn: var(--color-lime-400);
    --color-btn-text: var(--color-black);
}
```

```html
<div data-theme="electric" className="bg-canvas">
    <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fg">Boost your productivity.</h2>
            <p className="mx-auto mt-4 max-w-xl text-xl/8 text-fg-soft">
                Incididunt sint fugiat pariatur cupidatat consectetur.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <ButtonLink href="#">Get started</ButtonLink>
            <a href="#" className="text-sm/6 font-semibold text-fg">
                Learn more <span aria-hidden="true">*</span>
            </a>
        </div>
    </div>
</div>
```


## Getting Started



## API



## Best Practice

### Automatic Class Sorting with Prettier

https://tailwindcss.com/blog/automatic-class-sorting-with-prettier

```bash
$ pnpm add -D prettier-plugin-tailwindcss
```



```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```




