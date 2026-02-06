# Agentic Coding Manual

* **AI-assisted coding**: e.g. Copilot's autocomplete
* **Agentic coding**: you supply a prompt, and the LLM figures out a game plan and executes it
* **Vibe coding**: agentic coding but with all proposed changes auto-accepted without review


## Vibe Coding

Vibe Coding 可以快速将想法变成可运行的原型，是一种*高质量表达想法的方式*。

Vibe Coding 非常适合原型、MVP和学习阶段，它追求的重点是*速度和探索*，而不是结构化和可维护性。后者才是我们在面向大规模生产时真正要关心的。如果你真在乎生产级质量，就 *不应该提交那些你无法完整解释的代码*。


## Agentic Coding

Agentic Coding 可以完成 70% 的编码工作，而人类需要完成剩下的 30% 编码工作。（新手更快上手，高手更有杠杆。）
* 初级工程师：70% 的代码会让初级工程师陷入虚假的自信，但剩下的 30% 会令初级工程师倍感挣扎
* 高级工程师：比较容易完成那剩余的 30%，而 70% 的代码会大幅提升开发效率

Tests are crucial for validation and maintaining progress.

### 多 Agent

人类注意力是有限的，即使能跑多个 agent，但人类 Review 的进度要慢很多，所以需要像管理 Sprint 一样保持聚焦。

### 综合利用不同模型和工具

#### Plan and Excute

https://medium.com/@dataenthusiast.io/agentic-coding-how-i-10xd-my-development-workflow-e6f4fd65b7f0

Through my experience, I’ve found that combining a simple agent’s flexibility with an integrated IDE agent’s project awareness gives the best results. For instance, *I often use GPT-4 or even Perplexity for high-level planning and architecture discussions, then switch to Cursor for actual implementation.*

The key isn’t to pick the most feature-rich tool, but to understand how different types of agents can complement each other in your workflow. This mixed approach has been crucial in my productivity gains.


## Spec-driven development

* https://github.com/github/spec-kit
* https://github.com/Fission-AI/OpenSpec



## 洞见

### Addy Osmani: AI只能帮你完成70%的代码

[51cto技术栈](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655930723&idx=1&sn=302281d6012f5db60ce5fe5b95283dc9&scene=21&poc_token=HNZYDGmjs7LFiDFuAl78d1OYL2NN9Yts9ZcpBXgp)

* Vibe Coding 非常适合原型、MVP和学习阶段，它追求的重点是速度和探索，而不是结构化和可维护性。后者才是我们在面向大规模生产时真正要关心的。如果你真在乎生产级质量，就不应该提交那些你无法完整解释的代码。
* 过去如果产品经理或工程师有个想法，我会先画个线框图或草图，而现在可以直接 Vibe Coding 出一个能运行的原型。我很喜欢 Vibe Coding 带来的这种高质量表达想法的方式。
* Chrome DevTools MCP
* 大语言模型通常能在极短时间内生成一个大约70%可用的应用程序雏形，但它们往往在最后30%的环节上卡壳。
* 我们现在经常听到这样的故事：产品经理或者非技术型创始人，靠 AI 做出了一个原型，很兴奋，觉得很快就能上线。但最后要么卡住，要么进度被拖得极长。他们原本以为 “一两天能搞定”，结果变成了 “十天、二十天甚至三十天”。
* 你在 “70%问题”那篇文章里还提到，经验丰富的工程师能比较容易地完成那最后30%，但经验不足的工程师反而会陷入困境，甚至会被AI带来一种“虚假的自信感”。-- 完全正确，那最后 30% 的部分，很多初级工程师、实习生都会表现得很挣扎。当 AI 无法修复问题时，他们可能就无从下手了——缺乏调试、分析、定位问题的能力。
* 要想高效使用AI，你必须理解模型的限制，比如它的上下文窗口是有限的。这意味着你需要像项目经理一样思考：把任务拆解成小的、可验证的块；保持需求清晰，反复迭代；不要妄想“一发入魂”能出完美结果。其实，很多传统的软件工程最佳实践依然永不过时。比如：写模块化、可测试的代码；严格执行Code Review；明确输入输出约束；给模型足够上下文。
* 人类注意力是有限的，即使我能同时开20个终端跑不同模型，真正能高质量review的任务量其实很少。所以要像管理Sprint那样，保持聚焦。
* AI会让“新手更快上手”，同时也会让“高手更有杠杆”。能写spec、拆任务、懂架构、会审查的高级工程师，价值只会越来越高。
* 现在我回想最优秀的资深工程师——他们的一天其实很像“多智能体协作”：他们带几个中级开发者、几个实习生，不断在 Slack 上被@：“请帮我解个 bug”“能帮我审下代码吗？”
他们来回切换上下文、做评审、提建议、安排工作、开会指导。某种意义上说，高级工程师早就在做“智能体编排”这件事了。

### 范文杰

https://mp.weixin.qq.com/s/19xbEZpir5dX9PUD3sfdrQ

这种局面将导致两个结果：

