# Personal Context MCP Server

## 目标

把个人 memory 和任务列表作为 MCP tools 暴露给 agent。

## Tools

### search_memory

- 输入：`query: str`
- 数据源：`memory/MEMORY.md`
- 输出：

```json
{
  "matches": []
}
```

### save_memory

- 输入：`text: str`, `tags: list[str]`
- 写入：追加到 `memory/MEMORY.md`
- 输出：

```json
{
  "saved": true
}
```

### list_tasks

- 输入：`status: str`
- 数据源：`memory/tasks.json`
- 输出：

```json
{
  "tasks": []
}
```

## 安全边界

- 不读取项目外文件。
- 不覆盖 memory。
- 不把 secrets 写入 memory。
- 每次写入都记录来源。

