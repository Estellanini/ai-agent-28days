# Tool Schema与工具注册
今天要理解的核心不是“怎么写一个函数”，而是：当工具要交给模型使用时，工具必须被描述成一个清晰、可验证、可执行的接口。
普通函数是给程序员看的，tool schema是给模型和agent runtime共同使用的。

为什么工具定义不是“函数名+参数‘这么简单？
因为模型不会读你的源码，它只能根据工具名、描述、schema和历史上下文来判断什么时候调用工具、怎么传参、怎么理解结果。

## Tool 是什么
在 agent 系统里，tool 是模型可以请求外部程序执行的能力。
例如：

calculator("2 + 3")
readJson("data/prices.json")

但模型本身不会真正执行这些函数。

真实流程是：

Model 输出 tool_call
-> Agent Loop 读取 tool name 和 args
-> Tool Registry 查找工具
-> 校验参数
-> 执行真实函数
-> 返回 tool result
-> 放回 messages
-> Model 继续决策

所以 tool 至少包含两层含义：给模型看的说明、给程序执行的函数。

## 为什么不能只有函数名

比如你有一个工具：

search(query: string)

这个定义对程序员可能够了，但对模型不够。

模型不知道：

- 这个 search 搜哪里？
- 应该搜索网页、笔记、memory，还是文件？
- query 应该是关键词，还是完整问题？
- 找不到结果时会返回什么？
- 是否有副作用？
- 什么时候不应该调用？

所以成熟的工具定义通常需要：

```json
{
    name: "search_notes",
    description: "Search local project notes by keyword. Use this only when the answer may exist
    in notes/*.md.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Short keyword or phrase to search for."
        }
      },
      required: ["query"]
    }
}
```

这才是模型能理解和正确使用的工具。

## Tool 的 5 个组成部分

Day 03 需要重点理解这 5 个部分。

（1）名称 name

工具名是模型识别工具的入口。

坏例子：doThing、helper、search。问题是太泛，不知道工具边界。

好例子：calculator、read_json、search_notes。好工具名应该短、明确、动作清晰。

（2）描述 description

description 决定模型什么时候调用工具。

坏例子：Search something。太模糊，模型可能乱用。

好例子：Search local markdown notes by keyword. Use this when the user asks about project concepts,previous learning notes, or saved explanations. Do not use it for web search.

这个描述告诉模型：

- 搜索范围是什么
- 适用场景是什么
- 不适用场景是什么

（3）参数 schema

参数 schema 决定模型应该如何传参。

例如：
```json
  {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Relative path to a JSON file inside the workspace."
      }
    },
    required: ["path"]
  }
```

schema 的作用是：

- 限制字段名
- 限制字段类型
- 指明必填字段
- 给参数补充说明
- 让 runtime 可以校验错误调用

  
(4)执行函数

执行函数是真正产生结果或副作用的代码。

例如：

```ts
  function readJson(path: string) {
    // read file
    // parse JSON
    // return structured result
  }
```

注意：模型不会直接运行这个函数。
是 agent loop / tool registry 根据模型的 tool call 来调用它。

(5)返回协议

返回值不能随便写。

坏例子：done。模型不知道 done 了什么。

好例子：
```json
  {
    ok: true,
    data: {
      apple: 1200,
      tesla: 30000
    }
  }
```

失败时也应该结构化：
```json
  {
    ok: false,
    error: "File not found",
    path: "data/prices.json"
  }
```

这样模型下一轮才能判断：是换路径、解释错误，还是停止任务。

## Tool Registry 是什么

Tool Registry 是工具注册中心。

它负责：

注册工具
查找工具
校验参数
执行工具
格式化工具列表给模型
处理错误

可以把它理解成 agent 的工具目录。

最小结构大概是：
```ts
  type ToolDefinition = {
    name: string;
    description: string;
    parameters: unknown;
    execute: (args: unknown) => Promise<unknown> | unknown;
  };
```

然后 registry 负责：

register(tool)
getTool(name)
listToolsForModel()
callTool(name, args)

## 为什么参数校验很重要

模型可能会犯这些错误：

```ts
  // 缺参数
  calculator({})

  // 参数类型错
  calculator({ expression: 123 })

  // 工具名不存在
  calculate({ expression: "2 + 3" })

  // 参数名写错
  calculator({ input: "2 + 3" })
```

如果没有校验，程序可能直接崩溃。

更好的做法是返回清晰错误：
```json
  {
    ok: false,
    error: "Invalid tool arguments",
    details: "Missing required field: expression"
  }
```

这样 agent loop 可以把错误放回 messages，让模型有机会修正。

## 好 Schema 和坏 Schema 对比

坏 schema：
```json
  {
    name: "read",
    description: "Read file",
    parameters: {
      path: "string"
    }
  }
```
  
问题：

- 工具名太泛
- 不知道读什么文件
- 不知道路径范围
- 参数格式不标准
- 没有说明错误返回


好 schema：
```json
  {
    name: "read_json",
    description: "Read and parse a JSON file from the workspace. Use this only when structured
    JSON data is needed.",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path to a JSON file inside the workspace."
        }
      },
      required: ["path"]
    }
  }
```
好处：

- 模型知道什么时候用
- runtime 可以校验参数
- 工具边界清晰
- 后续 trace 更容易 debug

  
## 今天要实现的三个工具

你今天可以围绕这三个工具理解 tool schema。

calculator(expression)

用途：计算简单表达式。
风险：表达式不合法、执行不安全、返回非数字。

read_json(path)

用途：读取并解析本地 JSON 文件。
风险：文件不存在、不是 JSON、路径越界。

search_notes(query)

用途：搜索本地 notes 里的关键词。
风险：query 太泛、没有结果、返回内容太长。

每个工具都应该有：

name
description
parameters
execute
success result
error result

## 今日实践建议顺序

(1)先写 ToolDefinition 类型。
(2)写一个 ToolRegistry 类。
(3)注册 calculator。
(4)再注册 read_json 和 search_notes。
(5)手动构造 3 个错误调用：缺参数、参数类型错、工具名不存在
(6)把错误写入 trace。
(7)对比“没有 schema”和“有 schema”的行为差异。





## 重要的结论

Tool schema 的质量会直接影响 agent 行为。

工具描述模糊 -> 模型不知道什么时候用
参数 schema 太松 -> 模型容易传错参数
返回值不结构化 -> 模型无法判断下一步
没有 registry -> 工具越来越难管理
没有错误协议 -> agent 一错就崩

真正要掌握的是：

Tool 不是函数本身，而是“模型可理解、程序可校验、执行可追踪”的能力接口。