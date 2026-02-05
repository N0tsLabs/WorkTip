#!/usr/bin/env node
import { spawn } from 'child_process';

const proc = spawn('node', ['dist/index.js'], {
  cwd: 'e:/project/WorkTip',
  stdio: ['pipe', 'pipe', 'pipe']
});

proc.stdout.on('data', (data) => {
  console.log('stdout:', data.toString());
});

proc.stderr.on('data', (data) => {
  console.log('stderr:', data.toString());
});

proc.on('close', (code) => {
  console.log('exit code:', code);
});

// 发送 MCP init 消息（简化版）
setTimeout(() => {
  proc.kill();
}, 2000);
