<template>
  <span v-if="showChat">
    <!-- CARD QUE ENVOLVE TODO O CHAT -->
    <v-card class="pa-2 elevation-0">
        <!-- MENSAGENS DO CHAT -->
        <v-toolbar style="background: linear-gradient(to right, #780206, #061161); border-radius: 10px 10px 0px 0px;" class="elevation-2" fixed app static>
            <div class="linhaSemQuebra">
                <v-avatar>
                    <v-icon color="white" size="18">messages</v-icon>
                </v-avatar>
                <h3 class="white--text font-weight-light">Chat</h3>
            </div>
        </v-toolbar>
        <div style="border: 1px solid #e0e0e0; background: #f2f2f2; display: flex; width: 100%; flex-direction: column; height: 35vh; overflow: auto">
            <template v-for="message in chatData.messages">
                <!--MENSAGEM EXIBIDA CASO O AUTOR SEJA O REMETENTE-->
                <div class="mt-1 mb-1 pl--2 linhaSemQuebra" v-if="message.sender_user_message">
                    <div class="coluna pr-5">
                        <v-card color="blue" style="border-radius: 15px; border: 1px solid #780206" class="elevation-0 pa-2 mr-5">
                            <span class="white--text">
                                <h3
                                    style="font-size: 8pt; margin-bottom: 5px"
                                    class="black--text font-weight-bold ml-2"
                                >
                                        {{message.sender_user_message}}
                                </h3>
                            </span>
                        </v-card>
                    </div>
                </div>

                <!--MENSAGEM EXIBIDA CASO O AUTOR SEJA O USUÁRIO LOGADO-->
                <div class="mt-1 mb-1 pr-2 linhaSemQuebra" v-if="message.recipient_user_message">
                    <v-spacer></v-spacer>
                    <div class="coluna pl-5">
                        <v-card style="border-radius: 15px;border: 1px solid #061161" class="elevation-0 pa-2 ml-5">
                            <span class="white--text">
                                <h3 style="font-size: 8pt; margin-bottom: 5px" class="black--text font-weight-bold ml-2">{{message.recipient_user_message}}</h3>
                            </span>
                        </v-card>
                    </div>
                </div>
            </template>
        </div>
            <!-- INPUT DO USUÁRIO PARA RESPONDER O CHAT AO REMETENTE-->
        <v-toolbar style="z-index:20000; border: 1px solid #e0e0e0; background: #f2f2f2; border-radius: 0px 0px 10px 10px;" class="elevation-0" fixed app static>
            <div class="linhaSemQuebra">
                <input class="inputResponse" placeholder="Responda aqui..." v-model="message.message" @keypress.enter="reply" @click:append="reply" solo append-icon="send" />
                <v-btn @click="reply" icon>
                    <v-icon>send</v-icon>
                </v-btn>
            </div>
        </v-toolbar>
    </v-card>
  </span>
</template>


<script>
     import * as easings from 'vuetify/es5/services/goto/easing-patterns'
    import axios from 'axios'
    export default {
        props: ['url', 'chatId'],
        data() {
            return {
                chatData: {
                    message: []
                },
                message: {
                    message: '',
                    user_id: this.$store.getters.getUsuario.id
                },
                showChat: false,
                chatIdParam: this.chatId
            }
        },
        computed: {
            target() {
                return 9999
            },
            options() {
                return {
                    duration: 300,
                    offset: 0,
                    easing: 'easeInOutCubic',
                }
            }
        },
        methods: {
            reply(){
                if(this.message.message !== '') {
                    axios.post(`${this.url}`, this.message,
                    {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
                    .then(res => {
                        this.chatData = res.data;
                        this.getChat(this.chatData.chat_id);
                        this.message.message = '';
                        $vuetify.goTo(target, options)
                    })
                    .catch(e => console.log(e))
                } else {
                    this.$store.dispatch('snackbar_error', 'A Mensagem está em branco')
                }
            },
            
            getChat(id){
                axios.get(`${this.$store.getters.api}/api/v1/chats/${id}`, 
                {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
                .then(res => {
                    this.chatData = res.data;
                    this.showChat = true
                })
                .catch(e => console.log(e))
            },

        },
        mounted() {
            this.showChat = true;
            if(this.chatId != null){
                this.getChat(this.chatId)
            }
            
        },
    }
</script>

<style>
    .inputResponse {
        width: 100%;
        height: 60px;
        outline-style: none;
        border-color: none;
        border-radius: 0px 0px 10px 10px;
    }
</style> 
