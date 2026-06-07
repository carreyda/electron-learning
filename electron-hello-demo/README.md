# Electron Hello Demo

一个简单的 Electron 桌面应用入门项目。

## 快速开始

```bash
# 安装依赖
npm install

# 启动应用
npm start
```

## 项目结构

```
├── main.js          # 主进程入口
├── preload.js       # 预加载脚本（安全暴露 API 到渲染进程）
├── index.html       # 渲染进程页面
├── package.json
├── .gitignore
└── README.md
```

## 技术栈

- **Electron** — 跨平台桌面应用框架
- **Node.js** — 主进程运行环境
- **Chromium** — 渲染进程内核

## 功能

- 基础窗口创建（800×600）
- 预加载脚本安全通信（`contextBridge`）
- 开发工具自动开启
- 跨平台窗口关闭行为适配（macOS 保留菜单栏）
