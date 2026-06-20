

// 模拟一个模型
class MockModel {
    generate(){
        // 查找messages中是否有工具结果
        // 如果没有工具的结果，那么就准备调用工具(在消息中推入调工具的标识)
        // 如果有工具的结果，那么就直接输出最终答案
    }

}

// 执行工具
const runTool = () => {
    // 具体怎么执行工具

}


// 主函数
const runAgent = (content: string, maxTurns = 5) => {
    const model = new MockModel();
    // 一些上下文
    const state = {};
    // 记录一些trace
    const trace = [];

    // 开始循环
    for (let turn = 1; turn <= maxTurns; turn += 1){
        // 每一轮先调模型
        const modelOutput = model.generate()
        // 记录trace
        trace.push ({});
        // 如果模型返回最终答案，任务结束
        // 如果模型返回tool call，那么久执行工具
        // 记录工具结果，再把工具结果放回上下文
    }


}