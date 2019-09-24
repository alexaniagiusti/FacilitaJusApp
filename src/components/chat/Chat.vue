<template>
  <v-card>
    <v-tabs grow v-model="tabs">
      <v-tab>
        <div style="align-items: center; display: flex; flex-wrap: nowrap">
          <img v-if="!!remetentPhoto" :src="remetentPhoto" height="20" alt="photo perfil" />
          <img
            v-else
            height="20"
            src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842"
            alt="photo perfil"
          />
          <span class="ml-2">{{ remetent }}</span>
        </div>
      </v-tab>
      <v-tab>Extrato de pagamento</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-btn
          @click="abrePagamento"
          small
          flat
          class="white--text ma-2"
          color="green"
        >Fazer pagamento para {{ remetent }}</v-btn>
        <div
          class="chat_content"
          style="border: 1px solid #e0e0e0; background: #f2f2f2; display: flex; width: 100%; flex-direction: column; height: 35vh; overflow: auto"
        >
          <template v-for="message in chatFirebase">
            <div class="mt-1 mb-1 pr-2 linhaSemQuebra">
              <v-spacer v-if="message.user_id === remetentId ? false : true "></v-spacer>
              <span
                class="timestamp pr-1"
                v-if="message.user_id === remetentId ? false : true"
              >{{message.time}}</span>
              <span
                :class="message.user_id === remetentId ? 'remetent' : 'noRemetent' "
              >{{message.message}}</span>
              <span
                class="timestamp pl-1"
                v-if="message.user_id === remetentId ? true : false"
              >{{message.time}}</span>
            </div>
          </template>
        </div>
        <v-toolbar
          style="z-index:20; border: 1px solid #e0e0e0; background: #f2f2f2;"
          class="elevation-0"
          fixed
          app
          static
        >
          <div class="linhaSemQuebra">
            <input
              class="inputResponse"
              placeholder="Responda aqui..."
              v-model="message.message"
              @keypress.enter="beforeSendMessage"
              @click:append="beforeSendMessage"
              solo
              append-icon="send"
            />
            <v-btn @click="beforeSendMessage" icon>
              <v-icon>send</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
      </v-tab-item>
      <v-tab-item>
        <div
          style="border: 1px solid #e0e0e0; background: #f2f2f2; display: flex; width: 100%; flex-direction: column; height: 45vh; overflow: auto"
        >
          <v-list two-line>
            <template v-for="extrato in status.payments">
              <v-list-item :key="extrato.id">
                <v-avatar>
                  <v-icon>monetization_on</v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ extrato.invoice.total }}</v-list-item-title>
                  <v-list-item-subtitle>{{ extrato.invoice.payment_type }} - {{ extrato.invoice.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  <!-- <span >
    <v-card class="pa-2 elevation-0">
      <v-toolbar
        style="background: linear-gradient(to right, #780206, #061161); border-radius: 10px 10px 0px 0px;"
        class="elevation-2"
        fixed
        app
        static
      >
        <div class="linhaSemQuebra">
          <v-avatar>
            <v-icon color="white" size="18">messages</v-icon>
          </v-avatar>
          <h3 class="white--text font-weight-light">{{ remetent }}</h3>
          <v-spacer></v-spacer>
          <v-btn
            v-if="status.status_id === 2 ? true : false"
            rounded
            small
            color="green"
            class="mr-2 ml-2 white--text"
            @click="abrePagamento"
          >
            Pagar
            <v-icon size="18" class="ml-1">monetization_on</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <div
        style="border: 1px solid #e0e0e0; background: #f2f2f2; display: flex; width: 100%; flex-direction: column; height: 35vh; overflow: auto"
      >
        <template v-for="message in chatFirebase">
          <div class="mt-1 mb-1 pr-2 linhaSemQuebra">
            <v-spacer v-if="message.user_id === remetentId ? false : true "></v-spacer>
            <span
              :class="message.user_id === remetentId ? 'remetent' : 'noRemetent' "
            >{{message.message}}</span>
          </div>
        </template>
      </div>
      <v-toolbar
        style="z-index:20; border: 1px solid #e0e0e0; background: #f2f2f2; border-radius: 0px 0px 10px 10px;"
        class="elevation-0"
        fixed
        app
        static
      >
        <div class="linhaSemQuebra">
          <input
            class="inputResponse"
            placeholder="Responda aqui..."
            v-model="message.message"
            @keypress.enter="replyFirebase"
            @click:append="replyFirebase"
            solo
            append-icon="send"
          />
          <v-btn @click="replyFirebase" icon>
            <v-icon>send</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
    </v-card>
  </span>-->
</template>


<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import axios from "axios";
import { db } from "../../services/Firebase";
import moment from "moment-timezone";

export default {
  props: ["url", "chatId", "status", "dataChat"],
  data() {
    return {
      bottomScrolling: "",
      tabs: 0,
      remetent: "",
      remetendId: "",
      remetentPhoto: "",
      chatData: {
        message: [],
        recipient_user: {
          name: ""
        }
      },
      chat_id: null,
      message: {
        message: "",
        user_id: this.$store.getters.getUsuario.id
      },
      chatFirebase: {},
      showChat: false,
      chatIdParam: this.chatId,
      onStatus: {
        id: 10
      }
    };
  },
  computed: {
    target() {
      return 999;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      };
    },
    element() {
      const final = this.$refs.final;
      return final;
    }
  },
  watch: {
    chatFirebase() {
      var chatContent = document.querySelector(".chat_content");
      console.log(".", chatContent.scrollHeight);
      chatContent.scrollTop = chatContent.scrollHeight;
    },
    status(val) {
      console.log("valor status", val);
      if (val === null) {
        this.onStatus = {
          status: {
            id: 10
          }
        };
      } else {
        this.onStatus = this.status;
      }
    }
  },
  methods: {
    abrePagamento() {
      const payload = {
        item: {
          description: "Pagamento de Diligência para " + this.remetent,
          amount: "1",
          price: this.status.price
        },
        recipient_user_id: this.dataChat.recipient_user_id,
        sender_user_id: this.dataChat.sender_user_id,
        chat_id: this.dataChat.id,
        diligence_id: this.status.id
      };
      this.$store.dispatch("abre_pagamento", payload);
    },
    beforeSendMessage() {
      if (this.chat_id === null) {
        this.reply();
      } else {
        this.replyFirebase();
      }
    },
    reply() {
      if (this.message.message !== "") {
        axios
          .post(`${this.url}`, this.message, {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          })
          .then(res => {
            this.chatData = res.data;
            this.chat_id = res.data.id;
            this.replyFirebase();
          })
          .catch(e => console.log(e));
      } else {
        console.log("msg em branco");
      }
    },
    scrollChat() {
      var chatContent = document.querySelector(".chat_content");
      console.log(".", chatContent.scrollHeight);
      chatContent.scrollTop = chatContent.scrollHeight;
    },
    replyFirebase() {
      const time = moment()
        .tz("America/Belem")
        .format("HH:mm");
      const date = moment()
        .tz("America/Belem")
        .format("DD/MM/YYYY");
      const mensagem = {
        time: time,
        date: date,
        id: this.status.id,
        chat_id: this.chatId,
        user_id: this.$store.getters.getUsuario.id,
        message: this.message.message,
        user: this.$store.getters.getUsuario
      };
      if (this.message.message !== "") {
        this.message.message = "";
        db.ref(`chats/${this.chatId}/messages`)
          .push(mensagem)
          .then(() => {
            this.message.message = "";
            var chatContent = document.querySelector(".chat_content");
            console.log(".", chatContent.scrollHeight);
            chatContent.scrollTop = chatContent.scrollHeight;
          });
      } else {
        console.log("msg em branco");
      }
    },
    getChat(id) {
      axios
        .get(`${this.$store.getters.api}/api/v1/chats/${id}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.chatData = res.data;
          this.verificaRemetente();
          this.showChat = true;
          this.$store.commit("setVueLoad", false);
        })
        .catch(e => console.log(e));

      const query = db.ref(`chats/${id}/messages`);
      query.on("value", snapshot => {
        let messages = [];
        snapshot.forEach(i => {
          let item = i.val();
          item.key = i.key;
          messages.push(item);
        });
        this.chatFirebase = messages;
        setTimeout(() => this.scrollChat(), 200);
      });
    },
    verificaRemetente() {
      console.log("verificaRemetente");
      const localUserId = this.$store.getters.getUsuario.id;
      let remetent = "";
      let remetentId = "";
      let remetentPhoto = "";
      if (this.chatData.recipient_user_id === localUserId) {
        remetent = this.chatData.sender_user.name;
        remetentId = this.chatData.sender_user_id;
        remetentPhoto = this.chatData.sender_user.photo;
        this.remetent = remetent;
        this.remetentId = remetentId;
      } else {
        remetent = this.chatData.recipient_user.name;
        remetentPhoto = this.chatData.recipient_user.photo;
        remetentId = this.chatData.recipient_user_id;
        this.remetent = remetent;
        this.remetentId = remetentId;
      }
    }
  },
  mounted() {
    if (this.chatId !== null) {
      this.$store.commit("setVueLoad", false);
      this.getChat(this.chatId);
    } else if (this.chat_id !== null) {
      this.getChat(this.chat_id);
    }
  }
};
</script>

<style>
.chat_content {
  bottom: 0;
}
.bScrolling {
  bottom: 0;
  background-color: #e53935;
}

.timestamp {
  color: #999;
  font-size: 8pt;
  padding-top: 6px;
}

.remetent {
  color: #fff;
  background-color: #1e88e5;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
}
.noRemetent {
  color: #fff;
  background-color: #e53935;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
}
.inputResponse {
  width: 100%;
  height: 60px;
  outline-style: none;
  border-color: none;
  border-radius: 0px 0px 10px 10px;
}
</style> 
