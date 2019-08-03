<template>
  <div class="expandeDiv">
    <v-flex xs12 >
      <v-toolbar dense class="elevation-3">
        <h3 class="text-xs-center">Áreas de Atuação</h3>
      </v-toolbar>
    </v-flex>
    <v-layout justify-center>
      <v-flex class="pa-2" xs12>
        <v-card class="arredondaBorda">
          <div class="expandeDiv">
            <v-combobox
              :items="items"
              v-model="itemsSelecionados"
              return-object
              item-value="actuation"
              item-text="actuation"
              :hide-selected="true"
              label="Áreas De Atuação"
              :multiple="true"
              :small-chips="true"
              :clearable="true"
            />

          </div>
        </v-card>
        <v-flex xs12>
          <div class="linhaSemQuebra">
            <v-btn @click="salvar" block color="green" class="white--text mr-2">Salvar
              <v-icon color="white" size="18" class="ml-1">save</v-icon>
              <v-progress-circular class="ml-1" indeterminate size="18" color="white" v-if="carregandoSalvar"></v-progress-circular>
            </v-btn>
          </div>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      itemsSelecionados: [],
      carregandoSalvar: false
    }
  },
  methods: {
    pegaDados() {
      const token = sessionStorage.token

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.get('https://central-oportunidades.herokuapp.com/api/v1/actuations', headers)
        .then(res => {
          this.items = res.data
        })
    },
    salvar() {
      this.carregandoSalvar = true
      const token = sessionStorage.token
      const recuperaLogin = JSON.parse(sessionStorage.usuario)
      const id = recuperaLogin.id
      
      let service_id = []
      const itemsSelecionados = this.itemsSelecionados
      itemsSelecionados.map(item => service_id.push(item.id))

      const atualizacao = {
        actuation_id: service_id
      }

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      axios.put('https://central-oportunidades.herokuapp.com/api/v1/actuations/' + id, atualizacao, headers)
      .then((res) => {
        this.carregandoSalvar = false
        this.$store.dispatch('snackbar_success', 'Atualizado Com Sucesso!.')
      })
      .catch ( (err) => {
        this.carregandoSalvar = false
        this.$store.dispatch('snackbar_error', err)
      })
    }
  },
  created() {
    this.pegaDados()
  }
}
</script>
 
<style>
  .arredondaBorda {
    border-radius: 6px;
    padding: 10px;
  }
</style>
  