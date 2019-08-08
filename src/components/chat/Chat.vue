<template>
    <span v-if="mostraChat">
    <v-card class="pa-2 elevation-0" style="border: 1px solid #E0E0E0">
        <div class="linhaSemQuebra">
            <!-- <v-btn icon>
                <v-icon>
                    arrow_back
                </v-icon>
            </v-btn> -->
            <span><strong>CHAT</strong></span>
            <v-spacer></v-spacer>
        </div>
        <v-flex xs12>
            <span v-for="message in chatData.messages">
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
                <!-- <v-icon size="40">
                    account_circle
                </v-icon> -->
            </div>
        </span>
        </v-flex>
    </v-card>
    <v-flex xs12>
        <v-text-field v-model="message.message" @click:append="responder" solo append-icon="send"></v-text-field>
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
                mostraChat: false
            }
        },
        methods: {
            responder(){
                console.log(this.chatData)
                axios.post(`${this.url}`, this.message)
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => console.log(e))
            }
        },
        mounted() {
            axios.get(`${this.$store.getters.api}/api/v1/chats/${this.chatId}`)
            .then(res => {
                console.log(res.data)
                this.chatData = res.data;
                this.mostraChat = true
            })
            .catch(e => console.log(e))
            console.log(this.url)
        },
    }
</script>