<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-text>
      <v-form ref="formUser">
        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="Nome"
              required
              v-model="perfil.name"
              :rules="rules.name"
              autocomplete="new-name"
            />
          </v-flex>

          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="E-mail"
              required
              v-model="perfil.email"
              :rules="rules.email"
              autocomplete="new-email"
            />
          </v-flex>

          <v-flex xs12 md4 pa-2>
            <v-text-field
              required
              v-mask="masks.cpf"
              label="CPF"
              :rules="rules.cpf"
              v-model="perfil.cpf"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 md3 pa-2>
            <v-select
              required
              :items="sexOptions"
              single-line
              menu-props="auto"
              label="Sexo"
              v-model="perfil.sex"
              :rules="rules.sex"
            />
          </v-flex>

          <v-flex xs12 md2 pa-2>
            <v-text-field
              required
              v-mask="masks.nascimento"
              v-model="perfil.birthdate"
              :rules="rules.birthdate"
              label="Nascimento"
            />
          </v-flex>
          <v-flex xs12 md2 pa-2>
            <v-text-field
              required
              v-model="perfil.oab_number"
              :rules="rules.oab_number"
              label="Número OAB"
            />
          </v-flex>
          <v-flex xs12 md2 pa-2>
            <v-select
              required
              v-model="perfil.oab_state"
              :rules="rules.oab_state"
              :items="estados"
              label="UF OAB"
            />
          </v-flex>

          <v-flex xs12 md3 pa-2>
            <v-select
              required
              v-model="perfil.type_profile"
              :rules="rules.type_profile"
              label="Tipo"
              :items="['Estagiário(a)', 'Escritório', 'Advogado(a)']"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 md3 pa-2>
            <v-text-field
              v-mask="masks.cep"
              required
              label="CEP"
              v-model="perfil.postal_code"
              :rules="rules.postal_code"
              @blur="pesquisaCep"
              autocomplete="new-cep"
            />
          </v-flex>

          <v-flex xs12 md3 pa-2>
            <v-text-field
              label="Endereço"
              required
              v-model="perfil.street"
              :rules="rules.street"
              autocomplete="new-endereco"
            />
          </v-flex>

          <v-flex xs12 md3 pa-2>
            <v-text-field
              id="number"
              required
              label="Número"
              :rules="rules.number"
              v-model="perfil.number"
            />
          </v-flex>

          <v-flex xs12 md3 pa-2>
            <v-text-field
              label="Telefone"
              required
              v-model="perfil.phone_1"
              :rules="rules.phone_1"
              v-mask="masks.telefone"
              autocomplete="new-telefone"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="Bairro"
              required
              :rules="rules.neighborhood"
              v-model="perfil.neighborhood"
              autocomplete="new-bairro"
            />
          </v-flex>

          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="Cidade"
              :rules="rules.city"
              required
              v-model="perfil.city"
              autocomplete="new-city"
            />
          </v-flex>

          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="Estado"
              :rules="rules.state"
              required
              v-model="perfil.state"
              autocomplete="new-state"
            />
          </v-flex>
          <v-flex xs12 md12 pa-2>
            <v-layout row>
              <v-flex xs12 md12 pa-2>
                <v-textarea
                  :rules="rules.about"
                  required
                  v-model="perfil.about"
                  label="Resumo profissional"
                ></v-textarea>
              </v-flex>

              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="carregandoSalvarPerfil"
          @click="salvarPerfil"
          block
          class="success">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";
import moment from "moment";
import "moment/locale/pt-br";
import { setTimeout } from "timers";

export default {
  directives: {
    mask
  },
  data() {
    return {
      rules: {
        type_profile: [v => !!v || "Tipo de perfil obrigatório"],
        oab_number: [v => !!v || "Preencha seu número da OAB"],
        oab_state: [v => !!v || "Preencha o estado de origem da OAB"],
        name: [v => !!v || "Preencha seu nome"],
        email: [v => !!v || "Preencha seu email"],
        cpf: [v => !!v || "Preencha seu CPF"],
        sex: [v => !!v || "Preencha seu sexo"],
        birthdate: [v => !!v || "Preencha sua data de nascimento"],
        phone_1: [v => !!v || "Insira seu número de telefone"],
        postal_code: [v => !!v || "Preencha seu CEP"],
        street: [v => !!v || "Preencha seu endereço"],
        number: [v => !!v || "Preencha o número de sua casa"],
        neighborhood: [v => !!v || "Preencha seu bairro"],
        city: [v => !!v || "Preencha sua cidade"],
        state: [v => !!v || "Preencha seu Estado"],
        about: [v => !!v || "Preencha seu curriculo"]
      },
      masks: {
        cpf: "###.###.###-##",
        nascimento: "##/##/####",
        telefone: "(##) # ####-####",
        cep: "#####-###",
        oabNumber: "#.###.###"
      },
      sexOptions: ["Masculino", "Feminino"],
      estados: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
      ],
      perfil: {
        type_profile: "",
        oab_number: "",
        oab_state: "",
        name: "",
        email: "",
        cpf: "",
        sex: "",
        birthdate: "",
        phone_1: "",
        postal_code: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        about: ""
      },
      carregandoSalvarPerfil: false
    };
  },
  picker: new Date().toISOString().substr(0, 10),
  methods: {
    pegaDadosDoPerfil() {
      let perfil = JSON.parse(sessionStorage.usuario);
      this.perfil = perfil;
      this.perfil.birthdate = moment(perfil.birthdate)
        .locale("pt-br")
        .format("DD/MM/YYYY");
    },
    salvarPerfil() {
      if (this.$refs.formUser.validate()) {
        this.$store.commit("setVueLoad", true);
        this.carregandoSalvarPerfil = true;
        const birthDate = this.perfil.birthdate;
        const formatBirthDate = birthDate.split("/");
        const formatedBirtdate = `${formatBirthDate[2]}-${formatBirthDate[1]}-${
          formatBirthDate[0]
        }`;
        let data = this.perfil;
        data.birthdate = formatedBirtdate;

        axios
          .put(
            `${this.$store.getters.api}/api/v1/users/${this.$store.getters.getUsuario.uuid}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`
              }
            }
          )
          .then(res => {
            this.$store.commit("setVueLoad", false);
            this.$store.dispatch("snackbar_success", "Dados Atualizados.");
            sessionStorage.usuario = JSON.stringify(data);
            this.carregandoSalvarPerfil = false;
            setTimeout(() => this.pegaDadosDoPerfil(), 100);
          })
          .catch(err => {
            this.$store.dispatch("snackbar_error", err);
          });
      } else {
        this.$store.dispatch("snackbar_warning", "Preencha todos os dados");
      }
    },
    pesquisaCep() {
      axios
        .get(`https://viacep.com.br/ws/${this.perfil.postal_code}/json/`)
        .then(res => {
          this.perfil.street = res.data.logradouro;
          this.perfil.neighborhood = res.data.bairro;
          this.perfil.city = res.data.localidade;
          this.perfil.state = res.data.uf;
          document.getElementById("number").focus();
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    this.pegaDadosDoPerfil();
  }
};
</script>

<style>
.arredondaBorda {
  border-radius: 6px;
  padding: 10px;
}
</style>
