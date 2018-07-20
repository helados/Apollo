import bus from '../bus';

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

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static downloadAudio(link, name) {
    const stream = ytdl(link, { quality: 'highestaudio' }).on('response', (res) => {
      const totalSize = res.headers['content-length'];
      let dataRead = 0;
      res.on('data', (data) => {
        dataRead += data.length;
        const percent = (((dataRead / totalSize) * 100) / 2).toFixed(0);
        bus.$emit('percentProgress', percent);
        this.sleep(100);
      });
    });
    const path = localStorage.getItem('chosenPath');
    ffmpeg(stream).audioBitrate(320).audioCodec('libmp3lame').save(`tmp/${name}.mp3`)
      .on('progress', (p) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on('end', () => {
        const source = fs.createReadStream(`tmp/${name}.mp3`);
        const dest = fs.createWriteStream(`${path}.mp3`);
        source.on('close', () => {
          fs.unlinkSync(`tmp/${name}.mp3`);
        });
        source.pipe(dest);
        // source.on('end', function () { /* copied */ });
        // source.on('error', function(err) { /* error */ });
      });
  }
}
