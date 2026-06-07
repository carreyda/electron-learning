# Electron Hello Demo

Electron 桌面应用入门实战项目，涵盖主进程、渲染进程、预加载脚本的完整通信体系与安全最佳实践。

## 快速开始

```bash
# 安装依赖
npm install

# 启动应用
npm start
```

## 技术栈

- **Electron** — 跨平台桌面应用框架
- **Node.js** — 主进程运行环境
- **Chromium** — 渲染进程内核

## 功能特性

### 窗口管理
- 可配置窗口大小（800×600，最小 600×400）
- 支持窗口居中 / 最大化 / 最小化
- 无边框窗口模式（注释可选）

### 安全架构
- `contextIsolation: true` — 渲染进程与 Node.js 环境隔离，防止原型链污染
- `nodeIntegration: false` — 禁止渲染进程直接访问 Node 原生 API
- `contextBridge` — 预加载脚本作为安全桥梁，白名单机制限制 IPC 频道

### IPC 通信（双向）
- `ipcMain.on / ipcRenderer.send` — 渲染进程 → 主进程消息推送
- `ipcMain.handle / ipcRenderer.invoke` — 渲染进程请求 → 主进程返回结果（Promise）
- 频道白名单校验，拒绝未授权的 IPC 调用

### 系统交互
- 文件对话框（`dialog.showOpenDialog`）
- 默认浏览器打开外部链接（`shell.openExternal`）
- 资源管理器中显示文件（`shell.showItemInFolder`）

### 应用增强
- 全局快捷键 `Ctrl+X`（`globalShortcut`）
- 自定义应用菜单（`Menu.buildFromTemplate`）
- 生命周期监听：`activate` / `before-quit` / `will-quit` / `quit`
- macOS 平台适配：关闭窗口不退出，点击 Dock 重新创建

## 项目结构

```
├── main.js          # 主进程入口（窗口、IPC、菜单、快捷键、生命周期）
├── preload.js       # 预加载脚本（contextBridge 安全 API 暴露）
├── index.html       # 渲染进程页面（UI 交互）
├── package.json
├── .gitignore
└── README.md
```

## 学习路线

1. **主进程** — 窗口创建、生命周期、原生 API
2. **预加载脚本** — 安全通信桥梁、权限控制
3. **IPC 通信** — 进程间双向消息传递
4. **渲染进程** — HTML/CSS/JS 前端交互
5. **系统集成** — 对话框、Shell 操作、快捷键
