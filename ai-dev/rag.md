# RAG

## RAG

检索增强生成 Retrieval-Augmented Generation
* 先从资料库里检索相关内容
* 再基于这些内容来生成答案

产品手册太长所带来的问题
* 模型无法读取所有内容
* 模型推理成本高
* 模型推理慢

RAG 的基本运行流程
* 准备（提问前）：分片 -》索引
* 回答（提问后）：召回 -》重排 -》生成
	- 召回：根据相似度挑10条数据。方法：向量相似度。特点：成本低、耗时短、准确率低。适合场景：初步筛选
	- 重排：在 10 条里挑 3 条数据。方法：cross-encoder 模型。特点：成本高、耗时长、准确率高。适合场景：精挑细选

开源 Embedding 模型排行榜 https://huggingface.co/spaces/mteb/leaderboard

```txt
向量 -> 原始文本     # 类比 HashMap<key, value>
```

为什么需要 RAG
* 解决模型幻觉（Hallucination）问题：模型回答更准确、更有依据。
* 知识可更新：外部知识库随时更新，无需重新训练模型。
* 隐私与定制化：企业可用自有文档或数据库，保障安全与个性化。



RAG 是 Retrieval-Augmented Generation 的缩写，中文通常翻译为 检索增强生成。这是当前大语言模型（LLM）中非常重要的一种架构，用于让模型“结合外部知识”来回答问题。

⸻

🧩 一句话解释

RAG = “先查资料，再回答”。

也就是说，当用户提问时，模型不会只依赖训练时的内部知识，而是先从外部数据库、文档或知识库中检索到相关内容，再结合这些内容生成回答。

⸻

⚙️ 工作流程示意

一个典型的 RAG 流程分为 三步：
1. 检索（Retrieval）
  * 从外部知识库（如文档、PDF、数据库、搜索引擎）中找到与问题最相关的片段。
  * 通常通过 向量数据库（Vector Database）来实现，比如 Milvus、FAISS、Pinecone、Weaviate 等。
2. 增强（Augmentation）
  * 把检索到的内容（例如几段文本）“拼接”进模型的输入提示（prompt）中，让模型在生成回答时能参考这些新信息。
3. 生成（Generation）
  * LLM（如 GPT-4、Claude、Gemini）基于输入的上下文和检索信息生成答案。


🔧 RAG 常见技术组件

| 模块       | 功能                      | 常用工具/框架 |
|------------|--------------------------|----------------|
| 文本切分    | 将长文档分割成可检索的小片段 | LangChain、LlamaIndex、Haystack |
| 向量化     | 把文本转成向量（embedding） | OpenAI Embeddings、bge-large、text2vec |
| 向量数据库 | 存储和检索相似文本           | FAISS、Milvus、Pinecone、Chroma |
| 生成模型   | 根据上下文生成回答          | GPT、Claude、Gemini、Qwen 等 |



## OpenAI 不用 Embedding 的方案

* 视频 https://www.youtube.com/watch?v=YVVUlce_xH4
* 文档 https://cookbook.openai.com/examples/partners/model_selection_guide/model_selection_guide

网友评论
* 向量化有时查找不准，这个方法缺点就是贵
* 效率和成本肯定都没有使用嵌入模型好，拿 LLM 当 RAG 不如直接全丢给 Gemini 2.5 Pro 直接给答案

```txt
         /-----> 重复多轮 ------>\
文件加载 --》内容切割 --》 内容挑选 --》 生成答案 -- 答案验证
```

模型选择

| 环节    | 模型          | 理由
|---------|--------------|-------------
| 内容挑选 | GPT-4.1-mini | 上下文窗口大、成本低
| 生成答案 | GPT-4.1      | 保证答案的准确性
| 答案验证 | o4-mini      | 推理强


## GraphRAG

GraphRAG 的工作流程（对比传统 RAG）

| 阶段        | 传统 RAG                                  | GraphRAG
|------------|-------------------------------------------|------------------------------------------------
| 1. 知识组织 | 把文本切成碎片（chunks）存进向量数据库        | 把文本转成节点（entities）和关系（relations），构建“图数据库”
| 2. 检索方式 | 通过相似度搜索（语义 embedding）找最相似的片段 | 通过图结构搜索，找“相关节点”和“语义关联路径”
| 3. 增强输入 | 将检索到的文本片段拼接进 Prompt              | 将相关节点、关系、上下文路径等信息一并传入模型
| 4. 生成回答 | 模型基于检索片段生成回答                     | 模型基于结构化关系和文本内容生成更逻辑、连贯的回答






