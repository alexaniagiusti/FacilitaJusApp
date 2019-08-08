<template>
<span>
  <v-dialog v-if="exbirModal">
    <div class="chat">
      <v-flex xs12>
        <v-card>
          <v-layout column>
            <v-flex xs12>
              <div class="linhaSemQuebra">
                <!-- <v-btn @click="$store.dispatch('fecha_diligencia')" icon> -->
                  <v-icon>
                    arrow_back
                  </v-icon>
                <!-- </v-btn> -->
                <span>Diligência Recebida</span>
                <v-spacer></v-spacer>
                <v-icon class="mr-2">description</v-icon>
              </div>
            </v-flex>

            <v-divider></v-divider>

            <v-flex xs12 class="pa-2">
              <v-card class="pa-2 elevation-0" style="border: 1px solid #E0E0E0">
                <v-flex xs12>
                  <h4>Diligencia: {{ dadosDiligencia.id }}</h4>
                  <h4>Cidade: {{ dadosDiligencia.city.city }}</h4>
                  <h4>Tipo: {{ dadosDiligencia.service.service }}</h4>
                  <h4>Remetente: {{ dadosDiligencia.name }}</h4>
                  <h4>Telefone: {{ dadosDiligencia.phone }}</h4>
                </v-flex>
              </v-card>
            </v-flex>

            <v-flex xs12 class="pa-2">
              <v-card class="pa-2 elevation-0" style="border: 1px solid #E0E0E0">
                <v-flex xs12>
                  <div class="linhaSemQuebra">
                    <v-icon size="40">
                      account_circle
                    </v-icon>
                    <div class="coluna pr-5">
                      <v-card color="blue" style="border-radius: 20px;" class="pa-2 mr-5">
                        <span class="white--text">
                          {{ dadosDiligencia.message }}
                          <span style="font-size: 8pt; margin-bottom: 5px"
                            class="font-weight-bold ml-2 ">{{ dadosDiligencia.created_at | horaDaMensagem}}</span>
                        </span>
                      </v-card>
                    </div>
                  </div>

                  <div class="linhaSemQuebra">
                    <v-spacer></v-spacer>
                    <div class="coluna pl-5">
                      <v-card color="red" style="border-radius: 20px;" class="pa-2 ml-5">
                        <span class="white--text">

                          <span style="font-size: 8pt; margin-bottom: 5px" class="font-weight-bold ml-2 ">18:34</span>
                        </span>
                      </v-card>
                    </div>
                    <v-icon size="40">
                      account_circle
                    </v-icon>
                  </div>
                </v-flex>
              </v-card>
              <v-flex xs12>
                <v-text-field @click="responderDiligencia" solo append-icon="send"></v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </div>
  </v-dialog>
  </span>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import 'moment/locale/pt-br'
  import axios from 'axios'

  export default {
    data() {
      return {
        dadosDiligencia: '',
        exbirModal: false
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
        this.exbirModal = true;
        console.log(this.dadosDiligencia)
       
      })
      .catch(e => console.log(e))

    },
  }
</script>