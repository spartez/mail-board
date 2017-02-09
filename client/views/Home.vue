<template>
  <div class="page">
    <app-header></app-header>
    <board></board>
  </div>
</template>

<script>
  import AppHeader from '../components/AppHeader.vue'
  import Board from '../components/Board.vue'

  import * as Gmail from '../services/Gmail'

  Gmail.initialize(
    '415728374243-ar5qtmtqtrqgitnhkv5qmr1d3hdpt1dj.apps.googleusercontent.com',
    ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
    'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose'
  );

  export default {
    components: {
      AppHeader,
      Board
    }
  }
</script>

<style scoped>
  .page {
    height: 100%;
  }
</style>
