<template>
  <div id="wrapper">
    <main>

      <sui-dimmer active v-if="loading">
        <sui-loader indeterminate>Converting</sui-loader>
      </sui-dimmer>

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
                <button class="ui massive red icon button" @click="getFile()" :disabled="!isLinkValid()">
                  &nbsp;&nbsp;&nbsp; <i class="search icon"></i> &nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


        <div class="ui three column grid videoInfo" v-if="info">
          <div class="row">
            <div class="column"></div>
            <div class="column">
              <p><sui-image :src="info.thumbnail_url" size="medium"/></p>
              <p>Title : {{info.title}}</p>
              <p>By : <a :href="info.author.user_url" target="_blank">{{info.author.name}}</a></p>
              <p>Views : {{info.view_count}}</p>
              <button @click="download()">Download</button>
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
            if (info.view_count) {
              info.view_count = UtilService.transformThousandToK(info.view_count);
            }
          }
          this.info = info;
          this.loading = false;
        });
      },
      download() {
        UtilService.selectDirectory();
        YoutubeService.downloadAudio();
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
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  background-color: #445260;
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
    color: grey;
  }

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
