# Day 02：手写最小 Agent Loop

## 学习部分

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



## 今日目标

- 用 mock model 跑通最小 agent loop。
- 产出 `mini_agent/loop.py`、`mini_agent/tools.py` 和 `traces/day-02-run.jsonl`。

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

