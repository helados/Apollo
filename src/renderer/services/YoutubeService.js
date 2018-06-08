const youtubedl = require('youtube-dl');

export default class RestResource {
  static getInformations(link, callback) {
    return youtubedl.getInfo(link, callback);
  }
}
