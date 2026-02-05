#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "worktip", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Protocol content
const PROTOCOL_CONTENT = `# 核心执行协议

> 原则：先想清楚，再动手。未经确认，禁止修改。

---

## 阶段一：分析

理解需求后，必须全面了解相关代码：

1. **理解业务逻辑**
   - 这个需求的目标是什么？
   - 完整流程是什么？涉及哪些模块？
   - 有哪些边界情况和异常流程？

2. **阅读关联代码**
   - 找到所有相关文件，通读一遍
   - 理解现有实现逻辑
   - 识别可能影响的其他模块

3. **评估影响**
   - 修改是否影响其他功能？
   - 是否涉及全局状态、共享配置？

**禁止**：直接修改代码。

有问题直接问我。

---

## 阶段二：方案

### 1. 实现思路
- 为什么这样设计？
- 核心逻辑怎么实现？

### 2. 可选方案对比
- 有哪些可行的方案？
- 各方案的优缺点
- 为什么选择当前方案

### 3. 变更清单
- 改动哪些文件
- 每个文件大概改什么
- 依赖关系、影响范围

**必须**：消除重复代码（DRY）。

完成后问："方案已列出，是否执行？"

---

## 阶段三：执行

按方案实现，完成后进行测试：

1. **功能测试**
   - 正常流程走通
   - 边界情况和异常场景

2. **回归测试**
   - 检查是否影响现有功能

3. **代码检查**
   - 类型检查 / 编译通过
   - 检查遗漏

**禁止**：未经确认提交代码。

---

**核心**：未经确认，禁止修改任何代码。
`;

// Register request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "worktip",
    description: "返回核心开发执行协议，帮助你以正确的方式处理开发任务。",
    inputSchema: { type: "object", properties: {} }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "worktip") {
    return {
      content: [{ type: "text", text: PROTOCOL_CONTENT }],
      isError: false
    };
  }
  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
