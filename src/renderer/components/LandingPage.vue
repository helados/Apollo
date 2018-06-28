<template>
  <div id="wrapper">
    <main>

      <div style="margin-top:2vh"></div>

      <div class="ui middle aligned grid">
        <div class="column logo">
          <span class="apollon">   <i class="white circular music icon"></i> Helados Apollo</span>
          <router-link :to="{name: 'settings-page'}">
            <span class="settings">  <i class="white large setting icon"></i> Settings</span>
          </router-link>
        </div>
      </div>

      <div style="margin-bottom:6vh"></div>

      <div style="margin: 100px">
        <div class="ui one column grid">
          <div class="row">
            <div class="column">
              <div class="ui massive fluid action input">
                <input type="text" placeholder="YouTube URL" v-model="link">
                <button v-if="loading" class="ui loading massive red icon button search-button" @click="getFile()" :disabled="!isLinkValid()">
                </button>
                <button v-else class="ui massive red icon button search-button" @click="getFile()" :disabled="!isLinkValid()">
                    <i class="search icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin: 100px" v-if="info">
        <div class="ui one column grid videoInfo" >
          <div class="row">
            <div class="column">
             <div class="audio-player">
                 <div class="album-image" :style="{ 'background-image': 'url(' + info.thumbnail_url + ')' }"/>
                 <div id="play-btn"><i class="play icon"></i></div>
                 <div class="audio-wrapper" id="player-container" href="javascript:;">
                     <audio id="player" ontimeupdate="initProgressBar()">
                         <source src="http://www.lukeduncan.me/oslo.mp3" type="audio/mp3">
                     </audio>
                 </div>
                 <div class="player-controls scrubber">
                     <span class="headline">{{info.title}} - {{info.author.name}}</span>
                     <span id="seekObjContainer">
			            <progress id="seekObj" value="0" max="1"></progress>
			         </span>
                     <br>
                     <small style="float: left; position: relative; left: 15px;" class="start-time"></small>
                     <small style="float: right; position: relative; right: 20px;" class="end-time"></small>
                 </div>
                 <div @click="download()" id="action-btn"><i class="download icon"></i></div>
             </div>

             <div class="download-progress">
                <div class="ui green progress" id="progress">
                    <div class="bar"></div>
                    <div class="label white">5% Converted</div>
                </div>
             </div>
            </div>
          </div>
        </div>

        <div class="ui three column grid videoInfo" v-if="error">
            <div class="row">
                <div class="column"></div>
                <div class="column">
                    <p><i class="red exclamation circle icon"></i> Error when getting Youtube video</p>
                </div>
            </div>
        </div>
      </div>

        <div class="ui inverted vertical footer segment form-page">
            <div class="ui container">
                <p align="center">A Helados Project. &nbsp; Made with <i class="red heart icon"></i>by the team</p>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
  import YoutubeService from '../services/YoutubeService';
  import UtilService from '../services/UtilService';
  export default {
    name: 'landing-page',
    data() {
      return {
        link: null,
        info: null,
        loading: false,
        error: false,
      };
    },
    methods: {
      getFile() {
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
          }
          this.info = info;
          this.loading = false;
        });
      },
      download() {
        UtilService.selectDirectory(this.info.title);
        YoutubeService.downloadAudio(this.link, this.info.title);
      },
      isLinkValid() {
        if (!this.link) return false;
        // eslint-disable-next-line no-useless-escape
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const urlRegex = new RegExp(expression);
        return this.link.match(urlRegex);
      },
    },
  };
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Ubuntu", sans-serif;
  background: linear-gradient(to bottom, #7798a9 0%, #4e4260 100%);
}

.videoInfo {
    color: #FFFFFF;
}

@media (min-height: 320px) {
  .ui.footer.form-page {
    /* Increased specificity for SO snippet priority */
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

  .logo {
    margin-left: 25px;
    color:white;
    user-select: none;
  }

  .apollon {
    font-size: 1.4em;
    font-weight:bold;
  }

  .settings {
    position:absolute;
    right:40px;
    top: 20px;
    font-size: 1.1em;
    font-weight:bold;
    color:white;
  }

  .settings:hover {
    color: #2d3957;
  }

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.audio-player {
    background: white;
    width: 100%;
    text-align: center;
    display: flex;
    flex-flow: row;
}

.audio-player .album-image {
    min-height: 100px;
    width: 130px;
    background-size: cover;
}
.audio-player .player-controls {
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    flex: 3;
}
.audio-player .player-controls progress {
    width: 90%;
}
.audio-player .player-controls progress[value] {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    color: blue;
    height: 5px;
}
.audio-player .player-controls progress[value]::-webkit-progress-bar {
    background-color: white;
    border-radius: 2px;
    border: 1px solid #dfdfdf;
    color: blue;
}
.audio-player .player-controls progress::-webkit-progress-value {
    background-color: blue;
}
.audio-player .player-controls p {
    font-size: 1.6rem;
}
.audio-player #play-btn {
    font-size:3em;
    color:black;
    margin: 3.4rem 0 2rem 2.3rem;
}

.audio-player #action-btn {
    font-size:3em;
    color:black;
    margin-right: 30px;
    margin-top: 50px;
    cursor: pointer;
}


.player-controls .headline {
    color: black;
    font-size: 1.3em;
}

.search-button {
    padding: 0 2em !important;
    min-width:124px;

}

.download-progress {
    margin-top: 0.1em;
}

.white {
    color: white !important;
    margin-top: 0.9em !important;
}



</style>
