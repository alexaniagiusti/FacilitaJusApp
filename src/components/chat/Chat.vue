<template>
  <v-card>
    <v-tabs grow v-model="tabs">
      <v-tab>
        <div style="align-items: center; display: flex; flex-wrap: nowrap">
          <img
            height="20"
            v-if="!!remetentPhoto"
            :src="remetentPhoto || `https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842`"
            alt="photo perfil"
          />
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
          v-if="showPaymentButton"
          small
          text
          class="white--text ma-2"
          color="green"
        >Pagar para {{ remetent }}</v-btn>
        <div
          class="chat_content"
          style="border: 1px solid #e0e0e0; background: #f2f2f2; display: flex; width: 100%; flex-direction: column; height: 35vh; overflow: auto"
        >
          <template v-for="(message, i) in chatFirebase">
            <div :key="i" class="mt-1 mb-1 pr-2 linhaSemQuebra">
              <v-spacer v-if="message.user_id === remetentId ? false : true "></v-spacer>
              <span
                class="timestamp pr-1"
                v-if="message.user_id === remetentId ? false : true"
              >{{message.time}}</span>
              <span
                class="speech-bubble"
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
          v-if="!!status.payments"
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
</template>


<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import axios from "axios";
import { db } from "../../services/Firebase";
import moment from "moment-timezone";

export default {
  props: ["url", "chatId", "status", "dataChat", "origem"],
  data() {
    return {
      tabs: 0,
      remetent: "",
      remetentId: "",
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
      showPaymentButton: false
    };
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
      if (this.chatId === null && this.chat_id === null) {
        console.log("não existe chat");
        this.reply();
      } else {
        console.log("já existe chat");
        this.getChatFirebase();
        this.replyFirebase(this.chat_id);
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
            this.replyFirebase(res.data.id);
            this.getChatFirebase(res.data.id);
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
    replyFirebase(id) {
      const idOk = this.chatId === null ? id : this.chatId;
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
        chat_id: idOk,
        user_id: this.$store.getters.getUsuario.id,
        message: this.message.message,
        user: this.$store.getters.getUsuario
      };
      let path =
        this.origem === "duvidaRecebida" || this.origem === "duvidaEnviada"
          ? `chats/duvidas/${idOk}/messages`
          : `chats/diligencias/${idOk}/messages`;
      if (this.message.message !== "") {
        this.message.message = "";
        db.ref(path)
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
    },
    getChatFirebase(id) {
      const idOk = this.chatId === null ? this.chat_id : this.chatId;
      let path =
        this.origem === "duvidaRecebida" || this.origem === "duvidaEnviada"
          ? `chats/duvidas/${idOk}/messages`
          : `chats/diligencias/${idOk}/messages`;
      const query = db.ref(path);
      console.log("path", path);
      query.on("value", snapshot => {
        console.log("snap", snapshot.val());
        let messages = [];
        snapshot.forEach(i => {
          let item = i.val();
          console.log("chamada", item);
          item.key = i.key;
          messages.push(item);
        });
        this.chatFirebase = messages;
        this.scrollChat();
      });
    },
    verificaRemetente() {
      if (
        this.origem === "duvidaRecebida" ||
        this.origem === "diligenciaRecebida"
      ) {
        this.remetent = this.status.name;
        this.remetentId = this.status.id;
        this.remetentPhoto = null;
      } else if (
        this.origem === "duvidaEnviada" ||
        this.origem === "diligenciaEnviada"
      ) {
        this.remetent = this.dataChat.name;
        this.remetentId = this.dataChat.id;
        this.remetentPhoto = this.dataChat.photo;
      } else {
        this.remetent = this.status.user.name;
        this.remetentId = this.status.user.id;
        this.remetentPhoto = this.status.user.photo;
        this.fullRemetent = this.status.user;
      }
    }
  },
  mounted() {
    switch (this.origem) {
      case "diligenciaEnviada":
        this.showPaymentButton = true;
        break;
      case "duvidaEnviada":
        this.showPaymentButton = true;
        break;
      case "diligenciaRecebida":
        this.showPaymentButton = false;
        break;
      case "duvidaRecebida":
        this.showPaymentButton = false;
        break;
      default:
        console.log("origem inválida");
    }
    if (this.chatId === null) {
      //this.$store.commit("setVueLoad", true);
      //this.getChat(this.chatId);
    } else {
      this.getChatFirebase();
    }
    this.verificaRemetente();
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
  border-radius: 6px 6px 6px 0px;
  max-width: 250px;
}
.noRemetent {
  color: #fff;
  background-color: #e53935;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 6px 6px 0px 6px;
  max-width: 250px;
}
.inputResponse {
  width: 100%;
  height: 60px;
  outline-style: none;
  border-color: none;
  border-radius: 0px 0px 10px 10px;
}
</style> 
