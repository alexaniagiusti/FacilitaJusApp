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
              filled
              v-model="name"
              label="Nome"
              required
              rules=""
            >
            </v-text-field>
            <v-text-field
              filled
              v-model="email"
              label="E-mail"
              type="email"
            >
            </v-text-field>
            <v-text-field
              filled
              v-model="cpf"
              label="CPF"
            >
            </v-text-field>
            <v-text-field
              filled
              v-model="password"
              label="Senha"
              type="password"
            >
            </v-text-field>
            <v-text-field
              filled
              v-model="confirmPassword"
              label="Confirme a senha"
              type="password"
            >
            </v-text-field>
          <v-btn
            block
            color="#43A047"
          >
            <span class="white--text font-weight-light">Cadastrar</span>
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
      name: '',
      cpf: '',
      email: '',
      password: '',
      carregandoCadastrar: false,
    };
  },
  methods: {
    cadastraUsuario() {
      if (this.$refs.cadastroForm.validate()) {
        this.carregandoCadastrar = true;

        const { name } = this;
        const { email } = this;
        const { password } = this;
        const { cpf } = this;

        const data = {
          name,
          email,
          password,
          cpf,
        };

        const headers = {
          'Content-Type': 'application/json',
        };

        axios.post('https://facilita-jus-api.herokuapp.com/api/v1/users', data, headers)
          .then((res) => {
            this.$store.dispatch('snackbar_success', 'Cadastrado com sucesso!');
            this.$router.push('/');
          })
          .catch((erro) => {
            this.$store.dispatch('snackbar_error', `Erro ao cadastrar: ${erro}`);
          });
      } else {
        this.$store.dispatch('SNACKBAR_ERROR', 'Preencha corretamente os campos');
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
