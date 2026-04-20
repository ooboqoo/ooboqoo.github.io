# Claude API Docs - Context management


## Prompt caching

https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### 什么是提示词缓存

Prompt caching 是 Claude API 的一个优化机制，用来缓存 prompt 的前缀部分，从而减少重复计算。

适用于：
	•	长 system prompt
	•	很多 few-shot examples
	•	大文档上下文
	•	agent 工具定义
	•	多轮对话重复上下文

效果：
	•	降低 token 成本
	•	降低 latency
	•	提升 time-to-first-token

例如：

system prompt
+ 长文档
+ user question

如果文档相同：

第一次调用
→ 写入 cache

第二次调用
→ 直接读取 cache

### 基本使用方式

在 prompt 的某个 block 上加：

"cache_control": { "type": "ephemeral" }

示例（Python / curl 类似）：

```json
{
  "system": [
    {
      "type": "text",
      "text": "You are an assistant."
    },
    {
      "type": "text",
      "text": "<large document>",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Summarize this."
    }
  ]
}
```

第一次请求：

```
cache_creation_input_tokens: 188086
```

第二次请求：

```
cache_read_input_tokens: 188086
```

说明命中缓存。


### 3. Cache 的工作机制

缓存的是 prompt prefix。

Claude 会缓存：

tools
→ system
→ messages

直到：

cache_control breakpoint

之后的内容不缓存。  ￼

⸻

4. Cache TTL

默认：

5 minutes

也可以设置：

1 hour

配置：

"cache_control": {
  "type": "ephemeral",
  "ttl": "1h"
}

TTL 到期后 cache 会失效。  ￼

⸻

5. Token 成本

Anthropic 的收费规则：

操作	价格
cache write	125% input token
cache read	10% input token
uncached tokens	正常 input price

简单理解：
	•	写缓存略贵
	•	读缓存非常便宜

⸻

6. 最小缓存 token 限制

不同模型不同：

模型	最小 token
Opus / Sonnet	1024
Haiku	2048

如果 prompt 太短：

cache_control 会被忽略

不会报错。  ￼

⸻

7. 支持缓存的内容

可以缓存：
	•	tools
	•	system prompt
	•	user / assistant messages
	•	images
	•	documents
	•	tool results

不能直接缓存：
	•	thinking blocks
	•	citation sub-blocks
	•	empty text blocks  ￼

⸻

8. Cache 命中条件

必须 100% 完全一致：
	•	文本
	•	图片
	•	顺序
	•	tokenization

否则：

cache miss

并且：
	•	不同 organization 不会共享缓存。  ￼

⸻

9. 常见使用场景

Anthropic 推荐：

1️⃣ 长文档分析

system: rules
doc: huge text (cached)
user: question

2️⃣ AI Agent

tools definitions (cached)
system prompt (cached)
user input

3️⃣ Few-shot prompt

examples (cached)
query


⸻

10. 一个 Agent 典型结构（推荐）

Anthropic 推荐 prompt 结构：

tools
system instructions
examples
documents
(cache breakpoint)

user message

这样：
	•	静态部分缓存
	•	动态部分不缓存







