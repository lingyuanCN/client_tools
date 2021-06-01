let electron = require('electron')

let app = electron.app
let BrowserWindow = electron.BrowserWindow

let mainWindow = null // 主窗口

app.on('ready', ()=>{ // 监听ready事件
    mainWindow = new BrowserWindow({
        width:1200,
        height:900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', ()=>{ // 监听窗口closed事件
        mainWindow = null 
    })
})