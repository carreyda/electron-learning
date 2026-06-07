const { contextBridge, ipcRenderer } = require("electron");

// 通过 contextBridge 安全地向渲染进程暴露 API（而非直接注入 node 对象）
contextBridge.exposeInMainWorld("electronEnv", {
  platform: process.platform, // 系统平台名称，只读
});

// 白名单：限制渲染进程可用的 IPC 频道，防止恶意滥用
const allowedSendChannels = ["render-to-main"];   // 渲染进程 -> 主进程
const allowedReceiveChannels = ["main-to-render"]; // 主进程 -> 渲染进程
const allowedInvokeChannels = ["open-file-dialog"]; // 双向通信（渲染进程 invoke -> 主进程 handle）

// 安全封装 ipcRenderer，只暴露白名单内的频道
contextBridge.exposeInMainWorld("ipc", {
  // 向主进程发送消息（只允许指定频道）
  send: (channel, data) => {
    if (allowedSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // 监听主进程消息（剥离 event 对象，只传递数据给回调）
  on: (channel, callback) => {
    if (allowedReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => callback(...args));
    }
  },
  // invoke：渲染进程发起请求并等待主进程返回结果（Promise）
  invoke: (channel, ...args) => {
    if (allowedInvokeChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, ...args);
    }
    return Promise.reject(new Error(`不允许的 invoke 频道: ${channel}`));
  },
  // 移除指定监听器，避免组件多次挂载导致重复监听和内存泄漏
  removeListener: (channel, callback) => {
    if (allowedReceiveChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback);
    }
  },
});
