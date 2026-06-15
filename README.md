# AI Agent 28 天精通训练营

目标：用 28 天建立 AI Agent 的工程直觉、原理理解、实践能力和持续输出习惯。

这不是一份“看资料”的计划，而是一个交付型训练项目。每天都要同时完成三件事：

1. 学清楚一个小范围的原理。
2. 做出一个可以检查的实践 artifact。
3. 把当天的理解写成输出，沉淀到这个项目里。

28 天结束后，你应该拥有：

- 一个从零手写的最小 Agent Loop。
- 一个本地 AI-CLI Harness。
- 一套 Tool / Skill / MCP / Memory 的对照实验。
- 一个可复用的 AI 资讯跟踪系统。
- 一组 agent eval 任务集和失败复盘。
- 4 篇周总结和 28 篇每日学习日志。

---

## 0. 学习原则

### 不以“看完”为目标

每天的学习必须落到文件、代码、trace、图、表、文章中的至少一种。只看文档、收藏链接、听播客，都不算完成。

### 不追求框架优先

前 14 天尽量少依赖 LangChain、AutoGen、CrewAI 这类高层框架。你要先知道“轮子长什么样”，再去评价框架抽象是否合理。

### 每天只吃透一个核心问题

例如：

- Agent 为什么需要 loop？
- Tool schema 为什么会显著影响成功率？
- Harness 和 Agent 框架有什么区别？
- Skill 和 MCP 到底分别解决什么问题？
- Memory 是数据结构问题，还是产品策略问题？

每天只回答一个主问题，但必须回答到能讲给别人听。

### 每 7 天一次复盘

第 7、14、21、28 天不安排大规模新概念，重点做回顾、重构、补洞和输出文章。

---

## 1. 推荐技术栈

主语言：TypeScript 5.x + Node.js 20+
包管理：`pnpm` 或 `npm`，任选一个
模型接口：优先 OpenAI Responses API / Agents SDK JS；如果没有 API key，可以先用 mock model 完成 loop 结构
日志格式：JSONL
文档格式：Markdown
MCP：TypeScript 优先

建议目录结构：

```text
ai-agent-28days/
  README.md
  daily/
    day-01.md
    day-02.md
  news/
    2026-06-08.md
  notes/
    concepts.md
    glossary.md
  mini_agent/
  cli_harness/
  skills/
  mcp_servers/
  memory/
  evals/
  outputs/
  traces/
```

开始前建议执行：

```bash
git init
mkdir -p daily news notes mini_agent cli_harness skills mcp_servers memory evals outputs traces
```

如果你还没有配置模型 API key，先创建 `.env.example`，不要提交真实 key：

```bash
touch .env.example
```

---

## 2. 每日固定流程

每天建议 2.5-4 小时。时间不够时，优先保证“实践 artifact”和“输出”，少看资料。

### 2.1 AI 资讯环节，20-30 分钟

每天从下面来源中选 3 条和 AI Agent 相关的信息：

- OpenAI 官方：Agents SDK、Responses API、Codex、模型更新。
- Anthropic / Claude 官方：Claude Code、Skills、MCP、Agent SDK、memory、safety。
- Google AI / DeepMind：Gemini、Antigravity、agentic coding、robotics agent、research agent。
- MCP 官方：spec、SDK、security、transport、tools/resources/prompts。
- Hugging Face Trending Papers：agent、tool use、memory、multi-agent、eval、RAG。
- LangChain / LangGraph、AutoGen、OpenHands 等工程生态更新。

每天不要泛泛摘抄新闻。每条资讯都按这个模板写进 `news/YYYY-MM-DD.md`：

```markdown
## 资讯 1：标题

- 来源：
- 发布日期：
- 一句话事实：
- 和 AI Agent 的关系：属于 tool / memory / harness / eval / multi-agent / safety / product 哪一类？
- 我今天学到的判断：
- 对本项目的行动：今天或本周要不要改代码、补实验、补笔记？
- 可信度：官方 / 论文 / 工程博客 / 二手媒体 / 社区讨论
```

筛选规则：

- 至少 1 条来自官方或论文。
- 至少 1 条和当天学习主题相关。
- 社区观点可以看，但不能当事实来源。
- 如果遇到模型名、发布日期、API 能力变化，必须核对官方来源。

### 2.2 概念学习环节，45-60 分钟

每天只学习当天主题相关的资料。输出一张“概念卡”到当天日志：

```markdown
## 今日概念卡

- 概念：
- 我自己的定义：
- 它解决什么问题：
- 它不解决什么问题：
- 常见误解：
- 最小例子：
- 和前一天知识的关系：
```

### 2.3 实践环节，60-120 分钟

每天必须产出一个可检查 artifact：

- 代码文件。
- JSONL trace。
- CLI demo。
- Skill 文件。
- MCP server。
- memory 文件。
- eval 任务集。
- 架构图或对照表。

实践完成后，写清楚怎么复现：

```markdown
## 今日实践

- 目标：
- 文件：
- 运行命令：
- 观察结果：
- 失败点：
- 下一步：
```

### 2.4 输出环节，30-45 分钟

每天写 `daily/day-XX.md`。最低要求：

- 300-800 字。
- 有“今天我原本以为...现在我认为...”。
- 有一个能复用的经验。
- 有一个仍然不懂的问题。

每天最后建议 commit：

```bash
git add README.md daily news notes mini_agent cli_harness skills mcp_servers memory evals outputs traces
git commit -m "day XX: <today topic>"
```

---

## 3. 28 天总览

| 周期 | 主题 | 核心产物 |
| --- | --- | --- |
| Day 1-7 | Agent Loop 原理 | 手写 mini agent + trace + 第一篇总结 |
| Day 8-14 | AI-CLI Harness | 本地 CLI、文件工具、shell 工具、checkpoint |
| Day 15-21 | Skill / MCP / Memory 入门 | 2 个 Skill、1 个 MCP server、memory 雏形 |
| Day 22-28 | 多 Agent / Eval / 生产化 | 多 agent demo、eval benchmark、最终复盘 |

---

## Day 1：建立 AI Agent 的系统地图

### 今日问题

AI Agent 到底由哪些部件组成？为什么“模型 + prompt”还不是一个真正的 agent？

### 学习内容

1. 阅读 OpenAI Agents SDK overview，关注 agent、tools、handoffs、state、tracing。
2. 阅读 Claude Skills overview，关注 progressive disclosure。
3. 阅读 MCP overview，关注 tools、resources、prompts、transport。
4. 建立自己的术语表：agent、tool、skill、harness、memory、session、trace、handoff、guardrail、eval。

