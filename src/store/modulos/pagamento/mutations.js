export const mutationsPagamento = {
  abre_pagamento(state, payload) {
    const items = [...state.pagamento.items, payload.item];
    state.pagamento.items = items;
    state.pagamento.recipient_user_id = payload.recipient_user_id || 'sem';
    state.pagamento.sender_user_id = payload.sender_user_id || 'sem';
    state.pagamento.chat_id = payload.chat_id || 'sem';
    state.pagamento.diligence_id = payload.diligence_id || 'sem';
    state.pagamento.pode_editar = payload.pode_editar;
    state.pagamento.mostrar = true;
  },
  fecha_pagamento(state) {
    state.pagamento.mostrar = false;
    (state.pagamento.items = []),
      (state.pagamento.recipient_user_id = ""),
      (state.pagamento.sender_user_id = ""),
      (state.pagamento.chat_id = "");
  },
  add_item(state, item) {
    const items = [...state.pagamento.items, item];
    state.pagamento.items = items;
  },
  altera_valor(state, payload) {
    const itemsAntigos = state.pagamento.items;
    let itemsNovos = [];
    itemsAntigos.map((item, index) => {
      if (index === payload.position) {
        item.price = parseFloat(payload.newValue);
      }
      itemsNovos.push(item);
    });
    state.pagamento.items = itemsNovos;
  }
};

export default {};
