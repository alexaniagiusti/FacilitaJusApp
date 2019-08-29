<template>
  <v-app>
    <Drawer :legalCaseLength="legalCases.length" :diligencesLength="diligences.length" />
    <v-content>
      <router-view></router-view>
      <v-container v-if="$route.name === 'home'" fluid>
        <div class="cards">
          <!-- <v-flex class="pa-2" v-for="n in cards" :key="n" xs12 md4>
            <v-card
              class="mt-5 mb-5 mx-auto"
              max-width="400"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="n.color"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-sparkline
                  :labels="labels"
                  :value="value"
                  color="white"
                  line-width="2"
                  padding="12"
                ></v-sparkline>
              </v-sheet>

              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">User Registrations</div>
                <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
                <v-divider class="my-2"></v-divider>
                <v-icon
                  class="mr-2"
                  small
                >
                  mdi-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-flex>-->

          <!-- Mini cards -->
          <v-flex class="pa-2" xs12 md6>
            <v-card
              @click="$router.push({name: 'diligenciasRecebidas'})"
              class="mt-5 mx-1"
              max-width="100%"
            >
              <div class="linhaSemQuebra">
                <v-sheet
                  class="v-minisheet--offset ml-3 mr-3"
                  color="blue"
                  elevation="6"
                  max-width="80px"
                >
                  <v-icon color="white" size="50" class="ma-4">worker</v-icon>
                </v-sheet>
                <div class="linhaSemQuebra">
                  <v-spacer></v-spacer>
                  <div class="coluna pr-4 pt-4">
                    <h3 class="text-right font-weight-light grey--text">Diligências</h3>
                    <h2 class="font-weight-light" align="right">{{diligences.length}}</h2>
                  </div>
                </div>
              </div>
              <v-card-text class="pt-5">
                <!-- <v-divider class="mb-2"></v-divider>
                <v-icon class="mr-2" small>
                  mdi-clock
                </v-icon>
                <span class="pl-2 caption grey--text font-weight-light">last registration 26 minutes ago</span>-->
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex class="pa-2" xs12 md6>
            <v-card
              @click="$router.push({name: 'casosJuridicosRecebidos'})"
              class="mt-5 mx-1"
              max-width="100%"
            >
              <div class="linhaSemQuebra">
                <v-sheet
                  class="v-minisheet--offset ml-3 mr-3"
                  color="red"
                  elevation="6"
                  max-width="80px"
                >
                  <v-icon color="white" size="50" class="ma-4">gavel</v-icon>
                </v-sheet>
                <div class="linhaSemQuebra">
                  <v-spacer></v-spacer>
                  <div class="coluna pr-4 pt-4">
                    <h3 class="text-right font-weight-light grey--text">Casos jurídicos</h3>
                    <h2 class="font-weight-light" align="right">{{legalCases.length}}</h2>
                  </div>
                </div>
              </div>
              <v-card-text class="pt-5">
                <!-- <v-divider class="mb-2"></v-divider> -->
                <!-- <v-icon class="mr-2" small>
                  mdi-clock
                </v-icon>-->
                <!-- <span class="pl-2 caption grey--text font-weight-light">last registration 26 minutes ago</span> -->
              </v-card-text>
            </v-card>
          </v-flex>
        </div>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from "../components/core/Drawer.vue";
import Footer from "../components/core/Footer.vue";
import { messaging } from "../services/Firebase";
import axios from "axios";

export default {
  data() {
    return {
      diligences: "",
      legalCases: ""
    };
  },
  components: {
    Drawer,
    Footer
  },
  methods: {
    diligencesWithOpenStatus() {
      this.showListar = false;
      axios
        .get(
          `${this.$store.getters.api}/api/v1/diligences/received/open/${this.$store.getters.getUsuario.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.diligences = res.data;
          sessionStorage.diligencesLength = res.data.length;
          this.showListar = true;
        })
        .catch(e => console.log(e));
    },
    legalCasesWithOpenStatus() {
      this.showListar = false;
      axios
        .get(
          `${this.$store.getters.api}/api/v1/legal-cases/received/open/${this.$store.getters.getUsuario.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(res => {
          this.$store.commit("setVueLoad", false);
          this.legalCases = res.data;
          sessionStorage.legalCasesLength = res.data.length;
          this.showListar = true;
        })
        .catch(e => console.log(e));
    },
    sendTokenToPushNotification(token) {
      const data = {
        user_id: this.$store.getters.getUsuario.id,
        token: token
      };

      console.log(data);
      console.log(this.$store.getters.getToken);

      axios
        .post(`${this.$store.getters.api}/api/v1/token-web-push`, data, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res =>
          console.log("o token foi enviadiu: " + JSON.stringify(res.data))
        );
    },
    userHasToken() {
      messaging.getToken().then(currentToken => {
        if (currentToken) {
          console.log("já tem token: " + currentToken);
          messaging.usePublicVapidKey(
            "BPTNHRboMGxQheuMuJWDnXMtL_wpNxV3RJ8xcj06eKCo1Cs71Y4HnjRwtdEri_IhJmR1KKcBCzt__p-tOPqPuSA"
          );
        } else {
          messaging
            .requestPermission()
            .then(() => {
              console.log("Notification permission granted.");
              messaging.getToken().then(token => {
                this.sendTokenToPushNotification(token);
              });
            })
            .catch(err => {
              console.log("Unable to get permission to notify.", err);
            });
        }
      });
      this.listeningNewPushMessages();
    },
    listeningNewPushMessages() {
      messaging.onMessage(msg => {
        console.log("recebido", msg);
      });
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.diligencesWithOpenStatus();
    this.legalCasesWithOpenStatus();
    this.$store.commit("setVueLoad", false);
    this.userHasToken();
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  height: 180px;
  position: relative;
}

.v-minisheet--offset {
  top: -4px;
  position: relative;
}

.cards {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.perfil:hover .image {
  opacity: 0.3;
}

.perfil:hover .middle {
  opacity: 1;
}

.text {
  color: #333;
  font-size: 16px;
  padding: 16px 32px;
}
</style>