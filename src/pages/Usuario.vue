<template>
  <v-container pa-0 ma-0 fluid>
    <v-layout column>
      <v-flex xs12>
        <v-tabs
          app
          grow
          v-model="tab"
          class="hidden-sm-and-down"
        >
          <v-tab>
            <v-icon>
              person
            </v-icon>
            <span>Perfil</span>
          </v-tab>

          <v-tab>
            <v-icon>
              assignment
            </v-icon>
            <span>Áreas de Atuação</span>
          </v-tab>

          <v-tab>
            <v-icon>
              description
            </v-icon>
            <span>Serviços Atendidos</span>
          </v-tab>

          <v-tab>
            <v-icon>
              place
            </v-icon>
            CidadesAtendidas
          </v-tab>

          <v-tab>
            <v-icon class="mr-1" >
              vpn_key
            </v-icon>
            Senha
          </v-tab>
        </v-tabs>
      </v-flex>

      <v-flex xs12>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <AtualizarPerfil/>
          </v-tab-item>

          <v-tab-item>
            <AreasDeAtuacao/>
          </v-tab-item>
          
          <v-tab-item>
            <ServicosAtendidos/>            
          </v-tab-item>
          
          <v-tab-item>
            <CidadesAtendidas/>
          </v-tab-item>
          
          <v-tab-item>
            <AtualizarSenha/>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      
      <v-flex xs12>
        <v-bottom-navigation
          app
          v-model="tab"
          shift
          class="hidden-lg-and-up"
        >
          
          <v-btn>
            <v-icon>
              person
            </v-icon>
            <span>Perfil</span>
          </v-btn>
          
          <v-btn>
            <v-icon>
              assignment
            </v-icon>
            <span>Atuação</span>
          </v-btn>

          <v-btn>
            <v-icon>
              description
            </v-icon>
            <span>Serviços</span>
          </v-btn>

          <v-btn>
            <v-icon>
              place
            </v-icon>
            <span>Cidades</span>
          </v-btn>

          <v-btn>
            <v-icon>
              vpn_key
            </v-icon>
            <span>Senha</span>
          </v-btn>

        </v-bottom-navigation>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AtualizarPerfil from '../components/usuario/Atualizar.vue'
import AreasDeAtuacao from '../components/usuario/AreasDeAtuacao.vue'
import CidadesAtendidas from '../components/usuario/CidadesAtendidas.vue'
import ServicosAtendidos from '../components/usuario/ServicosAtendidos.vue'
import AtualizarSenha from '../components/usuario/AtualizarSenha.vue'

export default {
  components: {
    AtualizarPerfil,
    AreasDeAtuacao,
    CidadesAtendidas,
    ServicosAtendidos,
    AtualizarSenha
  },
  data() {
    return {
      tab: 0
    }
  }
}
</script>
