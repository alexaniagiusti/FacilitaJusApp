<template>
  <div>
    <v-layout>
      <v-flex>
        <v-toolbar flat color="white" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-light black--text">
            Diligências Recebidas
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-divider></v-divider>

        <v-tabs class="hidden-sm-and-down" grow v-model="tab">
          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Em aberto
          </v-tab>

          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Respondidas
          </v-tab>

          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Em Negociação
          </v-tab>

          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Finalizadas
          </v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <DiligenciasEmAberto/>
          </v-tab-item>

          <v-tab-item>
            
          </v-tab-item>

          <v-tab-item>
            3
          </v-tab-item>

          <v-tab-item>
            4
          </v-tab-item>
        </v-tabs-items>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DiligenciasEmAberto from './recebidas/DiligenciasEmAberto.vue'

export default {
  components: {
    DiligenciasEmAberto
  },
  data() {
    return {
      tab: 0,
    }
  }
};
</script>

<style>
  .coluna {
    display: flex;
    flex-direction: column;
  }
  .chat {
    display: flex;
    width:100%;
    height: 100vh;
    background: #fff;
  }
</style>
