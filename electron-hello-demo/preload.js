const { contextBridge } = require("electron");

// 安全暴露全局API（基础示例）
contextBridge.exposeInMainWorld("electronEnv", {
  platform: process.platform,
});
