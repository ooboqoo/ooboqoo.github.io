# Hermes Agent 简介

## 介绍

Hermes Agent 势头很猛，这几天推荐的人很多，可以关注一下。我自己安装试用了还可以。

Hermes Agent 是由 Nous Research 在今年 2 月底开源的 AI 智能体框架，上线不到两个月，GitHub 星标已经接近三万。这个项目被社区认为是 OpenClaw（龙虾）上线以来，第一个真正意义上的竞争对手。

两者都是自托管的开源智能体，都能接入 Telegram、Discord、Slack、WhatsApp 等聊天平台，都支持多模型切换，都走 MIT 协议。但设计哲学完全不同。

【1】龙虾是网关，Hermes 是引擎

OpenClaw 的核心是一个 Gateway（网关守护进程），负责统一管理会话、路由和渠道连接，像一个调度中心，把你的各种聊天应用连接到 AI agent。你可以理解为它是一个“多渠道个人助理操作系统”。

Hermes Agent 的核心则是 agent 自身的执行循环。它不是围绕“怎么把消息送到 agent”来设计的，而是围绕“agent 怎么变得越来越强”来设计的。官方管这叫 closed learning loop（闭环学习循环）。

【2】会自己写技能的 agent

这是 Hermes 最有意思的地方。当它完成一个复杂任务（通常涉及五次以上工具调用）后，会把整个过程沉淀成一份结构化的技能文档，存成 Markdown 文件。下次遇到类似任务，直接加载这份技能，不用从头解决。

更关键的是，这些技能在使用过程中会自我迭代。如果 agent 在执行技能时发现了更好的方法，它会自动更新技能文档。有 Reddit 用户反馈，agent 在两小时内自动生成了三份技能文档后，重复性研究任务的速度提升了 40%。

OpenClaw 也有技能系统，但主要依赖人工编写和社区贡献的技能市场 ClawHub。Hermes 这边等于把“写技能”这件事也交给了 agent 自己。

【3】记忆体系的差异

两者都声称有跨会话记忆能力，但实现方式不同。

Hermes 用 SQLite 数据库配合全文检索，把所有历史对话存下来，需要时通过搜索加摘要召回。它把记忆分成两层：一层是常驻的关键信息（写在 MEMORY.md 里，每次对话都带上），另一层是全量历史检索（容量无限，按需调用）。

OpenClaw 的记忆则是工作区里的 Markdown 文件，走的是“文件即记忆”的路线，通过语义检索工具来查找。在上下文压缩前会执行一次静默记忆写入，防止压缩丢信息。

简单说，Hermes 更像是给 agent 装了一个搜索引擎式的大脑，OpenClaw 更像是给它一个笔记本。

【4】安全思路也不一样

Hermes 搞了一套五层纵深防御：用户授权、危险命令审批、容器隔离、凭据过滤、上下文注入扫描。默认对高风险操作（比如执行终端命令、写文件）要人工审批，超时未批准就自动拒绝。

OpenClaw 这边则更强调信任模型和配置审计。它提供了 openclaw security audit 命令，可以一键扫描网关配置的安全隐患。但 OpenClaw 在安全方面的历史记录不太好看，今年 2 月被曝出多个高危漏洞，13.5 万个实例暴露在公网上，技能市场也有超过 300 个恶意技能被发现。

【5】要不要换或者选哪一个

如果你日常用的 Agent 已经顺手，没必要。如果你之前的龙虾主要是 claude code 的授权现在用不了可以试试这个，但不能保证继续用多久。如果喜欢折腾想试试不同的选择，也可以试试。

如果你想要一个“多渠道助理平台”，接入各种聊天工具，用社区现成的技能市场，OpenClaw 的生态更成熟，34.6 万星标不是白来的。

如果你更关心 agent 的长期进化能力，想让它用得越久越聪明，或者你是做 AI 研究的，需要生成训练轨迹、跑强化学习实验，Hermes 的架构更对口。它还内建了一个兼容 OpenAI API 的服务端，可以直接作为后端接入 Open WebUI 等第三方界面。

Hermes 跑在 5 美元一个月的 VPS 上就够用，也支持 Docker、SSH 远程、Modal 等 serverless 方案。安装只需要一行 curl 命令。

安装不复杂，参考官方文档即可：hermes-agent.nousresearch.com/docs/getting-s…

爱马仕的英文也是 Hermes。



## Harness


