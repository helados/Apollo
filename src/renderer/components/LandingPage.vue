<template>
  <div id="wrapper">
    <main>

      <sui-dimmer active v-if="loading">
        <sui-loader indeterminate>Calling Youtube...</sui-loader>
      </sui-dimmer>

      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <div style="margin-top:2vh"></div>
          <h2 class="ui inverted center aligned icon header">
            <i class="circular music icon"></i> <br>
            Media Downloader
          </h2>
          <div style="margin-bottom:6vh"></div>
        </div>
      </div>

      <div class="ui three column grid">
        <div class="row">
          <div class="column"></div>
          <div class="column">
            <div class="ui fluid action input">
              <input type="text" placeholder="YouTube URL" v-model="link">
              <button class="ui red right labeled icon button" @click="getFile()" :disabled="!isLinkValid()">
                <i class="music icon"></i>
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ui three column grid videoInfo" v-if="info">
          <div class="row">
            <div class="column"></div>
            <div class="column">
              <p><sui-image :src="info.thumbnail" size="medium"/></p>
              <p>Title : {{info.title}}</p>
              <p>Duration : {{info.duration}}</p>
              <p>{{info.like_count}} <i class="red heart icon"></i> {{info.dislike_count}} <i class="yellow heart outline icon"></i></p>
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
          this.info = info;
          this.loading = false;
        });
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
</style>
