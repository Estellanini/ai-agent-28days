---
name: ai-news-digest
description: Use when collecting daily AI Agent news, research updates, model/platform changes, MCP updates, or coding-agent ecosystem changes and converting them into a concise, sourced digest.
---

# AI News Digest Skill

## When To Use

Use this skill for daily AI Agent news tracking and research digest writing.

## Source Priority

1. Official docs, official blogs, GitHub releases.
2. Papers and technical reports.
3. Credible engineering blogs.
4. Media reports.
5. Community discussion.

Read `references/source-priority.md` when source quality is uncertain.

## Process

1. Find recent AI Agent related updates.
2. Keep only items with a source and publication date.
3. Select 3 items:
   - at least 1 official or paper source;
   - at least 1 connected to today's learning topic.
4. For each item, separate fact from interpretation.
5. Classify it as tool, memory, harness, eval, multi-agent, safety, or product.
6. Write the digest to `news/YYYY-MM-DD.md`.

## Output Format

```markdown
## 资讯 1：标题

- 来源：
- 发布日期：
- 一句话事实：
- 和 AI Agent 的关系：
- 我今天学到的判断：
- 对本项目的行动：
- 可信度：
```

