# Day 03：Tool Schema 与工具注册

## 学习内容
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

## AI 资讯卡

### 资讯 1

- 来源：
- 日期：
- 事实：
- Agent 分类：
- 对本项目影响：

### 资讯 2

- 来源：
- 日期：
- 事实：
- Agent 分类：
- 对本项目影响：

### 资讯 3

- 来源：
- 日期：
- 事实：
- Agent 分类：
- 对本项目影响：

## 今日概念卡

- 概念：Tool Schema
- 我自己的定义：Tool Schema 是 agent 暴露工具给模型时使用的接口说明，包含工具名、描述、参数结构和返回约定。
- 它解决什么问题：让模型知道什么时候调用工具、怎么传参，也让程序可以在执行前校验参数。
- 它不解决什么问题：它不能保证模型一定会正确选择工具，也不能自动解决工具执行的安全问题。
- 常见误解：以为工具就是一个函数。实际上 agent 里的工具还包括给模型看的描述、参数 schema、错误协议和执行边界。
- 最小例子：calculator 工具有 expression 参数，模型必须传入字符串表达式，runtime 校验后执行并返回结果。
- 和前一天知识的关系：Day 02 的 Agent Loop 负责调用工具，Day 03 开始让工具调用变得可注册、可校验、可调试。

## 今日实践

- 文件：
- 命令：
- 结果：
- trace：

## 失败记录

## 今天我原本以为，现在我认为

我原本以为：

我现在认为：

## 明天要验证的问题

