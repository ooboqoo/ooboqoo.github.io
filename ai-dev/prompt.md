# Prompt Engineering


* https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview



Anthropic 发布了他们完整的提示工程指南。99%的人不会去看，我花了3天时间测试了每一个技巧。

预测提示成功的 #1 规则：先给同事看看

如果他们困惑 -》 AI会失败
如果他们懂了 -》 AI会成功

这个“同事测试”单独就解决了90%的提示问题。



魔术公式：思考标签

```
<thinking>让AI自己解决问题</thinking>
<answer>得到干净的输出</answer>
```

因为没有思考标签 = 就不会真正思考

但思考标签只是5步中的第3步，Anthropic 给出的完整层级（按影响顺序）

```
清晰直接 《- 从这里开始
用例子
思维链
XML标签
赋予角色


2. Be clear and direct
3. Use examples (multishot)
4. Let Claude think (chain of thought)
5. Use XML tags
6. Give Claude a role (system prompts)
```

大多数人从第5步开始，这就是他们失败的原因。


来看个真实的例子

```
差的提示：“总结这个”

好的提示

<task>用150字总结</task>
<audience>技术专业人士</audience>
<thinking>先找出3个关键点</thinking>
```

专业人士的秘密：80%测试，20%写作。永远先准备10个测试案例，然后再优化。测试能揭示哪些提示有效。

“让 AI 思考”不代表不给指导，最佳平衡点：角色提示。“你是【角色】，拥有【X年】经验“ 10个字瞬间获得专业知识。

上下文 -》角色 -》任务 -》思考 -》输出，这个系统，缺一不可。


你的5分钟实施计划：
加同事测试
用 `<thinking>` 标签
像给新员工介绍一样提供上下文
测试10次再发布


它什么都知道，但对你一无所知。把它当做聪明的全新员工，需要上下文。这就是为什么上下文永远胜过命令。

快速回顾：
提示 > 微调
结构 = 智能
测试 > 写作
上下文 > 命令



## 实操

> Gavin 理解：Context Engineering 就是针对大模型的**自然语言编码**（几十到几万行指令），最大程度**消除不确定性**。

优化前

```txt
你的回答必须包含两个 XML 标签,一个叫 question,用于存放用户问题,一个叫 answer,用于存放你的回答
```

GPT-5 优化后

```txt
你是一个智能助理。对于每次用户输入，你必须返回一个有效的、且只包含一个根元素的 XML 文档，根元素名为 <response>。<response> 内必须包含两个子元素：<question>（保存用户原始问题的逐字文本）和 <answer>（保存你的回答）。严格遵守以下规则：
	1.	输出必须是**唯一**的 XML 文档（不能在输出前后有额外非 XML 文本或注释）。
	2.	<question> 必须包含用户原始问题的**逐字**复制（保留原始语言、标点和换行）。
	3.	<answer> 必须包含你的回应。若回应中可能包含 <、>、& 等特殊字符，必须用 <![CDATA[ ... ]]> 包裹 <answer> 的内容以保证 XML 完整性，除非你已经对这些字符做了正确的实体转义（例如 &lt;）。
	4.	XML 必须是**可解析且格式良好**（首行可选 <?xml version="1.0" encoding="UTF-8"?>）。
	5.	不要包含除 <response> 之外的顶层元素或额外文本；也不要输出解释性文字或元数据。
	6.	回答应精确、完整、与用户问题相关；如需列举或代码片段，请直接放在 <answer>（或其 CDATA）内。
	7.	如果用户问题为空或只有附件/图片，仍须在 <question> 中写入用户的原始输入描述（或占位文本），并在 <answer> 中说明你如何处理该输入。
```


## Context Engineering

* https://blog.langchain.com/context-engineering-for-agents/
* https://www.anthropic.com/engineering/multi-agent-research-system
* https://cognition.ai/blog/dont-build-multi-agents

从应用角度看，大模型就像一个函数，对应一段输入和输出。大模型的输入是有大小限制的，即 上下文窗口 Context Window。

Context 即模型的输入，包含：用户问题、背景信息、相关资料、可用工具列表、工具执行结果、历史对话 等等。

Context Window 指模型的输入中最多能包含的 Token 数量。Token 可以简单理解为文本被拆分成的最小单位，一个 token 大概等于 0.75 个英文单词或1.5个汉字。

三大问题
* 大多数模型的 Context Window 非常有限
	* 很多时候为了节省成本，我们会使用一些小模型，他们的 Context Window 可能就只有几万，连一个产品使用手册都装不下。
* 输入太杂乱会影响模型理解
	* 输入太杂乱，模型可能会混淆重点，输出含糊其辞的回答。与其把所有东西都塞进去，不如经过精心的设计和组织，确保模型看到的是准确、有结构、重点突出的内容
* 输入越多，成本越高


Context Engineering 就是对模型的输入做优化。Context Engineering 关心的不是怎么训练模型，而是精心设计给模型的输入内容。让模型在有限的 Context Window 里面，尽可能理解得更准，答得更好，花得更少。核心思想是，不改变模型的结构，只改变模型能“看到”什么。

Context Engineering 是最近才火起来的，主要基于以下两点
* 现在的模型已足够强大
	* 现在的模型，只要你给到它足够精细的要求，给出它足够完整的相关资料，模型就可以给出非常准确有用的回答。在大部分情况下，如果模型不能给到满意的回答，这不是因为模型不够强，而是因为你没有给到模型足够清晰和完整的信息。而这也正是 Context Engineering 要解决的问题。
* Agent 的兴起
	* Agent 是一种把大模型和工具结合起来，让模型能够独立感知环境、影响环境，从而解决用户问题的一项技术。Agent 需要进行多轮 loop，这些工具执行结果就会占满整个 Context Window，从而影响到模型后续的回答效果。

Context Engineering 四大实现方法
* 保存 Context，如 ChatGPT 的记忆功能
* 选择 Context，从海量的信息中选择出一部分与用户问题最相关的内容，并且把它们放在模型的 Context 里面。
	* 静态选择：把一些重要、必须遵守的信息，全量放入 Context 中，如 Cursor Rules 文件、CLAUDE.md，包含了项目信息和编码规则
	* 动态选择：更强大也更常见，指选择与用户问题最相关的内容放入 Context 中。如从数百个工具中挑选与用户问题最为相关的三个工具。最常用的就是 RAG
* 压缩 Context，Agent 运行过程中，最占空间的是两类数据：模型输出文本 + 工具执行结果，如果不做处理的话，这些内容会迅速占满 Context 全部空间。一个常见的做法，就是压缩历史消息。如 Claude Code 在执行过程中，当 Context 达到 95% 时就会运行一种 auto-compact 的程序对以往的内容做压缩，用户甚至可以在 Claude.md 中指定压缩策略。
* 隔离 Context，通过多个 subagent 来隔离 Context，这些 subagent 职责清晰，互不干扰。