Harness 是 Agent 运行时的「工程环境总和」。至少包括这几类东西：
1. 任务如何被表达
2. 上下文如何被组织
3. 工具如何被暴露、治理、拦截
4. 状态如何被保存、恢复、裁剪
5. 反馈如何回流给模型
6. 错误如何被分类、重试、升级
7. 安全边界如何被建立
8. 系统如何验证 agent 真的把事做好了

如果你把 Agent 想成一个「会调用工具的大脑」，那 Harness 就是：你给这个大脑配的身体、传感器、护栏、操作台、流程制度、回执系统，以及出事后的保险。

为什么这个词现在突然火了？

因为行业终于开始承认一件事：Agent 的问题，越来越不是「模型够不够聪明」，而是「环境够不够好」。

同一个模型，放到不同系统里，表现会差得非常大。

有的 agent：会乱调工具会丢上下文会把安全边界踩穿会在长任务里越来越漂会越来越像「有工具的聊天机器人」

而有的 agent：能持续做事能沿着目标推进能利用反馈修正自己能在复杂任务里保持结构感甚至能让一个不算新的模型，也表现得很像样

原因很简单：我想验证的不是「模型天赋有多高」，而是「环境设计能把一个普通模型托到什么程度」。


Harness Engineering >> Context Engineering >> Prompt Engineering


## Hermes Agent 项目架构概览

### 核心定位

Hermes Agent 是一个多平台 AI 对话代理，支持 CLI 交互、消息平台网关（Telegram/Discord/Slack 等）以及 IDE 集成。

### 核心组件

  1. Agent 核心 (run_agent.py)

  - AIAgent 类 — 核心对话循环，同步执行
  - 默认模型 anthropic/claude-opus-4.6，最多 90 轮迭代
  - 提供 chat() 简单接口和 run_conversation() 完整接口
  - 消息格式遵循 OpenAI 规范（system/user/assistant/tool）

  2. 工具系统（三层架构）

  tools/registry.py    ← 中央注册表（schema、handler、分发）
         ↑
  tools/*.py           ← 各工具实现（终端、文件、网页、浏览器、MCP 等）
         ↑
  model_tools.py       ← 工具编排、发现、调用分发
  toolsets.py          ← 工具集定义，控制哪些工具可用

  3. CLI 层 (cli.py + hermes_cli/)

  - Rich 做界面渲染，prompt_toolkit 做输入补全
  - KawaiiSpinner — 等待 API 时的动画提示
  - 斜杠命令注册表 (commands.py) — 所有命令统一在 COMMAND_REGISTRY 定义，CLI/Gateway/Telegram/Slack 自动派生
  - 皮肤引擎 (skin_engine.py) — 纯数据驱动的主题系统

  4. 网关层 (gateway/)

  - 消息平台适配器：Telegram、Discord、Slack、WhatsApp、Home Assistant、Signal
  - 统一的会话持久化 (session.py)
  - 支持后台进程通知推送

  5. 状态管理 (hermes_state.py)

  - SessionDB — 基于 SQLite 的会话存储，支持 FTS5 全文检索

  6. Agent 内部模块 (agent/)

  ┌───────────────────────┬────────────────────────────┐
  │         模块          │            职责            │
  ├───────────────────────┼────────────────────────────┤
  │ prompt_builder.py     │ 系统提示词组装             │
  ├───────────────────────┼────────────────────────────┤
  │ context_compressor.py │ 自动上下文压缩             │
  ├───────────────────────┼────────────────────────────┤
  │ prompt_caching.py     │ Anthropic 提示词缓存       │
  ├───────────────────────┼────────────────────────────┤
  │ auxiliary_client.py   │ 辅助 LLM（视觉、摘要）     │
  ├───────────────────────┼────────────────────────────┤
  │ model_metadata.py     │ 模型上下文长度、token 估算 │
  └───────────────────────┴────────────────────────────┘

### 关键设计原则

  - Profile 隔离 — 多实例支持，每个 profile 有独立的 HERMES_HOME 目录，所有路径必须用 get_hermes_home()
  - 提示词缓存不可破坏 — 禁止在对话中途修改上下文、工具集或系统提示词
  - 工具 handler 返回 JSON 字符串 — 所有工具统一接口
  - 用户配置 — ~/.hermes/config.yaml（设置）+ ~/.hermes/.env（API 密钥）

### 文件依赖链

  tools/registry.py → tools/*.py → model_tools.py → run_agent.py / cli.py / gateway

  整体来看，这是一个模块化程度较高的项目，工具系统和命令系统都采用注册表模式，扩展性好，新增工具或命令只需在固定位置添加代码。








