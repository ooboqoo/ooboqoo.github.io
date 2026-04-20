# Anthropic 发布 Tool Calling 2.0

* https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference
* https://mp.weixin.qq.com/s/mJJpFA11DOEvHFledDNQVA

### 传统的 Tool Calling

* 实现：给大模型一套 Schema，让它输出特定的 JSON 来调用 API，然后把结果塞回上下文，再进行下一轮思考。
* 问题：当遇到需要串联多个工具调用的复杂任务时，这种基于 JSON 的乒乓球式的交互会产生大量 Token 消耗和极高的延迟。

### Programmatic Tool Calling - 告别 JSON 拥抱代码

```py
tools = [
  {"type": "code_execution_20260120", "name": "code_execution"}
]
```

当用户发起复杂查询时，大模型不再返回干瘪的 JSON，而是返回一段包含工具调用的代码逻辑。执行完毕后，你只需要将最终提取的结果（而不是海量的中间过程日志）丢回给大模型的上下文。这种方式能砍掉大部分不必要的网络往返。

### Tool Search - MCP 的终极解药

随着 MCP 的流行，开发者喜欢给 Agent 挂载几十上百个工具。但把所有 Tool Schema 都硬编码塞进 Prompt，不仅极其消耗 Token，还不具备扩展性。

Anthropic给出的方案是 Tool Search。你只需要在上下文中保留一个名为 `tool_search_tool_regex` 的核心工具（仅占约 500 Tokens）。

💡 核心机制：Deferred Loading (延迟加载)
对于 MCP Server 中的工具，你可以设置 `defer_loading: true`。默认情况下，这些工具对大模型是 *不可见* 的 。当模型需要特定功能时，它会主动调用 `tool_search_tool_regex` 去动态检索和加载需要的工具定义。

你也可以针对极高频的工具（如 search events ）设置 `defer_loading: false`，使其常驻。

这种按需加载的设计，在多工具场景下，最高可带来 80% 的上下文窗口优化。

### 新方案避坑与思考

Anthropic 的这波更新本质上是将 Agent 的运行范式从 "LLM as a Router" 推进到了 "LLM as an Engine"。但在实操落地时，依然有几个深水区需要注意：

* 代码执行沙箱的安全边界： 既然允许大模型输出代码并在本地或云端执行（Programmatic Tool Calling），沙箱（Sandbox）的隔离级别就成了生死线。如果LLM产生了“幻觉”，写出了包含死循环或具有破坏性API调用的代码，你的环境必须要有强硬的超时阻断（Timeout）和权限管控机制。
* 调试难度呈指数级上升： 过去看JSON报错一目了然；现在模型在黑盒里写了一段TypeScript去跑循环，中间出错时，你的日志追踪（Tracing）系统必须足够完善，否则排错会非常痛苦。
* MCP的进阶折中： 虽然 Tool Search 解决了MCP挂载过多导致的Token爆炸问题，但每次动态检索依然会带来额外的网络请求耗时。在实际架构中，建议将高频调用的核心CRUD工具做常驻缓存，仅对长尾工具实施 Deferred Loading 。








