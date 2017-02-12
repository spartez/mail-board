<template>
  <div class="mdl-card mdl-shadow--2dp thread-message-card">
    <div class="mdl-card__supporting-text">
      <img class="thread-message-avatar" :src="message.from.avatar">
      <a class="thread-message-author-link" :href="'mailto:' + message.from.address">{{ message.from.name }}</a>
      wrote to
      <img class="thread-message-avatar" :title="person.name" v-for="person in message.to" :src="person.avatar">
      ({{ message.internalDate | calendarTime }})
      <iframe v-show="!isCollapsed" ref="iframe" class="message-iframe"></iframe>
    </div>
  </div>
</template>

<script>
  import parseMessage from 'gmail-api-parse-message';
  import imagesLoaded from 'imagesloaded';
  import moment from 'moment';

  export default {
    props: ['message'],
    data: () => ({
      isCollapsed: false
    }),

    mounted() {
      this.updateIframe();
    },

    watch: {
      message() {
        this.updateIframe();
      }
    },

    methods: {
      updateIframe() {
        const iframe = this.$refs.iframe;
        const iframeBody = iframe.contentWindow.document.body;
        iframeBody.innerHTML = this.message.content;

        iframe.style.height = 0;
        iframe.style.height = iframeBody.scrollHeight + 'px';
        iframe.style.width = iframeBody.scrollWidth + 'px';

        imagesLoaded(iframeBody, () => {
          iframe.style.height = 0;
          iframe.style.height = iframeBody.scrollHeight + 'px';
          iframe.style.width = iframeBody.scrollWidth + 'px';
        });
      }
    },
    filters: {
      calendarTime(timestamp) {
        return moment(parseInt(timestamp)).calendar();
      }
    }
  }
</script>

<style scoped>
  .message-iframe {
    width: 100%;
    border: none;
  }

  .thread-message-card {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .thread-message-author-link {
    text-decoration: none;
  }

  .thread-message-avatar {
    width: 16px;
    border-radius: 3px;
    vertical-align: -10%;
    margin-right: 3px;
  }
</style>