### 实践内容

创建 `notes/glossary.md`，写出每个概念的定义，必须用自己的话，不要复制官方定义。

创建 `outputs/agent-system-map.md`，画一张文本架构图：

```text
User
  -> CLI / App / API
  -> Agent Harness
      -> Model
      -> Tool Registry
      -> State / Memory
      -> Policy / Approval
      -> Trace / Eval
      -> Runtime / Sandbox
```

然后为每条箭头写一句解释：谁调用谁，传递什么，失败会在哪里发生。

### AI 资讯任务

找 3 条最近 30 天内和 agent 相关的资讯，分类到：

- 产品能力更新。
- 框架或协议更新。
- 研究或安全风险。

写入 `news/<today>.md`。

### 今日输出

- `notes/glossary.md`
- `outputs/agent-system-map.md`
- `news/<today>.md`
- `daily/day-01.md`

### 完成标准

你能不用任何框架名，解释一个 agent 系统的 8 个组成部件，并说清楚 skill 和 tool 的区别。

---

## Day 2：手写最小 Agent Loop

### 今日问题

Agent Loop 为什么是 agent 的核心？一次模型调用和多轮 agent loop 的边界在哪里？

### 学习内容

学习最小 loop 的结构：

1. 接收 user task。
2. 组装 messages。
3. 调用 model。
4. 判断输出是 final answer 还是 tool call。
5. 执行 tool。
6. 把 tool result 放回上下文。
7. 重复直到完成或达到 max turns。

### 实践内容

创建 `mini_agent/src/loop.ts`，先不用真实模型，写一个 `MockModel`，让它按预设脚本返回：

1. 第 1 轮要求调用 calculator。
2. 第 2 轮根据 calculator 结果输出 final answer。

创建 `mini_agent/src/tools.ts`：

- `calculator(expression: string): string`

创建 `traces/day-02-run.jsonl`，每轮写入：

```json
{"turn":1,"type":"model_output","content":"..."}
{"turn":1,"type":"tool_call","tool":"calculator","args":{"expression":"2+3"}}
{"turn":1,"type":"tool_result","result":"5"}
```

### 如何做

1. 先写 `ToolCall`、`ToolResult`、`AgentState` 三个简单结构。
2. 写 `runAgent(task, { maxTurns: 5 })`。
3. 不要接入真实 API，先让 loop 跑通。
4. 手动检查 trace 是否能还原整个决策过程。

### AI 资讯任务

找 1 条关于 agent 框架的更新，回答：

- 它有没有暴露 agent loop？
- 它是偏 code-first，还是偏配置/图编排？

### 今日输出

- `mini_agent/src/loop.ts`
- `mini_agent/src/tools.ts`
- `traces/day-02-run.jsonl`
- `daily/day-02.md`

### 完成标准

你能指着 trace 解释：模型什么时候决定调用工具，工具结果如何影响下一轮模型输出。

---

## Day 3：Tool Schema 与工具注册

### 今日问题

为什么工具定义不是“函数名 + 参数”这么简单？schema、description、返回值格式会如何影响 agent 行为？

### 学习内容

学习 tool 的 5 个组成部分：

1. 名称：模型看到的工具身份。
2. 描述：什么时候使用，什么时候不要使用。
3. 参数 schema：字段、类型、必填、枚举。
4. 执行函数：真实世界副作用发生的地方。
5. 返回协议：成功、失败、结构化数据、可读摘要。

### 实践内容

扩展 `mini_agent/src/tools.ts`，实现 3 个工具：

- `calculator(expression)`
- `read_json(path)`
- `search_notes(query)`

创建 `mini_agent/src/tool-registry.ts`：

- 注册工具。
- 根据工具名查找工具。
- 校验参数。
- 格式化工具列表给模型。

创建 `notes/tool-schema-notes.md`，对比“坏 schema”和“好 schema”。

### 如何做

1. 给每个工具写一段 description。
2. 手动构造 3 个错误调用：缺参数、参数类型错、工具名不存在。
3. 让 agent 返回清晰错误，而不是直接崩溃。
4. 把错误写入 `traces/day-03-tool-errors.jsonl`。

### AI 资讯任务

找 1 条关于 tool use、function calling、built-in tools 或 MCP tools 的资讯，分析它如何描述工具边界。

### 今日输出

- `mini_agent/src/tool-registry.ts`
- `traces/day-03-tool-errors.jsonl`
- `notes/tool-schema-notes.md`
- `daily/day-03.md`

### 完成标准

你能解释：为什么工具描述写得差，会导致模型过度调用、错误调用或不用工具。

---

## Day 4：错误处理、重试、超时与 max turns

### 今日问题

Agent 为什么会陷入循环？如何设计终止条件和失败处理？

### 学习内容

学习 agent 运行失败的常见类型：

- 工具参数错误。
- 工具执行超时。
- 工具返回无用信息。
- 模型重复调用同一个工具。
- 模型没有明确 final answer。
- 上下文越来越脏，导致后续决策变差。

### 实践内容

在 `mini_agent/src/loop.ts` 加入：

- `maxTurns`
- `toolTimeoutMs`
- `maxRetriesPerTool`
- 重复 tool call 检测
- 最终失败输出 `AgentFailed`

创建 `evals/day-04-failure-cases.md`，列 5 个失败样例：

1. 工具不存在。
2. 参数不合法。
3. 工具超时。
4. 重复调用同一工具。
5. 达到 max turns。

### 如何做

1. 写一个 `slowTool`，故意延迟到超时。
2. 写一个 mock model，让它重复调用同一个工具。
3. 跑出失败 trace。
4. 给每类失败写一句“人类应该看到什么错误信息”。

### AI 资讯任务

找 1 条和 agent reliability、agent safety 或 autonomous failure 相关的资讯，写出它对应你今天哪一种失败类型。

### 今日输出

- 更新 `mini_agent/src/loop.ts`
- `traces/day-04-failures.jsonl`
- `evals/day-04-failure-cases.md`
- `daily/day-04.md`

### 完成标准

你的 agent 即使失败，也能失败得可解释、可调试、可复现。

---

## Day 5：ReAct、Plan-Act 与最小规划

### 今日问题

Agent 需要先规划吗？ReAct 和 plan-act 的差异是什么？

### 学习内容

学习三种模式：

- Direct answer：直接回答，不显式规划。
- ReAct：边思考、边行动、边观察。
- Plan-Act：先生成计划，再按步骤执行。

重点不是背论文，而是观察行为差异：

