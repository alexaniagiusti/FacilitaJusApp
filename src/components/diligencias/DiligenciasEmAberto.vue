<template>
  <v-layout>
    <v-flex xs12>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left blue--text">#</th>
          <th class="text-left blue--text">Cidade</th>
          <th class="text-left blue--text">Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aberta in emAberto" :key="aberta.id" style="cursor: pointer" @click="abreDiligencia(aberta)">
          <td>{{ aberta.id }}</td>
          <td>{{ aberta.city.city }}</td>
          <td>{{ aberta.service.service }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      emAberto: []
    }
  },
  methods: {
    abreDiligencia(diligencia) {
      this.$store.dispatch('snackbar_success', diligencia.name)
    },
    pegaDiligenciasEmAberto() {
      const token = sessionStorage.token

      const recuperaLogin = JSON.parse(sessionStorage.usuario)
      const { id } = recuperaLogin

      const header = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      axios.get(`${this.$store.getters.api}/api/v1/diligences/received/open/${id}`, header)
        .then((res) => {
          this.emAberto = res.data
        });
    }
  },
  created() {
    this.pegaDiligenciasEmAberto()
  }
}
</script>
