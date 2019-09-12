export const mutationsPagamento = {
  abre_pagamento(state) {
    state.pagamento.mostrar = true;
  },
  fecha_pagamento(state) {
    state.pagamento.mostrar = false;
  },
};

export default {};
