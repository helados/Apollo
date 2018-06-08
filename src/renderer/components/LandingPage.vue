<template>
  <div id="wrapper">
    <main>

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
              <button class="ui red right labeled icon button" @click="getFile()">
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
              <p>Likes : {{info.like_count}} <i class="red heart icon"></i></p>
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
  const youtubedl = require('youtube-dl');
  export default {
    name: 'landing-page',
    data() {
      return {
        link: null,
        info: null,
      };
    },
    methods: {
      getFile() {
        youtubedl.getInfo(this.link, null, (err, info) => {
          if (err) throw err;
          console.log(info);

          this.info = info;
        });
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
