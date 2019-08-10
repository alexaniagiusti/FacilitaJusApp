<template>
  <div class="principal">
    <v-flex xs12 md8 pa-2>
      <v-flex xs12 pt-5>
          <div class="linhaSemQuebra pr-5 mb-2 animated delay-1s flipInX">
            <v-icon
              size="35"
              color="white"
              class="pl-4"
            >
              account_balance
            </v-icon>
            <span style="font-size:20px" class="white--text font-weight-light">Facilita</span><span style="font-size:20px" class="font-weight-bold white--text">JUS</span>
            <v-spacer></v-spacer>
              <v-btn
              flat
              color="#43A047"
              to="/"
              >
              <h4 class="font-weight-light pr-2 white--text">Login</h4>
                <v-icon
                class="animated delay-2s infinite heartBeat"
                color="white"
                >
                  arrow_forward
                </v-icon>
              </v-btn>
          </div>
        <div class="linhaSemQuebra">
          <h3 class="text-center white--text mt-5 font-weight-light">Cadastre-se agora mesmo, seja um usuário ou parceiro do FacilitaJUS.</h3>
        </div>
      </v-flex>
      <v-card width="600" class="mt-5">
        <v-form ref="cadastroForm">

          <v-flex pa-2 xs12>
            <v-text-field
              :rules="nameRules"
              filled
              v-model="name"
              label="Nome"
              required
            >
            </v-text-field>
            <v-text-field
              :rules="emailRules"
              filled
              v-model="email"
              label="E-mail"
              type="email"
            >
            </v-text-field>
            <v-text-field
              :rules="cpfRules"
              filled
              v-model="cpf"
              label="CPF"
            >
            </v-text-field>
            <v-text-field
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              :rules="senhaRules"
              filled
              v-model="password"
              label="Senha"
              @click:append="showPass = !showPass"
            >
            </v-text-field>
            <v-text-field
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              :rules="confirmaSenhaRules"
              :hint="passwordHint"
              @click:append="showPass = !showPass"
              filled
              v-model="confirmPassword"
              label="Confirme a senha"
            >
            </v-text-field>
          <v-btn
            block
            :disabled="!passwordOK"
            color="#43A047"
            @click="cadastraUsuario"
          >
            <span class="white--text font-weight-light">Cadastrar</span>
            <v-progress-circular v-if="carregandoCadastrar" size="18" indeterminate color="white" class="ml-2"></v-progress-circular>
          </v-btn>
          </v-flex>
        </v-form>
    </v-card>
  </v-flex>
  </div>
</template>


<script>
import axios from 'axios';
import Moment from 'moment';
import 'moment/locale/pt-br';

export default {
  data() {
    return {
      cadastroForm: false,
      name: '',
      cpf: '',
      email: '',
      password: '',
      passwordHint: '',
      confirmPassword: '',
      passwordOK: false,
      carregandoCadastrar: false,
      showPass: false,
      nameRules: [
        v => !!v || 'Informe o seu nome por favor' ],
      emailRules: [
        v => !!v || 'Informe o seu e-mail' ],
      cpfRules: [
        v => !!v || 'CPF é obrigatório' ],
      senhaRules: [
        v => !!v || 'Senha é obrigatório' ],
      confirmaSenhaRules: [
        v => !!v || 'Corfirmar a senha é obrigatório' ]
    };
  },
  watch: {
    confirmPassword(val) {
      if(val === this.password) {
        this.passwordOK = true
        this.passwordHint = 'As senhas correspondem'
      } else {
        this.passwordOK = false
        this.passwordHint = 'As senhas não correspondem'
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
          password,
        };

         const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      };

        axios.post(this.$store.getters.api + '/api/v1/users', data, headers)
          .then((res) => {
            this.$store.dispatch('snackbar_success', 'Cadastrado com sucesso!');
            this.$router.push('/');
            this.carregandoCadastrar = true;

          })
          .catch((erro) => {
            this.$store.dispatch('snackbar_error', `Erro ao cadastrar: ${erro}`);
            this.carregandoCadastrar = true;
          });
      } else {
        this.$store.dispatch('snackbar_error', 'Preencha corretamente os campos');
        this.carregandoCadastrar = true;
      }
    },
  },
  created() {
    this.dataDoCadastro = Moment().locale('pt-br').format('L');
  },
};
</script>

<style>

.principal {
  background: linear-gradient(to right, #4b6cb7, #182848);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}
</style>
