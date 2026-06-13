# MCP

# 目标

阅读 MCP overview，关注 tools、resources、prompts、transport。



# 学习资料

- What is MCP?：先看 MCP 是什么、解决什么问题。\(https://modelcontextprotocol\.io/docs/getting\-started/intro\)

- Architecture overview：重点看 host / client / server、data layer / transport layer。\(https://modelcontextprotocol\.io/docs/learn/architecture\)

- Server features overview：总览 tools、resources、prompts 三个核心primitive。\(https://modelcontextprotocol\.io/specification/2025\-11\-25/server\)

- Tools：重点看 model\-controlled：模型可发现并调用工具。\(https://modelcontextprotocol\.io/specification/2025\-11\-25/server/tools\)

- Resources：重点看application\-controlled：资源作为上下文数据由应用决定如何使用。\(https://modelcontextprotocol\.io/specification/2025\-11\-25/server/resources\)

- Prompts：重点看 user\-controlled：prompt templates 通常由用户显式选择。https://modelcontextprotocol\.io/specification/2025\-11\-25/server/prompts\)

- Transports：重点看 JSON\-RPC、stdio、Streamable HTTP。\(https://modelcontextprotocol\.io/specification/2025\-11\-25/basic/transports\)



# 详细内容

## ✅ What is MCP?

先看 MCP 是什么、解决什么问题。

MCP，全称 Model Context Protocol，模型上下文协议。

它是一个开源标准，用来把 AI 应用连接到外部系统，比如：本地文件、数据库、搜索引擎、日历、Notion、Slack、Figma、GitHub等。



官方文章用了一个类比：MCP 就像 AI 应用的 USB\-C 接口。USB\-C让不同设备用统一接口连接；MCP 则让 AI应用用统一协议连接各种工具、数据和服务。



它解决什么问题？

核心问题是：AI 模型本身是“孤岛”。大模型虽然会推理、写代码、总结文本，但默认情况下它：

- 不知道你的私人文件

- 不能直接查数据库

- 不能操作你的日历

- 不能访问公司内部系统

- 不能主动调用外部工具完成任务



如果没有 MCP，每个 AI 应用都要单独适配每个外部系统：Claude 接 GitHub 写一套，ChatGPT 接 GitHub 又写一套；Claude 接 Notion 写一套，Cursor 接 Notion 又写一套。



这会导致大量重复开发、维护复杂、集成碎片化。MCP 的目标就是把这些连接方式标准化：外部系统只要实现 MCP Server，AI 应用只要支持 MCP Client，双方就能按统一规则通信。



MCP可以让AI做什么？官网上举了几个例子：

- AI 代理可以访问 Google Calendar 和 Notion，变成更个性化的助手；

- Claude Code 可以根据 Figma 设计生成整个 Web App；

- 企业聊天机器人可以连接多个数据库，让用户用聊天方式分析数据；

- AI 可以在 Blender 中创建 3D 设计，并通过 3D打印机输出。



所以 MCP 的意义不是“让模型更聪明”，而是：让模型能接触真实世界的数据和工具。





## ✅ Architecture Overview

重点看 host / client / server、data layer / transport layer。



MCP基本架构：MCP 是典型的 Client–Server 架构。主要有三个角色：

- MCP Host：宿主应用。用户真正使用的 AI 应用，比如：Claude Desktop、ChatGPT、VS Code、Cursor、Claude Code。Host 的职责是协调和管理一个或多个 MCP Client。简单说：Host 是 AI 应用本体。用户和 Host 交互，Host 再通过 MCP去连接外部工具和数据源。

- MCP Client：客户端。运行在 Host 里面，负责和某个 MCP Server 建立连接。一个 MCP Client 通常只对应一个 MCP Server。如果一个 AI 应用连接了 3 个 MCP Server，那么 Host 内部通常会创建 3 个 MCPClient，每个 Client 维护一条独立连接。这样设计的好处是：不同 Server 的连接、权限、能力、状态可以彼此隔离。

- MCP Server：服务端。负责暴露外部能力，比如：文件系统 Server、数据库 Server、GitHub Server、Figma Server等。官方架构文档说明，MCP Host 会为每个 MCP Server 创建一个 MCP Client，每个 Client维护一条专用连接。Server可以运行在本地，也可以是远程服务。





MCP Server会提供哪些能力？

MCP Server 通常向 AI 应用暴露三类东西：Tools、Resources、Prompts。

简单理解：Tool = 能做事、Resource = 能读资料、Prompt = 能复用流程。



一个简单例子在：假设你对 AI 说：“帮我看看下周有没有空，然后安排一个和 Alex 的会议。”如果没有 MCP，AI 可能只能给你建议。如果有 MCP：AI 应用作为 Host；它通过 MCP Client 连接 Calendar MCP Server；Calendar Server 暴露“读取日程”和“创建会议”的工具；AI 先读取你的日历；找到空闲时间；请求你确认；确认后调用工具创建会议。



这时 AI 不只是聊天，而是在你的授权下真正完成任务。MCP 是 AI 应用连接外部数据、工具和工作流的统一协议。它解决的是：每个 AI 应用和每个外部系统都要重复集成的问题。所以你可以把它理解成：AI 时代的“通用插件协议”或“USB\-C 接口”。



本地 Server 和远程 Server 的区别：文章专门提到一个容易混淆的点：  MCP Server 不等于云服务器。它只是“服务 MCP 能力的程序”。

如果 MCP Server 运行在用户本机，并通过标准输入输出通信，这通常叫 local MCP server。

如果 MCP Server 运行在远程平台，并通过 HTTP 通信，这通常叫 remote MCP server。



举个例子：Claude Desktop 启动一个本地 filesystem server。这个 server 跟 Claude Desktop 在同一台电脑上，通过 STDIO 传消息。这是本地 MCP Server。Github 官方提供的 MCP Server 运行在Github 平台上，通过 Streamable HTTP 通信。这是远程 MCP Server。



所以：如果有第三方平台说自己支持了MCP，其实是它做了MCP Server，Server里面可以调各种他们自己的工具。



MCP 分成两层：Data Layer 和 Transport Layer。

- Data Layer，数据层，决定“说什么”。

- Transport Layer，传输层，决定“怎么传”。



Data Layer 是 MCP 的核心。它基于 JSON\-RPC 2\.0，定义 Client 和 Server 之间的消息结构和语义。

也就是说，它规定：

- 初始化怎么做；

- 能力怎么协商；

- tool 怎么列出；

- tool 怎么调用；

- resource 怎么读取；

- prompt 怎么获取；

- notification 怎么发送；

- 长任务怎么跟踪。

对大多数开发者来说，Data Layer，尤其是primitives，是最值得关注的部分，因为它定义了 MCP Server 如何把上下文能力提供给AI 应用。



Transport Layer 负责通信通道。它处理：

- 如何建立连接；

- 消息如何封装；

- 消息如何传输；

- 是否需要认证；

- 如何安全通信。



MCP 支持两种主要传输方式：

第一种是 STDIO transport。它使用标准输入输出进行本地进程通信。适合本地 MCP Server，例如本地文件系统、命令行工具、本地数据库。优点是没有网络开销，性能好，部署简单。

第二种是 Streamable HTTP transport。它使用 HTTP POST 发送 client\-to\-server 消息，并可以用 Server\-Sent Events支持流式能力。它适合远程 MCP Server，可以使用 bearer token、API key、自定义header 等认证方式，官方推荐用 OAuth 获取认证 token。



重点是：无论底层是 STDIO 还是 HTTP，Data Layer 的 JSON\-RPC 消息格式是一样的。这就是分层设计的好处。



## ✅ Server Features Overview

总览 tools、resources、prompts 三个核心primitive\(原子\)。

Server暴露的三大核心能力：

- Tools 是可执行函数，它让AI应用可以做事情，例如查询数据库、创建工单、调用API、搜索文档、获取天气等等。Tools很重要，因为他们让模型从只会说变成可以行动。

- Resources 数据源，主要提供上下文信息，例如文件内容，数据库schema 某条数据库记录 API返回结果 文档页面 日志页面等。Resource 通常偏读取 让AI知道更多背景信息。

- Prompts 是可服用的提示词模板。可以帮助AI应用用固定方式完成任务。例如总结会议、生成日报。Prompts的价值是把常用工作流标准化，避免每次都手写提示词。



用一个例子串起 Data Layer 的流程，可以总结成四步：

第一步：初始化。

- Client 向 Server 发送 initialize 请求，包含协议版本、Client 能力、Client 信息。

- Server 返回自己的协议版本、能力和 Server 信息。

- 然后 Client 发送notifications/initialized，表示初始化完成。



第二步：发现工具。

- Client 发送 tools/list。

- Server 返回工具列表，包括工具名称、描述、输入参数 schema 等。

- Host 把这些工具注册到 AI 应用的统一工具列表中，让 LLM知道自己可以调用哪些工具。



第三步：执行工具。

- 当 LLM 决定调用某个工具时，Host 找到对应的 MCP Client。

- MCP Client 向对应的 MCP Server 发送 tools/call。

- Server 执行工具后返回结果。

- Host 把结果放回对话上下文，让 LLM 基于结果继续回答。



第四步：实时更新。

- 如果 Server 的工具列表变化，Server 发送 notifications/tools/list\_changed。

- Client 收到后重新请求 tools/list。

- Host 更新内部工具注册表。

- 如果当前有活跃对话，AI应用可以让模型知道现在有新能力可用。





用一个现实例子理解：假设你在 VS Code 里使用一个 AI 编程助手。

它连接了三个 MCP Server：

- GitHub MCP Server

- Filesystem MCP Server

- Sentry MCP Server

那么结构大概是：VS Code 是 MCP Host。VS Code 内部创建三个 MCP Client。每个 Client 分别连接一个 Server。



GitHub Server 暴露：

- 查看 issue 的 tool；

- 创建 PR 的 tool；

- 读取 repo 信息的 resource。

    

Filesystem Server 暴露：

- 读取文件的 resource；

- 写文件的 tool；

- 列目录的 tool。

    

Sentry Server 暴露：

- 查询错误日志的 tool；

- 获取 issue 详情的 resource。

    

当你说：“帮我查一下最近的线上报错，并修复代码。”

AI 应用可能会这样做：先调用 Sentry MCP Server 查询错误。然后调用 Filesystem MCP Server 读取相关代码。再让模型分析问题。然后调用 Filesystem MCP Server 修改文件。最后调用 GitHub MCP Server 创建 PR。



这就是 MCP 架构真正的意义：它把不同外部系统变成 AI 应用可发现、可调用、可组合的标准能力。



MCP = AI 应用连接外部世界的标准插座。