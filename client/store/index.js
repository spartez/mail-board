import Vue from 'vue'
import Vuex from 'vuex'
import * as Gmail from '../services/Gmail'
import dragState from './dragState'

Vue.use(Vuex);

export const IS_SIGNED_IN = 'store/isSignedIn';
export const COLUMNS = 'store/columns';
export const LOAD_ALL_THREADS = 'store/loadAllThreads';
export const LOAD_SINGLE_THREAD = 'store/loadSingleThread';

export const HAS_ACTIVE_THREAD = 'store/hasActiveThread';
export const ACTIVE_THREAD = 'store/activeThread';
export const SET_ACTIVE_THREAD = 'store/activateThread';

export const SEND_RESPONSE = 'store/sendResponse';

const store = new Vuex.Store({
  state: {
    isSignedIn: false,
    columns: [
      {id: 0, name: 'New', threads: []},
      {id: 1, name: 'Needs attention', threads: []},
      {id: 2, name: 'Waiting for answer', threads: []},
      {id: 3, name: 'Closed', threads: []}
    ],
    activeThread: null,
  },

  getters: {
    [IS_SIGNED_IN]: state => state.isSignedIn,

    [HAS_ACTIVE_THREAD]: state => state.activeThread != null,
    [ACTIVE_THREAD]: state => state.activeThread,

    [COLUMNS]: state => state.columns
  },

  mutations: {
    signedInStatusChanged(state, isSignedIn) {
      state.isSignedIn = isSignedIn;
    },

    setActiveThread(state, thread) {
      state.activeThread = thread;
    },

    addThreadToColumn(state, {thread, column}) {
      column.threads.unshift(thread);
    }
  },

  actions: {
    [LOAD_ALL_THREADS]({dispatch}) {
      Gmail.listThreads('newer_than:4d').then(threads => {
        threads.forEach(thread => dispatch(LOAD_SINGLE_THREAD, thread.id));
      });
    },

    [LOAD_SINGLE_THREAD]({state, commit}, threadId) {
      Gmail.getThread(threadId).then(thread => {
        const column = state.columns[localStorage.getItem(`thread-column-${threadId}`) || 0];
        commit('addThreadToColumn', {thread, column});
      });
    },

    [SET_ACTIVE_THREAD]({commit}, thread) {
      return Gmail.getThread(thread.id, true).then(thread => {
        commit('setActiveThread', thread);
      });
    },

    [SEND_RESPONSE]({}, {thread, response}) {
      return Gmail.sendMessage(thread.id, 'Re: ' + thread.subject, 'mateusz.zielinski@spartez.com', response);
    }
  },

  modules: {dragState},
  strict: true
});

Gmail.addSignInStatusChangedHandler(isSignedIn => {
  store.commit('signedInStatusChanged', isSignedIn);
  if (isSignedIn) {
    store.dispatch(LOAD_ALL_THREADS);
  }
});

export default store
