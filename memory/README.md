# Memory

这里保存文件版 agent memory。

## 布局

- `memory_summary.md`：最重要的短摘要，适合每次 run 开始读取。
- `MEMORY.md`：结构化长期记忆。
- `raw_memories.md`：原始提取记录。
- `sessions/`：会话记录。
- `rollout_summaries/`：任务摘要。
- `tasks.json`：个人任务列表。
- `search_memory.py`：Day 23 实现的关键词检索脚本。

## 记忆标准

一条 memory 必须满足至少一个条件：

- 会影响未来行动。
- 是稳定偏好。
- 是项目约定。
- 是失败教训。
- 是可复用流程。

