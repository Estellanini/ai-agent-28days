# CLI Harness

这里实现本地 AI-CLI harness。

## 目标

- 管理 workspace。
- 暴露文件、patch、shell、checkpoint 工具。
- 记录 trace。
- 控制权限和恢复边界。

## 计划文件

- `src/cli.ts`：命令行入口。
- `src/filesystem-tools.ts`：受控文件工具。
- `src/patch-tool.ts`：文本 patch 工具。
- `src/shell-tool.ts`：受限 shell 工具。
- `src/checkpoint.ts`：workspace checkpoint 和 restore。
- `test_workspace/`：文件工具测试工作区。
- `sample_project/`：Day 13 真实小任务样例项目。

## 复现命令

```bash
pnpm cli "your task" --workspace cli_harness/test_workspace
```

## 风险记录

- 文件越界：
- patch 失败：
- shell 拒绝：
- restore 失败：
