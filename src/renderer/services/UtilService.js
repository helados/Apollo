const remote = window.require('electron');
const { dialog } = window.require('electron').remote;

export default class YoutubeService {
  static transformThousandToK(number) {
    return number > 999 ? `${(number / 1000).toFixed(1)}k` : number;
  }

  static selectDirectory() {
    const fileSelector = dialog.showOpenDialog(remote.getCurrentWindow, { properties: ['openDirectory'], title: 'Select a folder to save your track' });
    // If a folder was selected and not just closed,
    // set the localStorage value to that path and adjust the state.
    if (fileSelector) {
      const pathToStore = fileSelector[0];
      localStorage.setItem('selectedDirectory', pathToStore);
    }
  }
}
