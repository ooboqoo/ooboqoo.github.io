# 边缘计算


### 发展历程

https://deno.com/blog/the-future-of-web-is-on-the-edge

* 1998 Akamai 开启 CDN 时代
* 2014 AWS Lambda 开启 serverless 时代
* 2016 JAMstack 将网站直接部署在 CDN 上 https://jamstack.wtf/
  - JAM 早先的意思 JavaScript + APIs + Markup
  - 当前演化后的含义：Decoupled + Static-first + Progressively enhanced
  - Instant Cache Invalidation: 资源永久缓存，HTML仅在边缘节点缓存(浏览器不缓存)并支持快速替换
* 2017 Cloudflare workerd 让 JS 跑在边缘节点

### CDN

> "There are only two hard problems in Computer Science: Cache Invalidation and naming things." – Phil Karlton

全球主要 CDN 供应商
* Akamai Technologies
* Amazon Web Services, Inc.
* International Business Machines Corp.
* Limelight Networks
* Verizon
* AT&T Intellectual Property
* Google LLC
* Microsoft
* CenturyLink
* Deutsche Telekom AG
* Tata Communications
* Fastly, Inc.
* Tencent Cloud
* Kingsoft Corporation, Ltd.
* Alibaba.com



## 前端框架

### Astro

* 侧重于重内容的站点，如果你的站点是一个 Application，那么不应该选择 Astro
* 服务端优先，主要采用 SSR 或 SSG，默认会生成 零脚本 的HTML页面
* 前端框架无关，可以自由搭配 React VUE 等组件框架使用

### Remix

https://remix.run/blog/remix-vs-next

Remix 是边缘原生的 React 应用框架。We built Remix to be able to handle the dynamic nature of both the front end and the back end of a web project.





## 服务端框架

Nocholas 说以后服务端代码也得测试多个环境了：Node Deno Bun workerd ...


