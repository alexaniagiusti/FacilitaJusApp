<template>
 <v-layout v-if="mostrarDiligencia">
     <v-flex>
         <v-card>
             <v-card-title>Diligência #{{dadosDiligencia.id}}</v-card-title>

             <template>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td><strong>Tipo:</strong></td>
                            <td>{{ dadosDiligencia.service.service }}</td>
                        </tr>
                        <tr>
                            <td><strong>Cidade:</strong></td>
                            <td>{{ dadosDiligencia.city.city }} - {{ dadosDiligencia.city.state }}</td>
                        </tr>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>{{ dadosDiligencia.name}}</td>
                        </tr>

                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>{{ dadosDiligencia.created_at}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </template>
         </v-card>
        <Chat :chatId="this.dadosDiligencia.chat.id" :url="this.urlChat"/>
     </v-flex>

 </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import 'moment/locale/pt-br'
  import axios from 'axios'
  import Chat from '../../components/chat/Chat'

  export default {
    components:{
        Chat
    },
    data() {
      return {
        dadosDiligencia: '',
        mostrarDiligencia: false,
        urlChat: ''
      }
    },
    filters: {
      horaDaMensagem(val) {
        return moment(val).locale('pt-br').fromNow()
      }
    },
    // computed: {
    //   ...mapState({
    //     modal: state => state.diligencias.modal,
    //     dadosDiligencia: state => state.diligencias.diligenciaSelecionada
    //   })
    // },
    methods: {
      responderDiligencia() {

      }
    },
    mounted() {
      const header = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$store.getters.getUsuario.token}`,
      };

      // console.log('teste');
      // console.log(this.$route.params.id);
      // console.log(this.$store.getters.getUsuario.token)

      axios.get(`${this.$store.getters.api}/api/v1/diligence/received/${this.$route.params.id}`, header)
      .then(res => {
        this.$store.commit('selecionar_diligencia', res.data)
        this.dadosDiligencia = res.data;
        this.urlChat = `${this.$store.getters.api}/api/v1/diligence/received/${this.dadosDiligencia.chat.id}/reply`
        this.mostrarDiligencia = true;
      })
      .catch(e => console.log(e))

    },
  }
</script>