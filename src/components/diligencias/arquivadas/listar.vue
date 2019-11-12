<template>
  <v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<span class="font-weight-light black--text">Serviços Arquivados</span>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-divider></v-divider>
				<v-simple-table>
          <thead>
            <tr>
              <th class="text-left blue--text">#</th>
              <th class="text-left blue--text">Nome</th>
              <th class="text-left blue--text">Cidade</th>
              <th class="text-left blue--text">Tipo</th>
              <!-- <th class="text-left blue--text">Data</th> -->
              <!-- <th class="text-left blue--text">Preço:</th> -->
              <!-- <th class="text-left blue--text"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in diligenciasarquivadas" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.diligence.name }}</td>
              <td>{{ item.diligence.city.city }}</td>
              <td>{{ item.diligence.service.service }}</td>
              <!-- <td>{{ item.date | filterDate }}</td> -->
              <!-- <td>{{ item.diligence.price }}</td> -->
              <!-- <td><v-btn class="primary" @click="$router.push({'name': ''})">Visualizar</v-btn></td> -->
            </tr>
          </tbody>
        </v-simple-table>
				
			</v-flex>
		</v-layout>
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