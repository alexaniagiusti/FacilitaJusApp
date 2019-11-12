<template>
  <div>
    <v-app-bar class="elevation-0" color="#061161" app fixed>
      <v-btn @click="drawer=!drawer" mt-1 icon>
        <v-icon color="white" size="20">menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="white--text ml-3 mr-5">{{ nome | first}}</span>
      <v-icon color="white">account_circle</v-icon>

      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge class="mr-2" color="green" overlap>
              <template v-slot:badge>
                <span>{{ notifies.length }}</span>
              </template>
              <v-icon size="27" color="white">notifications</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <!-- Aqui começa a lista de notificações que é exibida n badge -->
        <v-card>
          <v-list class="pa-0 ma-0" style="max-height: 350px; overflow: auto;">
            <template v-for="(item, i) in notifies">
              <v-list-item pa-0 ma-0 :key="i" @click="openNotification(item)">
                <v-icon
                  v-if="item.type_notification === 'Diligência' ? true : false"
                  pa-0
                  ma-0
                  style="margin-right: 10px"
                  color="#061161"
                >work</v-icon>
                <v-icon
                  v-if="item.type_notification === 'Dúvida Jurídica' ? true : false"
                  pa-0
                  ma-0
                  style="margin-right: 10px"
                  color="#780206"
                >gavel</v-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">{{ item.type }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.city }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-actions>
                  <v-btn small color="blue darken-2" class="white--text">Ver</v-btn>
                </v-list-item-actions>
              </v-list-item>
              <v-divider :key="i"></v-divider>
            </template>
          </v-list>
        </v-card>
        <v-card
          v-if="notifies.length === 0 ? true : false"
          width="300"
          class="pl-4 pr-4 emptyNotification"
        >
          <v-icon size="40" class="animated heartBeat infinite">notifications_active</v-icon>
          <h4
            class="mt-2 text-center font-weight-light grey--text"
          >Novas demandas serão notificadas aqui.</h4>
        </v-card>
        <!-- Final da lista de notificações -->
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" width="280" class="grey lighten-3" app>
      <div
        class="mb-5 perfil"
        style="border-bottom:1px solid #E0E0E0;background: linear-gradient(to right, #fff, #fff); display: flex; width: 100%; align-items: center; flex-direction: column"
      >
        <div @click="$router.push({name: 'home'})" class="mt-2 mb-0" style="display: flex">
          <img
            class="mt-2 animated delay-1s fadeIn"
            src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-1.png?alt=media&token=1ecc2ffb-2b00-492f-a05e-d5a7382990c7"
            height="40"
          />
        </div>
        <!-- <h3 class="animated delay-1s fadeIn font-weight-light black--text">{{ nome | first }}</h3> -->
        <v-card
          v-if="photo !== null ? true : false"
          light
          width="300"
          class="pt-3 elevation-0"
          style="border-radius: 0px; align-items: center; display: flex; flex-direction: column"
        >
          <v-avatar style="bottom: -30px" size="100">
            <v-img
              :src="photo"
              width="94"
              class="elevation-1"
              style="border-radius: 100%;border: 5px solid #fff;"
              @click.prevent="okzao"
            />
            <div class="middle">
              <label for="foto" class="text">
                <v-icon style="cursor: pointer" color="#007" size="30">add_a_photo</v-icon>
              </label>
              <input type="file" @change="onFileSelected" id="foto" hidden />
            </div>
          </v-avatar>
        </v-card>
        <v-card
          v-else
          light
          width="300"
          class="pt-3 elevation-0"
          style="border-radius: 0px; align-items: center; display: flex; flex-direction: column"
        >
          <v-avatar style="bottom: -30px" size="70">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/moneycareinvestment-01.appspot.com/o/cartoon-avatar.jpeg?alt=media&token=77a0ead3-2eff-41f0-a450-746368eac5e3"
              class="image elevation-1"
              style="border: 5px solid #fff;"
              @click.prevent="okzao"
            />
            <div class="middle">
              <label for="foto" class="text">
                <v-icon style="cursor: pointer" color="#007" size="30">add_a_photo</v-icon>
              </label>
              <input type="file" @change="onFileSelected" id="foto" hidden />
            </div>
          </v-avatar>
        </v-card>
      </div>
      <!-- Grupo com informações do perfil do usuário -->
      <v-list class="pa-3 mt-5" style="margin-top: 10px;" dense rounded>
        <!-- <v-subheader class="ml-3">
          INÍCIO
        </v-subheader>-->

        <v-list-item class="mt-5" @click="$router.push({'name': 'Usuario'})">
          <v-icon class="mr-5">account_circle</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Dados Pessoais</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="work" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Solicitar Serviços</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item class="ml-2" @click="$router.push({'name':'enviarDiligencia'})">
            <v-list-item-content>
              <v-list-item-title>Solicitar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name':'diligenciasEnviadas'})">
            <v-list-item-content>
              <v-list-item-title>Solicitados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name':'diligenciasRecebidas'})">
            <v-list-item-content>
              <v-list-item-title>Recebidos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name':'diligenciasArquivadas'})">
            <v-list-item-content>
              <v-list-item-title>Arquivados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="gavel" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Dúvida Jurídica</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item class="ml-2" @click="$router.push({'name': 'enviarCasoJuridico'})">
            <v-list-item-content>
              <v-list-item-title>Enviar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name': 'casosJuridicosEnviados'})">
            <v-list-item-content>
              <v-list-item-title>Enviados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name': 'casosJuridicosRecebidos'})">
            <v-list-item-content>
              <v-list-item-title>Recebidos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ml-2" @click="$router.push({'name': 'casosJuridicosArquivados'})">
            <v-list-item-content>
              <v-list-item-title>Arquivados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider class="mt-5"></v-divider>
        <v-list-item  id="BtnPremium" class="mt-5" @click="$router.push({'name': 'sejapremium'})">
          <v-icon class="mr-5" color="yellow darken-3">star</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Seja Premium</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://tawk.to/chat/5d7a8373c22bdd393bb58ff8/default" target="_blank">
          <v-icon class="mr-5">message</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Fale com o Suporte</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="sair">
          <v-icon class="mr-5">power_settings_new</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Helper from "../../helper.js";
