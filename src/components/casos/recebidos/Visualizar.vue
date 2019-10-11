<template>
  <v-layout v-if="mostrarCaso">
    <v-dialog v-model="dialog" max-width="330">
      <v-card>
        <v-card-title class="headline">Deseja realmente arquivar esta Dúvida?</v-card-title>

        <v-card-text>Clique em "confirmar" para arquivar a Dúvida ou clique em "cancelar" para interromper esta ação.</v-card-text>

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
          Dúvida Jurídica #{{dadosCaso.legalCase.id}}
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
                <td>{{ dadosCaso.legalCase.actuation.actuation }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{{ dadosCaso.legalCase.status.status }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Cidade:</strong>
                </td>
                <td>{{ dadosCaso.legalCase.city.city }} - {{ dadosCaso.legalCase.city.state }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{{ dadosCaso.legalCase.name}}</td>
              </tr>
              <!--
                        <tr>
                            <td><strong>Telefone:</strong></td>
                            <td>{{ dadosCaso.legalCase.phone}}</td>
              </tr>-->

              <tr>
                <td>
                  <strong>Mensagem:</strong>
                </td>
                <td>{{ dadosCaso.legalCase.message}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
      </v-card>
      <Chat
        v-if="this.dadosCaso.chat != null"
        :chatId="this.dadosCaso.chat.id"
        :url="this.urlChat"
        :status="this.dadosCaso.legalCase"
        :dataChat="this.dadosCaso.chat"
        origem="duvidaRecebida"
      />
      <Chat
        v-if="this.dadosCaso.chat == null"
        :status="this.dadosCaso.legalCase"
        :dataChat="this.dadosCaso.chat"
        origem="duvidaRecebida"
        :chatId="null"
        :url="this.urlChat"
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

export default {
  props: ["id"],
  components: {
    Chat
  },
  data() {
    return {
      dialog: false,
      dadosCaso: "",
      mostrarCaso: false,
      urlChat: ""
    };
  },
  watch: {
    id() {
      this.getDiligence();
    }
  },
  methods: {
    arquivar() {
      this.$store.commit("setVueLoad", true);
      axios
        .post(
          `${this.$store.getters.api}/api/v1/legal-case/${this.id}/archive`,
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
          `${this.$store.getters.api}/api/v1/legal-case/received/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.dadosCaso = res.data;
          this.urlChat = `${this.$store.getters.api}/api/v1/legal-case/received/${this.dadosCaso.legalCase.id}/reply`;
          this.mostrarCaso = true;
        })
        .catch(e => console.log(e));
    }
  },
  filters: {
    horaDaMensagem(val) {
      return moment(val)
        .locale("pt-br")
        .fromNow();
    }
  },
  created() {
    this.getDiligence();
  }
  // updated(){
  //   this.getDiligence();
  // }
};
</script>