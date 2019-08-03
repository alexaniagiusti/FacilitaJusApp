import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    nomeDoApp: 'FacilitaJus',
    snackbar_error: {
      mostrar: false,
      mensagem: ''
    },
    snackbar_success: {
      mostrar: false,
      mensagem: ''
    }
  },
  mutations: {
    drawer(state) {
      state.drawer = !state.drawer
    },
    desativa_snackbar(state) {
      state.snackbar_success = {
        mostrar: false,
        mensagem: ''
      }
      state.snackbar_error = {
        mostrar: false,
        mensagem: ''
      }
    },
    snackbar_error(state, mensagem) {
      state.snackbar_error = {
        mostrar: true,
        mensagem: mensagem
      }
    },
    snackbar_success(state, mensagem) {
      state.snackbar_success = {
        mostrar: true,
        mensagem: mensagem
      }
    }
  },
  actions: {
    drawer(state) {
      state.commit('drawer')
    },
    desativa_snackbar(state, mensagem) {
      state.commit('desativa_snackbar')
    },
    //chama a mutation snackbar_error
    snackbar_error(state, mensagem) {
      state.commit('snackbar_error', mensagem)
    },
    //chama a mutation snackbar_success
    snackbar_success(state, mensagem) {
      state.commit('snackbar_success', mensagem)
    }
  },
  getters: {
    nomeDoApp(state) {
      return state.nomeDoApp
    },
    drawer(state) {
      return state.drawer
    },
    snackbar_error(state) {
      return state.snackbar_error
    },
    snackbar_success(state) {
      return state.snackbar_success
    }
  }
});
