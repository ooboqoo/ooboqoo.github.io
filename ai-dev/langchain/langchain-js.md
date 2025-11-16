# LangChain TypeScript

> LangChain 的个人定位：是要懂源码，且积极提交 LangChain 代码


LLM & LangChian 的发展历程：https://docs.langchain.com/oss/javascript/langchain/philosophy

* 2022-10-24 A month before ChatGPT, LangChain was launched as a Python package.
* 2023-01 OpenAI releases a ‘*Chat Completion*’ API.
* 2023-01 LangChain releases a JavaScript version. LLMs and agents will change how applications are built and *JavaScript is the language of application developers*.
* 2023-03 OpenAI releases ‘*function calling*’ in their API.
* 2023-06 LangSmith is released as closed source platform by LangChain Inc., providing observability and evals
* 2024-01 LangChain releases 0.1.0, its first non-0.0.x.
* 2024-02 LangGraph is released as an open-source library.
* 2024-06 LangChain has over 700 integrations.
* 2024-10 LangGraph becomes the preferred way to build any AI application that is more than a single LLM call.
* 2025-04 *Model APIs become more multimodal*. Models started to accept files, images, videos, and more.
* 2025-10-20 LangChain releases 1.0 with two major changes.


## Core components

### Agents

agents = LLMs + tools

### Models

Models are the reasoning engine of agents. 模型帮助代理进行思考、判断和做决定，驱动它们的行为。The quality and capabilities of the model you choose directly impact your agent's reliability and performance.

In addition to text generation, many models support:
* Tool calling
* Structured output
* Multimodality
* Reasoning

```ts
import { initChatModel } from "langchain";
process.env.OPENAI_API_KEY = "your-api-key";
const model = await initChatModel("gpt-4.1");
const response = await model.invoke("Why do parrots talk?");
```

Key methods
* `invoke(input, opts)` 一次性返回响应体
* `stream(input, opts)` 结果流式传输
* `batch(inputs, opts, batchOpts)` 批量执行

### Messages

LangChain 自己封装了 `SystemMessage` `HumanMessage` `AIMessage` `ToolMessage` 类型，提供了 `message.contentBlocks` 来获取规范化后的 content，这样大家就不用被特定模型厂商绑定了。

### Tools

Many AI applications interact with users via natural language. However, some use cases require models to interface directly with external systems—such as APIs, databases, or file systems—using structured input.

Tools are components that agents call to perform actions. *They extend model capabilities by letting them interact with the world through well-defined inputs and outputs.*

```ts
import * as z from "zod"
import { tool } from "langchain"

const searchDatabase = tool(
  ({ query, limit }) => `Found ${limit} results for '${query}'`,
  {
    name: "search_database",
    description: "Search the customer database for records matching the query.",
    schema: z.object({
      query: z.string().describe("Search terms to look for"),
      limit: z.number().describe("Maximum number of results to return"),
    }),
  }
);
```

### Short-term memory

Conversation history is the most common form of short-term memory.

...Even if your model supports the full context length, most LLMs still perform poorly over long contexts. They get "distracted" by stale or off-topic content, all while suffering from slower response times and higher costs.

Because context windows are limited, many applications can benefit from using techniques to remove or "forget" stale information.

With "short-term memory" enabled, long conversations can exceed the LLM's context window. Common solutions are:
* Trim messages: Remove first or last N messages (before calling LLM)
* Delete messages: Delete messages from LangGraph state permanetly
* Summarize messages: Summarize earlier messages in the history and replace them with a summary
* Custom strategies: Custom strategies (e.g., message filtering, etc.)

You can access and modify the short-term memory (*state*) of an agent in several ways:
* Read short-term memory in a tool
* Write short-term memory from tools
* Create dynamic prompts in middleware based on conversation history or custom state fields
* Access short-term memory in `beforeModel` / `afterModel` middleware to process messages before / after model calls

### Streaming

What's possible with LangChain streaming:
* Stream agent progress - get state updates after each agent step
* Stream LLM tokens - stream language model tokens as they're generated
* Stream custom updates - emit user-defined signals (e.g., "Fetched 10/100 records")
* Stream multiple modes - choose from `updates` (agent progress), `messages` (LLM tokens + metadata), or `custom` (arbitrary user data)


### Structured output

LangChain's prebuilt ReAct agent `createAgent` handles structured output automatically. The user sets their desired structured output schema, and when the model generates the structured data, it's captured, validated, and returned in the `structuredResponse` key of the agent's state.



## Middleware

![](https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=280&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=483413aa87cf93323b0f47c0dd5528e8)

What can middleware do?
* Monitor: Track agent behavior with logging, analytics, and debugging
* Modify: Transform prompts, tool selection, and output formatting
* Control: Add retries, fallbacks, and early termination logic
* Enforce: Apply rate limits, guardrails, and PII detection

### Built-in middleware

#### Summarization

Perfect for:
* Long-running conversations that exceed context windows
* Multi-turn dialogues with extensive history
* Applications where preserving full conversation context matters

```ts
import { createAgent, summarizationMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [weatherTool, calculatorTool],
  middleware: [
    summarizationMiddleware({
      model: "gpt-4o-mini",
      maxTokensBeforeSummary: 4000, // Trigger summarization at 4000 tokens
      messagesToKeep: 20, // Keep last 20 messages after summary
      summaryPrompt: "Custom prompt for summarization...", // Optional
    }),
  ],
});
```

#### Human-in-the-loop

Perfect for:
* High-stakes operations requiring human approval (database writes, financial transactions)
* Compliance workflows where human oversight is mandatory
* Long running conversations where human feedback is used to guide the agent

```ts
import { createAgent, humanInTheLoopMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [readEmailTool, sendEmailTool],
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: {
        // Require approval, editing, or rejection for sending emails
        send_email: {
          allowAccept: true,
          allowEdit: true,
          allowRespond: true,
        },
        // Auto-approve reading emails
        read_email: false,
      }
    })
  ]
});
```

#### Anthropic prompt caching



#### Model call limit


Model fallback


PII detection


To-do list


LLM tool selector


#### Context editing


### Custom middleware



### Examples

Dynamically selecting tools

```ts
import { createAgent, createMiddleware } from "langchain";

// Benefits:
// * Shorter prompts - Reduce complexity by exposing only relevant tools
// * Better accuracy - Models choose correctly from fewer options
// * Permission control - Dynamically filter tools based on user access
const toolSelectorMiddleware = createMiddleware({
  name: "ToolSelector",
  wrapModelCall: (request, handler) => {
    // Select a small, relevant subset of tools based on state/context
    const relevantTools = selectRelevantTools(request.state, request.runtime);
    const modifiedRequest = { ...request, tools: relevantTools };
    return handler(modifiedRequest);
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: allTools, // All available tools need to be registered upfront
  // Middleware can be used to select a smaller subset that's relevant for the given run.
  middleware: [toolSelectorMiddleware],
});
```




## Advanced usage

### Context engineering in agents

Context engineering is providing the right information and tools in the right format so the LLM can accomplish a task. *This is the number one job of AI Engineers*.


| Data Source     | Also Known As | Scope | Examples |
|-----------------|---------------|-------|----------|
| Runtime Context | Static configuration | Conversation-scoped | User ID, API keys, database connections, permissions, environment settings
| State           | Short-term memory    | Conversation-scoped | Current messages, uploaded files, authentication status, tool results
| Store           | Long-term memory     | Cross-conversation  | User preferences, extracted insights, memories, historical data




### Long-term memory


## Use in production





