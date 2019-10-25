<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="12">
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left blue--text">#</th>
              <th class="text-left blue--text">Nome</th>
              <th class="text-left blue--text">Cidade</th>
              <th class="text-left blue--text">Tipo</th>
              <th class="text-left blue--text hidden-sm-and-down"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in casosarquivados" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.city.city }}</td>
              <td>{{ item.actuation.actuation }}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
      casosarquivados: []
    };
  },
  methods: {
    getArquivadas() {
      axios
        .get(`${this.$store.getters.api}/api/v1/archives/legal-cases`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`
          }
        })
        .then(
          res => (this.casosarquivados = res.data),
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