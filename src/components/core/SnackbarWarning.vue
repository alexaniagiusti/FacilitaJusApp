<template>
  <!-- SNACK BAR DE WARNING GLOBAL -->
  <v-dialog width="300" persistent style="overflow: hidden" v-model="snackbar_warning.mostrar">
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div style="display: flex; flex-direction: column">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="yellow darken-3">
              <v-icon class="fadeIn" size="30" color="white">warning</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div
            v-if="isarray"
            style=" flex-direction: column; display: flex; justify-content: center; width: 100%"
          >
            <span
              class="text-center"
            >{{snackbar_warning.mensagem.length}} pontos precisam de atenção:</span>
            <v-divider></v-divider>
            <template v-for="(item, i) in snackbar_warning.mensagem">
              <div :key="i" class="mt-2 mb-2 linhaSemQuebra">
                <v-icon color="green" class="ma-2" size="5">lens</v-icon>
                <h4 class="pt-1 pb-1 font-weight-light grey--text" :key="i">{{ item }}</h4>
              </div>
              <v-divider :key="i"></v-divider>
            </template>
          </div>
          <div v-else style="display: flex; justify-content: center; width: 100%">
            <v-spacer></v-spacer>
            <h3 class="text-center">{{ snackbar_warning.mensagem }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn color="yellow darken-3" block class="white--text" @click="fecha_snackbar">ok</v-btn>
        </v-flex>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isarray: false
    };
  },
  computed: {
    snackbar_warning() {
      if (Array.isArray(this.$store.getters.snackbar_warning.mensagem)) {
        this.isarray = true;
      } else {
        this.isarray = false;
      }
      return this.$store.getters.snackbar_warning;
    }
  },
  methods: {
    fecha_snackbar() {
      this.$store.dispatch("desativa_snackbar");
    }
  }
};
</script>