低水平、重复性的编程工作非常容易被 AI 替代，一个技术专家搭配 AI 工具就能抵得上之前 3-5 人团队的生产效率 —— 而 AI 工具的成本要比“人”便宜的多，因此在出现新的商业增长点之前，许多科技公司已经不需要那么多程序员，就业市场体量必将缩小；

未来(其实当下已经是)工程师角色的主要职责必然发生极大转变，多数时候不再聚焦于具体编码，而转换为“AI 指导者 + 质检 + 软件项目管理”角色，相比于纯粹的编码，这些新的职责需要站在更高维度 Review 人与 AI 协作的过程与常务，因此反而更需要深厚的计算机功底、泛计算机知识、编码与软件工程经验等等。

但这就延伸出了先有鸡还是先有蛋的困境：操作 AI 需要更高维度的能力，但 AI 在提升软件工程效率的同时也在不断抬高计算机行业的入职门槛，多数新人或资历较浅的工程师正被 AI “替代”并挤压出劳动力市场，这些新鲜血液并没有机会与实践积累足够经验与技能。我认为，结果将很悲观地导向一个被说烂了的词：马太效应，当下具备深厚计算机知识且熟练使用 AI 编码的人将获得更多的职业机会与实战经验，逐渐成为“超级个体”，而经验薄弱且并不熟悉 AI 工具的新手越来越难以获得高价值的项目经验，职业窗口可能会越来越小。

虽然从过去社会发展经验来看，技术创新整体是“向善”的，在“未来”必然会创造出更多新岗位 —— 例如马车被汽车替代后，虽然马夫职业消失了，却衍生出汽修、汽车工程师等职业；AI 的发展也很可能会延伸出“AI 训练师”、“AI 应用体系设计”等岗位。但当下在没有找到新的商业增长点之前，经济上最理性的优化策略必然是进一步“去肥增瘦”，执行更严格的“节流”策略，这就意味着短期内行业很可能还会处于较大的下行压力。

**出路**

* AI Agent 开发工程师：光有模型是不够的，还需要结合场景上下文，以最恰当的方式为具体场景构建出效率最大化的具体软件 —— 例如 Cursor、V0.dev、Lovart 等；
* AI+计算机专家：业界还是需要经验丰富，有专精方向同时又有较广泛的计算机知识储备的高级工程师，我个人甚至觉得，无论 AI 模型如何迭代发展，都不可能做到 L5 级别的全自动编码，始终需要这么一个角色，才能真正生产出企业级的应用程序。简言之，行业已经不需要那么多“人力”，但依然需要高端人才。


### Quantity or Quality

https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes

Nathan Sobo 说：在一个资源丰富的时代，我们的标准应该更高。作为软件工程师，我们的价值不应该以代码的行数来衡量，而应该以创造可靠、设计精良、易于维护并且让用户用起来舒服的系统来体现。

I'm here to make the case for quality software in an era where constraints on code production have been dramatically lifted.

When Limits Disappear, Quality Should Matter More. As software engineers, we should measure our contribution not in lines of code generated, but in reliable, well-designed systems that are easy to change and a pleasure to use.


### Vibe Coding Manual

https://www.reddit.com/r/ChatGPTCoding/comments/1j5l4xw/vibe_coding_manual/

This just looks like how senior devs guide junior devs.
I did this for years; back then, we called the role "engineering manager".

Interaction Style: I could type a prompt in 1 minute, let it spin for a few minutes while I loaded the laundry, come back and review the changes. 敲完提示，让 Agent 干活，然后等会再回来审查更改。

Agentic coding lowered the bar for personal/small-audience apps. 一些本没有时间和精力构建的个人应用、小众应用，现在开始变得可行了。

The real power of agentic coding, though, is how it lowers the bar to building things. You don’t need large blocks of focused time to make progress. Instead, you can chip away at a project in small increments — a few minutes here, a few minutes there — while doing other things. The agent keeps the context and can pick up where you left off, making it perfect for those of us who can’t dedicate hours of uninterrupted time to coding.

This isn’t just about making it easier to build personal projects. It’s about making it possible to build them at all. Without agentic coding, I wouldn’t have built the postcard app. I simply didn’t have the time or focus to do it the traditional way. And that’s the real promise of this technology: not just making coding faster, but making it accessible to people who, for whatever reason, can’t commit to the traditional development workflow.

You absolutely need human review of agent-generated code. It's not enough to just run the tests and see if they pass. 对于企业项目，人工审核代码是必须的，简单跑通测试用例是不够的。

### 在 AI Coding 时代真正的源码是什么？

在 AI Coding 时代，传统意义上的代码已经不能称之为源代码了，因为它们是 LLM 廉价且批量生成的，只能称之为「中间代码」。那么真正的代码是什么呢，它必须是人类可以理解和传递，同时也易于 LLM 理解的东西。Specialization 和 Prompt 才是真正的源代码。

跟帖1：我在项目里面会加一个 `.vibe` 目录，用于存储全部的产品和技术实现文档。

跟帖2：不止 prompt，起码还需要指定 vibe coding 工具及版本，模型精确型号，温度得设为0。如果是 agent 生成，还需指定 mcp。




