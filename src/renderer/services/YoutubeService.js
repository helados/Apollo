import bus from '../bus';

const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const readline = require('readline');

let INTERVAL_ID = 0;
const SLEEP_TIME = 400;


export default class YoutubeService {
  static getInformations(link, callback) {
    return ytdl.getInfo(link, callback);
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static downloadAudio(link) {
    const stream = ytdl(link, { quality: 'highestaudio' });

    stream.on('response', (res) => {
      const totalSize = res.headers['content-length'];
      let dataRead = 0;
      bus.$on('cancelDownload', () => {
        bus.$emit('answer', true);
        stream.destroy();
      });
      res.on('data', (data) => {
        dataRead += data.length;
        const percent = (((dataRead / totalSize) * 99)).toFixed(0);
        bus.$emit('percentProgress', percent);
        this.sleep(SLEEP_TIME);
      });
    });
    const savedPath = localStorage.getItem('chosenPath');
    ffmpeg(stream)
      .setFfmpegPath(ffmpegPath)
      .format('mp3')
      .audioBitrate(256)
      .save(`${savedPath}.mp3`)
      .on('progress', () => {
        readline.cursorTo(process.stdout, 0);
        bus.$on('cancelDownload', () => {
          bus.$emit('answer', true);
          stream.destroy();
        });
      })
      .on('end', () => {
        const source = fs.createReadStream(`${savedPath}.mp3`);
        const dest = fs.createWriteStream(`${savedPath}`);
        source.on('close', () => {
          fs.unlinkSync(`${savedPath}.mp3`);
          bus.$emit('percentProgress', 100);
        });
        source.pipe(dest);
        // source.on('end', function () { /* copied */ });
        // source.on('error', function(err) { /* error */ });
      });
  }


  static makePlayer(id) {
    /* eslint-disable */
      if (this.player === undefined) {
        this.player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: id,
            events: {
                'onReady': onPlayerReady
            }
        });
      } else {
        this.player.loadVideoById(id);
        this.stopPlayer();
      }

      function onPlayerReady (event) {
        event.target.stopVideo();
      }
  }

  static playPlayer() {
    this.player.playVideo();
    INTERVAL_ID = setInterval( () => {
      bus.$emit('playerProgress', Math.floor(this.player.getCurrentTime()));
    }, 1000);

  }

  static pausePlayer() {
    this.player.pauseVideo();
    clearInterval(INTERVAL_ID);
  }

  static stopPlayer() {
    this.player.stopVideo();
    clearInterval(INTERVAL_ID);
  }
}
