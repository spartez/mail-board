export const IS_DRAGGING = 'dragState/isDragging';

export const DRAGGED_THREAD = 'dragState/draggedThread';
export const DRAGGED_THREAD_CARD_BOX = 'dragState/draggedThreadCard';
export const DRAG_TARGET_COLUMN = 'dragState/dragTargetColumn';
export const DRAG_TARGET_RANK = 'dragState/dragTargetPosition';

export const START_DRAGGING = 'dragState/startDragging';
export const END_DRAGGING = 'dragState/endDragging';
export const UPDATE_DRAG_GHOST = 'dragState/updateDragGhost';
export const UPDATE_DRAG_POSITION = 'dragState/updateDragPosition';

export default {
  state: {
    thread: null,

    source: {
      column: null,
      rank: null
    },

    target: {
      column: null,
      rank: null
    },

    box: {
      top: null,
      left: null,
      width: null,
      height: null
    }
  },

  getters: {
    [IS_DRAGGING]: state => state.thread !== null,
    [DRAGGED_THREAD]: (state) => state.thread,

    [DRAGGED_THREAD_CARD_BOX]: (state) => state.box,

    [DRAG_TARGET_COLUMN]: state => state.target.column,
    [DRAG_TARGET_RANK]: state => state.target.rank,
  },

  actions: {
    [START_DRAGGING]({commit}, params) {
      commit('startDragging', params)
    },

    [END_DRAGGING]({commit}) {
      commit('commitDragState');
    },

    [UPDATE_DRAG_GHOST]({commit}, params) {
      commit('updateDragGhost', params);
    },

    [UPDATE_DRAG_POSITION]({commit}, params) {
      commit('updateDragPosition', params);
    }
  },

  mutations: {
    startDragging(state, {column, rank}) {
      state.thread = column.threads[rank];
      state.source.rank = rank;
      state.source.column = column;
      state.target.rank = rank;
      state.target.column = column;

      column.threads.splice(rank, 1)
    },

    updateDragGhost(state, {top, left, width, height}) {
      state.box.top = top;
      state.box.left = left;
      state.box.width = width;
      state.box.height = height
    },

    updateDragPosition(state, {column, rank}) {
      state.target.rank = rank;
      state.target.column = column
    },

    commitDragState(state) {
      state.target.column.threads.splice(state.target.rank, 0, state.thread);

      localStorage.setItem(`thread-column-${state.thread.id}`, state.target.column.id);
      localStorage.setItem(`column-order-${state.target.column.id}`, JSON.stringify(state.target.column.threads.map(thread => thread.id)));

      state.target.column = null;
      state.target.rank = null;

      state.thread = null
    }
  }
}
