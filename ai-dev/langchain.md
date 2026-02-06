# LangChain


LangChain vs LangGraph vs DeepAgents

* Agent Harness - DeepAgents (初期，类似 Dify 一样修改几个参数就能配起一个 agent)
* Agent Framework - LangChain
* Agent Runtime - LangGraph


| 框架          | 定位          | 适用场景
|---------------|--------------|------------------
| LangChain 1.0 | 高层抽象框架   | 快速构建通用 AI 智能体，适合原型开发与轻量级应用
| LangGraph 1.0 | 底层运行时引擎 | 支持持久化、人工干预、复杂流程控制的生产级智能体

你可以从 LangChain 快速启动原型，再无缝迁移到 LangGraph 实现长期运行与高可靠性，无需重写业务逻辑。

LangChain 能应付 90% 的场景，开发者不用接触底层 LangGraph 的 API。

先有 LangChain 支持线性编排，后面发展出 LangGraph 支持图状编排，后面发现 LangChain 用的人多，把 LangGraph 2.0 叫成 LangChain 1.0

## LangChain 1.0 更快、更轻、更灵活

### 全新 create_agent 接口

LangChain 1.0 告别复杂的 `create_react_agent`，新版本引入统一的 `create_agent` 抽象，三行代码即可构建一个智能体。

```py
from langchain.agents import create_agent

weather_agent = create_agent(
    model="openai:gpt-5",
    tools=[get_weather],
    system_prompt="Help the user by fetching the weather in their city."
)

result = weather_agent.invoke({"input": "What's the weather in San Francisco?"})
```

### 中间件系统：可插拔的控制逻辑

这是 LangChain 1.0 最具突破性的设计之一——在智能体核心循环中插入自定义逻辑。

内置中间件包括：

Human-in-the-loop：关键步骤暂停，等待人工审批
Summarization：自动压缩历史，防止上下文溢出
PII Redaction：自动脱敏敏感信息（如身份证、邮箱） 你也可以开发自己的中间件，实现日志记录、权限校验、A/B 测试等高级功能。


### 统一输出格式

所有 LLM 输出（文本、工具调用、引用、推理轨迹）统一为 .content_blocks 结构，跨模型、跨供应商保持一致。

同时，结构化输出（如 JSON Schema）直接集成进主循环，无需额外 LLM 调用，显著降低延迟与成本。







## LangGraph 1.0 为生产而生的运行时引擎


如果说 LangChain 是“智能体工厂”，那 LangGraph 就是“智能体操作系统”。

经过在 Uber、LinkedIn、Klarna、Rippling 等企业的生产环境验证，LangGraph 1.0 成为构建高可靠智能体的首选运行时。

核心三大能力：

* 持久化状态（Durable State）
    - 智能体可中断后恢复，任务不丢失
    - 适用于长周期任务（如客服流程、审批流）
* 内置持久化（Persistence）
    - 无需额外数据库，自动保存上下文与执行状态
    - 支持检查点（Checkpoints）机制
* 原生 Human-in-the-loop
    - 在关键节点暂停执行，等待人工审核或修改
    - 支持“审批-继续”、“编辑-重试”等交互模式







