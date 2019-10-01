<template>
  <!-- SNACKBAR DE PAGAMENTO GLOBAL -->
  <v-dialog fullscreen elevation-0 persistent style="overflow: hidden" v-model="pagamento.mostrar">
    <v-container style="background: rgba(0,0,0,0.5); min-height: 100vh" fluid>
      <v-layout justify-center>
        <v-flex xs12 md6>
          <v-card class="elevation-0" style="overflow: hidden; border-radius: 6px;">
            <v-flex xs12>
              <div class="linhaSemQuebra pr-2">
                <v-btn small @click="$store.dispatch('fecha_pagamento')" icon>
                  <v-icon color="grey" size="20">arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <h4 class="font-weight-bold">Como deseja pagar?</h4>
                <v-spacer></v-spacer>
                <img style="border-radius: 6px" height="25" src="../../assets/logo.png" alt="logo" />
              </div>
            </v-flex>

            <v-divider></v-divider>

            <v-flex xs12>
              <v-layout class="bg-color pt-3 pb-3">
                <v-flex xs6>
                  <v-card
                    color="transparent"
                    @click="selecionado=1, payment_type='credit'"
                    class="pa-1 elevation-0"
                  >
                    <v-layout class="pa-2 bordered" column justify-center align-center>
                      <v-icon color="white" size="25">credit_card</v-icon>
                      <span
                        style="font-size: 10pt"
                        class="white--text font-weight-light"
                      >C R É D I T O</span>
                      <v-icon
                        size="15"
                        :color="selecionado === 1 ? 'white' : 'transparent'"
                        class="mt-3"
                      >check</v-icon>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card
                    color="transparent"
                    @click="selecionado=2, payment_type='boleto'"
                    class="pa-1 elevation-0"
                  >
                    <v-layout class="pa-2 bordered" column justify-center align-center>
                      <v-icon color="white">description</v-icon>
                      <span
                        style="font-size: 10pt"
                        class="white--text font-weight-light"
                      >B O L E T O</span>
                      <v-icon
                        size="15"
                        :color="selecionado === 2 ? 'white' : 'transparent'"
                        class="mt-3"
                      >check</v-icon>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout class="pt-3 pb-3 pr-1 pl-1">
                <v-flex xs12>
                  <v-card color="transparent" class="elevation-0">
                    <v-flex xs12>
                      <v-layout class="bordered" column justify-center align-center>
                        <label class="fonte ma-2">Detalhes do pagamento</label>
                        <v-list color="transparent" class="pa-0 ma-0" three-line>
                          <template v-for="(item, i) in pagamento.items">
                            <v-list-item small class="pa-2" :key="i">
                              <v-btn class="mr-2" small icon outlined color="green">
                                <v-icon>check</v-icon>
                              </v-btn>
                              <v-list-item-content>
                                <v-list-item-title>R$ {{ item.price }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-btn
                                  small
                                  rounded
                                  outlined
                                  text
                                  @click="alteraValor=true, itemIndex=i"
                                  color="green lighten-1"
                                  class="white--text"
                                >
                                  Editar
                                  <v-icon size="18" class="ml-2">edit</v-icon>
                                </v-btn>
                              </v-list-item-action>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-layout>
                    </v-flex>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-divider></v-divider>
            <v-tabs-items v-model="selecionado">
              <v-tab-item>
                <v-flex xs12>
                  <v-layout class="pt-3 pb-3 pr-1 pl-1">
                    <v-flex xs12>
                      <v-card color="transparent" class="elevation-0">
                        <v-layout class="bordered pa-3" column justify-center align-center>
                          <v-icon>arrow_upward</v-icon>
                          <h3
                            class="grey--text font-weight-light text-center"
                          >Selecione uma forma de pagamento acima</h3>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-tab-item>
              <v-tab-item>
                <v-flex xs12>
                  <v-layout class="pt-3 pb-3 pr-1 pl-1">
                    <v-flex xs12>
                      <v-card color="transparent" class="elevation-0">
                        <v-layout class="bordered pa-3" column justify-center align-center>
                          <label class="fonte ma-2">Dados do cartão</label>
                          <v-form ref="credit">
                            <div class="expande">
                              <label class="fonte">NÚMERO DO CARTÃO</label>
                              <v-text-field
                                v-mask="masks.credit_card"
                                :rules="rules.credit_card"
                                v-model="fields.card_number"
                                outlined
                                color="#061161"
                                flat
                                label="#### #### #### ####"
                                solo
                              ></v-text-field>
                            </div>
                            <div class="expande">
                              <v-text-field
                                :rules="rules.owner"
                                v-model="fields.holder_name"
                                outlined
                                flat
                                color="#061161"
                                label="TITULAR"
                                solo
                              ></v-text-field>
                            </div>
                            <div class="expande" style="flex-direction: row; flex-wrap: nowrap">
                              <div class="expande pr-1">
                                <label class="fonte">VALIDADE</label>
                                <v-text-field
                                  color="#061161"
                                  :rules="rules.valid"
                                  v-mask="masks.valid"
                                  v-model="fields.expiration"
                                  outlined
                                  flat
                                  label="##/##"
                                  solo
                                ></v-text-field>
                              </div>
                              <div class="expande pl-1">
                                <label class="fonte">CVV</label>
                                <v-text-field
                                  color="#061161"
                                  append-icon="credit_card"
                                  v-mask="masks.cvv"
                                  :rules="rules.cvv"
                                  v-model="fields.security_code"
                                  outlined
                                  flat
                                  label="###"
                                  solo
                                ></v-text-field>
                              </div>
                            </div>
                          </v-form>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-tab-item>
              <v-tab-item>
                <v-flex xs12>
                  <v-layout class="pt-3 pb-3 pr-1 pl-1">
                    <v-flex xs12>
                      <v-card color="transparent" class="elevation-0">
                        <v-flex xs12>
                          <v-layout class="bordered" column justify-center align-center>
                            <label class="fonte ma-2">Método de pagamento Selecionado</label>
                            <v-list color="transparent" class="pa-0 ma-0" three-line>
                              <v-list-item small class="pa-2">
                                <v-btn class="mr-2" small icon outlined color="green">
                                  <v-icon>check</v-icon>
                                </v-btn>
                                <v-list-item-content>
                                  <v-list-item-title>Boleto Selecionado</v-list-item-title>
                                  <v-list-item-subtitle>Clique no botão "Confirmar Pagamento" para gerar o boleto</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-layout>
                        </v-flex>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-tab-item>
              <v-tab-item></v-tab-item>
            </v-tabs-items>
            <v-divider></v-divider>
            <v-flex class="elevation-0" v-if="selecionado === 0 ? false : true" xs12>
              <v-btn
                color="green"
                text
                block
                class="white--text"
                @click="preparaPagamento"
              >Confirmar Pagamento</v-btn>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog width="350" v-model="alteraValor">
      <v-flex xs12>
        <v-card class="pa-2" style="border-radius: 10px">
          <h3
            class="text-uppercase text-center font-weight-bold grey--text"
          >Alterar Valor do Pagamento</h3>
          <v-divider class="mt-2"></v-divider>
          <v-text-field
            label="Informe o Novo Valor"
            prefix="R$"
            color="green"
            @keydown.enter="atualizaValorDoPagamento"
            class="ma-1"
            v-model="newPrice"
          ></v-text-field>
          <v-btn
            block
            color="green white--text"
            class="elevation-0"
            @click.prevent="atualizaValorDoPagamento"
          >Prosseguir</v-btn>
        </v-card>
      </v-flex>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { mask } from "vue-the-mask";
import axios from "axios";

export default {
  directives: {
    mask
  },
  data() {
    return {
      rules: {
        credit_card: [v => !!v || "Número do cartão obrigatório"],
        owner: [v => !!v || "Titular obrigatório"],
        valid: [v => !!v || "Validade obrigatória"],
        cvv: [v => !!v || "Código CVV obrigatório"]
      },
      masks: {
        credit_card: "################",
        valid: "##/##",
        cvv: "###",
        newPrice: ["##,##", "###,##", "####,##"]
      },
      payment_type: "",
      fields: {
        card_number: "",
        holder_name: "",
        expiration: "",
        security_code: ""
      },
      selecionado: 0,
      alteraValor: false,
      newPrice: "",
      itemIndex: ""
    };
  },
  computed: {
    pagamento() {
      return this.$store.getters.pagamento;
    }
  },
  methods: {
    atualizaValorDoPagamento() {
      const payload = {
        newValue: this.newPrice,
        position: this.itemIndex
      };
      this.$store.commit("altera_valor", payload);
      this.alteraValor = false;
    },
    fecha_pagamento() {
      if (this.selecionado === 1) {
        if (this.$refs.credit.validate()) {
          this.selecionado = 3;
        } else {
          this.$store.dispatch("snackbar_warning", "Preencha todos os campos");
        }
      } else {
        this.$store.commit("fecha_pagamento");
      }
    },
    preparaPagamento() {
      let data;

      const mes_ano = this.fields.expiration.split("/");

      if (this.payment_type === "credit") {
        if (this.$refs.credit.validate()) {
          data = {
            payment_type: "credit",
            holder_name: this.fields.holder_name,
            card_number: this.fields.card_number,
            expiration_month: mes_ano[0],
            expiration_year: `20${mes_ano[1]}`,
            security_code: this.fields.security_code,
            items: this.$store.getters.pagamento.items,
            recipient_user_id: `${this.$store.getters.pagamento.recipient_user_id}`,
            sender_user_id: `${this.$store.getters.pagamento.sender_user_id}`,
            chat_id: this.$store.getters.pagamento.chat_id
          };
          this.efetuaPagamento(data);
        } else {
          this.$store.dispatch("snackbar_info", "Preencha todos os campos");
        }
      } else if (this.payment_type === "boleto") {
        data = {
          payment_type: "boleto",
          items: this.$store.getters.pagamento.items,
          recipient_user_id: this.$store.getters.pagamento.recipient_user_id,
          sender_user_id: this.$store.getters.pagamento.sender_user_id,
          chat_id: this.$store.getters.pagamento.chat_id
        };
        this.efetuaPagamento(data);
      } else {
        this.$store.dispatch("snackbar_error", "Forma de pagamento inválida");
      }
    },
    efetuaPagamento(data) {
      this.$store.commit("setVueLoad", true);
      console.log("data:", data);
      console.log("ID:", this.pagamento.diligence_id);
      console.log("token:", this.$store.getters.getToken);
      axios
        .post(
          `${this.$store.getters.api}/api/v1/diligence/sent/${this.pagamento.diligence_id}/payment`,
          data,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch(
            "snackbar_success",
            "Pagamento efetuado com sucesso"
          );
          this.$store.commit("fecha_pagamento");
        })
        .catch(e => {
          console.log(e);
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch("snackbar_error", e);
        });
    }
  }
};
</script>

<style>
.bordered {
  border: 1px solid #f2f2f2;
}
.altura {
  height: 10px;
}
.bg-color {
  background-image: linear-gradient(to right, #780206, #061161);
  opacity: 0.9;
}
.expande {
  display: flex;
  width: 100%;
  flex-direction: column;
  box-shadow: none;
}
.fonte {
  font-size: 10pt;
  color: grey;
  margin-left: 2px;
}
.pagamento {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>