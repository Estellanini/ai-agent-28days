# Traces

这里保存 agent run 的 JSONL trace。

每条 trace 建议包含：

- timestamp
- run_id
- turn
- type
- model_output
- tool_call
- tool_result
- error
- latency
- final_status

命名建议：

```text
day-XX-topic.jsonl
```

