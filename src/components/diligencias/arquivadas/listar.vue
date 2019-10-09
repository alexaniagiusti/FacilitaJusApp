<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="12">
        <v-simple-table class="hidden-sm-and-down">
          <thead>
            <tr>
              <th class="text-left blue--text">#</th>
              <th class="text-left blue--text">Nome</th>
              <th class="text-left blue--text">Cidade</th>
              <th class="text-left blue--text">Tipo</th>
              <th class="text-left blue--text">Data</th>
              <th class="text-left blue--text">Hora</th>
              <th class="text-left blue--text">Preço:</th>
              <th class="text-left blue--text hidden-sm-and-down"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in diligenciasarquivadas" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.city.city }}</td>
              <td>{{ item.service.service }}</td>
              <td>{{ item.date | filterDate }}</td>
              <td>{{ item.time }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-list three-line class="hidden-sm-and-up">
          <v-list-item>
            <v-avatar class="pr-2">
              <span>#</span>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span class="font-weight-bold">Alexânia Giusti</span>
              </v-list-item-title>
              <span>Andamentos</span>
              <v-list-item-title>
                <span>03/10/2019</span> -
                <span>18:20:00</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon size="15">place</v-icon>
                <span>Macapá - AP</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      diligenciasarquivadas: []
    };
  },
  filters: {
    filterDate(val) {
      if (!!val) return;
      return moment(val).format("DD/MM/YYYY");
    }
  },
  methods: {
    getArquivadas() {
      axios
        .get(`${this.$store.getters.api}/api/v1/archives/diligences`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`
          }
        })
        .then(
          res => (this.diligenciasarquivadas = res.data),
          this.$store.commit("setVueLoad", false)
        );
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getArquivadas();
  }
};
</script>