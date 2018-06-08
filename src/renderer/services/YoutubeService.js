const youtubedl = require('ytdl-core');

export default class YoutubeService {
  static getInformations(link, callback) {
    return youtubedl.getInfo(link, callback);
  }
}
