const { app, autoUpdater, dialog, BrowserWindow } = require('electron');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 }); // Adjust window size as needed
  mainWindow.loadFile('index.html'); // Replace with the path to your HTML file

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function checkForUpdates() {
  // Specify the update feed URL for your GitHub repository
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'JEMcats',
    repo: 'Encryption-Example',
  });

  // Check for updates
  autoUpdater.checkForUpdates();

  // Event handler for when an update is available
  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: 'A new version of Encrytion Example is available. Do you want to install it?',
        buttons: ['Install', 'Cancel'],
      })
      .then((response) => {
        if (response.response === 0) {
          // Download and install the update
          autoUpdater.downloadUpdate();
        }
      });
  });

  // Event handler for when an update is downloaded
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Downloaded',
      message: 'The update has been downloaded and will be installed when you quit the application.',
    });
  });

  // Event handler for update errors
  autoUpdater.on('error', (error) => {
    log.error('AutoUpdater error:', error.message);
  });
}

app.whenReady().then(() => {
  createWindow(); // Create the main application window
  checkForUpdates(); // Check for updates
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow(); // Create a new window when the application is activated
  }
});
