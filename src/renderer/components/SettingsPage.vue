<template>
  <div id="wrapper">
    <main>
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <div style="margin-top:2vh"></div>
          <router-link :to="{name: 'landing-page'}"><button class="ui blue right labeled icon button">
            <i class="window restore outline icon"></i>
            Go to downloader
          </button></router-link>
          <h2 class="ui inverted center aligned icon header">
            <i class="circular music icon"></i> <br>
          </h2>
          <div style="margin-bottom:6vh"></div>
        </div>
      </div>

      <div class="ui middle aligned center aligned grid">
        <div class="column">
        <h2 class="title">Set your theme color</h2>
        </div>
      </div>

      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <div style="margin-top:2vh"></div>
          <div class="ui three buttons">
            <button class="ui black button"></button>
          </div>
          <div class="ui three buttons">
            <button class="ui grey button"></button>
          </div>
          <div style="margin-bottom:6vh"></div>
        </div>

        <div class="column">
          <div style="margin-top:2vh"></div>
          <div class="ui three buttons">
            <button class="ui white button"></button>
          </div>
          <div class="ui three buttons">
            <button class="ui red active button"></button>
          </div>
          <div style="margin-bottom:6vh"></div>
        </div>
      </div>

      <div class="ui three column grid">
        <div class="row">
          <div class="column"></div>
          <div class="column">
            <div class="ui fluid action">
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
export default {
  name: 'configuration-page',

  data() {
    return {
      link: null,
      info: null,
    };
  },
  methods: {
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
