# Day 01：建立 AI Agent 的系统地图


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

我原本以为：

我现在认为：

## 明天要验证的问题