- 哪种更省 token？
- 哪种更容易修正错误？
- 哪种更容易陷入假计划？
- 哪种 trace 更容易 debug？

### 实践内容

创建 `mini_agent/src/planning-modes.ts`，实现 3 种 mock 策略：

- `directMode`
- `reactMode`
- `planActMode`

选择同一个任务运行三遍：

```text
读取 data/prices.json，计算 Apple 和 Tesla 两个商品的总价，并给出购买建议。
```

创建 `mini_agent/data/prices.json`。

记录 3 份 trace：

- `traces/day-05-direct.jsonl`
- `traces/day-05-react.jsonl`
- `traces/day-05-plan-act.jsonl`

### 如何做

1. 先手动写 mock model 输出，保证三种模式可控。
2. 对比每种模式用了几轮。
3. 对比每种模式错误发生时是否容易定位。
4. 在 `notes/planning-comparison.md` 写表格。

### AI 资讯任务

找 1 条多步任务、reasoning model、agent planning 相关资讯，判断它宣传的是“模型能力”还是“系统编排能力”。

### 今日输出

- `mini_agent/src/planning-modes.ts`
- `mini_agent/data/prices.json`
- `traces/day-05-*.jsonl`
- `notes/planning-comparison.md`
- `daily/day-05.md`

### 完成标准

你能解释：规划不是越多越好，planning 本身也会制造错误。

---

## Day 6：Trace、可观测性与调试视角

### 今日问题

如果 agent 做错了，你如何知道是模型错、工具错、上下文错，还是 harness 错？

### 学习内容

学习 agent trace 至少应该记录：

- run id
- turn id
- input messages 摘要
- model output
- tool call
- tool result
- error
- latency
- token / cost，如果可用
- final status

### 实践内容

创建 `mini_agent/src/tracing.ts`：

- `startRun(task)`
- `logModelOutput(...)`
- `logToolCall(...)`
- `logToolResult(...)`
- `logError(...)`
- `endRun(status)`

改造前几天代码，统一用 tracer 写 JSONL。

创建 `outputs/day-06-trace-reading.md`，选一条 trace，逐行解释 agent 发生了什么。

### 如何做

1. 让每次 run 自动生成 `run_id`。
2. 每条 trace 都带 `timestamp`。
3. 不记录完整 API key、隐私数据。
4. 写一个 `scripts` 或简单命令，用 `node -e` 或测试脚本检查 JSON 是否可读。

### AI 资讯任务

找 1 条和 tracing、observability、evals、agent debugging 相关的资讯，写出它解决的是开发阶段还是生产阶段问题。

### 今日输出

- `mini_agent/src/tracing.ts`
- 更新 `mini_agent/src/loop.ts`
- `traces/day-06-run.jsonl`
- `outputs/day-06-trace-reading.md`
- `daily/day-06.md`

### 完成标准

你能从 trace 还原一次 agent run，并定位至少 2 种可能失败原因。

---

## Day 7：第一周总结：Agent Loop 专题复盘

### 今日问题

经过 6 天实践，你现在如何定义 Agent？

### 学习内容

复读并整理本周所有概念：

- agent loop
- tool schema
- tool result
- max turns
- trace
- ReAct
- plan-act
- failure mode

### 实践内容

做一次代码清理：

1. 删除无用 mock。
2. 补 README 中的运行命令。
3. 给 `mini_agent` 写一个 `README.md`。
4. 跑通 Day 2-6 的 demo。

创建 `outputs/week-01-review.md`。

### 周总结写作要求

写一篇 1200-2000 字文章：

标题建议：《我手写了一个最小 Agent Loop 后，终于理解了 Agent 是什么》

必须包含：

- 你一开始对 agent 的误解。
- loop 的最小结构。
- tool schema 的重要性。
- trace 为什么是刚需。
- agent 失败时如何分类。
- 下一周要解决的 harness 问题。

### AI 资讯任务

回顾本周 7 天的资讯卡，挑 3 条最重要的，写成：

```markdown
## 本周 AI Agent 趋势判断

1. 趋势：
2. 证据：
3. 对我的学习路线影响：
```

### 今日输出

- `mini_agent/README.md`
- `outputs/week-01-review.md`
- `daily/day-07.md`

### 完成标准

别人只读你的 week-01 review，就能理解一个最小 agent loop 如何工作。

---

## Day 8：AI-CLI Harness 的边界

### 今日问题

Harness 是什么？为什么 Codex、Claude Code、Gemini CLI 不是简单聊天窗口？

### 学习内容

学习 AI-CLI Harness 的职责：

- 接收用户任务。
- 管理工作目录。
- 暴露工具给模型。
- 执行文件读写和命令。
- 管理权限和审批。
- 记录 trace。
- 支持恢复和继续执行。

### 实践内容

创建 `cli_harness/src/cli.ts`：

- 支持 `pnpm cli "your task"` 或 `npm run cli -- "your task"`。
- 支持 `--session-id`。
- 支持 `--workspace`。
- 调用前一周的 `mini_agent`。
- 把每次运行写入 `traces/cli-<session-id>.jsonl`。

### 如何做

1. 先不要做复杂交互 UI。
2. 用 `commander`、`yargs` 或 Node.js 原生命令行参数接收参数。
3. 检查 workspace 是否存在。
4. 打印 run id 和 trace 路径。
5. 最终输出 answer 或 failure reason。

### AI 资讯任务

找 1 条关于 Codex、Claude Code、Gemini CLI、Antigravity、Cursor agent 的更新，判断它新增的是模型能力、harness 能力，还是产品体验。

### 今日输出

- `cli_harness/src/cli.ts`
- `traces/day-08-cli.jsonl`
- `notes/harness-definition.md`
- `daily/day-08.md`

### 完成标准

你能清楚解释：agent 框架解决“模型如何循环”，harness 解决“模型如何在真实环境中工作”。

---

## Day 9：文件系统工具与工作区边界

### 今日问题

让 agent 读写文件时，如何避免它读错、写错、越界？

### 学习内容

学习文件工具设计：

- `listFiles`
- `readFile`
- `writeFile`
- `editFile`
- workspace root
- path normalization
- forbidden paths

### 实践内容

创建 `cli_harness/src/filesystem-tools.ts`：

- `listFiles(path = ".")`
- `readFile(path, { maxBytes: 20000 })`
- `writeFile(path, content, { overwrite: false })`

限制：

- 不允许访问 workspace 外部路径。
- 不允许默认覆盖已有文件。
- 超过大小限制时返回截断说明。

创建 `cli_harness/test_workspace/`，放 3 个测试文件。

