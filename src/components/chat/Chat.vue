<template>
    <span v-if="showChat">
    <v-card class="pa-2 elevation-0" style="border: 1px solid #E0E0E0">
        
        <v-flex xs12>
            <span v-if="chatData.messages.length > 0" v-for="message in chatData.messages">
                <div class="linhaSemQuebra" v-if="message.sender_user_message">
                    <div class="coluna pr-5">
                        <v-card color="blue" style="border-radius: 20px;" class="pa-2 mr-5">
                            <span class="white--text">
                                <span style="font-size: 8pt; margin-bottom: 5px"
                                    class="font-weight-bold ml-2">{{message.sender_user_message}}</span>
                            </span>
                        </v-card>
                    </div>
                </div>

                <div class="linhaSemQuebra" v-if="message.recipient_user_message">
                    <v-spacer></v-spacer>
                    <div class="coluna pl-5">
                        <v-card color="red" style="border-radius: 20px;" class="pa-2 ml-5">
                            <span class="white--text">
                                <span style="font-size: 8pt; margin-bottom: 5px" class="font-weight-bold ml-2">{{message.recipient_user_message}}</span>
                            </span>
                        </v-card>
                    </div>
                </div>
            </span>
           
        </v-flex>
    </v-card>
    <v-flex xs12>
        <v-text-field v-model="message.message" @click:append="reply" solo append-icon="send"></v-text-field>
    </v-flex>
    </v-flex>
    </v-layout>
    </v-card>
</span>
</template>

<script>
    import axios from 'axios';
    
    export default {
        props: ['url', 'chatId'],
        data() {
            return {
                chatData: '',
                message: {
                    message: '',
                    user_id: this.$store.getters.getUsuario.id
                },
                showChat: false,
                chatIdParam: this.chatId
            }
        },
        methods: {
            reply(){
                axios.post(`${this.url}`, this.message,
                {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
                .then(res => {
                    this.chatData = res.data;
                    this.getChat(this.chatData.chat_id);
                    this.message.message = '';
                })
                .catch(e => console.log(e))
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