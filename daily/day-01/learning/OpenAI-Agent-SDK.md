# OpenAI  Agent SDK



# 目标

阅读OpenAI Agents SDK overview，了解 agent、tools、handoffs、state、tracing。

# 学习资料

- Agents SDK overview：先看总览，建立 agent / tools / handoffs / state（https://developers\.openai\.com/api/docs/guides/agents）

- Quickstart：快速跑通第一个 agent，并看到 tools、handoffs

的最小例子。（https://developers\.openai\.com/api/docs/guides/agents/quickstart）

- Agent definitions：重点看 agent 如何由

instructions、model、tools、handoffs、structured outputs

等组成。（https://developers\.openai\.com/api/docs/guides/agents/define\-agents）

- Using tools：重点看工具接入方式，以及 Agents SDK 里如何把工具挂到 agent上。（https://developers\.openai\.com/api/docs/guides/tools）

- Orchestration and handoffs：重点看 handoffs vs agents\-as\-tools

的区别。（https://developers\.openai\.com/api/docs/guides/agents/orchestration）

- Results and state：重点看运行结果、状态延续、可恢复 workflow

state。（https://developers\.openai\.com/api/docs/guides/agents/results）

- Tracing / observability：重点看 tracing 如何记录 model calls、tool

calls、handoffs、guardrails。\(developers\.openai\.com

\(https://developers\.openai\.com/api/docs/guides/agents/integrations\-observability\)\)



# 详细内容

## ✅ Agents SDK overview

OpenAI 的AgentsSDK 是一个开发工具包，帮你在代码里构建AI Agent应用。



帮你把“调用模型、调用工具、多Agent写作、状态管理、人工审批、Tracing调试”等等这些能力封装好，组织成了一个框架。



可以这么理解：

- 普通API调用相当于“你问模型一句，模型回你一句”；

- Agent SDK 相当于“模型可以边思考边调用工具、把任务交给其他Agent，记住状态，并生成可追踪的执行过程”。

有了一种工作流的概念。



思考：客服场景，天然契合主子agent以及handoffs。



## ✅ Quick Start

快速跑通第一个 agent，并看到 tools、handoffs的最小例子。



Tools：让 Agent 能做事，比如查数据库、调用API、搜索文件、执行函数等。

Handoffs：一个 Agent 可以把任务交给另一个更专业的Agent，例如「客服Agent」把退款问题交给「退款 Agent」。

State：SDK可以帮助你管理对话历史、session、暂停后恢复等状态。

Tracing/Observability：用来查看 Agent每一步做了什么：模型调用、工具调用、handoff等，方便调试和优化。



## ✅ Agent Definitions

重点看 agent 如何由instructions、model、tools、handoffs、structured outputs等组成。

这里需要重点区分“Conversation history”以及“Run context”：

- 如果模型需要知道某个事实，就要把它放在模型可见的位置，例如用户输入、工具返回结果、检索结果、对话历史等等。

- 如果只是代码执行需要，就放在Run context里面，不要暴露给模型，例如userId、db、API Key等。

Conversation history是模型的世界，Run context是程序的世界。

模型要知道的，必须显示给模型。只有程序要用的，就留在本地上下文里。



## ✅ Using Tools

重点看工具接入方式，以及 Agents SDK 里如何把工具挂到 agent上。



工具的“按需发现和加载机制”。它不是帮用户搜索资料，而是帮模型在大量工具中找到并加载当前任务真正需要的工具。



要查公开最新信息 → Web Search

要查自己的文档 → File Search

要调用自己的业务逻辑 → Function Calling

要接第三方/标准工具生态 → Remote MCP

要执行命令、写代码、处理文件 → Shell

要操作网页/桌面 UI → Computer Use

要生成或编辑图片 → Image Generation

要复用流程/规范/模板 → Skills

工具太多、想按需加载 → Tool Search



## ✅ Orchestration and handoffs

重点看 handoffs vs agents\-as\-tools的区别。



Handoffs 是“把控制权交给另一个 Agent”。这个词一般也表示“交接”。

Agents as tools 是“主 Agent 调用另一个 Agent 来帮忙，但控制权还在主 Agent 手里”。

可以这么类比：Handoffs是指“我把你转交给退款专员”。Agent as tools是指“我问一下退款专员，然后我来回复你”。



Handoffs的场景：比如你有一个客服Agent：

Triage Agent

├── Billing Agent

├── Refund Agent

└── Tech Support Agent

用户说：我要申请退款。这时 Triage Agent 判断应该交给退款专员，于是handoff 给 Refund Agent。之后这条对话分支由 Refund Agent 负责处理。

可以理解为：当前 Agent 不再只是“问别人一下”，而是把用户转给另一个 Agent。

适合：客服分流；不同专家负责不同领域；不同 Agent 有不同instructions、tools、policy；后续对话应该由专家继续进行。



Agents as tools的场景：专家作为工具被调用

比如你有一个 Research Manager Agent：

Manager Agent

├── Summarizer Agent as tool

├── Translator Agent as tool

└── Critic Agent as tool



用户说： 帮我分析这篇文章，并给出结论。Manager 可以调用：summarizer\_agent\.as\_tool\(\) 以及 critic\_agent\.as\_tool\(\)。

但是最终组织答案、决定怎么回复用户的，还是 Manager Agent。可以理解为：主 Agent 没有把用户转走，只是调用专家 Agent 做一 个子任务。



适合：总控 Agent 需要综合多个专家结果；specialist 做摘要、分类、翻译、审查等有限任务；你希望外层流程稳定；最终答案要由一个manager 统一生成。



## ✅ Result and State

重点看运行结果、状态延续、可恢复 workflow state。

当你运行一个 Agent 后，SDK 返回的结果对象里有哪些东西，以及这些 东西应该怎么用于下一轮对话、handoff、暂停恢复和调试。

也就是Agent跑完之后，你该拿什么、存什么、传什么。



主要包含以下内容：

- finalOutput          → 给用户看的最终答案

- history                 → 下一轮模型要看的历史

- lastAgent             → handoff 后哪个 Agent 应该继续接管

- lastResponseId   → OpenAI 托管的续接 ID

- interruptions       → 哪些操作被暂停等待审批

- state                    → 暂停后恢复运行的快照



核心分5块内容：

（1）最终答案。

（2）下一轮要带什么历史 ：history 是给下一次模型调用看的上下文。如果你想让模型下一轮记得之前发生过什么，就要把相关历史带进去。

（3）handoff后谁继续负责：lastAgent 。  

（4）OpenAI托管的continuation  ：如果你不想每次都把完整历史 replay 给模型，可以用 OpenAI 管理的 response chaining。

（5）中断和恢复（重要）：interruptions\+state。有些 Agent run 不会直接完成，比如：工具调用需要人工审批；高风险操作需要确认；human\-in\-the\-loop 审核；workflow 被暂停等等情况。这时 finalOutput 可能是空的，因为任务还没真的完成。你要重点关注：result\.interruptions、result\.state。含义是：interruptions：有哪些待审批/待处理的中断；state：当前 run 的可恢复快照。等人工批准或拒绝后，再把这个 state 传回去继续运行。



## ✅ Tracing / observability

重点看 tracing 如何记录 model calls、toolcalls、handoffs、guardrails。



怎么把 MCP 能力接进 Agents SDK，怎么用 tracing 观察一次 agent run 到底发生了什么。

Agents SDK 默认内置tracing，每次 run 都可以生成结构化记录，记录 model calls、toolcalls、handoffs、guardrails、custom spans，并能在 Traces dashboard里查看。



普通情况下你只看到：用户输入 → Agent 最终回答

但 tracing 能让你看到中间发生了什么：

用户输入

→ Triage Agent 开始运行

→ 调用模型

→ 模型决定调用工具

→ 工具返回结果

→ 触发 guardrail 检查

→ handoff 给 Refund Agent

→ Refund Agent 再调用模型

→ 输出最终回答



也就是说，tracing 是给开发者看的，不是给模型看的。

Tracing 部分主要教你：如何把一次 agent run 拆成可观察的步骤，用 trace/span 记录模型调用、工具调用、handoff 和 guardrail，从而调试、监控和优化 agent workflow。

---



