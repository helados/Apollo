const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

ffmpeg.setFfmpegPath(ffmpegPath);

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

    const path = localStorage.getItem('chosenPath');
    // const start = Date.now();9**
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`tmp/${id}.mp3`)
      .on('progress', (p) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on('end', () => {
        const source = fs.createReadStream(`tmp/${id}.mp3`);
        const dest = fs.createWriteStream(`${path}.mp3`);

        source.on('close', () => {
          fs.unlinkSync(`tmp/${id}.mp3`);
        });
        source.pipe(dest);
        // source.on('end', function () { /* copied */ });
        // source.on('error', function(err) { /* error */ });
      });
  }
}
