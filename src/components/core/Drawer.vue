<template>
  <div>
    <v-toolbar class="elevation-0" color="grey darken-4" app fixed>
      <v-btn @click="drawer=!drawer" mt-1 icon>
        <v-icon color="white" size="20" >menu</v-icon>
      </v-btn>
      <span class="white--text title ml-3 mr-5"><span class="font-weight-light white--text"></span></span>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      width="250"
      class="grey lighten-4"
      app
    >
      <v-card class="elevation-0 mb-5" color="grey darken-4">
        <div style="display: flex; width: 100%; align-items: center; flex-direction: column">
          <div class="mt-3 mb-2" style="display: flex">
            <v-icon color="white" class="mr-1">account_balance</v-icon>
            <span class="white--text title mt-1">Facilita</span>
            <span class="white--text title mt-1 font-weight-light">Jus</span>
          </div>
          <h3 class="text-uppercase white--text">{{ nome }}</h3>
          
          <v-avatar style="bottom: -28px" color="white" v-if="masculino" size="70"> 
            <v-img
              style="border: 6px solid #fff;"
              src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842"
            ></v-img>
          </v-avatar>
          
          <v-avatar style="bottom: -28px" v-if="feminino" color="white" size="70"> 
            <v-img
              style="border: 6px solid #fff;"
              src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar2.png?alt=media&token=850d414f-4b73-4fe9-b63b-e79c8c01ac2f"
            ></v-img>
          </v-avatar>

          <v-avatar style="bottom: -28px" v-if="semSexo" size="70"> 
            <v-img
              style="border: 6px solid #fff;"
              src="https://firebasestorage.googleapis.com/v0/b/moneycareinvestment-01.appspot.com/o/cartoon-avatar.jpeg?alt=media&token=77a0ead3-2eff-41f0-a450-746368eac5e3"
            ></v-img>
          </v-avatar>
        </div>
        
      </v-card>
    <!-- Grupo com informações do perfil do usuário -->
      <v-list class="pa-0 mt-0">
        <v-subheader class="ml-3">
          INÍCIO
        </v-subheader>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        nome: 'Carregando...',
        masculino: false,
        feminino: false,
        semSexo: true,
        drawer: true
      }
    },
    created() {
      const usuario = JSON.parse(sessionStorage.usuario)
      this.nome = usuario.name
      const sexo = usuario.sex
      if(sexo === 'Masculino') {
        this.masculino = true,
        this.semSexo = false
      } else if (sexo === 'Feminino') {
        this.feminino = true
        this.semSexo = false
      } else {
        this.semSexo = true
      }

    }
  }
</script>