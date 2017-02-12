<template>
  <div class="board">
    <div class="board-content">
      <div class="columns">
        <!--<div class="columns-header">-->
          <!--<div v-for="column in columns" class="column-header">{{ column.name }}</div>-->
        <!--</div>-->

        <div class="columns-content">
          <board-column v-for="column in columns" :column="column"></board-column>
        </div>
      </div>

      <div class="preview">
        <div class="preview-content">
          <thread-preview></thread-preview>
        </div>
      </div>
    </div>

    <board-card v-if="draggedThread" :thread="draggedThread" :style="cardStyle"
                style="position: absolute; pointer-events: none;"></board-card>
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

      cardStyle() {
        return {
          width: `${this.draggedThreadCard.width}px`,
          height: `${this.draggedThreadCard.height}px`,
          left: `${this.draggedThreadCard.left}px`,
          top: `${this.draggedThreadCard.top}px`
        }
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

  .columns {
    overflow: auto;
    flex-grow: 1;
    height: 100%;
  }

  .columns-content {
    display: flex;
    justify-content: space-between;
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

  .quick-filters {
    padding: 0 10px;
  }

  .quick-filters-label {
    color: #707070;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.66666666666667;
    text-transform: uppercase;
  }

  .quick-filter {
    border: 1px solid transparent;
    -webkit-border-radius: 3px 3px 3px 3px;
    border-radius: 3px 3px 3px 3px;
    display: inline-block;
    line-height: 1;
    margin: 0 5px 0 0;
    padding: 7px 10px;
  }

  .quick-filter:hover {
    border-color: #ccc;
    text-decoration: none;
    cursor: pointer;
  }
</style>
