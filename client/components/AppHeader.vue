<template>
  <header id="header" role="banner">
    <nav class="app-header">
      <div class="app-header-primary">
        Mail board (meet.js)
      </div>

      <div class="app-header-secondary">
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-if="isSignedIn" href="#" @click.prevent="signOut">Sign out</button>
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-else href="#" @click.prevent="signIn">Sign in</button>
      </div>
  </header>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as Gmail from '../services/Gmail'
  import * as store from '../store'

  export default {
    methods: {
      signIn() {
        Gmail.signIn()
      },
      signOut() {
        Gmail.signOut()
      }
    },
    computed: {
      ...mapGetters({
        isSignedIn: store.IS_SIGNED_IN
      })
    }
  }
</script>

<style scoped>
  .app-header {
    line-height: 40px;
    background: #f1f1f1;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  .app-header-primary {
    float: left;
    font-size: 18px;
    font-weight: bold;
  }

  .app-header-secondary {
    float: right;
  }
</style>
