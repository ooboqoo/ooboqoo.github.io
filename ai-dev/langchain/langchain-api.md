# LangChain API


```ts
function createAgent(
    // The reasoning engine
    model?: string | LanguageModelLike;

    // Prompt shape your agent approaches tasks
    systemPrompt?: string;
    responseFormat?: ResponseFormatType;

    // Tools give agents the ability to take actions
    tools?: (ServerTool | ClientTool)[];

    // Array of middleware for extending agent behavior
    middleware?: readonly AgentMiddleware<any, any, any>[];

    // Memory
    checkpointer?: BaseCheckpointSaver | boolean;
    stateSchema?: StateSchema;
    contextSchema?: ContextSchema;
    store?: BaseStore;

    // An optional abort signal that indicates that the overall operation should be aborted.
    signal?: AbortSignal;
    // An optional name for the agent.
    name?: string;
    // An optional description for the agent.
    description?: string;
) : ReactAgent<T, StateSchema, ContextSchema, TMiddleware>;
```



