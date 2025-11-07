# Claude Code: Best practices for agentic coding

https://www.anthropic.com/engineering/claude-code-best-practices


## 1. Customize your setup

Claude Code is an agentic coding assistant that *automatically pulls context into prompts*. This context gathering consumes time and tokens, but you can optimize it through environment tuning.

### 1.1 Create _CLAUDE.md_ files

CLAUDE.md is a special file that Claude automatically pulls into context when starting a conversation. This makes it an ideal place for documenting:

* Common bash commands
* Core files and utility functions
* Code style guidelines
* Testing instructions
* Repository etiquette (e.g., branch naming, merge vs. rebase, etc.)
* Developer environment setup (e.g., pyenv use, which compilers work)
* Any unexpected behaviors or warnings particular to the project
* Other information you want Claude to remember

*There’s no required format for CLAUDE.md files*. We recommend keeping them concise and human-readable.

You can place CLAUDE.md files in several locations:
* 当前目录和上层目录的能同时生效
* 子目录的则需要待进入到相应子目录后才生效
* `~/.claude/CLAUDE.md` applies to all your claude sessions

### 1.2 Tune your _CLAUDE.md_ files

Your CLAUDE.md files become part of Claude’s prompts, so they should be refined like any *frequently used prompt*.

You can add content to your CLAUDE.md manually or press the `#` key to give Claude an instruction that it will automatically incorporate into the relevant CLAUDE.md. Many engineers use `#` frequently to document commands, files, and style guidelines while coding, then include CLAUDE.md changes in commits so team members benefit as well.

### 1.3 Curate Claude's list of allowed tools

There are four ways to manage allowed tools:

* Select "Always allow" when prompted during a session.
* Use the `/permissions` command after starting Claude Code to add or remove tools from the allowlist.
* Manually edit your `.claude/settings.json` or `~/.claude.json` (we recommend checking the former into source control to share with your team).
* Use the `--allowedTools` CLI flag for session-specific permissions.

### 1.4 If using GitHub, install the `gh` CLI


## 2. Give Claude more tools

### 2.1 Use Claude with bash tools

While Claude knows common utilities like unix tools and `gh`, it won't know about your custom bash tools without instructions:
* Tell Claude the tool name with usage examples
* Tell Claude to run --help to see tool documentation
* Document frequently used tools in CLAUDE.md

### 2.2 Use Claude with MCP

### 2.3 Use custom slash commands

自定义 `/xxx` 命令
* 通过文件名来确定命令名，`文件名==命令名`
* 支持传参
* 命令定义的内容其实就是「一段 Prompt」

Similarly, you can add your own personal commands to the ~/.claude/commands folder for commands you want available in all of your sessions.

```txt
Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use `gh issue view` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.
```

Putting the above content into `.claude/commands/fix-github-issue.md` makes it available as the `/project:fix-github-issue` command in Claude Code. You could then for example use `/project:fix-github-issue 1234` to have Claude fix issue #1234.



## 3. Try common workflows 常见工作流

### 3.1 Explore, plan, code, commit

1. Ask Claude to read relevant files, images, or URLs, providing either general pointers ("read the file that handles logging") or specific filenames ("read logging.py"), but explicitly tell it not to write any code just yet.
2. Ask Claude to make a plan for how to approach a specific problem. We recommend using the word "think" to trigger extended thinking mode, which gives Claude additional computation time to evaluate alternatives more thoroughly. These specific phrases are mapped directly to increasing levels of thinking budget in the system: *"think" < "think hard" < "think harder" < "ultrathink."*
3. Ask Claude to implement its solution in code.
4. Ask Claude to commit the result and create a pull request.

Steps #1-#2 are crucial—without them, Claude tends to jump straight to coding a solution. While sometimes that's what you want, asking Claude to research and plan first significantly improves performance for problems requiring deeper thinking upfront.

### 3.2 Write tests, commit; code, iterate, commit

### 3.3 Write code, screenshot result, iterate

Give Claude a way to take browser screenshots (e.g., with the Puppeteer MCP server, an iOS simulator MCP server, or manually copy / paste screenshots into Claude).

Like humans, *Claude's outputs tend to improve significantly with iteration*. While the first version might be good, after 2-3 iterations it will typically look much better. Give Claude the tools to see its outputs for best results.

### 3.4 Safe YOLO mode

To minimize these risks, use --dangerously-skip-permissions in a container without internet access. You can follow this reference implementation using Docker Dev Containers.

### 3.5 Codebase Q&A

When onboarding to a new codebase, use Claude Code for learning and exploration. You can ask Claude the same sorts of questions you would ask another engineer on the project when pair programming.

Claude can agentically search the codebase to answer general questions like:

How does logging work?
How do I make a new API endpoint?
What does async move { ... } do on line 134 of foo.rs?
What edge cases does CustomerOnboardingFlowImpl handle?
Why are we calling foo() instead of bar() on line 333?
What’s the equivalent of line 334 of baz.py in Java?

### 3.6 Use Claude to interact with git

Searching git history to answer questions like "What changes made it into v1.2.3?", "Who owns this particular feature?", or "Why was this API designed this way?" It helps to explicitly prompt Claude to look through git history to answer queries like these.

### 3.7 Use Claude to interact with GitHub

Creating pull requests: Claude understands the shorthand "pr" and will generate appropriate commit messages based on the diff and surrounding context.

This eliminates the need to remember gh command line syntax while automating routine tasks.


## 4. Optimize your workflow

### 4.1 Be specific in your instructions

Claude can infer intent, but it can't read minds. *指令越详细越清晰，结果越符合预期。*

### 4.2 Give Claude images

Claude excels with images and diagrams through several methods:

Paste screenshots (use·`ctrl+v` but not `cmd+v` to paste on mac)
Drag and drop images directly into the prompt input
Provide file paths for images

### 4.3 Mention files you want Claude to look at or work on

### 4.4 Give Claude URLs

### 4.5 Course correct early and often

While auto-accept mode (`shift+tab` to toggle) lets Claude work autonomously, you'll typically get better results by being an active collaborator and guiding Claude's approach.

These four tools help with course correction:

* Ask Claude to make a plan before coding. Explicitly tell it not to code until you’ve confirmed its plan looks good.
* Press Escape to interrupt Claude during any phase (thinking, tool calls, file edits), preserving context so you can redirect or expand instructions.
* Double-tap Escape to jump back in history, edit a previous prompt, and explore a different direction. You can edit the prompt and repeat until you get the result you're looking for.
* Ask Claude to undo changes, often in conjunction with option #2 to take a different approach.

### 4.6 Use `/clear` to keep context focused

### 4.7 Use checklists and scratchpads for complex workflows

For example, to fix a large number of lint issues, you can do the following:
* Tell Claude to run the lint command and write all resulting errors (with filenames and line numbers) to a Markdown checklist
* Instruct Claude to address each issue one by one, fixing and verifying before checking it off and moving to the next

### 4.8 Pass data into Claude

* Copy and paste directly into your prompt (most common approach)
* Pipe into Claude Code (e.g., cat foo.txt | claude), particularly useful for logs, CSVs, and large data
* Tell Claude to pull data via bash commands, MCP tools, or custom slash commands
* Ask Claude to read files or fetch URLs (works for images too)


## 5. Use headless mode to automate your infra



## 6. Uplevel with multi-Claude workflows

### 6.3 Use git worktrees




