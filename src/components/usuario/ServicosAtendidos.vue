<template>
  <div class="expandeDiv">
    <v-flex xs12 >
      <v-toolbar dense class="elevation-3">
        <h3 class="text-xs-center">Serviços Atendidos</h3>
      </v-toolbar>
    </v-flex>
    {{ itemsSelecionados }}
    <v-layout justify-center>
      <v-flex class="pa-2" xs12>
        <v-card class="arredondaBorda">
          <div class="expandeDiv">
            <v-combobox
              :items="items"
              v-model="itemsSelecionados"
              return-object
              item-value="service"
              item-text="service"
              :hide-selected="true"
              label="Serviços Atendidos"
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
            <v-btn to="/home/usuario/cidades-atendidas" block color="green" class="white--text">Ir Para Cidades Atendidas
              <v-icon color="white" class="ml-1">arrow_forward</v-icon>
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
    pegaItemsSeecionados() {
      const token = sessionStorage.token

      const recuperaLogin = JSON.parse(sessionStorage.usuario)
      const id = recuperaLogin.id

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.get('https://central-oportunidades.herokuapp.com/api/v1/users/services/' + id, headers)
        .then(res => {
          const ids_marcados = res.data.services
          const todos = this.items
          let itemsMarcados = []

          todos.map(item => {
            ids_marcados.map(i => {
              if(i.id === item.id) {
                itemsMarcados.push(item)
              }
            })
          })

          this.itemsSelecionados = itemsMarcados

        })
    },
    pegaDados() {
      const token = sessionStorage.token

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.get('https://central-oportunidades.herokuapp.com/api/v1/services', headers)
        .then(res => {
          this.items = res.data
        })
      this.pegaItemsSeecionados()
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
        service_id: service_id
      }

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      axios.put('https://central-oportunidades.herokuapp.com/api/v1/users/services/' + id, atualizacao, headers)
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
 