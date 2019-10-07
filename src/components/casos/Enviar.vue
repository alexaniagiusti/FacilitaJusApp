<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar class="toolbarForm">
        <v-spacer></v-spacer>
        <span class="font-weight-light title">
          Envie sua dúvida jurídica:
        </span>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <v-card class="pa-3">
      <v-form ref="formCase">
        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              :rules="rules.name"
              required
              label="Nome:"
              v-model="name"
              placeholder="Qual o seu nome?"
              >
            </v-text-field>
          </v-flex>
    
          <v-flex xs12 md4 pa-2>
            <v-text-field
              :rules="rules.phone"
              required
              label="Celular:"
              v-model="phone"
              placeholder="Qual o seu celular?"
              v-mask="masktelefone"
              >

          </v-text-field>
        </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              :rules="rules.email"
              required
              autocomplete="new-email"
              label="E-mail:"
              v-model="email"
              placeholder="Qual o seu e-mail?"
              >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>

          <v-flex xs12 md6 pa-2>
            <v-autocomplete
              :rules="rules.duvida"
              required
              autocomplete="new-case"
              return-object
              label="Tipo de dúvida:"
              :items="actuations"
              v-model="actuationSelected"
              item-value="id"
              item-text="actuation"
              hide-no-data
              placeholder="Qual a sua dúvida?"
              />

          </v-flex>
          <v-flex xs12 md6 pa-2>
          <v-autocomplete
                :rules="rules.city"
                required
                autocomplete="new-city"
                v-model="citySelected"
                :items="cities"
                hide-no-data
                return-object
                label="Cidade"
                placeholder="Cidade"
                item-text="city"
                item-value="id"
              >
                <template v-slot:selection="data">
                    {{ data.item.city }} - {{ data.item.state }}
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item.city"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar class="elevation-1">
                      <v-icon>place</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.city"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.state"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 md12 pa-2>
            <v-textarea
              :rules="rules.duvida"
              required
              v-model="message"
              label="Explique melhor a sua dúvida:"
            >

            </v-textarea>
          </v-flex>


          <v-flex xs12 md12 pa-2>
            <v-btn
              block
              color="green"
              @click="sendCase"
            >
              <span class="font-weight-bold white--text">Enviar</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import { mask } from 'vue-the-mask'


export default {
  directives: {
    mask
  },
  data() {
    return {
      rules: {
        name: [v => !!v || 'Preencha o nome'],
        phone: [v => !!v || 'Insira um número de telefone'],
        email: [v => !!v || 'Insira o seu e-mail'],
        duvida: [v => !!v || 'Selecione qual o tipo da sua dúvida'],
        city: [v => !!v || 'Selecione em qual cidade você está'],
        duvida: [v => !!v || 'Fale mais sobre a sua dúvida'],
      },

      masktelefone: '(##) # #### ####',
      name: '',
      phone: '',
      email: '',
      message: '',
      cities: [],
      citySelected: '',
      actuations: [],
      actuationSelected: '',
    }
  },
  methods: {
    getActuations() {
      axios.get(this.$store.getters.api + '/api/v1/actuations',{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }})
        .then(res => this.actuations = res.data)
    },

    getCities() {
      axios.get(this.$store.getters.api + '/api/v1/cities',{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }})
        .then(res => this.cities = res.data)
    },
    sendCase() {
      if (this.$refs.formCase.validate()) {
        this.$store.commit('setVueLoad', true)
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.message,
        actuation_id: this.actuationSelected.id,
        city_id: this.citySelected.id,
      }

      console.log(data)

      axios.post(`${this.$store.getters.api}/api/v1/legal-cases`, data, { headers: { 'Authorization' : `Bearer ${this.$store.getters.getToken}`}})
        .then(() => {
          this.$store.commit('setVueLoad', false)
          this.$store.dispatch('snackbar_success', 'Caso enviado com sucesso')
        })
        .catch((erro) => {
          this.$store.commit('setVueLoad', false)
          this.$store.dispatch('snackbar_error', 'Erro, tente novamente' + erro)
        })
      } else {
        this.$store.dispatch('snackbar_error', 'Preencha todos os campos corretamente')
      }
    }
  },
  created() {
    this.name = this.$store.getters.getUsuario.name
    this.phone = this.$store.getters.getUsuario.phone_1
    this.email = this.$store.getters.getUsuario.email
  
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getActuations()
    this.getCities()
  }
}
</script>