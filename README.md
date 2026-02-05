# WorkTip MCP Server

一个为 AI 编程工具提供核心开发执行协议的 MCP Server。

所有支持 MCP 配置的工具都可以使用，比如 Cursor、Claude Code、Windsurf 等。

## 核心协议

完整协议内容如下，可直接使用：

```
# 核心执行协议 (Core Execution Protocol)

> 原则：思考深度决定代码质量。未经确认，禁止修改。

## 阶段一：深度分析 (Deep Analysis)
- 意图识别：理解改动目的，寻找优雅方案
- 影响评估：分析修改对其他模块的影响
- 测试先行：思考验证方案

## 阶段二：计划与准入 (Pre-implementation Plan)
在执行任何写操作前，必须输出 [待确认计划]：
- Scope：受影响文件
- Blueprint：逻辑变更
- Safety：测试覆盖点
- 阻塞确认：询问"计划已就绪，是否执行？"

## 阶段三：闭环执行 (Verified Implementation)
- TDD 模式：先写测试
- 原子提交：保持代码简洁
- 自我核查：检查 Promise、硬编码、Lint 错误
```

如果添加到项目的 `CLAUDE.md` 或 `cursor rule` 中，就不需要安装 MCP 了。

## 安装配置

### Claude Code

```bash
claude mcp add worktip -s user -- npx -y @n0ts123/worktip
```

### Cursor

Cursor Settings -> Tools & Integrations -> MCP Tools，添加：

```json
{
  "mcpServers": {
    "worktip": {
      "command": "npx",
      "args": ["-y", "@n0ts123/worktip"]
    }
  }
}
```

### 淘宝镜像（国内用户推荐）

如果访问 npm 缓慢，可以使用淘宝镜像：

```json
{
  "mcpServers": {
    "worktip": {
      "command": "npx",
      "args": [
        "-y",
        "--registry",
        "https://registry.npmmirror.com",
        "@n0ts123/worktip"
      ]
    }
  }
}
```

其他编程工具配置方式类似。

无需预先安装，npx 会自动下载最新版本。

## 使用方法

在对话中调用 `worktip` 工具即可返回完整协议：

```
使用 worktip
use worktip
```

或直接在对话中说明需要执行协议，AI 会自动识别并调用。

## 工具说明

本服务器提供一个工具：

- **`worktip`**：返回核心开发执行协议，帮助你以正确的方式处理开发任务

## License

MIT

---

Made with ❤️ by [N0ts](https://github.com/N0tsLabs)
