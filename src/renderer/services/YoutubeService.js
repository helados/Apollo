// const youtubedl = require('youtube-dl');
const youtubedl = require('ytdl-core');

export default class RestResource {
  static getInformations(link, callback) {
    return youtubedl.getInfo(link, callback);
  }
}
