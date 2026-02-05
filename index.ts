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
const PROTOCOL_CONTENT = `# 核心执行协议 (Core Execution Protocol)

> **原则：思考深度决定代码质量。未经确认，禁止修改。**

---

## 阶段一：深度分析 (Deep Analysis)

在接到任何任务后，必须先在 \`<thinking>\` 标签内进行分析：

### 1.1 意图识别
- 这行代码改动的真正目的是什么？
- 是否有更优雅的架构方案？
- 核心问题是什么？边界情况有哪些？

### 1.2 影响评估
- 修改 A 是否会破坏 B？
- 是否涉及全局状态、环境变量或核心逻辑？
- 依赖链的影响范围有多大？

### 1.3 测试先行
- 思考如何通过自动化测试来验证这个变动？
- 正常流程和异常流程如何覆盖？

---

## 阶段二：计划与准入 (Pre-implementation Plan)

在执行任何写操作（文件修改/创建）前，必须输出一份 **[待确认计划]**：

### 2.1 Scope（范围）
受影响的文件路径列表

### 2.2 Blueprint（蓝图）
简述核心逻辑的变化（不只是"改了哪"，而是"怎么改"）

### 2.3 Safety（安全）
预期的测试覆盖点（覆盖哪些正常流和异常流）

### 2.4 阻塞确认
**计划末尾必须询问**:\`计划已就绪，是否执行？\`

> 🛑 在收到明确的肯定答复前，严禁调用任何写操作工具。

---

## 阶段三：闭环执行 (Verified Implementation)

确认后，按照以下节奏执行：

### 3.1 TDD 模式
- 优先编写/更新测试脚本
- 确保测试能复现问题或验证新功能

### 3.2 原子提交
- 逻辑修改需条理清晰
- 保持代码简洁
- 每次提交只做一件事

### 3.3 自我核查
代码完成后，自动检查是否存在：
- 未处理的 Promise
- 硬编码的魔法值
- Lint 错误
- 类型安全隐患
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
