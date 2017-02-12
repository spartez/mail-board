<template>
  <div class="mdl-card mdl-shadow--2dp card">
    <div class="mdl-card__supporting-text card-content">
      <section class="summary">
        {{ thread.subject }}
      </section>
      <section class="fields">
        <img class="avatar" v-for="participant in thread.participants" :src="participant.avatar">
      </section>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: ['thread']
  }
</script>

<style scoped>
  .card {
    width: auto;
    height: auto;
    min-height: 0;
    cursor: move;
    color: #333;
    border: 1px solid transparent;
  }

  .card:hover {
    background: #f7f7f7;
  }

  .card[active] {
    background: #f0f0f2;
    border-color: #aac;
  }

  .card[dragged] > * {
    visibility: hidden;
  }

  .card-content {
    width: 100%;
    box-sizing: border-box;
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
    text-align: right;
  }
</style>
