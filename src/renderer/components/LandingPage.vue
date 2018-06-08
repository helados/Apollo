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
              <input type="text" placeholder="YouTube URL">
              <button class="ui red right labeled icon button">
                <i class="music icon"></i>
                Convert
              </button>
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
    name: 'landing-page',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #445260;
  }

  @media (min-height: 320px) {
    .ui.footer.form-page { /* Increased specificity for SO snippet priority */
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

</style>
