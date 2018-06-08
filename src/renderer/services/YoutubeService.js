const youtubedl = require('ytdl-core');
const fs = require('fs');

export default class YoutubeService {
  static getInformations(link, callback) {
    return youtubedl.getInfo(link, callback);
  }
  static downloadVideo(link) {
    youtubedl(link, { filter: format => format.container === 'mp4' }).pipe(fs.createWriteStream('video.mp4'));
  }
}
