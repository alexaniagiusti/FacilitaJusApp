<template>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      width="250"
      class="grey lighten-4"
      app
    >
    <!-- Grupo com informações do perfil do usuário -->
      <v-list class="pa-0 ma-0">

    <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-avatar>
                <v-icon>account_circle</v-icon>
              </v-avatar>
              <v-list-tile-title>
                Perfil
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile to="/home/usuario/atualizar">
            <v-list-tile-title class="pl-3 ml-4">
              Atualizar Perfil
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/home/usuario/servicos-atendidos">
            <v-list-tile-title class="pl-3 ml-4">
              Serviços Atendidos
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/home/usuario/cidades-atendidas">
            <v-list-tile-title class="pl-3 ml-4">
              Cidades Atendidas
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/home/usuario/areas-de-atuacao">
            <v-list-tile-title class="pl-3 ml-4">
              Áreas de atuação
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-avatar>
                <v-icon>work</v-icon>
              </v-avatar>
              <v-list-tile-title>
                Diligências
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile to="/">
            <v-list-tile-title class="pl-3 ml-4">
              Cadastrar Diligência
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/">
            <v-list-tile-title class="pl-3 ml-4">
              Visualizar Diligências
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/">
            <v-list-tile-title class="pl-3 ml-4">
              Chat de Diligência
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/">
            <v-list-tile-title class="pl-3 ml-4">
              Pagar Diligência
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    computed: {
      drawer() {
        return this.$store.getters.drawer
      }
    }
  }
</script>