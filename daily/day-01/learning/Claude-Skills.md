# Claude Skills

# 目标

阅读 Claude Skills overview，关注 progressive disclosure。



# 学习资料

- Claude Skills overview：重点看 Skills 的 progressive disclosure：metadata → SKILL\.md → resources 按需加载。\(https://claude\.com/docs/skills/overview\)

- Agent Skills overview：看 Agent Skills 在 Claude API / Claude 产品里的定位和使用方式。\(https://docs\.claude\.com/en/docs/agents\-and\-tools/agent\-skills/overview\.md\)

- Skills best practices：重点看 progressive disclosure patterns，理解为什么 SKILL\.md应该像目录/索引，而不是塞满所有内容。\(https://docs\.claude\.com/en/docs/agents\-and\-tools/agent\-skills/best\-practices\.md\)

- Anthropic engineering blog: Agent Skills：作为扩展阅读，理解 Skills的设计动机和真实应用。\(https://www\.anthropic\.com/engineering/equipping\-agents\-for\-the\-real\-world\-with\-agent\-skills\)



# 详细内容

## ✅ Claude Skills Overview

重点看 Skills 的 progressive disclosure：metadata → SKILL\.md → resources 按需加载。

Skills的渐进式披露：Skill 不是一次性把所有资料都塞进 Claude 的上下文，而是像“目录 → 使用说明书 → 附件资料”一样逐层打开。

- Metadata loading：先看目录卡片。Cluade启动时不会读取完整 Skill，只会看到每个 Skill 的简短信息：

    - Skill name: powerpoint\-maker\.

    - Description: Use this skill when creating or editingPowerPoint decks\.

这相当于一本书的标题和摘要。Claude 先知道“有哪些工具/技能可以用”，但不会马上读完整内容。



- Activation：任务匹配时，再打开 SKILL\.md。Claude 发现这个任务和powerpoint\-maker 的 description 匹配，于是才加载这个 Skill 的完整 SKILL\.md。SKILL\.md 里面可能写着：

    - 什么时候使用这个 Skill

    - 制作 PPT 的步骤

    - 版式规则

    - 文件命名规范

    - 需要调用哪些脚本

    - 注意事项

也就是说，只有相关 Skill 才进入上下文。



- Resource loading：更大的资源继续按需加载。即使加载了 SKILL\.md，Claude 也不会马上读取所有附属文件。比如 Skill 目录里可能有：

    - powerpoint\-maker/

    - SKILL\.md

    - scripts/create\_ppt\.py

    - references/brand\_guidelines\.md

    - templates/business\_deck\.pptx

Claude 会先读 SKILL\.md。如果任务需要品牌规范，它才读brand\_guidelines\.md。如果需要生成文件，它才用 create\_ppt\.py。如果需要模板，它才打开 business\_deck\.pptx。



用一个比喻理解。这就像你去图书馆：

1. 先看书名和简介，判断哪本书可能有用；

2. 选中一本后，打开目录和正文；

3. 需要更细节时，才去看附录、参考资料、示例代码。

而不是一进图书馆就把所有书都摊开读一遍。



为什么要这样设计？因为模型的上下文窗口是有限的。如果一开始就把所有 Skills 的完整说明、脚本、模板、参考文档都塞进去，会导致：上下文被大量无关内容占满；模型更容易混淆；任务重点被稀释；成本和延迟增加；重要信息可能被挤出上下文。



Progressive disclosure 的好处是：平时只保留轻量索引，需要时再加载专业知识。



这对于写skill有什么启发？如果你在设计 Skill，关键是：

- description 要写清楚：因为它决定 Claude 什么时候会激活这个 Skill。

- SKILL\.md 不要塞太多细节，它应该写核心流程和资源索引。

- 大段参考资料放到 resources / references 里，让 Claude 按需读取。

- 脚本、模板、示例文件独立存放，需要执行或参考时再加载。



## ✅ Agent Skills Overview

看 Agent Skills 在 Claude API / Claude产品里的定位和使用方式。

主要讲两个事：

- Agent Skills 的定位：它是给 Claude 增加专业能力的模块：每个 Skill 打包了instructions、metadata，以及可选的 scripts/templates 等资源；Claude会在任务相关时自动使用它们。它的定位不是“一次性prompt”，而是可复用、按需加载的专业工作流/领域知识包。



- 在 Claude 产品和 API 里的使用方式：

    - 预置 Skills：用于 PowerPoint、Excel、Word、PDF 等常见文档任务，可在claude\.ai、Claude API、AWS/Foundry 等环境使用。

    - 自定义 Skills：可以在 Claude Code 创建、通过 Claude API 上传，或在claude\.ai 设置里添加。

    - API 里使用 Skills 时，是通过 Messages API \+ code execution tool \+ container 参数来挂载 Skill；预置 Skill 和自定义 Skill的集成形态基本一致。



一个容易忽略的点：不同 surface 之间 Skills 不自动同步。比如上传到 claude\.ai 的Skill 需要单独上传到 API；通过 API 上传的 Skill 也不会自动出现在claude\.ai；Claude Code 的 Skills 是本地filesystem\-based，和前两者也分开管理。





## ✅ Skills best practices

重点看 progressive disclosure patterns，理解为什么 SKILL\.md应该像目录/索引，而不是塞满所有内容。

上面已经学习了，不在赘述。



## ✅ Anthropic engineering blog: Agent Skills

作为扩展阅读，理解 Skills的设计动机和真实应用。

用Agent Skills 让智能体具备处理真实世界任务的能力。



---