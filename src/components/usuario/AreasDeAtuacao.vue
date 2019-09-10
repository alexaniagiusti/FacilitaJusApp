<template>
  <v-container fluid>
    <v-alert prominent type="warning">
      <v-row align="center">
        <v-col>Marque as áreas de atuação para receber as dúvidas júridicas!</v-col>
      </v-row>
    </v-alert>
    <v-layout class="arredondaBorda" ma-2 pa-2 elevation-2 row wrap>
      <v-flex xs12 md4 v-for="area in items" :key="area.id">
        <v-checkbox v-model="itemsSelecionados" :label="area.actuation" :value="area.id"></v-checkbox>
      </v-flex>

      <v-flex xs12>
        <v-btn block class="green white--text" @click="salvar">Salvar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      itemsSelecionados: []
    };
  },
  watch: {
    //itemsSelecionados() {this.salvar()}
  },
  methods: {
    pegaItemsSelecionados() {
      this.$store.commit("setVueLoad", true);
      axios
        .get(
          `${this.$store.getters.api}/api/v1/users/actuations/${this.$store.getters.getUsuario.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          const ids_marcados = res.data.actuations;
          const todos = this.items;
          const itemsMarcados = [];

          todos.map(item => {
            ids_marcados.map(i => {
              if (i.id === item.id) {
                itemsMarcados.push(item.id);
              }
            });
          });
          this.itemsSelecionados = itemsMarcados;
          this.carregandoDados = false;
        });
    },
    pegaDados() {
      this.$store.commit("setVueLoad", true);
      axios
        .get(this.$store.getters.api + "/api/v1/actuations", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.items = res.data;
        })
        .catch(erro => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch("snackbar_error", "Erro: " + erro);
        });
      this.pegaItemsSelecionados();
    },
    salvar() {
      this.$store.commit("setVueLoad", true);
      this.carregandoSalvar = true;

      const data = {
        actuation_id: this.itemsSelecionados
      };

      axios
        .put(
          `${this.$store.getters.api}/api/v1/users/actuations/${this.$store.getters.getUsuario.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.carregandoSalvar = false;
          this.$store.dispatch("snackbar_success", "Salvo com sucesso!");
        })
        .catch(err => {
          this.$store.commit("setVueLoad", false);
          this.carregandoSalvar = false;
          this.$store.dispatch("snackbar_error", err);
        });
    }
  },
  mounted() {
    this.pegaDados();
    this.pegaItemsSelecionados();
  }
};
</script>

<style>
.arredondaBorda {
  border-radius: 6px;
  padding: 10px;
}
</style>