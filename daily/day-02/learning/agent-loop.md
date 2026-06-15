# Agent Loop

## 核心问题

### Agent Loop 为什么是 agent 的核心？

普通的一次模型调用是这样的：User task ——> Model ——> Answer
模型只能基于已有上下文直接生成回答。它不能自己去读文件、查数据、计算、运行命令等，也不能在拿到新结果后重新判断。

Agent Loop 是这样的:
User task ——> Model ——> 判断：final answer 还是 tool call ——> 如果是tool call，执行工具 ——> 把 tool result放回messages ——> 再次调用Model ——> 重复，直到finalanswer或maxturns

它的关键变化是：模型不再只是回答，而是可以在每一轮决定下一步动作。

### 一次模型调用和多轮 agent loop 的边界在哪里？

一次模型调用只做一件事：根据当前上下文生成一段输出。
它可以输出：最终答案。
也可以输出：
```json
{
    "tool": "calculator",
    "args": {
      "expression": "2 + 3"
    }
}
```
但模型本身不会执行calculator。
真正执行工具的是外层程序，也就是 agent runtime / harness / loop。

所以边界是：
模型负责决策
程序负责执行
loop负责把执行结果送回模型

### 最小 Loop 的 7 个步骤如何理解

1. 接收 user task：把用户目标作为初始输入，不是马上执行，而是交给模型判断。

2. 组装 messages：messages 是模型看到的上下文，包括用户任务、历史对话、工具结果、系统规则等。

3. 调用 model：模型基于 messages 生成下一步：要么回答，要么请求工具。

4. 判断输出是 final answer 还是 tool call。这是 loop 的分岔点。如果是 final answer，任务结束。如果是 tool call，进入执行阶段。
5. 执行 tool：程序根据工具名和参数调用真实函数，例如计算器、文件读取、搜索工具。

6. 把 tool result 放回上下文：工具结果必须变成新的 message，否则模型不知道刚才发生了什么。

7. 重复直到完成或达到 max turns。loop 不能无限跑，所以需要 maxTurns。否则模型可能反复调用同一个工具，陷入死循环。


### 应该重点理解的三个边界

第一，模型和工具的边界：模型不会执行工具。模型只提出工具调用请求。

第二，一次调用和 loop 的边界：一次调用只产生一个下一步。Agent Loop 负责把多个下一步串成任务过程。

第三，agent 和普通 chatbot 的边界：普通 chatbot 主要生成文本。agent 可以根据中间结果持续决策。


## 今日概念卡

概念：Agent Loop

我自己的定义：Agent Loop 是一个反复调用模型、执行工具、把结果放回上下文的控制流程。

它解决什么问题：让模型可以基于外部工具结果继续决策，而不是一次性猜答案。

它不解决什么问题：它不能保证模型一定做对，也不能自动解决工具权限、安全和错误处理。

常见误解：以为模型自己会执行工具。实际上模型只输出 tool call，真正执行的是外层程序。

最小例子：模型请求 calculator("2+3")，程序执行后返回 5，模型再根据 5 输出最终答案。

和前一天知识的关系：前一天学的是 agent 系统地图，今天开始实现其中最核心的运行循环。