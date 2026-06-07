const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

/**
 * 创建主窗口
 * - contextIsolation: true   -> 渲染进程与 Node.js 环境隔离，防止原型链污染
 * - nodeIntegration: false   -> 禁止渲染进程直接访问 Node 原生 API
 * - preload                   -> 预加载脚本作为安全桥梁，暴露有限的 API
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron Hello World",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools(); // 自动打开 DevTools（开发调试用）
}

// 注册 IPC 监听：收到渲染进程消息后回复
ipcMain.on("render-to-main", (event, data) => {
  console.log("收到渲染进程消息：", data);
  event.sender.send("main-to-render", "主进程已收到消息！");
});

// 应用就绪后创建窗口
app.whenReady().then(createWindow);

// macOS 下点击关闭按钮不退出应用（符合平台惯例），其他平台直接退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
