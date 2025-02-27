const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false,
        autoHideMenuBar: true,
        backgroundColor: "#ffe4c4",
        center: true,
        frame: false
    })
    win.setAspectRatio(1/1);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('close', () => {
    app.quit()
})