const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev: boolean = process.env.NODE_ENV === 'development';
const PORT: string | number = process.env.PORT || 8080;

// this is to allow the BrowserWindow object to be referrable globally
// however, BrowserWindow cannot be created before app is 'ready'
let mainWindow: any = null;

const loadMainWindow = () => {
 mainWindow = new BrowserWindow({
      width : 1200,
      height: 800,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          devTools: isDev, //whether to enable DevTools
          // preload: path.join(__dirname, "preload.js")
      }
  });

  // depending on whether this is dev mode or production mode
  // if dev mode, open port 8080 to share server
  // if production mode, open directly from build file in /dist folder
  if(isDev){
    mainWindow.loadURL(`http://localhost:${PORT}`);
    console.log(`Main Window loaded PORT ${PORT}`)
  } 
  else{
    mainWindow.loadFile(path.join(__dirname, "../client/index.html"));
    console.log('Main Window loaded file index.html');
  } 
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if(BrowserWindow.getAllWindows().length === 0){
    loadMainWindow();
  }
});