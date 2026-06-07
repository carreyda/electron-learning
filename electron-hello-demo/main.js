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
    minWidth: 600, // 最小宽度
    minHeight: 400, // 最小高度
    resizable: true, // 是否允许缩放
    title: "Electron 高级窗口",
    frame: true, // 是否显示窗口边框
    transparent: false, // 窗口透明
    alwaysOnTop: false, // 窗口置顶
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // 开启上下文隔离（必开）
      nodeIntegration: false, // 关闭 Node 集成
    },
  });

  /*   mainWindow.center(); // 窗口居中

  mainWindow.maximize(); // 窗口最大化

  mainWindow.minimize(); // 窗口最小化

  mainWindow.close(); // 关闭窗口 */

  mainWindow.loadFile("index.html"); // 加载远程网页
  mainWindow.webContents.openDevTools(); // 自动打开 DevTools（开发调试用）

  //   const win = new BrowserWindow({ frame: false }); // 无边框窗口（自定义标题栏）
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
