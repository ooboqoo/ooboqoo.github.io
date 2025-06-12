# 人工智能


## ChatGPT

https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/

Principles:
• Write clear and specific instructions
• Give the model time to "think"
• Iterative prompt development
• Capabilities: Summarizing, Inferring, Transforming, Expanding
• Building a chatbot

* `temperature` 0~1 数值越小返回内容越稳定，越大随机性越大。（高兴了就多说几句，思维比较活跃...）
* `messages` 实现聊天机器人，每次调接口，都需要把历史聊天记录带上


## 编程 Copilot 指南

### 伪代码工程师

代码工程师 -> 伪代码工程师

使用自然语言或其他方式描述需求或问题，通过 AI 模型自动生成对应的代码。

### Prompt 编写规范

从我的理解来说，一个好的 Prompt 规范应该包括以下内容：
1. 功能定义：定义所需的功能，并为模型提供足够的上下文和信息。这可以帮助模型更好地理解其意图并生成相应的代码。示例 1：函数名、输入和输出，就能自动填充。
2. 任务拆分：将任务拆分为小的子任务，并确保每个子任务的要求和期望输出都非常清晰。示例 2：如上图的按步骤设计示例，每一步都需要想好要怎么做。
3. 确定输入与输出格式：Prompt 规范应该明确输入与输出格式和数据类型，以便模型可以正确地处理输入。示例 3：我们添加了 i18n 的 json 过来，让 Copilot 自动映射。
4. 测试和调试：在生成代码之后，应该进行测试和调试，以确保其正确性和可靠性。同时，应该为模型提供反馈，以帮助它改进其生成的代码。示例：让 Copilot 编写对应的单元测试，我们对测试用例进行检查。
5. 避免歧义：Prompt 规范应该避免使用歧义的语言和术语，并确保在多种上下文中生成的代码是一致的。只在出错时，我们才会发现这条原则是有用的。
6. 编码标准：定义编码标准，并确保生成的代码符合这些标准。这可以确保生成的代码易于阅读和维护，并符合团队的编码惯例。这个就需要我们团队去做了。


### 应用场景

我这两天给 gpt4 喂 uglify 后的代码，让他改写成 TS，结果太顶了

