const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
// const _ = require('lodash');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
  const promises = videos.map(video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (error, metadata) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            ...video,
            duration: metadata.format.duration,
            format: 'avi'
          });
        }
      });
    });
  });
  Promise.all(promises).then((results) => {
    mainWindow.webContents.send('metadata:complete', results);
  });
});

ipcMain.on('conversion:start', (event, videos) => {
  videos.forEach(video => {
    const outputDirectory = video.path.split('video.name')[0];
    const outputName = video.name.split('.')[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;
  
    ffmpeg(video.path)
      .output(outputPath)
      .on('end', () => {
        console.log(`Conversion for ${outputName} is complete.`);
        mainWindow.webContents.send('conversion:end', { video, outputPath });
      })
      .on('progress', ({ timeMark }) => {
        mainWindow.webContents.send('conversion:progress', { video, timeMark })
      })
      .run();
  })

});
