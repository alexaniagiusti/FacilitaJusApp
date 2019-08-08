import Vue from 'vue';
import Vuex from 'vuex';

import { stateDiligencias } from './modulos/diligencias/state'
import { actionsDiligencias } from './modulos/diligencias/actions'
import { mutationsDiligencias } from './modulos/diligencias/mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    diligencias: {
      state: {
        ...stateDiligencias
      },
      actions: {
        ...actionsDiligencias
      },
      mutations: {
        ...mutationsDiligencias
      }
    }
  },
  state: {
    snackbar_error: {
      mostrar: false,
      mensagem: '',
    },
    snackbar_success: {
      mostrar: false,
      mensagem: '',
    },
  },
  mutations: {
    desativa_snackbar(state) {
      state.snackbar_success = {
        mostrar: false,
        mensagem: '',
      };
      state.snackbar_error = {
        mostrar: false,
        mensagem: '',
      };
    },
    snackbar_error(state, mensagem) {
      state.snackbar_error = {
        mostrar: true,
        mensagem,
      };
    },
    snackbar_success(state, mensagem) {
      state.snackbar_success = {
        mostrar: true,
        mensagem,
      };
    }
  },
  actions: {
    desativa_snackbar(state) {
      state.commit('desativa_snackbar');
    },
    // chama a mutation snackbar_error
    snackbar_error(state, mensagem) {
      state.commit('snackbar_error', mensagem);
    },
    // chama a mutation snackbar_success
    snackbar_success(state, mensagem) {
      state.commit('snackbar_success', mensagem);
    },
  },
  getters: {
    snackbar_success(state) {
      return state.snackbar_success
    },
    snackbar_error(state) {
      return state.snackbar_error
    },
    api() {
      return 'http://facilitajus.com'
    }
  },
});
