const {app,BrowserWindow} = require("electron");

let mainWindow;

console.log("Node:     " + process.versions.node);
console.log("Chrome:   " + process.versions.chrome);
console.log("Electron: " + process.versions.electron);

app.on("ready", function() {
	mainWindow = new BrowserWindow( {
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.openDevTools();
});
