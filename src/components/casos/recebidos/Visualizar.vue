<template>
 <v-layout v-if="mostrarCaso">
     <v-flex>
         <v-card>
             <v-card-title>Caso Jurídico #{{dadosCaso.legalCase.id}}</v-card-title>

             <template>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td><strong>Tipo:</strong></td>
                            <td>{{ dadosCaso.legalCase.actuation.actuation }}</td>
                        </tr>
                        <tr>
                            <td><strong>Cidade:</strong></td>
                            <td>{{ dadosCaso.legalCase.city.city }} - {{ dadosCaso.legalCase.city.state }}</td>
                        </tr>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>{{ dadosCaso.legalCase.name}}</td>
                        </tr>

                        <tr>
                            <td><strong>Telefone:</strong></td>
                            <td>{{ dadosCaso.legalCase.phone}}</td>
                        </tr>

                        <tr>
                            <td><strong>Mensagem:</strong></td>
                            <td>{{ dadosCaso.legalCase.message}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </template>
         </v-card>
        <Chat v-if="this.dadosCaso.chat != null" :chatId="this.dadosCaso.chat.id" :url="this.urlChat"/>
        <Chat v-if="this.dadosCaso.chat == null" :chatId="null" :url="this.urlChat"/>

     </v-flex>

 </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import 'moment/locale/pt-br'
  import axios from 'axios'
  import Chat from '../../chat/Chat'

  export default {
    components:{
        Chat
    },
    data() {
      return {
        dadosCaso: '',
        mostrarCaso: false,
        urlChat: ''
      }
    },
    filters: {
      horaDaMensagem(val) {
        return moment(val).locale('pt-br').fromNow()
      }
    },
 
    mounted() {
      console.log(this.$store.getters.getToken)
    
      axios.get(`${this.$store.getters.api}/api/v1/legal-case/received/${this.$route.params.id}`, {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
      .then(res => {
        console.log(res.data)
        this.dadosCaso = res.data;
        this.urlChat = `${this.$store.getters.api}/api/v1/legal-case/received/${this.dadosCaso.legalCase.id}/reply`
        this.mostrarCaso = true;
      })
      .catch(e => console.log(e))

    },
  }
</script>