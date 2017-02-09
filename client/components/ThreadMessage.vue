<template>
  <div class="thread-message">
    <span class="icon-default aui-icon aui-icon-small thread-message-collapse"
          :class="{'aui-iconfont-collapsed': isCollapsed, 'aui-iconfont-expanded': !isCollapsed}"
          @click="isCollapsed = !isCollapsed">
    </span>
    <img class="thread-message-avatar" :src="message.from.avatar">
    <a :href="'mailto:' + message.from.address">{{ message.from.name }}</a>
    wrote to
    <img class="thread-message-avatar" :title="person.name" v-for="person in message.to" :src="person.avatar">
    ({{ message.internalDate | calendarTime }})
    <iframe v-show="!isCollapsed" ref="iframe" class="message-iframe"></iframe>
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
        iframe.style.height = iframeBody.scrollHeight + 'px'
        iframe.style.width = iframeBody.scrollWidth + 'px'

        imagesLoaded(iframeBody, () => {
          iframe.style.height = 0;
          iframe.style.height = iframeBody.scrollHeight + 'px'
          iframe.style.width = iframeBody.scrollWidth + 'px'
        })
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

  .thread-message {
    border-bottom: 1px solid #ccc;
    padding: 15px 0 10px 15px;
  }

  .thread-message:hover {
    background-color: #f5f5f5;
    border-left: 5px solid #3572b0;
    padding-left: 10px;
  }

  .thread-message-avatar {
    width: 16px;
    border-radius: 3px;
    vertical-align: -10%;
    margin-right: 3px;
  }

  .thread-message-collapse {
    cursor: pointer;
  }
</style>
