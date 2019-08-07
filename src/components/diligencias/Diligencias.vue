<template>
  <div>
    <v-layout>
      <v-flex>
        <v-toolbar flat color="white" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-light black--text">
            Diligências
          </v-toolbar-title>
        <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <v-tabs class="hidden-sm-and-down" grow v-model="tab">
          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Em aberto
          </v-tab>
          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Respondidas
          </v-tab>
          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Em Negociação
          </v-tab>
          <v-tab>
            <v-icon>
              drafts
            </v-icon>
            Finalizadas
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
       <v-tabs-items v-model="tab">
         <v-tab-item>
           <DiligenciasEmAberto/>
         </v-tab-item>
         <v-tab-item>
         </v-tab-item>
         <v-tab-item>
           3
         </v-tab-item>
         <v-tab-item>
           4
         </v-tab-item>
       </v-tabs-items>

      </v-flex>
    </v-layout>
    <v-dialog fullscreen v-model="abreChatDialogo">
      <div class="chat">
        <v-flex xs12>
          <v-card>
            <v-layout column>
              <v-flex xs12>
                <div class="linhaSemQuebra">
                  <v-btn @click="abreChatDialogo=false" icon>
                    <v-icon>
                      arrow_back
                    </v-icon>
                  </v-btn>
                  <span>Diligência Recebida</span>
                  <v-spacer></v-spacer>
                  <v-icon class="mr-2">description</v-icon>
                </div>
              </v-flex>

              <v-divider></v-divider>

              <v-flex xs12 class="pa-2">
                <v-card class="pa-2 elevation-0" style="border: 1px solid #E0E0E0">
                  <v-flex xs12>
                    <h4>Diligencia: #3333</h4>
                    <h4>Cidade: Macapá</h4>
                    <h4>Tipo: Cópias</h4>
                    <h4>Remetente: Alexânia</h4>
                    <h4>Telefone: (96) 9 9999-9999</h4>
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
                            mensagem rema
                            asdasdsa
                            asdasda
                            asdasdetente <span  style="font-size: 8pt; margin-bottom: 5px" class="font-weight-bold ml-2 ">18:34</span>
                          </span>
                        </v-card>
                      </div>
                    </div>

                    <div class="linhaSemQuebra">
                      <v-spacer></v-spacer>
                      <div class="coluna pl-5">
                        <v-card color="red" style="border-radius: 20px;" class="pa-2 ml-5">
                          <span class="white--text">
                            mensagem rema
                            asdasdsa
                            asdasda
                            asdasdetente <span  style="font-size: 8pt; margin-bottom: 5px" class="font-weight-bold ml-2 ">18:34</span>
                          </span>
                        </v-card>
                      </div>
                      <v-icon size="40">
                        account_circle
                      </v-icon>
                    </div>
                  </v-flex>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import DiligenciasEmAberto from './DiligenciasEmAberto.vue'
export default {
  components: {
    DiligenciasEmAberto
  },
  data() {
    return {
      tab: 0,
      abreChatDialogo: false,
      abreChatConteudo: {}
    };
  },
  methods: {
    pegaItemsSelecionados() {
      const token = sessionStorage.token

      const recuperaLogin = JSON.parse(sessionStorage.usuario)
      const { id } = recuperaLogin

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      axios.get(`https://facilita-jus-api.herokuapp.com/api/v1/users/actuations/${id}`, headers)
        .then((res) => {
          const ids_marcados = res.data.actuations;
          const todos = this.items;
          const itemsMarcados = [];

          todos.map((item) => {
            ids_marcados.map((i) => {
              if (i.id === item.id) {
                itemsMarcados.push(item);
              }
            });
          });

          this.itemsSelecionados = itemsMarcados;
        });
    },
    abreDiligencia() {
      this.abreChatDialogo = true
      this.abreChatConteudo = 'aberto'
    }
  }
};
</script>

<style>
  .coluna {
    display: flex;
    flex-direction: column;
  }
  .chat {
    display: flex;
    width:100%;
    height: 100vh;
    background: #fff;
  }
</style>
