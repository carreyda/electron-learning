const { app, BrowserWindow } = require("electron");
const path = require("path");

// 创建窗口函数
function createWindow() {
  // 初始化浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron Hello World",
    // 绑定预加载脚本
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 加载本地页面
  mainWindow.loadFile("index.html");
  // 自动打开调试控制台（开发环境）
  mainWindow.webContents.openDevTools();
}

// 应用就绪后创建窗口
app.whenReady().then(createWindow);

// 窗口全部关闭后退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
