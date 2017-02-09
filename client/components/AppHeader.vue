<template>
  <header id="header" role="banner">
    <nav class="aui-header aui-dropdown2-trigger-group" role="navigation" data-aui-responsive="true">
      <div class="aui-header-inner">
        <div class="aui-header-primary">
          <h1 id="logo" class="aui-header-logo aui-header-logo-textonly"><a href="./"><span class="aui-header-logo-device">Gmail Board</span></a>
          </h1>
        </div>

        <div class="aui-header-secondary">
          <ul class="aui-nav">
            <li v-if="isSignedIn"><a href="#" @click.prevent="signOut">Sign out</a></li>
            <li v-else><a href="#" @click.prevent="signIn">Sign in</a></li>
          </ul>
        </div>
      </div>
    </nav>
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
