<template>
  <div class="expandeDiv" style="flex-direction: column">
    <v-flex xs12 >
      <v-toolbar dense class="elevation-3">
        <div class="linhaSemQuebra">
          <h3 class="text-xs-center">Cidades Atendidas</h3>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat to="/home/usuario/areas-de-atuacao" icon>
                <v-icon class="animated delay-1s infinite heartBeat" color="green">
                  arrow_forward
                </v-icon>
              </v-btn>
            </template>
            <span>Áreas de Atuação</span>
          </v-tooltip>
        </div>
      </v-toolbar>
    </v-flex>
    <v-layout>
      <v-flex xs12>  
        <v-list pa-0 ma-0>
          <template v-for="(cidadesAtendidas, index) in itemsSelecionados">
            <v-list-tile @click="" :key="cidadesAtendidas.city">
              <v-avatar class="ml-1">
                <v-icon color="green">done</v-icon>
              </v-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ cidadesAtendidas.city }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="red" icon @click="removeItem(cidadesAtendidas.id)">
                  <v-icon size="18" color="white">
                    delete
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex class="pa-2" xs12>
        <v-card class="arredondaBorda">
          <div class="expandeDiv">
            <v-combobox
              :items="items"
              v-model="itemsSelecionados"
              return-object
              item-value="city"
              item-text="city"
              :hide-selected="true"
              label="Cidades Atendidas"
              :multiple="true"
              :small-chips="true"
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
    removeItem(id) {
      const selecionados = this.itemsSelecionados
      let novos = []

      selecionados.map(item => {
        if(item.id === id) {
        } else {
          novos.push(item)
        }
      })

      this.itemsSelecionados = novos
    },
    pegaItemsSeecionados() {
      const token = sessionStorage.token

      const recuperaLogin = JSON.parse(sessionStorage.usuario)
      const id = recuperaLogin.id

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.get('https://central-oportunidades.herokuapp.com/api/v1/users/cities/' + id, headers)
        .then(res => {
          const ids_marcados = res.data.cities
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
      axios.get('https://central-oportunidades.herokuapp.com/api/v1/cities', headers)
        .then(res => {
          this.items = res.data
          this.pegaItemsSeecionados()
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

      const data = {
        city_id: service_id
      }

      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      axios.put('https://central-oportunidades.herokuapp.com/api/v1/users/cities/' + id, data, headers)
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
 