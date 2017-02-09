<template>
  <div class="card" @click="setActiveThread(thread)" :active="isActiveThread">
    <section class="summary">
      {{ thread.subject }}
    </section>
    <section class="fields">
      <img class="avatar" v-for="participant in thread.participants" :src="participant.avatar">
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as store from '../store'

  export default {
    props: ['thread'],

    methods: {
      ...mapActions({
          setActiveThread: store.SET_ACTIVE_THREAD
      })
    },

    computed: {
      ...mapGetters({
          activeThread: store.ACTIVE_THREAD
      }),
      isActiveThread() {
          return this.activeThread && this.activeThread.id === this.thread.id
      }
    }
  }
</script>

<style scoped>
  .card {
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    cursor: move;
    font-size: 14px;
    padding: 10px;
    position: relative;
    transition: background-color 140ms ease-in-out, border-color 75ms ease-in-out;
    user-select: none;
  }

  .card:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  .card[active] {
    background: #ebf2f9;
    border-color: #3572b0;
  }

  .card[dragged] {
    background: #d5d5d5;
    border-color: transparent;
  }

  .card[dragged] > * {
    visibility: hidden;
  }

  .avatar {
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    width: 24px;
    -webkit-border-radius: 50% 50% 50% 50%;
    border-radius: 50% 50% 50% 50%;
    cursor: move;
    margin-right: 6px;
  }

  .summary {
    display: block;
    box-sizing: content-box;
    line-height: 1.42857143;
    max-height: 4.28571429em;
    overflow: hidden;
  }

  .fields {
    margin-top: 10px;
  }
</style>
