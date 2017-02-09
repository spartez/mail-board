<template>
  <div class="column">
    <div v-for="(thread, $index) in column.threads" :key="thread.id">
      <div class="card-wrapper card-placeholder" v-if="dragTargetColumn === column && dragTargetRank === $index">
        <board-card :thread="draggedThread"></board-card>
      </div>

      <div class="card-wrapper"
           @mousedown="onMouseDownOnCard($event, $index)"
           @mousemove="onMouseMoveOverCard($event, $index)">
        <board-card class="board-card" :thread="thread"></board-card>
      </div>
    </div>

    <template>
      <div class="card-placeholder" v-if="dragTargetColumn === column && dragTargetRank === column.threads.length">
        <board-card :thread="draggedThread"></board-card>
      </div>
      <div @mousemove="onMouseMoveOverColumn" class="column-fill"></div>
    </template>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as store from '../store'
  import * as dragStateStore from '../store/dragState'
  import BoardCard from './BoardCard.vue'

  export default {
    components: {BoardCard},
    props: ['column'],
    computed: {
      ...mapGetters({
        isDragging: dragStateStore.IS_DRAGGING,
        draggedThread: dragStateStore.DRAGGED_THREAD,
        dragTargetColumn: dragStateStore.DRAG_TARGET_COLUMN,
        dragTargetRank: dragStateStore.DRAG_TARGET_RANK
      })
    },
    methods: {
      ...mapActions({
        startDragging: dragStateStore.START_DRAGGING,
        endDragging: dragStateStore.END_DRAGGING,
        updateDragGhost: dragStateStore.UPDATE_DRAG_GHOST,
        updateDragPosition: dragStateStore.UPDATE_DRAG_POSITION
      }),

      onMouseDownOnCard(originalEvent, rank) {
        const elementBox = originalEvent.currentTarget.getBoundingClientRect();

        const onDragMove = event => {
          if (event.buttons % 2 !== 1) {
            return onDrop();
          }

          if (!this.isDragging) {
            this.startDragging({column: this.column, rank})
          }

          this.updateDragGhost({
            width: elementBox.width,
            height: elementBox.height,
            left: event.clientX + elementBox.left - originalEvent.clientX,
            top: event.clientY + elementBox.top - originalEvent.clientY
          })
        }

        const onDrop = () => {
          document.body.removeEventListener("mousemove", onDragMove)
          document.body.removeEventListener("mouseup", onDrop)

          if (this.isDragging) {
            this.endDragging();
          }
        }

        document.body.addEventListener("mousemove", onDragMove)
        document.body.addEventListener("mouseup", onDrop)
        originalEvent.preventDefault()
      },

      onMouseMoveOverCard(originalEvent, rank) {
        if (!this.isDragging) {
          return;
        }

        const elementBox = originalEvent.currentTarget.getBoundingClientRect();
        const isAfter = originalEvent.clientY > elementBox.top + elementBox.height / 2;
        this.updateDragPosition({column: this.column, rank: rank + (isAfter ? 1 : 0)});
      },

      onMouseMoveOverColumn() {
        if (this.isDragging) {
          this.updateDragPosition({column: this.column, rank: this.column.threads.length});
        }
      }
    }
  }
</script>

<style scoped>
  .column {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #f5f5f5;
    margin: 0 5px;
    padding: 5px 5px 0 5px;
    flex-grow: 1;
    width: 0;
  }

  .column-fill {
    flex-grow: 1;
  }

  .card-wrapper {
    margin-bottom: 5px;
  }

  .card-placeholder {
    background: #e6e6e6;
    border-radius: 3px;
  }

  .card-placeholder > * {
    visibility: hidden;
  }
</style>
