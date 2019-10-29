<template>
  <v-layout>
			<v-flex>
				<v-toolbar flat color="white" dark>
					<v-spacer></v-spacer>
					<span class="font-weight-light black--text">Dúvidas Arquivadas</span>
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
              <!-- <th class="text-left blue--text"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in casosArquivados" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.legal_case.name }}</td>
              <td>{{ item.legal_case.city.city }}</td>
              <td>{{ item.legal_case.actuation.actuation }}</td>
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
      casosArquivados: []
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
          res => {
            (this.casosArquivados = res.data),
            this.$store.commit("setVueLoad", false)
            console.log(this.casosArquivados)
          }
        );
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getArquivadas();
  }
};
</script>