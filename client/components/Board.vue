<template>
  <div class="board">
    <div class="board-content">
      <div class="board-columns-wrapper">
        <div class="columns">
          <board-column v-for="column in columns" :column="column"></board-column>
        </div>
      </div>

      <div class="preview">
        <div class="preview-content">
          <thread-preview></thread-preview>
        </div>
      </div>
    </div>

    <board-card v-if="draggedThread" :thread="draggedThread" :style="draggedCardStyle"
                class="dragged-thread-card"></board-card>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as Gmail from '../services/Gmail'

  import * as store from '../store'
  import * as dragStateStore from '../store/dragState'

  import BoardColumn from './BoardColumn.vue'
  import BoardCard from './BoardCard.vue'
  import ThreadPreview from './ThreadPreview.vue'

  export default {
    components: {BoardColumn, BoardCard, ThreadPreview},

    computed: {
      ...mapGetters({
        columns: store.COLUMNS,
        draggedThread: dragStateStore.DRAGGED_THREAD,
        draggedThreadCard: dragStateStore.DRAGGED_THREAD_CARD_BOX
      }),

      draggedCardStyle() {
        return {
          width: `${this.draggedThreadCard.width}px`,
          height: `${this.draggedThreadCard.height}px`,
          left: `${this.draggedThreadCard.left}px`,
          top: `${this.draggedThreadCard.top}px`
        };
      }
    }
  }
</script>

<style scoped>
  .board {
    box-sizing: border-box;
    height: 100%;
    background: #fcfcfc;
  }

  .board-content {
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    padding-top: 40px;
  }

  .board-columns-wrapper {
    height: 100%;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
  }

  .columns {
    display: flex;
    justify-content: space-between;
    min-height: 100%;
  }
  .preview {
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 500px;
    display: flex;
    height: 100%;
    overflow: auto;
    background: #f7f7f7;
  }

  @media (max-width: 1000px) {
    .preview {
      flex-basis: 0;
    }
  }


  .preview-content {
    width: 100%;
    box-sizing: border-box;
  }

  .dragged-thread-card {
    position: absolute;
    pointer-events: none;
  }
</style>
