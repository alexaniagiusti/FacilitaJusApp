
<template>
  <span>
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
        v-if="$store.getters.getUsuario.email === status.email"
        small
        class="white--text ma-2"
        color="green"
        >Pagar para {{ remetent | filterName }}</v-btn>
        
        <v-btn
        @click="abreDialog('check', 'Confirma a conclusão deste serviço?', () => concluirServico())"
        v-if="status.status_id === 3 && $store.getters.getUsuario.email !== status.email"
        small
        class="white--text ma-2"
        color="green"
        >Concluir Serviço</v-btn>
        
        <v-btn
        v-if="origem === 'diligenciaRecebida' && chatId !== null || origem === 'duvidaRecebida' && chatId !== null ? true : false "
        @click="abreDialog('delete', 'Confirma a Exclusão?', () => excluir())"
        small
        class="white--text ma-2"
        color="red"
        >Excluir Chat</v-btn>
        <v-btn
        @click="aprovaServicoDialog = true"
        v-if="status.status_id === 4 && $store.getters.getUsuario.email === status.email"
        small
        class="white--text ma-2"
        color="green"
        >Aprova Serviço</v-btn>
        <div
        class="chat_content"
        style="border-top: 1px solid #e0e0e0; background: #fff; display: flex; width: 100%; flex-direction: column; height: 35vh; overflow: auto"
        >
        <template v-for="(m, i) in chatData.messages">
          <div :key="i" class="mt-1 mb-1 pr-2 linhaSemQuebra">
            <v-spacer v-if="m.user_id === remetentId ? false : true "></v-spacer>
            <span class="timestamp pr-1" v-if="m.user_id === remetentId ? false : true">{{m.time}}</span>
            <span
            class="speech-bubble"
            :class="m.user_id === remetentId ? 'remetent' : 'noRemetent' "
            >{{m.message}}</span>
          </div>
        </template>
        <template v-for="(message, i) in chatFirebase">
          <div :key="i" class="mt-1 mb-1 pl-1 pr-1 chatLine">
            <v-spacer v-if="message.user_id === remetentId ? false : true "></v-spacer>
            <span
            class="timestamp pr-1"
            v-if="message.user_id === remetentId ? false : true"
            >{{message.time}}</span>
            <v-card
            class="elevation-1"
            :class="message.user_id === remetentId ? 'remetent red' : 'noRemetent blue' "
            >
            <span class="white--text">{{message.message}}</span>
          </v-card>
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
  <v-list class="pa-0" two-line>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Total</th>
            <th class="text-left">Taxa</th>
            <th class="text-left">Valor a receber</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="extrato in status.payments" :key="extrato.id">
            <td>{{ extrato.id }}</td>
            <td>{{ $helper.formatReal(parseFloat(extrato.subtotal)) }}</td>
            <td>{{ $helper.formatReal(parseFloat(extrato.value_fee)) }}</td>
            <td>{{ $helper.formatReal(parseFloat(extrato.total)) }}</td>
            <td>{{ extrato.invoice.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-list>
</div>
</v-tab-item>
</v-tabs-items>
<v-dialog v-model="aprovaServicoDialog" width="300">
  <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
    <div class="meio">
      <v-flex xs12>
        <div style="display: flex; justify-content: center; width: 100%">
          <v-avatar class="elevation-1 bounceInUp snack" color="green">
            <v-icon class="fadeIn" size="25" color="white">thumb_up</v-icon>
          </v-avatar>
        </div>
      </v-flex>
      <v-flex class="mt-3 mb-3" xs12>
        <div class="linhaSemQuebra">
          <v-spacer></v-spacer>
          <h3 class="text-center">Confirma a aprovação deste serviço?</h3>
          <v-spacer></v-spacer>
        </div>
      </v-flex>
      <div class="linhaSemQuebra">
        <v-flex class="pr-1" xs6>
          <v-btn block color="red" class="white--text" @click="aprovaServicoDialog=false">Não</v-btn>
        </v-flex>
        <v-flex class="pl-1" xs6>
          <v-btn block color="green" class="white--text" @click="aprovarServico">Sim</v-btn>
        </v-flex>
      </div>
    </div>
  </v-card>
</v-dialog>
<Dialog
:dialog="dialogAction.dialog"
:content="dialogAction.content"
:icon="dialogAction.icon"
:confirma="dialogAction.confirma"
:cancela="dialogAction.cancela"
/>
</span>
</template>


<script>
  import * as easings from "vuetify/es5/services/goto/easing-patterns";
  import axios from "axios";
  import { db } from "../../services/Firebase";
  import moment from "moment-timezone";
  import m from "moment";
  import Dialog from "./DialogAction.vue";
  
  export default {
    props: ["url", "chatId", "status", "dataChat", "origem"],
    components: {
      Dialog
    },
    data() {
      return {
        dialogAction: {
          content: "",
          dialog: false,
          icon: "",
          confirma: () => alert("ok"),
          cancela: () => (this.dialogAction.dialog = false)
        },
        aprovaServicoDialog: false,
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
    filters: {
      filterDate(val) {
        if (!!val) return m(val).format("HH:mm [do dia] DD/MM/YYYY");
      },
      filterType(val) {
        if (val === "credit") {
          return "Crédito";
        } else if (val === "boleto") {
          return "Boleto";
        } else {
          return "";
        }
      },
      filterName(val) {
        return val.split(" ")[0];
      }
    },
    methods: {
      aprovarServico(){
        this.$store.commit("setVueLoad", true);
        this.dialogAction.dialog = false
        let data = {
          "chat_id": this.chatId,
        }
        axios.post(`${this.$store.getters.api}/api/v1/diligence/sent/${this.status.id}/complete`,
        data, 
        {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}
        )
        .then(() => {
          this.$store.commit("setVueLoad", false)
          this.$store.dispatch('snackbar_success', 'Servico aprovado.')
          setTimeout(() => location.reload(), 1500)
        })
        .catch((e) =>{
          this.$sotre.dispatch('snackbar_error', e)
        })
      },
      concluirServico(){
        this.$store.commit("setVueLoad", true);
        this.dialogAction.dialog = false
        let data = {
          "chat_id": this.chatId,
        }
        axios.post(`${this.$store.getters.api}/api/v1/diligence/received/${this.status.id}/complete`,
        data, 
        {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}
        )
        .then(() => {
          this.$store.commit("setVueLoad", false)
          this.$store.dispatch('snackbar_success', 'Servico concluído.')
          setTimeout(() => location.reload(), 1500)
        })
        .catch((e) =>{
          this.$sotre.dispatch('snackbar_error', e)
        })
      },
      abreDialog(icon, content, confirma) {
        this.dialogAction.dialog = true;
        this.dialogAction.icon = icon;
        this.dialogAction.content = content;
        this.dialogAction.confirma = confirma;
      },
      excluir() {
        this.dialogAction.dialog = false;
        this.$store.commit("setVueLoad", true);
        let rota;
        if (this.origem === "diligenciaRecebida") {
          rota = "diligences";
        } else if (this.origem === "duvidaRecebida") {
          rota = "legal-cases";
        }
        axios
        .delete(`${this.$store.getters.api}/api/v1/chats/${this.chatId}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch("snackbar_success", "Excluído");
          location.reload();
        })
        .catch(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch("snackbar_error", "Erro, tente novamente");
        });
      },
      arquivar() {},
      abrePagamento() {
        // recipient_user é o remetente
        // sender_user é quem vai pagar
        const payload = {
          item: {
            description: "Pagamento de Diligência para " + this.remetent,
            amount: "1",
            price: parseFloat(this.status.price) || 0
          },
          recipient_user_id: this.remetentId,
          sender_user_id: this.$store.getters.getUsuario.id,
          chat_id: this.chatId,
          diligence_id: this.status.id
        };
        this.$store.dispatch("abre_pagamento", payload);
      },
      beforeSendMessage() {
        if (this.chatId === null && this.chat_id === null) {
          this.reply();
        } else {
          this.getChatFirebase();
          this.replyFirebase(this.chat_id);
        }
      },
      reply() {
        this.$store.commit("setVueLoad", true);
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
            this.$store.commit("setVueLoad", false);
          })
          .catch(e => console.log(e));
        }
      },
      scrollChat() {
        var chatContent = document.querySelector(".chat_content");
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
            chatContent.scrollTop = chatContent.scrollHeight;
          });
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
        query.on("value", snapshot => {
          let messages = [];
          snapshot.forEach(i => {
            let item = i.val();
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
        console.log("sem");
      }
      if (this.chatId === null) {
        //this.$store.commit("setVueLoad", true);
        //this.getChat(this.chatId);
      } else {
        this.getChat(this.chatId);
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
    background-image: #b8b3b3;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 6px 6px 6px 0px;
    max-width: 250px;
  }
  .noRemetent {
    background-image: #e53935;
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
  .chatLine {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
</style> 
