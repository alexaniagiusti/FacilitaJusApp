<template>
    <v-app>
        <div class="principal pa-1" style="overflow: auto; background: linear-gradient(to right, #780206, #061161);">
            <div style="display: flex; width: 100%; justify-content: center; align-items: center" class="mb-2">
                <img class="mt-2 animated delay-1s bounceInDown"
                    src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-W.png?alt=media&token=ded0cc4f-cbe8-4a18-bec9-192263d3dd2b"
                    height="40">
            </div>
            <v-card light class="animated delay-1s bounceInUp pa-1 ma-1"
                style="width: 330px;border-radius: 8px; opacity: 0.9">
                <v-flex xs12 class="pa-2">
                    <v-flex xs12>
                        <v-text-field color="black" append-icon="account_circle" v-model="dataResetPassword.email"
                            label="Digite seu e-mail" />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field color="black" :append-icon="showPass ? 'visibility' : 'visibility_off'"
                            :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                            @keydown.enter="login" v-model="dataResetPassword.password" label="Senha" />
                        <v-text-field color="black" :append-icon="showPass ? 'visibility' : 'visibility_off'"
                            :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                            @keydown.enter="login" v-model="dataResetPassword.password_confirmation" label="Senha" />
                    </v-flex>
                    <v-flex xs12>
                        <v-btn block text rounded class="grey darken-4 " @click="resetPassword">
                            <span v-if="!loading" class="text-xs-center white--text ">Salvar</span>
                            <v-progress-circular size="15" color="white" indeterminate v-if="loading">
                            </v-progress-circular>
                        </v-btn>
                    </v-flex>
                </v-flex>
            </v-card>
        </div>
    </v-app>
</template>

<script>
    import Moment from 'moment';
    import 'moment/locale/pt-br';
    import axios from 'axios';

    export default {
        props: ['token'],
        data() {
            return {
                dataResetPassword: {
                    email: '',
                    password: '',      
                    password_confirmation: '',
                    token: ''
                },
                loading: false,
                showPass: false,

            };
        },
        computed: {
            nomeDoApp() {
                return this.$store.getters.nomeDoApp;
            },
        },
        methods: {
            resetPassword() {
                this.$store.commit('setVueLoad', true)
                this.$store.
                this.loading = false
                axios.post(this.$store.getters.api + '/api/password/reset', this.dataResetPassword)
                    .then((res) => {
                        this.$store.commit('setVueLoad', false)
                        this.$store.dispatch('snackbar_success', 'Senha alterada com sucesso!');
                        this.loading = true;
                        this.$router.push({'name': 'login'});
                    })
                    .catch((err) => {
                        this.$store.commit('setVueLoad', false)
                        this.$store.dispatch('snackbar_error', err.data.messages);
                    });
                this.loading = true;
            },
        },
        mounted() {
            axios.get(`${this.$store.getters.api}/api/password/find/${this.token}`)
            .then(res => {
                this.dataResetPassword.email = res.data.email;
                this.dataResetPassword.token = res.data.token;
            })
            .catch(e => console.log(e))
        }
    };
</script>

<style>
    .tituloLogin {
        font-family: 'Lobster', cursive;
        font-size: 18pt;
        color: white;
    }

    ::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
        background: #999
    }

    ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 10px;
    }

    .principal {
        background-color: #333;
        display: flex;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .loginForm {
        border-radius: 5px;
        display: flex;
        width: 100%;
        opacity: 0.9;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background-color: #fdfcfc;
    }
</style>