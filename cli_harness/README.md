# CLI Harness

这里实现本地 AI-CLI harness。

## 目标

- 管理 workspace。
- 暴露文件、patch、shell、checkpoint 工具。
- 记录 trace。
- 控制权限和恢复边界。

## 计划文件

- `cli.py`：命令行入口。
- `filesystem_tools.py`：受控文件工具。
- `patch_tool.py`：文本 patch 工具。
- `shell_tool.py`：受限 shell 工具。
- `checkpoint.py`：workspace checkpoint 和 restore。
- `test_workspace/`：文件工具测试工作区。
- `sample_project/`：Day 13 真实小任务样例项目。

## 复现命令

```bash
python -m cli_harness.cli "your task" --workspace cli_harness/test_workspace
```

## 风险记录

- 文件越界：
- patch 失败：
- shell 拒绝：
- restore 失败：

