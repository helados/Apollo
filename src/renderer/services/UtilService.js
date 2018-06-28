const remote = window.require('electron');
const { dialog } = window.require('electron').remote;

export default class YoutubeService {
  static transformThousandToK(number) {
    return number > 999 ? `${(number / 1000).toFixed(1)}k` : number;
  }

  static selectDirectory(name) {
    const fileSelector = dialog.showSaveDialog(
      remote.getCurrentWindow,
      { filters: [{ name: 'Audio .mp3 file', extensions: ['mp3'] }], title: 'Select a folder to save your track', defaultPath: name });
    // If a folder was selected and not just closed,
    // set the localStorage value to that path and adjust the state.
    if (fileSelector) {
      const pathToStore = fileSelector;
      localStorage.setItem('chosenPath', pathToStore);
    }
  }
}
