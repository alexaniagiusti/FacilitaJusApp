<template>
  <v-dialog width="300" persistent style="overflow: hidden" v-model="dialog">
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="blue darken-4">
              <v-icon class="fadeIn" size="30" color="white">{{ icon }}</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div class="linhaSemQuebra">
            <v-spacer></v-spacer>
            <h3 class="text-center">{{ content }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>
        <div class="linhaSemQuebra">
          <v-flex class="pa-2" xs6>
            <v-btn class="white--text" block color="blue darken-4" @click="cancela">Cancela</v-btn>
          </v-flex>
          <v-flex class="pa-2" xs6>
            <v-btn class="white--text" block color="blue darken-4" @click="confirma">Confirma</v-btn>
          </v-flex>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "content", "icon", "confirma", "cancela"]
};
</script>