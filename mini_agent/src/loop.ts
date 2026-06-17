// 创建 `mini_agent/src/loop.ts`，先不用真实模型，写一个 `MockModel`，让它按预设脚本返回：

// 1. 第 1 轮要求调用 calculator。
// 2. 第 2 轮根据 calculator 结果输出 final answer。

// 模型先决定调用工具，程序执行工具，再把工具结果交回模型，模型基于结果输出最终答案。

type MessageRole = "user" | "assistant" | "tool"; // 用户输入、模型最终回答、工具执行结果

type Message = {
  role: MessageRole;
  content: string;
};

// 表示模型要求调用工具
type ToolCall = {
  type: "tool_call";
  tool: "calculator";
  args: {
    expression: string;
  };
};

// 表示模型已经完成任务
type FinalAnswer = {
  type: "final";
  answer: string;
};

type ModelOutput = ToolCall | FinalAnswer; // loop的分岔点：要么继续调用工具，要么结束

type AgentState = {
  task: string;
  messages: Message[];
  turns: number;
};

type TraceEvent =
  | {
      turn: number;
      type: "model_output";
      content: ModelOutput;
    }
  | {
      turn: number;
      type: "tool_call";
      tool: string;
      args: Record<string, unknown>;
    }
  | {
      turn: number;
      type: "tool_result";
      result: string;
    };

type AgentResult = {
  answer: string;
  state: AgentState;
  trace: TraceEvent[];
};

class MockModel {
  generate(messages: Message[]): ModelOutput {
    const toolResult = messages.findLast((message) => message.role === "tool");

    // 如果messages里没有工具结果，也就是第1轮要求调用的calculator
    if (!toolResult) {
      return {
        type: "tool_call",
        tool: "calculator",
        args: {
          expression: "2 + 3",
        },
      };
    }

    // 如果messages里已经有tool result，也就是第2轮根据工具结果输出最终答案
    return {
      type: "final",
      answer: `calculator result is ${toolResult.content}`,
    };
  }
}

// 一个简易的计算器Demo
function calculator(expression: string): string {
  if (!/^[\d\s+\-*/().]+$/.test(expression)) {
    throw new Error("calculator only supports basic arithmetic expressions");
  }

  const result = Function(`"use strict"; return (${expression});`)();

  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error("calculator expression did not produce a finite number");
  }

  return String(result);
}

// 负责把模型提出的tool call变成真实函数调用
// 这里体现出了一个关键的边界：模型只提出tool_call,程序负责真正执行工具
function runTool(toolCall: ToolCall): string {
  if (toolCall.tool === "calculator") {
    return calculator(toolCall.args.expression);
  }

  const unreachable: never = toolCall.tool;
  throw new Error(`unknown tool: ${unreachable}`);
}

// 这是核心的agent loop
function runAgent(task: string, maxTurns = 5): AgentResult {
  const model = new MockModel();
  const state: AgentState = {
    task,
    messages: [{ role: "user", content: task }],
    turns: 0,
  };
  const trace: TraceEvent[] = [];
  
  // 最多循环maxTurns次
  for (let turn = 1; turn <= maxTurns; turn += 1) {
    state.turns = turn;

    // 每一轮先调用模型
    const modelOutput = model.generate(state.messages);
    // 然后记录trace
    trace.push({ turn, type: "model_output", content: modelOutput });

    // 如果模型返回最终答案，任务结束
    if (modelOutput.type === "final") {
      state.messages.push({ role: "assistant", content: modelOutput.answer });
      return {
        answer: modelOutput.answer,
        state,
        trace,
      };
    }

    // 如果模型返回tool call
    trace.push({
      turn,
      type: "tool_call",
      tool: modelOutput.tool,
      args: modelOutput.args,
    });

    // 程序执行工具
    const toolResult = runTool(modelOutput);
    // 记录工具结果
    trace.push({ turn, type: "tool_result", result: toolResult });
    // 再把工具结果放回上下文
    state.messages.push({ role: "tool", content: toolResult });
  }

  throw new Error(`agent stopped after reaching maxTurns=${maxTurns}`);
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

// 主程序入口
if (isMainModule) {
  const result = runAgent("What is 2 + 3?");
  console.log(JSON.stringify(result.trace, null, 2));
  console.log(result.answer);
}

export { MockModel, runAgent };
export type { AgentResult, AgentState, FinalAnswer, Message, ModelOutput, ToolCall, TraceEvent };

//   这段代码的核心不是 calculator，而是这个控制流程：

//   model output
//     -> 如果是 final，结束
//     -> 如果是 tool_call，执行工具
//     -> 把 tool result 放回 messages
//     -> 再调用 model

//   这就是 Agent Loop。模型负责“决定下一步”，程序负责“执行动作”，messages 负责“保存本轮运行的上
//   下文”。