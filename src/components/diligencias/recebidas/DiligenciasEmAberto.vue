<template>
  <v-layout>
    <v-flex xs12>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left blue--text">#</th>
          <th class="text-left blue--text">Cidade</th>
          <th class="text-left blue--text">Tipo</th>
          <th class="text-left blue--text"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aberta in emAberto" :key="aberta.id" style="cursor: pointer">
          <td>{{ aberta.id }}</td>
          <td>{{ aberta.city.city }}</td>
          <td>{{ aberta.service.service }}</td>
          <router-link :to="{name: 'visualizarDiligenciaRecebida', params:{id : aberta.id}}"><td><v-btn class="ma-3" small color="primary">Visualizar</v-btn></td></router-link>
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
    ModalDiligencia,
  },
  data() {
    return {
      emAberto: []
    }
  },
  
  methods: {
    pegaDiligenciasEmAberto() {
      axios.get(`${this.$store.getters.api}/api/v1/diligences/received/open/${this.$store.state.usuario.id}`, 
      {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
        .then((res) => {
          this.emAberto = res.data
          console.log (res.data) 
        });
    }
  },
  mounted() {
    console.log(this.$store.state.usuario.id)
    this.pegaDiligenciasEmAberto()
  }
}
</script>
