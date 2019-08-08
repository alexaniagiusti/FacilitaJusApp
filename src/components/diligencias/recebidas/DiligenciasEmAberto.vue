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
        <tr v-for="aberta in emAberto" :key="aberta.id" style="cursor: pointer" @click="$store.dispatch('selecionar_diligencia', aberta)">
          <td>{{ aberta.id }}</td>
          <td>{{ aberta.city.city }}</td>
          <td>{{ aberta.service.service }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    </v-flex>
    <ModalDiligencia/>
  </v-layout>
</template>

<script>
import ModalDiligencia from '../VisualizarDiligencia.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  components: {
    ModalDiligencia
  },
  data() {
    return {
      emAberto: []
    }
  },
  computed: {
    ...mapState({
      diligenciaSelecionada: state => state.diligencias.diligenciaSelecionada
    })
  },
  methods: {
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
          console.log (res.data) 
        });
    }
  },
  created() {
    this.pegaDiligenciasEmAberto()
  }
}
</script>