### 如何做

1. 使用 `path.resolve()` 判断路径是否在 workspace 内。
2. 所有工具返回结构化 object，而不是只返回字符串。
3. 每次文件工具调用都写 trace。
4. 制造一次越界读取 `../secret.txt`，确认被拒绝。

### AI 资讯任务

找 1 条和 AI coding agent 文件编辑、workspace、sandbox 相关的资讯，分析它的隔离边界在哪里。

### 今日输出

- `cli_harness/src/filesystem-tools.ts`
- `cli_harness/test_workspace/`
- `traces/day-09-filesystem.jsonl`
- `notes/workspace-boundary.md`
- `daily/day-09.md`

### 完成标准

你的文件工具必须能解释“为什么拒绝某次访问”。

---

## Day 10：Patch 编辑，而不是整文件重写

### 今日问题

为什么成熟 coding agent 倾向于使用 patch，而不是直接重写整个文件？

### 学习内容

学习 patch 的价值：

- 降低误删风险。
- 方便 review。
- 更容易和用户已有改动共存。
- trace 更短。
- 失败更容易回滚。

### 实践内容

创建 `cli_harness/src/patch-tool.ts`：

- 输入：文件路径、旧文本、新文本。
- 检查旧文本是否存在且唯一。
- 替换为新文本。
- 返回 diff 摘要。

创建 `outputs/day-10-patch-vs-rewrite.md`，对比两种方式。

### 如何做

1. 先实现最小 replace patch。
2. 如果旧文本不存在，返回明确错误。
3. 如果旧文本出现多次，拒绝修改。
4. 每次 patch 前生成备份或 checkpoint。
5. 输出 unified diff。

### AI 资讯任务

找 1 条和 apply patch、coding agent diff、代码审查相关的资讯，判断它是否强调可审计性。

### 今日输出

- `cli_harness/src/patch-tool.ts`
- `traces/day-10-patch.jsonl`
- `outputs/day-10-patch-vs-rewrite.md`
- `daily/day-10.md`

### 完成标准

你能解释：patch tool 是 harness 安全性的一部分，不只是编辑便利工具。

---

## Day 11：Shell 工具、权限与危险命令

### 今日问题

Agent 能运行 shell 后，风险从“答错”变成了什么？

### 学习内容

学习 shell 工具的风险：

- 删除文件。
- 泄露环境变量。
- 网络访问。
- 安装恶意依赖。
- 长时间运行。
- 修改 git 状态。

### 实践内容

创建 `cli_harness/src/shell-tool.ts`：

- `runShell(command, { timeoutMs: 30000 })`
- 命令白名单：`ls`、`pwd`、`node`、`pnpm`、`npm`、`vitest`、`rg`、`sed`。
- 拒绝危险片段：`rm -rf`、`curl | sh`、`sudo`、`chmod -R`、读取 `.env`。
- 返回 stdout、stderr、exitCode、durationMs。

### 如何做

1. 先实现只读命令。
2. 再允许 `vitest`、`node` 和包管理命令。
3. 每次执行前写入 trace。
4. 超时后 kill 进程。
5. 记录被拒绝命令及原因。

### AI 资讯任务

找 1 条和 MCP 安全、tool permission、agent sandbox 相关的资讯，写出它和 shell 权限的关系。

### 今日输出

- `cli_harness/src/shell-tool.ts`
- `traces/day-11-shell.jsonl`
- `notes/shell-permission-model.md`
- `daily/day-11.md`

### 完成标准

你能说清楚：权限系统是 harness 的核心，不是 UI 弹窗。

---

## Day 12：Checkpoint、Restore 与可恢复执行

### 今日问题

Agent 改坏文件后，系统如何恢复？

### 学习内容

学习 checkpoint 的粒度：

- 每次 tool call 前。
- 每次文件修改前。
- 每个 run 开始前。
- 每个任务完成后。

学习 restore 的边界：

- 恢复文件。
- 不恢复外部服务副作用。
- 不恢复已经发送的消息。
- 不恢复已经执行的网络请求。

### 实践内容

创建 `cli_harness/src/checkpoint.ts`：

- `createCheckpoint(workspace, reason)`
- `listCheckpoints()`
- `restoreCheckpoint(checkpointId)`

简单实现：复制 workspace 到 `.agent_checkpoints/<id>/`。

### 如何做

1. 在 patch 前创建 checkpoint。
2. 在 writeFile 前创建 checkpoint。
3. 人为写坏一个文件。
4. restore 回来。
5. 写一份恢复 trace。

### AI 资讯任务

找 1 条和 long-running agent、checkpoint、resume、state persistence 相关的资讯，写出它解决的是“对话状态”还是“工作区状态”。

### 今日输出

- `cli_harness/src/checkpoint.ts`
- `traces/day-12-checkpoint.jsonl`
- `outputs/day-12-restore-demo.md`
- `daily/day-12.md`

### 完成标准

你能解释 session、run state、workspace checkpoint 三者不是同一件事。

---

## Day 13：让 CLI 完成一个真实小任务

### 今日问题

当 agent 进入真实工作区后，最先暴露的问题是什么？

### 学习内容

复习前 5 天 harness 能力：

- CLI 参数。
- 文件工具。
- patch 工具。
- shell 工具。
- checkpoint。
- trace。

### 实践内容

创建一个小型 buggy 项目：

```text
cli_harness/sample_project/
  src/calculator.ts
  test/calculator.test.ts
```

故意写一个 bug，例如除法或边界条件错误。

让你的 CLI 执行任务：

```text
修复 sample_project 的测试失败，只允许修改 src/calculator.ts，修复后运行测试。
```

如果还没有接真实模型，可以用 mock model 脚本模拟完整流程：

1. list files。
2. read test。
3. read source。
4. apply patch。
5. run vitest。
6. final answer。

### 如何做

1. 先手动跑失败测试。
2. 让 agent 按 trace 执行。
3. 记录每个工具调用。
4. 对比“你自己修”和“agent 修”的路径差异。
5. 记录 agent 缺了哪些上下文。

### AI 资讯任务

找 1 条 coding agent 真实案例，分析它是 demo、benchmark，还是生产使用。

### 今日输出

- `cli_harness/sample_project/`
- `traces/day-13-real-task.jsonl`
- `outputs/day-13-task-report.md`
- `daily/day-13.md`

### 完成标准

你有一条完整 trace 能证明 agent 从发现问题到修改代码再到验证通过。

---

## Day 14：第二周总结：Harness 专题复盘

### 今日问题

为什么 AI-CLI 的核心不是“聊天”，而是“受控执行环境”？

