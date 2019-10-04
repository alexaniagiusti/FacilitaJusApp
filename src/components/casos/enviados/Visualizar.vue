<template>
	<v-container class="geral" fluid>
		<v-layout column v-if="showLegalCase">
			<v-flex xs12>
				<v-card>
					<v-card-title>Dúvida Jurídica #{{legalCase.id}}</v-card-title>

          <template>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>
                    <strong>Tipo:</strong>
                  </td>
                  <td>{{ legalCase.actuation.actuation }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td>{{ legalCase.status.status }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cidade:</strong>
                  </td>
                  <td>{{ legalCase.city.city }} - {{ legalCase.city.state }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nome:</strong>
                  </td>
                  <td>{{ legalCase.name}}</td>
                </tr>

							<!--	<tr>
									<td><strong>Telefone:</strong></td>
									<td>{{ legalCase.phone}}</td>
								</tr> -->


                <tr>
                  <td>
                    <strong>Mensagem:</strong>
                  </td>
                  <td>{{ legalCase.message}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </template>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 md3 class="pa-1">
        <v-card v-if="legalCase.chats.length > 0">
          <v-card-title>Respostas</v-card-title>
          <v-list subheader>
            <v-list-item
              :key="item.chatId"
              v-for="item of legalCase.chats"
              @click="openChat(item.id)"
            >
              <v-list-item-avatar>
                <v-img
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
      <v-flex xs12 md9 class="pa-1">
        <!-- <Chat v-if="this.dadosDiligencia.chat != null" :chatId="this.dadosDiligencia.chat.id" :url="this.urlChat"/> -->
        <Chat 
          v-if="this.showChat"
          :chatId="this.chatId"
          :url="this.chatUrl"
          :status="this.legalCase"
          :dataChat="this.dataChat"
          origem="duvidaEnviada"
        />
      </v-flex>
    </v-layout>
  </v-container>
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
      legalCase: "",
      dataChat: "",
      showLegalCase: false,
      urlChat: "",
      showChat: false,
      chatId: "",
      chatUrl: ""
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
    openChat(id) {
      this.showChat = false;
      axios
        .get(`${this.$store.getters.api}/api/v1/chats/${id}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.chatId = id;
          this.dataChat = res.data.recipient_user;
          this.chatUrl = `${this.$store.getters.api}/api/v1/legal-cases/sent/reply/chat/${id}`;
          this.showChat = true;
        });
    }
  },
  mounted() {
    this.$store.commit("setVueLoad", true);
    axios
      .get(
        `${this.$store.getters.api}/api/v1/legal-cases/sent/${this.$route.params.id}`,
        { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } }
      )
      .then(res => {
        this.$store.commit("setVueLoad", false);
        this.legalCase = res.data;
        this.showLegalCase = true;
      })
      .catch(e => console.log(e));
  }
};
</script>

<style>
.geral {
  margin: 0px;
  padding: 0px;
};
</style>