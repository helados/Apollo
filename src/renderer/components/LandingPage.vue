<template>
  <div id="wrapper">
    <main>
      <div style="margin-top:2vh"></div>
      <div class="ui middle aligned grid">
        <div class="column logo">
          <span class="apollo">
            <i class="white circular music icon"></i> Helados Apollo
          </span>
        </div>
      </div>

      <div style="margin-bottom:6vh"></div>

      <div style="margin: 100px">
        <div id="player"></div>
        <div class="ui one column grid">
          <div class="row">
            <div class="column">
              <div class="ui massive fluid action input">
                <input type="text" placeholder="YouTube URL" v-model="link">
                <button
                  v-if="loading"
                  class="ui loading massive red icon button search-button"
                  @click="getFile()"
                  :disabled="!isLinkValid()"
                ></button>
                <button
                  v-else
                  class="ui massive red icon button search-button"
                  @click="getFile()"
                  :disabled="!isLinkValid()"
                >
                  <i class="search icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="player" v-if="info">
        <div class="ui one column grid videoInfo">
          <div class="row">
            <div class="column">
              <div class="audio-player row">
                <div
                  class="album-image"
                  :style="{ 'background-image': 'url(' + info.thumbnail_url + ')' }"
                />
                <div v-show="!isPlaying" @click="play()">
                  <i class="action-btn play icon"></i>
                </div>
                <div v-show="isPlaying" @click="pause()">
                  <i class="action-btn pause icon"></i>
                </div>
                <div class="player-controls scrubber">
                  <span class="headline">{{info.title}} - {{info.author.name}}</span>
                  <span id="seekObjContainer">
                    <progress id="progress-bar" :value="player_percent" max="1"></progress>
                  </span>
                  <div class="time">
                    <small class="start-time">{{ time }}</small>
                    <small class="end-time">{{ info.time }}</small>
                  </div>
                </div>

                <div v-show="!isFinished">
                  <div v-show="!isDownloading" @click="download()">
                    <i class="action-btn download icon"></i>
                  </div>
                  <div v-show="isDownloading" @click="cancelDownload()">
                    <i class="action-btn red close icon"></i>
                  </div>
                </div>
                <div v-show="isFinished">
                  <i class="action-btn green check icon"></i>
                </div>
              </div>
              <div class="download-progress row">
                <sui-progress state="active" color="green" :percent="percent" :label="label"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui inverted vertical footer segment form-page">
        <div class="ui container">
          <p align="center">
            An Helados Project. &nbsp; Made with
            <i class="red heart icon"></i>by the team
          </p>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import YoutubeService from '../services/YoutubeService';
import UtilService from '../services/UtilService';
import bus from '../bus';

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

export default {
  name: 'landing-page',
  data() {
    return {
      link: null,
      info: null,
      loading: false,
      error: false,
      audioQuality: '256',
      isDownloading: false,
      percent: 0,
      player_percent: 0,
      time: '00:00',
      firstTime: '00:00',
      endTime: '00:00',
      isPanelEnabled: false,
      isFinished: false,
      isPlaying: false,
    };
  },
  created() {
    bus.$on('percentProgress', this.changePercent);
    bus.$on('playerProgress', this.changeTime);
  },
  computed: {
    label() {
      return `${this.percent}% Downloaded`;
    },
  },
  methods: {
    getFile() {
      this.reset();
      this.info = null;
      this.loading = true;
      YoutubeService.getInformations(this.link, (err, info) => {
        if (err) {
          this.error = true;
          this.loading = false;
          throw err;
        }
        if (info) {
          if (info.title.length > 30) {
            info.title = info.title.slice(0, 30);
            info.title += '...';
          }
          info.time = UtilService.toTime(info.length_seconds);
        }
        this.info = info;
        this.loading = false;
        YoutubeService.makePlayer(this.info.video_id);
      });
    },
    play() {
      YoutubeService.playPlayer();
      this.isPlaying = true;
    },
    pause() {
      YoutubeService.pausePlayer();
      this.isPlaying = false;
    },
    changeTime(value) {
      this.time = UtilService.toTime(value);
      this.player_percent = value / this.info.length_seconds;
    },
    changePercent(value) {
      this.percent = value;
      // eslint-disable-next-line
      Number(this.percent) > 99
        ? (this.isFinished = true)
        : (this.isFinished = false);
    },
    download() {
      UtilService.selectDirectory(this.info.title);
      YoutubeService.downloadAudio(this.link, this.info.title);
      this.isDownloading = true;
    },
    cancelDownload() {
      bus.$emit('cancelDownload');
      bus.$on('answer', () => {
        this.isDownloading = false;
        this.percent = 0;
      });
    },
    panelMenu() {
      this.isPanelEnabled = !this.isPanelEnabled;
    },
    isLinkValid() {
      if (!this.link) return false;
      // eslint-disable-next-line no-useless-escape
      const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      const urlRegex = new RegExp(expression);
      return this.link.match(urlRegex);
    },
    validateFirstTime() {
      // const isMatching = /[0-9]{2,}?:[0-5][0-9]/.test(this.firstTime);
      // // eslint-disable
      // if (!isMatching) {
      // }
    },
    reset() {
      this.time = '00:00';
      this.player_percent = 0;
      if (this.isPlaying) {
        this.pause();
      }
      if (this.isDownloading) {
        this.cancelDownload();
        this.error = false;
        this.isDownloading = false;
        this.percent = 0;
        this.isPanelEnabled = false;
        this.isFinished = false;
      }
    },
  },
};
</script>
