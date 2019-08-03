<template>
  <div class="expandeDiv">
    <v-flex xs12 >
      <v-toolbar dense class="elevation-3">
        <h3 class="text-xs-center">Dados do perfil</h3>
      </v-toolbar>
    </v-flex>
    <v-layout justify-center>
      <v-flex class="pa-2" xs12>
        <v-card class="arredondaBorda">
          <div class="expandeDiv">
            <v-flex xs12>
              <v-flex xs12>
                <v-text-field label="nome" append-icon="account_circle" v-model="perfil.name" />
              </v-flex>
              <v-flex xs12>
                <v-text-field label="email" v-model="perfil.email" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="CPF" v-model="perfil.cpf" />
              </v-flex>
              
              <v-flex xs12>
                <v-select single-line menu-props="auto" label="Sexo" hide-details :items="sexOptions" v-model="perfil.sex" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field class="mt-4" label="Nascimento" v-model="perfil.birthdate" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Telefone" v-model="perfil.phone_1" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Cep" v-model="perfil.postal_code" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Endereço" v-model="perfil.street" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Número da casa" v-model="perfil.number" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Bairro" v-model="perfil.neighborhood" />
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Cidade" v-model="perfil.city" />
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Estado" v-model="perfil.state" />
              </v-flex>
              
            </v-flex>
          </div>
        </v-card>
        <v-flex xs12>
          <div
            class="linhaSemQuebra"
          >
            <v-btn @click="salvarPerfil" block color="green" class="white--text mr-2">Salvar
              <v-icon color="white" size="18" class="ml-1">save</v-icon>
              <v-progress-circular class="ml-1" indeterminate size="18" color="white" v-if="carregandoSalvarPerfil"></v-progress-circular>
            </v-btn>
            <v-btn to="/home/usuario/servicos-atendidos" block color="green" class="white--text">Ir Para Serviços Atendidos
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
      sexOptions: [
        'Masculino',
        'Feminino'
      ],
      perfil: {
          name: '',
          email: '',
          cpf: '',
          sex: '',
          birthdate: '',
          phone_1: '',
          postal_code: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: ''
      },
      carregandoSalvarPerfil: false
    }
  },
  methods: {
    pegaDadosDoPerfil() {
      this.perfil = JSON.parse(sessionStorage.usuario)
    },
    salvarPerfil() {
      this.carregandoSalvarPerfil = true
      const atualizacao = this.perfil
      const token = sessionStorage.token
      const id = this.perfil.id
      const headers= {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      console.log('id: ' + id)
      axios.put('https://central-oportunidades.herokuapp.com/api/v1/users/' + id, atualizacao, headers)
      .then((res) => {
        this.$store.dispatch('snackbar_success', 'Dados Atualizados.')
        sessionStorage.usuario = JSON.stringify(this.perfil)
        this.carregandoSalvarPerfil = false
      })
      .catch ( (err) => {
        this.$store.dispatch('snackbar_error', err)
      })
    }
  },
  created() {
    this.pegaDadosDoPerfil()
  }
}
</script>
 
<style>
  .arredondaBorda {
    border-radius: 6px;
    padding: 10px;
  }
</style>
 