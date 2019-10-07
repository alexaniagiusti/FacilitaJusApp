<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar class="hidden-sm-and-down">
        <span class="font-weight-light title">Solicitar Serviço: Preencha corretamente para falar com um advogado(a) especialista.</span>
      </v-toolbar>
      <v-toolbar height="100px" class="hidden-sm-and-up">
        <span class="font-weight-light title mb-2">Solicitar Serviço: Fale com um advogado(a).</span>
      </v-toolbar>
    </div>
    <v-card class="pa-3">
      <v-form ref="formDiligencia">
        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              label="Nome:"
              v-model="name"
              required
              :rules="rules.name"
              placeholder="Qual o seu nome?"
              autocomplete="new-name"
              aria-required=""
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
            v-mask="masktelefone"
            label="Celular:"
            v-model="phone"
            required
            :rules="rules.phone"
            placeholder="Qual o seu celular?">
            </v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              :rules="rules.email"
              required
              label="E-mail:"
              v-model="email"
              placeholder="Qual o seu e-mail?"
              autocomplete="new-email"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 md3 pa-2>
            <v-autocomplete
              :rules="rules.service"
              required
              label="Serviço:"
              :items="services"
              v-model="serviceSelected"
              item-value="id"
              item-text="service"
              hide-no-data
              placeholder="Serviço que deseja solicitar"
            />
          </v-flex>
          <v-flex xs12 md2 pa-2>
            <v-text-field
              :rules="rules.price"
              required
              label="Preço Sugerido:"
              v-model="price"
              hint="Você mesmo pode colocar um preço"
              prefix="R$"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3 pa-2>
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
              <template v-slot:selection="data">{{ data.item.city }} - {{ data.item.state }}</template>
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
          <v-flex xs12 md2 pa-2>
            <v-text-field
              :rules="rules.data"
              required
              label="Data:" 
              v-mask="maskData" 
              v-model="date" 
              placeholder="Em que dia:">
            </v-text-field>
          </v-flex>
          <v-flex xs12 md2 pa-2>
            <v-text-field
              :rules="rules.hour"
              required
              label="Horário:" 
              v-mask="maskHour" 
              v-model="hour" 
              placeholder="Em qual horário?">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 md12 pa-2>
            <v-textarea
              :rules="rules.message"
              required
              v-model="message" 
              label="Fale sobre o serviço que deseja solicitar:">
            </v-textarea>
          </v-flex>
          <v-flex xs12 md12 pa-2>
            <v-btn block color="green" @click="sendDiligence">
              <span class="font-weight-bold white--text">Solicitar</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
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
        service: [v => !!v || 'Selecione  o serviço que deseja solicitar'],
        price: [v => !!v || 'Escolha um valor para o serviço solicitado'],
        city: [v => !!v || 'Selecione a cidade onde o serviço será realizado'],
        data: [v => !!v || 'Preencha em qual data o serviço deverá ser realizado'],
        hour: [v => !!v || 'Preencha em qual horário o serviço deverá ser realizado'],
        message: [v => !!v || 'É necessário escrever um resumo sobre o serviço que deseja solicitar'],


      },
      maskData: '##/##/####',
      maskHour: '##:##',
      masktelefone: '(##) # #### ####',
      name: "",
      phone: "",
      email: "",
      date: "",
      dateFormat: "",
      hour: "",
      message: "",
      cities: [],
      citySelected: "",
      services: [],
      serviceSelected: "",
      price: ""
    };
  },
  watch: {
    serviceSelected() {
      if (this.serviceSelected !== "") {
        this.$store.commit("setVueLoad", true);
        axios
          .get(
            `${this.$store.getters.api}/api/v1/services-prices/${this.serviceSelected}`
          )
          .then(res => {
            this.price = `${res.data[0].price}`;
          })
          .then(() => this.$store.commit("setVueLoad", false))
          .catch(err => console.log("erro: " + err));
      }
    }
  },
  methods: {
    getServices() {
      axios
        .get(this.$store.getters.api + "/api/v1/services", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => (this.services = res.data));
      this.$store.commit("setVueLoad", false);
    },
    getCities() {
      axios
        .get(this.$store.getters.api + "/api/v1/cities", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => (this.cities = res.data));
      this.$store.commit("setVueLoad", false);
    },
    sendDiligence() {
      if (this.$refs.formDiligencia.validate()) {
      this.$store.commit("setVueLoad", true);
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.message,
        service_id: this.serviceSelected,
        city_id: this.citySelected.id,
        time: this.hour,
        date: this.dateFormat,
        price: this.price
      };

      axios
        .post(`${this.$store.getters.api}/api/v1/diligences`, data, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch(
            "snackbar_success",
            "Serviço solicitado com sucesso"
          );
        })
        .catch(() =>
          this.$$store.dispatch("snackbar_error", "Erro, tente novamente")
        ); } else {
          this.$$store.dispatch(
          "snackbar_warning",
          "Erro, Preencha todos os campos corretamente"
          );
        }
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.name = this.$store.getters.getUsuario.name;
    this.phone = this.$store.getters.getUsuario.phone_1;
    this.email = this.$store.getters.getUsuario.email;
    this.dateFormat = moment().format("YYYY[-]MM[-]DD");
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getServices();
    this.getCities();
  }
};
</script>