### 学习内容

整理本周所有 harness 概念：

- workspace。
- filesystem tool。
- patch tool。
- shell tool。
- permission。
- checkpoint。
- restore。
- trace。

### 实践内容

清理 `cli_harness`：

1. 给每个工具写清晰的 TSDoc 或简短注释。
2. 给 sample task 写复现命令。
3. 把 Day 8-13 的 trace 归档。
4. 创建 `cli_harness/README.md`。

### 周总结写作要求

写 `outputs/week-02-review.md`，标题建议：

《AI-CLI Harness：让 Agent 在真实工作区安全做事的系统层》

必须包含：

- harness 的定义。
- harness 和 agent framework 的区别。
- 文件读写为什么需要边界。
- shell 为什么危险。
- checkpoint 能恢复什么，不能恢复什么。
- 你会如何设计一个生产级 AI-CLI。

### AI 资讯任务

回顾本周资讯，挑 3 条和 harness 相关的趋势，写入周总结。

### 今日输出

- `cli_harness/README.md`
- `outputs/week-02-review.md`
- `daily/day-14.md`

### 完成标准

别人能根据你的 `cli_harness/README.md` 复现一个真实小任务。

---

## Day 15：Skill 的原理与边界

### 今日问题

Skill 是什么？它和 prompt、tool、MCP、subagent 的边界在哪里？

### 学习内容

重点理解 skill 的 3 层 progressive disclosure：

1. 只加载 skill 名称和描述。
2. 任务匹配时加载 `SKILL.md`。
3. 需要时再读脚本、参考资料、模板。

比较：

- Prompt：一次性指令。
- Skill：可复用工作流和知识包。
- Tool：可执行能力。
- MCP：把外部工具和数据接入 agent 的协议。
- Subagent：另一个有角色和上下文边界的 agent。

### 实践内容

创建 `notes/skill-vs-tool-vs-mcp.md`，用表格比较：

| 维度 | Prompt | Skill | Tool | MCP | Subagent |
| --- | --- | --- | --- | --- | --- |
| 解决什么 | | | | | |
| 是否执行代码 | | | | | |
| 是否按需加载 | | | | | |
| 是否跨平台 | | | | | |
| 最容易误用的地方 | | | | | |

### 如何做

1. 找 3 个你自己的工作流：代码审查、读论文、写周报。
2. 判断每个工作流更适合 prompt、skill、tool 还是 MCP。
3. 写出判断理由。

### AI 资讯任务

找 1 条和 Skills、plugins、agent extensions、custom commands 相关的资讯，判断它本质是“知识复用”还是“能力扩展”。

### 今日输出

- `notes/skill-vs-tool-vs-mcp.md`
- `daily/day-15.md`

### 完成标准

你能在新需求出现时判断：应该写 prompt、skill、tool、MCP server，还是 subagent。

---

## Day 16：写第一个 Skill：代码审查

### 今日问题

怎样把一次好的代码审查流程，封装成 agent 能稳定复用的 Skill？

### 学习内容

学习 Skill 文件结构：

```text
skills/code-review/
  SKILL.md
  references/
    review-checklist.md
  scripts/
    collect-diff.ts
```

学习一个好 Skill 的特征：

- 触发描述明确。
- 步骤短而有顺序。
- 告诉 agent 先看什么，后看什么。
- 有输出格式。
- 不把所有资料塞进主文件。

### 实践内容

创建 `skills/code-review/SKILL.md`。

要求它执行这个流程：

1. 先确认变更范围。
2. 只关注 bug、风险、回归、测试缺口。
3. 按严重程度排序。
4. 每个发现必须有文件和行号。
5. 如果没有问题，要说清剩余风险。

创建 `skills/code-review/references/review-checklist.md`：

- correctness
- data loss
- security
- concurrency
- error handling
- tests
- compatibility

### 如何做

1. 不要把 `SKILL.md` 写成大作文。
2. 开头 description 要能触发正确任务。
3. 主体只写流程和输出要求。
4. 详细检查清单放 reference。
5. 用 Day 13 的 sample project 做一次模拟 code review。

### AI 资讯任务

找 1 条 coding agent 或 code review agent 相关资讯，分析它如何处理误报和漏报。

### 今日输出

- `skills/code-review/SKILL.md`
- `skills/code-review/references/review-checklist.md`
- `outputs/day-16-skill-test.md`
- `daily/day-16.md`

### 完成标准

你的 Skill 能让另一个 agent 明确知道：什么时候用、怎么做、输出什么。

---

## Day 17：写第二个 Skill：AI 资讯研究摘要

### 今日问题

如何把“每天看 AI 新闻”变成可复用、可审计的研究流程？

### 学习内容

学习研究类 Skill 的关键：

- 区分事实、推测和观点。
- 记录发布日期。
- 优先官方和论文。
- 不把二手媒体标题当结论。
- 输出行动启发，而不是资讯堆砌。

### 实践内容

创建 `skills/ai-news-digest/SKILL.md`。

Skill 流程：

1. 搜索当天 agent 相关更新。
2. 过滤掉无来源或纯观点内容。
3. 选 3 条。
4. 每条做事实摘要、技术分类、项目影响。
5. 输出到 `news/YYYY-MM-DD.md`。

创建 `skills/ai-news-digest/references/source-priority.md`：

来源优先级：

1. 官方文档、官方 blog、GitHub release。
2. 论文、技术报告。
3. 可信工程博客。
4. 媒体报道。
5. 社区讨论。

### 如何做

1. 拿今天的 3 条资讯卡改写成 Skill 输出。
2. 检查是否有“听起来很厉害但没有事实”的句子。
3. 给每条资讯打可信度标签。

### AI 资讯任务

今天的资讯任务必须用你刚写的 Skill 流程完成。

### 今日输出

- `skills/ai-news-digest/SKILL.md`
- `skills/ai-news-digest/references/source-priority.md`
- `news/<today>.md`
- `daily/day-17.md`

### 完成标准

你每天看资讯的过程开始标准化，而不是靠刷信息流。

---

## Day 18：MCP 基础：Tools、Resources、Prompts

### 今日问题

MCP 是协议，不是“很多工具的集合”。它到底标准化了什么？

### 学习内容

学习 MCP 的核心对象：

- Client：使用工具的一方，例如 AI 应用。
- Server：暴露能力和数据的一方。
- Tools：可执行动作。
- Resources：可读取上下文。
- Prompts：可复用提示模板。
- Transport：stdio、HTTP 等通信方式。
- JSON-RPC：请求、响应、错误。

