<template>
  <!-- SNACKBAR DE PAGAMENTO GLOBAL -->
  <v-dialog width="300" persistent style="overflow: hidden" v-model="pagamento.mostrar">
    <v-card style="overflow: hidden; border-radius: 6px;" width="400">
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
            <v-card color="transparent" @click="selecionado=1" class="pa-1 elevation-0">
              <v-layout class="pa-2 bordered" column justify-center align-center>
                <v-icon color="white" size="25">credit_card</v-icon>
                <span style="font-size: 10pt" class="white--text font-weight-light">C R É D I T O</span>
                <v-icon
                  size="15"
                  :color="selecionado === 1 ? 'green' : 'grey lighten-3'"
                  class="mt-3"
                >check</v-icon>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card color="transparent" @click="selecionado=2" class="pa-1 elevation-0">
              <v-layout class="pa-2 bordered" column justify-center align-center>
                <v-icon color="white">description</v-icon>
                <span style="font-size: 10pt" class="white--text font-weight-light">B O L E T O</span>
                <v-icon
                  size="15"
                  :color="selecionado === 2 ? 'green' : 'grey lighten-3'"
                  class="mt-3"
                >check</v-icon>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-tabs-items v-model="selecionado">
        <v-tab-item></v-tab-item>
        <v-tab-item>
          <v-flex xs12>
            <v-layout class="pt-3 pb-3 pr-1 pl-1">
              <v-flex xs12>
                <v-card color="transparent" class="elevation-0">
                  <v-layout class="bordered pa-3" column justify-center align-center>
                    <div class="expande">
                      <label class="fonte">NÚMERO DO CARTÃO</label>
                      <v-text-field outlined flat label="#### #### #### ####" solo></v-text-field>
                    </div>
                    <div class="expande">
                      <v-text-field outlined flat label="TITULAR" solo></v-text-field>
                    </div>
                    <div class="expande" style="flex-direction: row; flex-wrap: nowrap">
                      <div class="expande pr-1">
                        <label class="fonte">VALIDADE</label>
                        <v-text-field outlined flat label="##/##" solo></v-text-field>
                      </div>
                      <div class="expande pl-1">
                        <label class="fonte">CVV</label>
                        <v-text-field outlined flat label="###" solo></v-text-field>
                      </div>
                    </div>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-tab-item>
        <v-tab-item>Boleto</v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs-items>
      <v-divider></v-divider>
      <v-flex class="elevation-1" v-if="selecionado === 0 ? false : true" xs12>
        <v-btn color="green" text block class="white--text" @click="fecha_pagamento">Prosseguir</v-btn>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      selecionado: 0
    };
  },
  computed: {
    pagamento() {
      return this.$store.getters.pagamento;
    }
  },
  methods: {
    fecha_pagamento() {
      this.$store.commit("fecha_pagamento");
    }
  }
};
</script>

<style>
.bordered {
  border: 1px solid #d3d3d3;
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
}
.fonte {
  font-size: 10pt;
  color: grey;
  margin-left: 2px;
}
</style>