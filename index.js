const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

// Import local modules


// Initialize window variable
let win;

// Application icon path
//const iconPath = "assets/icons/icon.png";

// Main process listeners
app.whenReady().then(async () => {
    // Create the window
    await createWindow();

    // Startup listener
    /*ipcMain.on("startup", async (event, data) => {
        console.log("Startup data requested...");
        event.reply("startup-data", await fetch_all_employees());
        console.log("Startup data sent.");
    });*/
});

app.on("window-all-closed", async() => {
    if (process.platform !== "darwin") {
        // Quit application
        await app.quit();
    }
});

app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        // Create application window
        createWindow();
    }
});



// Functions
async function createWindow() {
    // Create the window
    win = new BrowserWindow({
        resizable: true,
        maximizable: true,
        width: 750,
        height: 421,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: false, // Disable nodeIntegration
            contextIsolation: true, // Enable context isolation
            //icon: iconPath,
            preload: path.join(__dirname, "preload.js") // Path to your preload script
        }
    });

    // Show the window
    win.show();

    // Maximize the window
    win.maximize(); // TEMPORARILY DISABLE MAXIMIZATION

    // Load the interface
    win.loadFile(path.join(__dirname, "src", "index.html"));

    // Open DevTools
    win.webContents.openDevTools();
}