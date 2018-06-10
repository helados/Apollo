const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

export default class YoutubeService {
  static getInformations(link, callback) {
    return ytdl.getInfo(link, callback);
  }
  static downloadVideo(link) {
    ytdl(link, { filter: format => format.container === 'mp4' }).pipe(fs.createWriteStream('video.mp4'));
  }
  static downloadAudio() {
    const id = 'sDLsSQf3Hc0';

    const stream = ytdl(id, {
      quality: 'highestaudio', // filter: 'audioonly',
    });
    // const start = Date.now();9**
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`${__dirname}/${id}.mp3`)
      .on('progress', (p) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on('end', () => {
        // console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
      });
  }
}