### 实践内容

创建 `notes/mcp-core.md`，回答：

1. MCP client 和 server 谁主动？
2. tool call 的请求和响应长什么样？
3. resource 和 tool 的区别是什么？
4. prompt 和 skill 的区别是什么？
5. MCP 的安全风险来自哪里？

画出 MCP 调用流程：

```text
Agent App
  -> MCP Client
  -> JSON-RPC Transport
  -> MCP Server
  -> Local Function / Database / API
```

### 如何做

1. 只读官方 specification 的 overview 和 tools/resources/prompts 部分。
2. 不要陷入所有字段细节。
3. 把 MCP 和你 Day 3 的 tool registry 对照。

### AI 资讯任务

找 1 条 MCP 近期更新或安全讨论，写出它涉及 specification、SDK、server 实现，还是 client 产品。

### 今日输出

- `notes/mcp-core.md`
- `outputs/day-18-mcp-flow.md`
- `daily/day-18.md`

### 完成标准

你能解释：MCP 让不同 agent 应用用相似方式接入外部能力，但不自动解决权限和安全。

---

## Day 19：写一个最小 MCP Server

### 今日问题

如果把 memory 和 task 暴露成 MCP tools，agent 会如何使用？

### 学习内容

学习最小 MCP server 的组成：

- server metadata。
- tool definitions。
- tool handlers。
- transport。
- error response。

### 实践内容

创建 `mcp_servers/personal_context_server/`。

实现 3 个工具：

- `searchMemory(query: string)`：搜索 `memory/MEMORY.md`。
- `saveMemory(text: string, tags: string[])`：追加 memory。
- `listTasks(status = "open")`：读取 `memory/tasks.json`。

创建初始数据：

- `memory/MEMORY.md`
- `memory/tasks.json`

### 如何做

1. 先不用复杂数据库，全部用本地文件。
2. 每个工具都返回结构化结果。
3. 所有写入都追加，不覆盖。
4. 写一个 `outputs/day-19-mcp-demo.md`，展示 3 个工具的请求和响应。

### AI 资讯任务

找 1 条 MCP server 或 agent connector 相关案例，分析它暴露的是数据、动作，还是工作流。

### 今日输出

- `mcp_servers/personal_context_server/`
- `memory/MEMORY.md`
- `memory/tasks.json`
- `outputs/day-19-mcp-demo.md`
- `daily/day-19.md`

### 完成标准

你拥有一个最小 MCP server 设计，即使还没有接入任何外部客户端，也能清楚说明接口行为。

---

## Day 20：把 MCP 思想接回你的 Agent

### 今日问题

MCP server 和本地 tool registry 的关系是什么？什么时候需要协议层？

### 学习内容

对比两种接入方式：

- 直接 Python function tool。
- 通过 MCP server 暴露 tool。

比较维度：

- 调用成本。
- 跨客户端复用。
- 权限边界。
- 部署复杂度。
- 可观测性。

### 实践内容

在 `mini_agent` 中新增一个抽象：

- `LocalToolProvider`
- `MCPToolProvider`，可以先 mock，不一定真的跑完整协议。

让 agent 通过统一接口看到工具列表：

```text
calculator
read_json
search_memory
save_memory
list_tasks
```

### 如何做

1. 先写 provider interface。
2. Local provider 包装 Day 3 的工具。
3. MCP provider 包装 Day 19 的工具定义。
4. 跑一个任务：先 search_memory，再根据结果回答。
5. 记录 trace 中 provider 来源。

### AI 资讯任务

找 1 条关于 MCP 与 agent 平台集成的资讯，判断它的价值是“标准化接入”还是“增强模型能力”。

### 今日输出

- 更新 `mini_agent/src/tool-registry.ts`
- `traces/day-20-provider.jsonl`
- `notes/local-tools-vs-mcp.md`
- `daily/day-20.md`

### 完成标准

你能解释：MCP 不是让模型更聪明，而是让工具和上下文接入更标准。

---

## Day 21：第三周总结：Skill / MCP / Memory 入门复盘

### 今日问题

当 agent 需要新能力时，你如何决定用 Skill、Tool、MCP 还是 Memory？

### 学习内容

复盘本周：

- Skill progressive disclosure。
- Skill 文件结构。
- 研究摘要 Skill。
- MCP tools/resources/prompts。
- MCP server。
- Local tool provider vs MCP provider。

### 实践内容

创建 `outputs/week-03-decision-guide.md`，写一个决策树：

```text
需求是流程知识？ -> Skill
需求是执行动作？ -> Tool
需求要跨 agent 客户端复用？ -> MCP
需求是长期偏好或经验？ -> Memory
需求是独立专家执行复杂任务？ -> Subagent
```

为 10 个例子做分类：

1. 代码审查。
2. 查询数据库。
3. 保存用户偏好。
4. 批量生成周报。
5. 调用浏览器。
6. 读取公司知识库。
7. 审核 PR。
8. 生成 SQL。
9. 管理日历。
10. 总结会议。

### 周总结写作要求

写 `outputs/week-03-review.md`，标题建议：

《Skill、Tool、MCP、Memory：Agent 扩展能力的四种方式》

必须包含：

- 每种机制的定义。
- 适用场景。
- 误用场景。
- 你自己的判断标准。
- 本项目下一阶段如何使用 memory 和 eval。

### AI 资讯任务

回顾本周资讯，挑 3 条说明“agent 生态正在标准化还是碎片化”。

### 今日输出

- `outputs/week-03-decision-guide.md`
- `outputs/week-03-review.md`
- `daily/day-21.md`

### 完成标准

你能面对一个新 agent 需求，给出合理架构选择，而不是默认“全都上 MCP”或“全都写 prompt”。

---

## Day 22：Memory 分类与文件版 Memory

### 今日问题

Agent memory 到底应该记什么？哪些东西不应该记？

### 学习内容

学习 memory 类型：

- Session memory：当前对话上下文。
- Project memory：项目规则、架构、约定。
- Semantic memory：事实知识。
- Episodic memory：过去发生过的任务和经验。
- Procedural memory：做事流程和偏好。

学习 memory 风险：

- 过期。
- 错误。
- 重复。
- 隐私。
- 被 prompt injection 污染。
- 检索出来但不该使用。

### 实践内容

创建文件版 memory 布局：

```text
memory/
  memory_summary.md
  MEMORY.md
  raw_memories.md
  sessions/
  rollout_summaries/
```

从 Day 1-21 的日志里提取 10 条 memory：

- 3 条用户偏好。
- 3 条项目约定。
- 2 条失败经验。
- 2 条流程经验。

