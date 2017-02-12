<template>
  <div v-if="thread" class="thread-preview">
    <div class="mdl-card mdl-shadow--2dp details-card">
      <div class="mdl-card__supporting-text">
        <section class="summary">
          {{ thread.subject }}
        </section>
        <ul class="property-list">
          <li class="item">
            <strong class="item-name">Status:</strong>
            <span class="item-value"><span class="aui-lozenge aui-lozenge-complete">New</span></span>
          </li>
          <li class="item">
            <strong class="item-name">Created:</strong>
            <span class="item-value">{{ thread.createdTimestamp | calendarTime }}</span>
          </li>
          <li class="item">
            <strong class="item-name">Updated:</strong>
            <span class="item-value">{{ thread.updatedTimestamp | calendarTime }}</span>
          </li>
          <li class="item">
            <strong class="item-name">People:</strong>
            <span class="item-value">
            <div v-for="participant in thread.participants">
              <img style="vertical-align: middle; margin-right: 5px; height: 20px;" :src="participant.avatar">
              {{ participant.name }}
              <span v-if="participant.address === thread.author.address">(Author)</span>
            </div>
          </span>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="!showAllResponses && thread.messages.length > 2">
      <thread-message :message="thread.messages[0]"></thread-message>
      <template>
        <a class="collapsed-comments" @click="showAllResponses = true">
          <span class="collapsed-comments-line"></span><span class="collapsed-comments-line"></span>
          <span class="show-more-comments"
                data-collapsed-count="5">{{ thread.messages.length - 2 }} more {{ thread.messages.length === 3 ? 'message' : 'messages' }}</span>
        </a>
        <thread-message :message="thread.messages[thread.messages.length - 1]"></thread-message>
      </template>
    </template>
    <template v-else>
      <thread-message v-for="message in thread.messages" :message="message"></thread-message>
    </template>

    <div v-show="isResponding">
      <vue-editor
        :editor-toolbar="editorToolbar"
        :use-save-button="false"
        @editor-updated="saveResponseContent"
        style="margin-bottom: 10px;"></vue-editor>

      <button @click="respondToAll" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary">
        Respond to all
      </button>
      <button @click="isResponding = false" class="mdl-button mdl-js-button ">
        Cancel
      </button>
    </div>
    <button v-if="!isResponding" @click="isResponding = true"
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary">
      Respond
    </button>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import * as Gmail from '../services/Gmail'
  import gravatar from 'gravatar';
  import moment from 'moment';
  import {mapActions, mapGetters} from 'vuex'
  import * as store from '../store'

  import parse from 'parse-gmail-email';
  import parseMessage from 'gmail-api-parse-message';
  import ThreadMessage from './ThreadMessage.vue'

  export default {
    components: {ThreadMessage, VueEditor},

    data: () => ({
      message: null,
      responses: [],
      showAllResponses: false,
      isResponding: false,
      responseContent: '',
      editorToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'color': []}, {'background': []}],
        ['clean']
      ]
    }),

    computed: {
      ...mapGetters({
        thread: store.ACTIVE_THREAD
      }),

      gravatar() {
        return this.thread && gravatar.url(this.thread.author.address)
      }
    },

    watch: {
      'thread.id'() {
        this.showAllResponses = false;
        this.isResponding = false;
      }
    },

    methods: {
      ...mapActions({
        sendResponse: store.SEND_RESPONSE
      }),

      saveResponseContent(content) {
        this.responseContent = content;
      },

      respondToAll() {
        this.sendResponse({thread: this.thread, response: this.responseContent})
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
  .thread-preview {
    padding: 10px;
  }

  .summary {
    font-weight: bold;
  }

  .details-card {
    width: 100%;
  }

  .property-list {
    display: block;
    margin: 0;
    list-style: none;
    padding: 0;
  }

  .item-name {
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: break-word;
    color: #707070;
    display: inline-block;
    font-weight: normal;
    padding: 2px 5px 2px 0;
    width: 120px;
  }

  .item-value {
    word-wrap: break-word;
    word-break: break-word;
    display: inline-block;
    max-width: 100%;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-top: 2px;
    position: relative;
    vertical-align: top;
  }

  .collapsed-comments {
    display: block;
    background: #f5f5f5;
    border-right: none;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    height: 38px;
    cursor: pointer;
    margin-top: 15px;
  }

  .collapsed-comments:hover {
    text-decoration: none;
    background: #e6e6e6;
  }

  .collapsed-comments:hover .show-more-comments {
    background: #e6e6e6;
  }

  .collapsed-comments-line {
    display: block;
    padding-top: 12px;
    border-bottom: 1px solid #ccc;
  }

  .show-more-comments {
    position: relative;
    top: -17px;
    background: #f5f5f5;
    padding: 0 20px;
    color: #333;
  }

  .respond-button {
    margin-top: 20px;
  }
</style>