import { db } from "../../services/Firebase";
import axios from "axios";

export default {
  props: ["diligencesLength", "legalCaseLength"],
  data() {
    return {
      id: 0,
      notifies: [],
      nome: "Carregando...",
      masculino: false,
      feminino: false,
      semSexo: true,
      drawer: true,
      photo: null
    };
  },
  filters: {
    first(val) {
      const helpers = new Helper();
      const fn = helpers.firstName(val);
      return fn;
    }
  },
  methods: {
    onFileSelected(e) {
      this.$store.commit("setVueLoad", true);
      const fileSelected = e.target.files;
      //console.log("fileSelected", fileSelected);
      let fd = new FormData();
      fd.append("photo", e.target.files[0]);
      axios
        .post(`${this.$store.getters.api}/api/v1/users/photo`, fd, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`
          }
        })
        .then(res => console.log("resPhoto: ", res))
        .then(() => this.$store.commit("setVueLoad", false))
        .then(() =>
          this.$store.commit(
            "snackbar_success",
            "Sua foto de perfil foi atualizada com sucesso."
          )
        )
        .catch(err => {
          console.log(err);
          this.$store.commit("setVueLoad", false);
        });
    },
    openNotification(notification) {
      db.ref(
        `notificacoes-usuarios/${this.$store.getters.getUsuario.id}/${notification.key}`
      )
        .remove()
        .then(() => this.redirecting(notification));
    },
    redirecting(notification) {
      if (notification.type_notification === "Diligência") {
        this.$router.push(`/diligencia/recebida/${notification.id}`);
      } else {
        this.$router.push(`/casos-juridicos/recebido/${notification.id}`);
      }
    },
    irPara(rota) {
      console.log("fui chamada");
    },
    sair() {
      this.$router.push({ name: "login" });
      sessionStorage.clear();
      this.$store.commit("setUser", null);
      location.reload();
    }
  },
  created() {
    const usuario = JSON.parse(sessionStorage.usuario);
    this.photo = usuario.photo;
    this.id = usuario.id;
    this.nome = usuario.name;
    const sexo = usuario.sex;
    if (sexo === "Masculino") {
      this.masculino = true;
      this.semSexo = false;
    } else if (sexo === "Feminino") {
      this.feminino = true;
      this.semSexo = false;
    } else {
      this.semSexo = true;
    }
    const query = db.ref(`notificacoes-usuarios/${usuario.id}`);
    query.on("value", dataSnap => {
      let notifies = [];
      dataSnap.forEach(dataChild => {
        let item = dataChild.val();
        item["key"] = dataChild.key;
        notifies.push(item);
      });
      this.notifies = notifies;
    });
  }
};
</script>

<style scoped>

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}
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

.emptyNotification {
  display: flex;
  width: 100%;
  height: 350px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


#BtnPremium:hover {
  background-color: #E6EE9C;
}
</style>