### 如何做

1. 不要写“今天学习了 agent”这种废 memory。
2. 每条 memory 都必须能影响未来行动。
3. 每条 memory 标注来源日期。
4. `memory_summary.md` 只写最重要的 5 条。

### AI 资讯任务

找 1 条 agent memory 相关资讯或论文，判断它讨论的是存储、检索、压缩、更新，还是安全。

### 今日输出

- `memory/memory_summary.md`
- `memory/MEMORY.md`
- `memory/raw_memories.md`
- `daily/day-22.md`

### 完成标准

你能说清楚：memory 不是聊天记录，而是会影响未来决策的压缩经验。

---

## Day 23：Memory 检索与 Stale Memory

### 今日问题

如果 agent 记住了错误或过期信息，系统应该怎么办？

### 学习内容

学习 memory 检索流程：

1. 先读 summary。
2. 判断是否需要详细 memory。
3. 根据关键词搜索。
4. 读取相关 memory。
5. 和当前环境核对。
6. 标记 stale 或更新。

### 实践内容

创建 `memory/search-memory.ts`：

- 基于关键词搜索 `MEMORY.md`。
- 返回匹配条目、来源日期、标签。
- 支持 `--query`。

创建一个过期 memory，例如：

```text
[stale-test] 项目使用 TypeScript 4.9。
```

然后用当前环境检查它是否过期，写入 `outputs/day-23-stale-memory.md`。

### 如何做

1. Memory 条目加 tags：`preference`、`project`、`failure`、`procedure`、`stale`。
2. 搜索时展示 tags。
3. 发现过期时，不要删除，先标记 stale，并写新条目。
4. 比较“直接相信 memory”和“核对当前环境”的差异。

### AI 资讯任务

找 1 条长期记忆、context compression、memory consolidation 相关资讯，写出它如何处理遗忘。

### 今日输出

- `memory/search-memory.ts`
- 更新 `memory/MEMORY.md`
- `outputs/day-23-stale-memory.md`
- `daily/day-23.md`

### 完成标准

你能解释：memory 应该被当作建议，而不是事实来源。

---

## Day 24：从文件检索到向量检索

### 今日问题

什么时候关键词检索不够，需要 embedding / vector search？

### 学习内容

学习两种检索：

- Keyword search：透明、便宜、可控，但召回有限。
- Vector search：语义召回更强，但可能不透明、成本更高、会召回相似但不相关内容。

学习 evaluation：

- recall
- precision
- top-k
- false positive
- false negative

### 实践内容

创建 `memory/retrieval_eval.md`，设计 10 个查询：

- 5 个应该命中已有 memory。
- 3 个不应该命中。
- 2 个模糊查询。

如果有 embedding 条件，做一个简单 vector 版本；如果没有，就先模拟向量检索结果，并写清楚假设。

### 如何做

1. 先跑关键词检索。
2. 记录 top-3。
3. 手动判断是否相关。
4. 写出失败案例。
5. 设计改进：标签、摘要、分层 memory、删除 stale。

### AI 资讯任务

找 1 条 RAG、agentic memory、retrieval、context engineering 相关资讯，判断它是提升 recall 还是降低幻觉。

### 今日输出

- `memory/retrieval_eval.md`
- `outputs/day-24-keyword-vs-vector.md`
- `daily/day-24.md`

### 完成标准

你能解释：memory 系统的质量要通过检索任务评测，而不是靠感觉。

---

## Day 25：多 Agent：Manager、Handoff、Agent-as-Tool

### 今日问题

多 Agent 是真实需求，还是把一个问题复杂化？

### 学习内容

学习三种编排：

- Manager-worker：一个 manager 分派任务，workers 返回结果。
- Handoff：当前 agent 把控制权移交给另一个 agent。
- Agent-as-tool：一个 agent 作为工具被另一个 agent 调用。

比较维度：

- 谁拥有最终回答权。
- trace 是否嵌套。
- 是否共享 memory。
- 是否共享 workspace。
- 是否容易 debug。

### 实践内容

创建 `mini_agent/src/multi-agent-demo.ts`。

实现 3 个角色：

- `ResearchAgent`：读 news 和 notes。
- `BuilderAgent`：读代码并建议实现。
- `ReviewerAgent`：审查输出。

任务：

```text
根据最近 3 条 AI 资讯，提出本项目下一步最值得做的 agent 实验，并给出风险。
```

分别用 manager-worker 和 agent-as-tool 跑一遍。

### 如何做

1. 可以继续用 mock model，不要被模型 API 阻塞。
2. 每个 agent 的输入输出都写 trace。
3. 观察上下文是否重复。
4. 写出哪种编排更清晰。

### AI 资讯任务

找 1 条 multi-agent、research agent、coding subagent 相关资讯，分析它为什么需要多个 agent。

### 今日输出

- `mini_agent/src/multi-agent-demo.ts`
- `traces/day-25-multi-agent.jsonl`
- `notes/multi-agent-patterns.md`
- `daily/day-25.md`

### 完成标准

你能解释：多 agent 的核心不是“人设更多”，而是责任边界和上下文边界更清楚。

---

## Day 26：安全、Prompt Injection 与 Tool Misuse

### 今日问题

Agent 连上工具和 memory 后，攻击面发生了什么变化？

### 学习内容

学习常见风险：

- Prompt injection：外部内容指挥 agent 忽略原规则。
- Tool misuse：调用了不该调用的工具。
- Data exfiltration：把本地敏感信息发出去。
- Confused deputy：工具组合导致越权。
- Memory poisoning：错误信息进入长期记忆。

### 实践内容

创建 `evals/security_cases.md`，写 8 个攻击样例：

1. 文档中要求 agent 读取 `.env`。
2. 网页中要求 agent 删除文件。
3. memory 中写入错误项目规则。
4. tool result 诱导 agent 调用 shell。
5. 用户请求绕过 workspace。
6. 假冒工具名称。
7. 要求总结私密文件。
8. 要求把 memory 发到外部 URL。

在 `cli_harness` 或 `mini_agent` 中为其中 3 个样例跑 trace。

### 如何做

1. 每个攻击样例写：输入、期望拒绝行为、失败后果。
2. 不要只写“拒绝危险请求”，要写拒绝理由。
3. 把安全策略分成 system rule、tool permission、runtime boundary 三层。

### AI 资讯任务

找 1 条 agent 安全或 MCP 安全相关资讯，写出它属于协议风险、实现风险，还是产品配置风险。

### 今日输出

