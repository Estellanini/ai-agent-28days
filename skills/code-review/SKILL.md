---
name: code-review
description: Use when reviewing code changes for bugs, regressions, security risks, data loss, compatibility issues, or missing tests. Focus on findings with concrete file and line references.
---

# Code Review Skill

## When To Use

Use this skill when the task is to review code, inspect a diff, evaluate a patch, or find risks before merging.

## Process

1. Identify the changed files and the behavioral surface affected.
2. Read the relevant code around each change before judging it.
3. Prioritize bugs, regressions, data loss, security, compatibility, and missing tests.
4. Ignore style-only comments unless they hide a correctness issue.
5. Ground every finding in a file path and line reference.
6. Order findings by severity.
7. If there are no findings, state that clearly and list residual risk or unrun tests.

## Output Format

```markdown
## Findings

- Severity: High / Medium / Low
- File:
- Line:
- Issue:
- Why it matters:
- Suggested fix:

## Open Questions

## Test Gaps

## Summary
```

## References

Read `references/review-checklist.md` only when a deeper review checklist is needed.

