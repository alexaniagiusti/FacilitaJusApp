<template lang="pug">
  div(class="pa-1")
    div(style="display: flex; width: 100%;")
      h3.pa-2.black--text.font-weight-regular Faça seu cadastro
      v-spacer

      v-btn(flat icon to="/" class="mr-3")
        span.black--text.font-weight-medium Login
        v-icon(color="grey" size="20") arrow_forward

    v-card(color="white" style="border-radius: 6px;")
      div.home(class="pa-2" style="min-height: 85vh; margin-bottom: 0px; margin-top: 0px; border-radius: 6px;")
        v-flex(xs12)
          v-form(ref="cadastroForm")
            v-text-field(color="#000"  label="Data de entrada" v-model="dataDoCadastro" disabled)
            v-text-field(color="#000"  clearable :rules="[v => !!v || 'Este campo deve ser preenchido']" label="Nome" v-model="name")
            v-text-field(color="#000" mask="###.###.###-##" clearable :rules="[v => !!v || 'Este campo deve ser preenchido']" label="CPF" v-model="cpf")
            v-text-field(color="#000"  clearable :rules="[v => !!v || 'Este campo deve ser preenchido']" label="E-mail" v-model="email")
            v-text-field(color="#000"  clearable :rules="[v => !!v || 'Este campo deve ser preenchido']" type="password" label="Senha" v-model="password")

            v-btn(block flat class="indigo darken-4 mt-5" @click.prevent="cadastraUsuario" class="white--text font-weight-medium" ) Cadastrar
              v-progress-circular(v-if="carregandoCadastrar" indeterminate)
  </template>


<script>
import axios from 'axios'
import Moment from 'moment'
import 'moment/locale/pt-br'

export default {
  props: [
    'id'
  ],
  data () {
    return {
      name: '',
      cpf: '',
      email: '',
      password: '',
      carregandoCadastrar: false
    }
  },
  methods: {
    cadastraUsuario() {
      if(this.$refs.cadastroForm.validate()) {
        this.carregandoCadastrar = true

        const name = this.name
        const email = this.email
        const password = this.password
        const cpf = this.cpf

        const data = {
          name: name,
          email: email,
          password: password,
          cpf: cpf
        }

        const headers= {
        'Content-Type': 'application/json'
        }

        axios.post('https://facilita-jus-api.herokuapp.com/api/v1/users', data, headers)
        .then(res => {
          this.$store.dispatch('snackbar_success', 'Cadastrado com sucesso!')
          this.$router.push('/')
        })
        .catch((erro) => {
          this.$store.dispatch('snackbar_error', 'Erro ao cadastrar: ' + erro)
        })
      } else {
        this.$store.dispatch("SNACKBAR_ERROR", "Preencha corretamente os campos")
      }
    },
  },
  created () {
    this.dataDoCadastro = Moment().locale('pt-br').format('L')
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    align-content: center;
  }

  .cardClientes {
    min-width: 100%;
    display: flex;
    border-radius: 6px;
    flex-direction: column;
  }

  .recompraDialog {
    display: flex;
    height: 600px;
  }
  .principal {
    padding: 5px;
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .form-usuario {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .card-indicador {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 5px;
    width: 600px;
    padding: 5px;
    margin-bottom: 8px;
  }

  .card-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 600px;
    min-height: 300px;
    border-radius: 5px;
  }

  .form {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
</style>