- `evals/security_cases.md`
- `traces/day-26-security.jsonl`
- `notes/agent-security-model.md`
- `daily/day-26.md`

### 完成标准

你能解释：安全不能只靠 prompt，必须靠 harness、权限、隔离和审计。

---

## Day 27：Agent Eval 与失败复盘

### 今日问题

如何判断你的 agent 真的变好了，而不是 demo 更顺了？

### 学习内容

学习 agent eval 的组成：

- task set
- expected behavior
- allowed tools
- scoring rubric
- trace collection
- failure taxonomy
- regression tracking

失败分类：

- planning failure
- tool selection failure
- tool argument failure
- observation interpretation failure
- memory failure
- permission failure
- final answer failure

### 实践内容

创建 `evals/tasks.jsonl`，至少 20 个任务：

- 5 个工具调用任务。
- 5 个文件读取任务。
- 3 个 patch 修改任务。
- 3 个 memory 检索任务。
- 2 个多 agent 任务。
- 2 个安全拒绝任务。

创建 `evals/rubric.md`：

- 1 分：完全失败。
- 2 分：方向对但工具或结论错。
- 3 分：完成主要目标但有小问题。
- 4 分：完成目标且 trace 清晰。
- 5 分：完成目标、验证充分、输出简洁。

### 如何做

1. 为每个任务写 allowed tools。
2. 跑至少 5 个任务。
3. 手动评分。
4. 写失败复盘。
5. 选 1 个失败案例改进代码或 prompt。

### AI 资讯任务

找 1 条 agent benchmark、eval、SWE-bench、BrowseComp、tool-use benchmark 相关资讯，分析它的评分标准是否可信。

### 今日输出

- `evals/tasks.jsonl`
- `evals/rubric.md`
- `outputs/day-27-eval-report.md`
- `daily/day-27.md`

### 完成标准

你拥有一套可以持续衡量 agent 改进的任务集，而不是只靠直觉。

---

## Day 28：最终总结、项目整理与下一阶段路线

### 今日问题

28 天后，你离“熟练掌握 AI Agent”还有哪些差距？下一步如何进入专家级？

### 学习内容

回顾全部主题：

- Agent loop。
- Tool schema。
- Harness。
- Skill。
- MCP。
- Memory。
- Multi-agent。
- Security。
- Eval。
- AI 资讯跟踪。

### 实践内容

整理项目：

1. 检查所有目录是否有 README 或说明。
2. 选 3 条最有代表性的 trace。
3. 选 3 个最重要的失败案例。
4. 整理 10 条最重要的 memory。
5. 更新根 README 的“项目成果”部分。

创建最终输出：

- `outputs/final-report.md`
- `outputs/next-90-days-roadmap.md`

### 最终报告要求

`outputs/final-report.md` 必须包含：

1. 我现在如何定义 AI Agent。
2. 我做出的核心 artifact。
3. 我最重要的 5 个技术判断。
4. 我踩过的 5 个坑。
5. 我对 Skill / Tool / MCP / Memory / Harness 的区别理解。
6. 我的 eval 结果。
7. 我下一阶段要深入的方向。

`outputs/next-90-days-roadmap.md` 分三阶段：

- 30 天：把本项目变成可运行 demo。
- 60 天：接入真实模型、真实 MCP、真实评测。
- 90 天：选择一个垂直场景做 production-grade agent。

### AI 资讯任务

回顾 28 天资讯卡，写：

```markdown
## 28 天 AI Agent 生态判断

- 最确定的趋势：
- 最被高估的概念：
- 最值得继续投入的方向：
- 我需要持续跟踪的 10 个来源：
```

### 今日输出

- `outputs/final-report.md`
- `outputs/next-90-days-roadmap.md`
- 更新 `memory/MEMORY.md`
- `daily/day-28.md`

### 完成标准

你能用本项目作为作品集，向别人展示你不仅知道 AI Agent 的概念，也知道如何实现、调试、扩展、评估和约束它。

---

## 4. 每周回顾模板

每 7 天创建：

```text
outputs/week-01-review.md
outputs/week-02-review.md
outputs/week-03-review.md
outputs/final-report.md
```

模板：

```markdown
# Week X Review

## 本周我做了什么

## 本周我真正理解了什么

## 本周最重要的 trace

## 本周最严重的失败

## 本周 AI 资讯趋势

## 我对 Agent 的理解变化

我原本以为：

我现在认为：

## 下周计划调整
```

---

## 5. 每日日志模板

每天创建 `daily/day-XX.md`：

```markdown
# Day XX：主题

## 今日目标

## AI 资讯卡

### 资讯 1

- 来源：
- 日期：
- 事实：
- Agent 分类：
- 对本项目影响：

### 资讯 2

### 资讯 3

## 今日概念卡

- 概念：
- 我的定义：
- 解决什么：
- 不解决什么：
- 常见误解：
- 最小例子：

## 今日实践

- 文件：
- 命令：
- 结果：
- trace：

## 失败记录

## 今天我原本以为，现在我认为

## 明天要验证的问题
```

---

## 6. 28 天后的专家级进阶方向

完成 28 天后，不要急着换新主题。下一阶段建议从这 5 个方向选 1 个深入：

1. Coding Agent 专家线：SWE-bench、代码搜索、patch planning、test generation、repo-scale context。
2. MCP / Tool 平台线：权限、OAuth、tool registry、schema evolution、server marketplace。
3. Memory 系统线：episodic memory、consolidation、forgetting、memory eval、privacy。
4. Multi-agent 编排线：handoff、agent-as-tool、planner-executor、critic、simulation。
5. Agent Eval / Safety 线：benchmark、trace scoring、prompt injection、sandbox、policy engine。

进入专家级的标准不是“知道更多名词”，而是你能针对一个真实场景回答：

- 该不该用 agent？
- 用单 agent 还是多 agent？
- 工具边界怎么设计？
- memory 记什么、不记什么？
- 如何评测成功率？
- 如何发现和复盘失败？
- 如何控制权限和副作用？

---

## 7. 核心参考入口

这些入口用于每天查证，不要求 Day 1 全部读完：

- OpenAI Agents SDK / Responses API / tools / tracing / evals。
- Claude Skills / Claude Code / memory / MCP 文档。
- Model Context Protocol specification。
- Google AI / Google DeepMind agentic model、Antigravity、research agent 相关更新。
- Hugging Face Trending Papers。
- LangChain / LangGraph agent docs。
- Microsoft AutoGen docs。

阅读资料时只问一个问题：它能不能改变我今天的系统设计？不能，就先放进 backlog，不要被信息流拖走。
