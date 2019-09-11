<template>
  <v-app>
    <div
      class="principal pa-1"
      style="overflow: auto; background: linear-gradient(to right, #780206, #061161);"
    >
      <div
        style="display: flex; width: 100%; justify-content: center; align-items: center"
        class="mb-2"
      >
        <img
          class="mt-2 animated delay-1s bounceInDown"
          src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-W.png?alt=media&token=ded0cc4f-cbe8-4a18-bec9-192263d3dd2b"
          height="40"
        />
      </div>
      <v-card
        light
        class="animated delay-1s bounceInUp pa-1 ma-1"
        style="width: 330px;border-radius: 8px; opacity: 0.9"
      >
        <v-flex xs12 class="pa-2">
          <v-flex xs12>
            <v-text-field
              autocomplete="new-login"
              color="black"
              append-icon="account_circle"
              v-model="dataLogin.email"
              label="Digite seu e-mail"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="black"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              @keydown.enter="login"
              v-model="dataLogin.password"
              label="Senha"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn block text rounded class="grey darken-4" @click="login">
              <span v-if="!carregandoLogin" class="text-xs-center white--text">Entrar</span>
              <v-progress-circular size="15" color="white" indeterminate v-if="carregandoLogin"></v-progress-circular>
            </v-btn>
          </v-flex>
        </v-flex>
      </v-card>
      <div class="animated delay-1s bounceInUp">
        <a>
          <!-- <span @click="alteraSenhaDialog = true" class="text-weight-thin caption white--text">Bem Vindo(a). {{ dataDeHoje }} </span> -->
        </a>
        <div style="margin: 6px;height: 10px;align-items: center; display: flex">
          <v-icon style="padding-top: 2px;" class="ml-2 mr-2" size="5">fiber_manual_record</v-icon>
          <a>
            <span
              @click="alteraSenhaDialog = true"
              class="text-weight-thin caption white--text"
            >Esqueci a senha</span>
          </a>
          <v-icon style="padding-top: 2px;" class="ml-2 mr-2" size="5">fiber_manual_record</v-icon>
          <a style="text-decoration:none" @click="$router.push({'name': 'cadastro'})">
            <span class="text-weight-thin caption white--text">Não tenho conta</span>
          </a>
          <v-icon style="padding-top: 2px;" class="ml-2 mr-2" size="5">fiber_manual_record</v-icon>
        </div>
      </div>
      <v-dialog absolute width="300" v-model="alteraSenhaDialog">
        <v-flex xs12>
          <v-card class="pa-2" style="border-radius: 10px">
            <h3 class="text-xs-center font-weight-light">Recuperar Senha</h3>
            <v-divider class="mt-2"></v-divider>
            <v-text-field
              label="Qual é o seu email?"
              color="blue"
              class="ma-1"
              v-model="dataResetPassword.email"
            ></v-text-field>
            <v-btn
              block
              color="deep-purple white--text"
              class="elevation-0"
              @click="enviaLinkRecuperacaoDeSenha"
            >Enviar link de recuperação</v-btn>
            <div
              v-show="enviaLinkRecuperacao"
              class="mt-3"
              style="display: flex; width: 100%; justify-content: center; align-items: center"
            >
              <h4>Email enviado</h4>
              <v-icon class="ml-2" color="yellow darken-3">check</v-icon>
            </div>
          </v-card>
        </v-flex>
      </v-dialog>
      <v-dialog absolute width="300" v-model="error">
        <v-flex xs12>
          <v-card class="pa-3">
            <h3 class="text-xs-center">Tivemos um erro</h3>
            <v-divider class="mt-2"></v-divider>
            <h2 class="font-weight-light mt-3 mb-3">{{ errorMessage }}</h2>
            <v-btn
              block
              rounded
              color="yellow darken-3"
              @click="error = false, errorMessage = '', carregandoLogin=false"
            >Vou tentar novamente</v-btn>
          </v-card>
        </v-flex>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import Moment from "moment";
import "moment/locale/pt-br";
import axios from "axios";

export default {
  data() {
    return {
      dataLogin: {
        email: "",
        password: ""
      },
      dataResetPassword: {
        email: ""
      },
      dataDeHoje: "",
      showPass: false,
      entrando: false,
      error: false,
      errorMessage: "",
      alteraSenhaDialog: false,
      enviaLinkRecuperacao: false,
      carregandoLogin: false
    };
  },
  computed: {
    nomeDoApp() {
      return this.$store.getters.nomeDoApp;
    }
  },
  methods: {
    enviaLinkRecuperacaoDeSenha() {
      axios
        .post(
          `${this.$store.getters.api}/api/password/create`,
          this.dataResetPassword
        )
        .then(res => {
          this.$store.dispatch("snackbar_success", res.data.message);
        })
        .catch(e => console.log(e));
    },
    login() {
      axios
        .post(this.$store.getters.api + "/api/v1/login", this.dataLogin)
        .then(res => {
          if (res.data.status) {
            this.carregandoLogin = false;
            this.$store.commit("setUser", res.data.user);
            sessionStorage.setItem("usuario", JSON.stringify(res.data.user));

            let redirectTo = sessionStorage.redirectTo;
            if (redirectTo === undefined) {
              this.$router.push({ name: "home" });
            } else {
              window.location.replace(`${redirectTo}`);
            }
          } else {
            this.$store.dispatch(
              "snackbar_error",
              "E-mail ou Senha inválidos!"
            );
            this.carregandoLogin = false;
          }
        })
        .catch(err => {
          this.$store.dispatch("snackbar_error", err);
          this.carregandoLogin = false;
        });
      this.carregandoLogin = true;
    }
  },
  created() {
    let user = this.$store.getters.getUsuario;
    console.log(user);
    if (user) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
.tituloLogin {
  font-family: "Lobster", cursive;
  font-size: 18pt;
  color: white;
}
::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
  background: #999;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}
.principal {
  background-color: #333;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loginForm {
  border-radius: 5px;
  display: flex;
  width: 100%;
  opacity: 0.9;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fdfcfc;
}
</style>
