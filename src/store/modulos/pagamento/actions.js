export const actionsPagamento = {
  /*
  * Este método deve ser chamado para abrir o modal de pagamento dessa forma this.$store.dispatch('abreServico', payload)
  *
  * O payload deve conter = {
  *     
  * }
  */
  abre_pagamento({ commit }, payload) {
    commit('abre_pagamento', payload);
  },

  fecha_pagamento({ commit }) {
    commit('fecha_pagamento');
  },

  /*
  * Este método deve ser chamado para efetuar o pagamento de um serviço dessa forma this.$store.dispatch('pagar', payload)
  */
  pagar({commit}, payload) {
    console.log('teste1', this.store.getters.api)
    switch(payload.type) {
      case 'servico':
          return commit('pagar_servico', payload)
          break;
      case 'duvida':
          return commit.pagar_servico(payload)
          break;
      case 'assinatura':
          return commit.pagar_assinatura(payload)
          break;
      default:
          return dispatch('snackbar_info', 'informe o tipo de pagamento')
          break;
    }
  },

  /*
  * Este método ativa uma option para true or false
  *
  * chamada: this.$router.dispatch('change_option', item, index)
  */
  change_option({commit}, payload) {
    commit('change_option', payload)
  },

  pagar_duvida(state, payload) {

  },

  pagar_assinatura(state, payload) {

  }
  
};

export default {};
