export const actionsPagamento = {
  abre_pagamento({ commit }, payload) {
    commit('abre_pagamento', payload);
  },
  fecha_pagamento({ commit }) {
    commit('fecha_pagamento');
  },
};

export default {};
