# Claude Code


思路转变：从 IC 转变成带 Intern 的 mentor / buddy

## 安装配置

### Claude Code Proxy

https://doc.closeai-asia.com/tutorial/integrations/claude-code.html

```bash
export ANTHROPIC_BASE_URL="https://api.openai-proxy.org/anthropic"
export ANTHROPIC_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

配好上面两个环境变量到 `~/.bashrc` 就能用。

完整配置过程
1. 安装 Claude Code `npm install -g @anthropic-ai/claude-code`
2. 正常登录并配置 Claude Code，开始按量使用（对于没官方账号或者翻墙有困难的，教程有配置免登录的方案）
3. 配好上面两个环境变量，绕过官方服务达到免翻墙使用的目的

### 网络访问

Claude Code 需要访问以下几个 URL：

api.anthropic.com
statsig.anthropic.com
sentry.io

在使用容器化环境时，确保这些 URL 被允许进行访问。

## 使用技巧

```bash
# 自动执行 (Yolo Mode)
alias yolo="claude --dangerously-skip-permissions"

# 民间统计花费
pnpm dlx ccusage

# 通过管道传输数据
cat build-error.txt | claude -p '简明扼要地解释这个构建错误的根本原因' > output.txt
```



## Cursor vs Claude vs Codex

### Cursor vs Claude

当Cursor似乎在有所保留时，Claude Code却全身心地投入到了质量上。

Claude Code的局限性：
* 不支持截图功能（全部是文本，但你仍然可以粘贴图片）
* 仍需终端舒适（并非适合所有人）
* 初始成本冲击是真实的

Cursor 的主要问题：
* 每月 20 美元，感觉像是在追求成本节约
* 结果往往缺乏 Claude Code 的深度和质量
* 可能过于急于实施而缺乏充分理解


### Cursor + Claude Code

我在 Cursor 的终端中运行 Claude Code，而且效果很好。这种嵌套式的工作流程让我兼顾了两者的优点
* Claude Code 在重型任务中的出色规划与执行能力
* Cursor 熟悉的界面用于审查更改
* 当 Claude Code 正在忙碌时，使用 Cursor 快速处理小型任务



## 不同角色如何利用 CC

1、技术和工程团队 (数据基础设施、产品开发、安全、推理、RL工程)
这类团队主要利用 Claude Code 来加速现有的软件开发生命周期。主要使用场景包括

代码库理解与上手：新员工或需要在不熟悉的代码库中工作的工程师，会请求 Claude Code 解释系统架构、识别关键文件和依赖关系，从而显著缩短上手时间。

功能开发与原型设计：

监督式开发：在开发核心业务逻辑时，工程师会提供详细指令，实时监督 Claude Code 编写代码，确保质量和合规性。
自主式开发：对于非核心功能（如实现Vim模式）或快速原型，工程师会启用“自动接受模式”，让 Claude Code 自主编写、测试和迭代，自己仅做最终的审查和微调。


自动化测试：工程师在完成功能开发后，会让 Claude Code 编写全面的单元测试，并自动覆盖容易忽略的边界情况。

代码审查与重构：用于审查基础设施代码（如Terraform计划）以评估风险，或处理那些对于编辑器宏来说太复杂、但又不足以投入大量开发精力的重构任务。

调试与事故响应：当遇到复杂问题时（如 Kubernetes 集群故障），团队会向 Claude Code 提供堆栈跟踪、错误日志甚至UI截图，让其引导找到问题根源并提供修复指令。安全工程团队通过这种方式，将原本需要10-15分钟的基础设施调试时间缩短到了5分钟左右。



## Claude Code 的核心功能与工作流程

编辑文件并修复代码中的错误：能够在代码库中跨文件进行编辑，并自动修复 bug。
回答关于代码架构和逻辑的问题：开发者可以向 Claude Code 提出关于代码架构和逻辑的疑问，Claude Code 将帮助快速解答，提升代码理解效率。
执行测试、修复代码、进行质量检查：支持自动执行测试、修复错误、进行代码检查等，帮助确保代码质量。
Git 历史记录搜索、解决合并冲突、创建提交和 PR：Claude Code 可以搜索 Git 历史记录，解决合并冲突，并创建提交和 pull requests，从而简化版本控制操作。

理解不熟悉的代码：使用 Claude Code 快速了解新的代码库。

* 提问：> 什么是支付处理系统的功能？
* 提问：> 查找用户权限检查的代码位置
* 提问：> 解释缓存层的工作原理

自动化 Git 操作：Claude Code 可以简化 Git 操作流程。

* 提问：> 提交我的更改
* 提问：> 创建一个 Pull Request
* 提问：> 哪个提交在 12 月增加了 markdown 测试？
* 提问：> 在主分支上进行 rebase 并解决合并冲突

智能编辑代码：使用自然语言命令自动编辑和修复代码库中的问题。

* 提问：> 向注册表单添加输入验证
* 提问：> 重构 logger 使用新的 API
* 提问：> 修复 worker 队列中的竞态条件

测试与调试代码：Claude Code 能够自动运行和修复测试。

* 提问：> 运行认证模块的测试并修复失败
* 提问：> 查找并修复安全漏洞
* 提问：> 解释为什么这个测试失败

激发深入思考：对于复杂问题，可以要求 Claude 更深入地思考：

* 提问：> 思考如何构建新的支付服务
* 提问：> 深入思考我们身份验证流程中的边缘情况


Claude Code 提供了多项帮助开发者提高开发效率功能：






## 使用技巧


### Claude Code CLI 命令

CLI 命令直接在终端中输入，用于启动会话、执行查询、修改配置等。以下是一些常见的命令及其用途：

* `claude`：启动交互式 REPL（Read-Eval-Print Loop） 启动 Claude Code 会话，进入交互式环境。
* `claude "query"`：使用初始提示启动 REPL 启动会话时，直接输入查询或任务提示，便于快速开始。
* `claude -p "query"`：运行一次性查询并退出 适用于需要一次性获取结果且不希望保持会话状态的情况。
* `cat file | claude -p "query"`：处理管道内容 将文件内容通过管道传递给 Claude Code，进行分析或处理，支持批量操作。
* `claude config`：查看和修改配置 用于调整 Claude Code 的配置设置，例如界面主题、通知偏好等。
* `claude update`：更新到最新版本 保证始终使用 Claude Code 的最新功能和修复，确保系统稳定运行。
* `claude mcp`：配置 Model Context Protocol（MCP）服务器 用于连接外部工具和数据源，扩展 Claude Code 的功能，支持多源集成。


### Claude Code Slash 命令

Slash 命令在 Claude Code 会话中执行各种操作，如错误报告、历史记录清除、查看成本等。常见 Slash 命令包括：

* /bug：报告错误 将当前会话内容发送给 Anthropic 团队，帮助诊断和解决问题。
* /clear：清除会话历史记录 重置会话上下文，节省 token 消耗，保持会话简洁。
* /compact：压缩会话 降低 token 使用量，当上下文变得庞大时，减少数据存储需求。
* /config：查看/修改配置 允许用户在会话中动态调整设置，例如修改主题或功能偏好。
* /cost：显示 token 使用统计 帮助用户实时监控和管理 token 消耗，避免不必要的费用。
* /doctor：检查安装健康状况 诊断 Claude Code 安装问题，确保正常运行。
* /help：获取帮助 提供快速参考，帮助用户了解 Claude Code 的命令和功能。
* /init：初始化项目 使用 CLAUDE.md 文件初始化或更新项目，确保 Claude Code 理解项目背景。
* /login：切换 Anthropic 帐户 切换使用不同的 Anthropic 帐户登录，方便管理多个账户。
* /logout：注销账户 安全退出当前账户，保护用户隐私。
* /pr_comments：查看 pull request 评论 便于用户在 Claude Code 中查看和处理代码审查意见。
* /review：请求代码审查 提交代码审查请求，获得反馈。
* /terminal-setup：设置键绑定 安装 Shift+Enter 键绑定，改善在特定终端（如 iTerm2 或 VSCode）中的多行输入体验。


### 处理大量文本

当您需要处理大量代码或长指令时，可以采取以下措施：

避免直接粘贴：非常长的粘贴内容可能会导致 Claude Code 无法顺利处理。
使用文件处理工作流：将内容保存为文件，然后让 Claude Code 读取该文件。
注意 VS Code 限制：VS Code 的终端对长粘贴内容较为敏感，可能会出现截断现象。

### 任务规模和上下文制约

类和 AI 在某个方面惊人地相似：处理小任务时游刃有余，面对大项目就容易手忙脚乱。对 CC 来说，这个问题更加明显，因为它还要面对一个硬性限制——200k 的上下文窗口。体感上来说，普通使用个十几二十分钟，你就会看到上下文使用量飙到 90% 以上。更糟糕的是，如果在执行任务的过程中触发了自动压缩，整个 agent 可能会陷入混乱，忘记自己在做什么，或者陷入死循环重复做一件事。


任务拆解是关键

把大任务拆解成具体的小任务，这一步最好在 Plan Mode 中进行，让 AI 帮你一起梳理。对于一个 session 难以完成的任务，可以让 AI 把讨论内容进行文档化，保存到项目里。这样即使换了新的 session 你也可以让 AI 读取这个文档，快速恢复上下文。

使用 Subagent

C 最近推出的 Subagent 功能在一定程度上缓解了这个问题。在以前，当 CC 使用 Task 工具进行任务时，实际上是在一个全新的上下文中进行工作。这相当于扩展了主 Session 的上下文窗口。

以前我们只能通过 prompt 技巧来“诱导”CC 使用 Task 工具，效果时好时坏。现在有了专门的 subagent 配置，稳定性大大提升。

在合适的时机手动压缩


虽然 CC 会自动进行上下文压缩，但我的经验是：主动出击会更好。当你看到上下文使用量接近用满时，不妨手动执行 /compact 命令。这可以让压缩发生在一个更自然的断点进行。比如刚完成一个功能模块，或者刚跑完一轮测试。这时候压缩，AI 不太会丢失重要信息。而如果等到自动压缩，可能正好在你改代码改到一半的时候触发，那就很容易出问题。

另一个技巧是：对于相对独立的任务，干脆新开一个 session。反正你已经把任务计划文档化了，新 session 读取文档就能快速上手。这比在一个快要爆炸的 session 里硬撑要明智得多。

*当前在 AI 辅助编程中，上下文窗口依然是稀缺资源，要像管理内存一样管理它。*合理规划、及时清理、必要时“换个房间”，才能让 vibe coding 的体验保持流畅。




### 动态更新，增加团队协作

把 CLAUDE.md 当做一个动态文档，当发现 Claude 忘做代码检查，直接加一句

```
# Don't Forget
- RUN `npm run lint` BEFORE COMMITTING!
```

然后把更改提交到 Git，这样我的队友也可以看到啦。


### 玩转 Bash 脚本

把自定义脚本写进 CLAUDE.md，AI 就能直接调用

```
Handy Scripts
./deploy.sh: Pushes to staging with ./deploy.sh --env staging
./logs.sh: Grabs recent logs with ./logs.sh --count 100
```

实战场景：
服务器崩了？直接让claude "运行./logs.sh -count 100，分析错误原因" ，它在两秒钟内就发现了一个缺失的配置，比我翻日志快10 倍😭。


【实战1】从 0 到 1 构建登录系统

* Step1：先让 AI 读代码摸清套路 - `读取 src/auth.js 并告诉我它在做什么，不要编写代码`
* Step2：让 AI 脑暴方案 - `仔细思考并制定一个向 src/auth.js 添加登录的计划` 我很喜欢这个计划，所以我把它保存为 jwt-plan.md
* Step3：按计划生成代码 - `按照jwt-plan.md 向src/auth.js 添加JWT`

【实战2】测试先行的折扣功能开发
* Step1：先写测试“倒逼“代码 - `为src/checkout.js 中的折扣函数编写测试。如果总价超过100 美元，给予10% 的折扣。暂时不要编写代码。`
* Step2：跑测试发现失败？（是的，因为功能还不存在）直接让AI 填坑。 - `向src/checkout.js 添加折扣功能，使测试通过。不要更改测试。`


## How I Use Claude Code

https://spiess.dev/blog/how-i-use-claude-code

### `/clear` Start New Threads

AI agents tend to become more unpredictable the longer a conversation goes. This is especially true when you're asking different questions. So you should call `/clear` more often, results may improved dramatically.

### Create Precise Prompts 指令越详细越好

It's important that you write out all the context that you have in your head, the more context you can give Claude, the more effective it'll be. If you're thinking of some edge-cases, absolutely mention it to Claude. If you remember "there's a similar pattern that we've used for this type of problem in this codebase in the past", write it down! The more precise the prompt, the better Claude will do.

### Let Claude Code Use Claude Code

Did you know that you can use Claude Code's tools as an MCP server (`claude mcp serve`)? When I found out, I looked into what tools it exposes and noticed one called Task. The premise of this tool is to spin off a sub-agent that will have the same access to tools as your main agent (except that it cannot spawn another sub-task) and reports back the results.

### Tell Claude to Think

Claude is lazy by default. E.g., when you tell Claude to do something, it'll choose the path of least resistance. To get better results, especially during planning processes, I recommend telling Claude to ultrathink.

### Edit Previous Messages

Whenever you're too eager to hit send or just feel like a previous message could be more precise to get better results, you can *press Escape twice to jump to a previous message and fork the conversation*. I use this all the time to refine prompts or simply have Claude try again.

Oh, and if you somehow want to get back to the previous state, you can start Claude with the `--resume` flag to list all prior threads.


### Planning Mode 规划模式

Claude Code has a built-in planning mode, that is triggered when you press `Shift+Tab` twice. In this mode, Claude won't write to your file system.

### Let Claude RTFM 让 Claude 去看说明书

I noticed Claude often using outdated setups and project structures, especially for fast-moving frontend frameworks!

What I do now is ask Claude to read the manual first. This can be done in different ways:
* Paste a link to the docs and ask Claude to read it first
* Ask Claude to find out the state-of-the-art
* Use the Task tool and have Claude conduct deep-research on a particular topic

```
create a deep research task to figure out how to migrate a website from tailwind 3 to 4 and then present me with a
  short summary of the results
```

### Stage Early, Stage Often

If I'm happy after a turn, I'm usually going to stage everything just so I know I can easily revert to it later.


