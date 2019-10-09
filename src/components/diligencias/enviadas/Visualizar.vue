<template>
  <div class="visualizar" v-if="mostrarDiligencia">
    <v-flex xs12>
      <v-card>
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
        <v-card-title>
          Serviço #{{dadosDiligencia.id}}
          <v-spacer></v-spacer>
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
                <td>{{ dadosDiligencia.service.service }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{{ dadosDiligencia.status.status }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Cidade:</strong>
                </td>
                <td>{{ dadosDiligencia.city.city }} - {{ dadosDiligencia.city.state }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{{ dadosDiligencia.name}}</td>
              </tr>
              <tr>
                <td>
                  <strong>Preço:</strong>
                </td>
                <td>R$ {{ dadosDiligencia.price}}</td>
              </tr>
              <!-- <tr>
								<td><strong>Telefone:</strong></td>
								<td>{{ dadosDiligencia.phone}}</td>
              </tr>-->

              <tr>
                <td>
                  <strong>Mensagem:</strong>
                </td>
                <td>{{ dadosDiligencia.message}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
      </v-card>
    </v-flex>

    <v-layout row>
      <v-flex xs12 md3 class="pa-2">
        <v-card v-if="dadosDiligencia.chats.length > 0" class="elevation-0">
          <v-card-title>Respostas</v-card-title>
          <v-list subheader>
            <v-list-item
              v-for="item of dadosDiligencia.chats"
              @click="openChat(item)"
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-avatar v-if="item.recipient_user.photo === null ? false : true">
                  <img :src="item.recipient_user.photo" />
                </v-avatar>
                <v-img
                  v-if="item.recipient_user.photo === null ? true : false"
                  src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.recipient_user.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <!-- <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon> -->
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md9 class="pa-2">
        <Chat
          v-if="this.showChat"
          :chatId="this.chatId"
          :status="this.dadosDiligencia"
          :dataChat="this.dataChat"
          :url="this.chatUrl"
          origem="diligenciaEnviada"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/pt-br";
import axios from "axios";
import Chat from "../../chat/Chat.vue";

export default {
  components: {
    Chat
  },
  data() {
    return {
      dialog: false,
      dadosDiligencia: "",
      mostrarDiligencia: false,
      urlChat: "",
      showChat: false,
      chatId: "",
      chatUrl: "",
      chatSelected: "",
      dataChat: ""
    };
  },

  filters: {
    horaDaMensagem(val) {
      return moment(val)
        .locale("pt-br")
        .fromNow();
    }
  },

  methods: {
    arquivar() {
      this.$store.commit("setVueLoad", true);
      axios
        .post(
          `${this.$store.getters.api}/api/v1/diligence/${this.id}/archive`,
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
    openChat(chat) {
      this.$store.commit("setVueLoad", true);
      this.showChat = false;
      this.chatSelected = chat;
      axios
        .get(`${this.$store.getters.api}/api/v1/chats/${chat.id}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.chatId = chat.id;
          this.dataChat = res.data.recipient_user;
          this.chatUrl = `${this.$store.getters.api}/api/v1/diligence/sent/reply/chat/${chat.id}`;
          this.showChat = true;
        });
    }
  },

  mounted() {
    this.$store.commit("setVueLoad", true);
    axios
      .get(
        `${this.$store.getters.api}/api/v1/diligence/sent/${this.$route.params.id}`,
        { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } }
      )
      .then(res => {
        this.$store.commit("setVueLoad", false);
        this.dadosDiligencia = res.data;
        this.mostrarDiligencia = true;
      })
      .catch(e => console.log(e));
  }
};
</script>

<style scoped>
.visualizar {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.containerChat {
  display: flex;
  width: 100%;
}
</style>