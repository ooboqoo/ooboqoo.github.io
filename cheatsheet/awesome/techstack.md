# 流行技术栈跟踪

前端

* [Next.js](https://nextjs.org/docs) - 全栈框架，适合做官网，以及一些对 SEO 有要求的前端应用
* [Zustand](https://github.com/pmndrs/zustand) - 前端状态管理，状态更新是按字段级别触发的，渲染更精细
* [Zod](https://zod.dev/) - 全栈项目前后端统一的 schema 校验（runtime 校验 + static 类型校验），常用于 *API 入参校验、表单验证* 等场景，类型安全、零依赖、语法简洁。
* [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation. 同时支持 React Web 和 React Native。
* [React Query](https://tanstack.com/query/v5) 数据获取和缓存管理 // TanStack = “Tanner（作者名） 的 Stack（工具栈）”
* [Biome.js](https://biomejs.dev/) = ESLint + Prettier，主打 快速、统一、零配置 的代码质量工具。前身是 Rome 工具链，Rust 实现。最大卖点就是速度极快，这对大型代码仓库、CI、Monorepo 非常友好。

后端

* [express.js](https://github.com/expressjs/express) - 最经典、最稳定、最生态丰富（Koa.js 生态很久不活跃了）
* [hono](https://github.com/honojs/hono) - 极致轻量、极致快、多运行时通用

| 项目类型           | 推荐框架
|-------------------|-----------------
| 小型 API、学习     | Express / Koa
| 高性能 API 服务    | Fastify / Hono
| 企业级大型项目（TS）| NestJS
| 运维/内容管理平台   | Strapi
| Serverless / Edge | Hono



AI

* [n8n](https://github.com/n8n-io/n8n) 工作流编排
* [LangChain](https://docs.langchain.com/) Agent 开发框架

AI-FE

* [Vercel AI SDK](https://ai-sdk.dev/) 
* [AI Elements](https://ai-sdk.dev/elements)
* [TanStack AI](https://tanstack.com/ai/latest/docs/getting-started/overview) vs Vercel AI

Python

* click 最流行的构建命令行工具的库，用于快速开发优雅、专业、可扩展的 CLI 应用


