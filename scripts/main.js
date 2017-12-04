
// define(function (require) {
//   //var sqlController = require("file:///./sqlController.js")
//   require(["file:///./sqlController.js"], function(sqlController) {
//     //This function is called when scripts/helper/util.js is loaded.
//     //If util.js calls define(), then this function is not fired until
//     //util's dependencies have loaded, and the util argument will hold
//     //the module value for "helper/util".

  
//   var entry = require("file:///./entry.js");
//   var card = require("file:///./card.js");
//   var host = '54.36.151.63';
//   var username = 'testera';
//   var password = 'demarc-host-peek-silicon';
//   var database = 'toyota';

//   var sql = new sqlController(host, username, password, database);
//   //SQLSelect(connection);
//   var entry = new entry('test');
//   entry.addEntry('name', 'goodbye');
//   entry.addEntry('value', 20);
//   //sql.SQLInsert(entry);
//   var result = sql.SQLInsert(entry);
//   //sql.SQLDelete(10);
//   console.log(result);
//   //var card = new card(result);
//   //console.log(card.toString());
//   sql.endConnection();





  const electron = require('electron')
  // Module to control application life.
  const app = electron.app
  // Module to create native browser window.
  const BrowserWindow = electron.BrowserWindow

  const path = require('path')
  const url = require('url')

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow

  function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  // });
// });
