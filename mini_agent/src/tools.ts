// 表示模型要求调用工具
type ToolCall = {
  type: "tool_call";
  tool: "calculator";
  args: {
    expression: string;
  };
};

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