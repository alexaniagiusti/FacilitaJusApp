<template>
  <div class="principal">
    <v-flex xs12 md8 pa-2>
      <v-card width="600" class="mt-5">
        <v-card-title style="background-color: #757575">
          <img
            class="mt-2 animated delay-1s bounceIn"
            src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-W.png?alt=media&token=ded0cc4f-cbe8-4a18-bec9-192263d3dd2b"
            width="38%"
          />
          <v-spacer></v-spacer>
          <v-btn text color="#43A047" @click="$router.push({'name': 'login'})">
            <h4 class="font-weight-light pr-2 white--text">Login</h4>
            <v-icon class="animated delay-2s infinite heartBeat" color="white">arrow_forward</v-icon>
          </v-btn>
        </v-card-title>
        <v-form ref="cadastroForm">
          <v-flex pa-2 xs12>
            <v-text-field
              autocomplete="new-name"
              :rules="nameRules"
              v-model="name"
              label="Nome"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="new-email"
              :rules="emailRules"
              v-model="email"
              label="E-mail"
              type="email"
            ></v-text-field>
            <v-text-field :rules="cpfRules" v-mask="cpfMask" v-model="cpf" label="CPF"></v-text-field>
            <v-text-field
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              :rules="senhaRules"
              v-model="password"
              label="Senha"
              @click:append="showPass = !showPass"
            ></v-text-field>
            <v-text-field
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              :rules="confirmaSenhaRules"
              :hint="passwordHint"
              @click:append="showPass = !showPass"
              v-model="confirmPassword"
              label="Confirme a senha"
            ></v-text-field>
            <v-btn block :disabled="!passwordOK" color="#43A047" @click="cadastraUsuario">
              <span class="white--text font-weight-light">Cadastrar</span>
              <v-progress-circular
                v-if="carregandoCadastrar"
                size="18"
                indeterminate
                color="white"
                class="ml-2"
              ></v-progress-circular>
            </v-btn>
          </v-flex>
        </v-form>
      </v-card>
    </v-flex>
  </div>
</template>


<script>
import axios from "axios";
import Moment from "moment";
import "moment/locale/pt-br";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      cadastroForm: false,
      name: "",
      cpf: "",
      cpfMask: "###.###.###-##",
      email: "",
      password: "",
      passwordHint: "",
      confirmPassword: "",
      passwordOK: false,
      carregandoCadastrar: false,
      showPass: false,
      nameRules: [v => !!v || "Informe o seu nome por favor"],
      emailRules: [v => !!v || "Informe o seu e-mail"],
      cpfRules: [v => !!v || "CPF é obrigatório"],
      senhaRules: [v => !!v || "Senha é obrigatório"],
      confirmaSenhaRules: [v => !!v || "Corfirmar a senha é obrigatório"]
    };
  },
  watch: {
    confirmPassword(val) {
      if (val === this.password) {
        this.passwordOK = true;
        this.passwordHint = "As senhas correspondem";
      } else {
        this.passwordOK = false;
        this.passwordHint = "As senhas não correspondem";
      }
    }
  },
  methods: {
    cadastraUsuario() {
      if (this.$refs.cadastroForm.validate()) {
        this.carregandoCadastrar = true;

        const { name } = this;
        const { email } = this;
        const { cpf } = this;
        const { password } = this;

        const data = {
          name,
          email,
          cpf,
          password
        };

        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        };

        axios
          .post(this.$store.getters.api + "/api/v1/register", data, headers)
          .then(res => {
            this.$store.dispatch("snackbar_success", "Cadastrado com sucesso!");
            this.$router.push("/");
            this.carregandoCadastrar = false;
          })
          .catch(e => {
            let stringErrors = [];
            Object.keys(e.response.data.errors).map(value => {
              return stringErrors.push(`${e.response.data.errors[value]}`);
            });

            this.$store.dispatch(
              "snackbar_warning",
              stringErrors.length === 1 ? stringErrors[0] : stringErrors
            );
            this.carregandoCadastrar = false;
          });
      } else {
        this.$store.dispatch(
          "snackbar_error",
          "Preencha corretamente os campos"
        );
        this.carregandoCadastrar = true;
      }
    }
  },
  created() {
    this.dataDoCadastro = Moment()
      .locale("pt-br")
      .format("L");
  }
};
</script>

<style>
.principal {
  background: linear-gradient(to right, #780206, #061161);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}
</style>
