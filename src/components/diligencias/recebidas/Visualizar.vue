<template>
  <v-layout v-if="mostrarDiligencia">
    <v-dialog v-model="dialog" max-width="330">
      <v-card>
        <v-card-title class="headline">Deseja realmente arquivar esta diligência?</v-card-title>

        <v-card-text>Clique em "confirmar" para arquivar a diligência ou clique em "cancelar" para interromper esta ação.</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="green darken-1" text @click="arquivar">Confirmar</v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex>
      <v-card>
        <v-card-title>
          Serviço #{{dadosDiligencia.diligence.id}}
          <v-btn @click="dialog = true" class="ma-3" small color="#D32F2F">
            <span class="mr-2 white--text">Arquivar</span>
            <v-icon color="white" size="18">assignment_returned</v-icon>
          </v-btn>
        </v-card-title>
        <template>
          <v-simple-table>
            <tbody>
              <tr>
                <td>
                  <strong>Tipo:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.service.service }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.status.status }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Cidade:</strong>
                </td>
                <td>
                  {{ dadosDiligencia.diligence.city.city }} -
                  {{ dadosDiligencia.diligence.city.state }}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.name}}</td>
              </tr>

              <!--<tr>
								<td><strong>Telefone:</strong></td>
								<td>{{ dadosDiligencia.diligence.phone}}</td>
              </tr>-->

              <tr>
                <td>
                  <strong>Data:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.date | dateFilter}}</td>
              </tr>

              <tr>
                <td>
                  <strong>Hora:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.time }}</td>
              </tr>

              <tr>
                <td>
                  <strong>Preço:</strong>
                </td>
                <td>R$ {{ dadosDiligencia.diligence.price }}</td>
              </tr>

              <tr>
                <td>
                  <strong>Mensagem:</strong>
                </td>
                <td>{{ dadosDiligencia.diligence.message}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
      </v-card>
      <br>
      <Chat
        v-if="this.dadosDiligencia.chat != null"
        :status="this.dadosDiligencia.diligence"
        :dataChat="this.dadosDiligencia.chat"
        :chatId="this.dadosDiligencia.chat.id"
        :url="this.urlChat"
        origem="diligenciaRecebida"
      />
      <Chat
        v-if="this.dadosDiligencia.chat == null"
        :chatId="null"
        :status="this.dadosDiligencia.diligence"
        :dataChat="this.dadosDiligencia.chat"
        :url="this.urlChat"
        origem="diligenciaRecebida"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/pt-br";
import axios from "axios";
import Chat from "../../chat/Chat";
import Helper from "../../../helper.js";

export default {
  props: ["id"],
  components: {
    Chat
  },
  data() {
    return {
      dialog: false,
      dadosDiligencia: null,
      mostrarDiligencia: false,
      urlChat: "",
      dataChat: ""
    };
  },
  filters: {
    horaDaMensagem(val) {
      return moment(val)
        .locale("pt-br")
        .fromNow();
    },
    dateFilter(val) {
      return moment(val).format("DD/MM/YYYY");
    }
  },
  watch: {
    id() {
      this.getDiligence();
    }
  },
  methods: {
    arquivar() {
      this.$store.commit("setVueLoad", true);
      console.log("uid", this.id);
      axios
        .post(
          `${this.$store.getters.api}/api/v1/diligence/${this.id}/archive`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`
            }
          }
        )
        .then(
          () =>
            this.$store.dispatch("snackbar_success", "Arquivamento Concluído"),
          this.$store.commit("setVueLoad", false),
          (this.dialog = false)
        )
        .catch(() =>
          this.$store.dispatch(
            "snackbar_error",
            "Erro ao arquivar, tente novamente"
          )
        );
    },
    getDiligence() {
      this.$store.commit("setVueLoad", true);
      axios
        .get(
          `${this.$store.getters.api}/api/v1/diligence/received/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.dadosDiligencia = res.data;
          this.urlChat = `${this.$store.getters.api}/api/v1/diligence/received/${this.dadosDiligencia.diligence.id}/reply`;
          this.mostrarDiligencia = true;
          console.log(this.dadosDiligencia.chat);
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.getDiligence();
  }
};
</script>