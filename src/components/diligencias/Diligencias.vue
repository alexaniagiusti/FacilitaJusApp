<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Diligências</v-toolbar-title>
        </v-toolbar>

        <v-tabs vertical>
          <v-tab>
            <v-icon class="pa-1">
              drafts
            </v-icon>
            Em aberto
          </v-tab>
          <v-tab>
            <v-icon class="pa-1">
              drafts
            </v-icon>
            Em aberto
          </v-tab>
        </v-tabs>

        <!--<v-tabs-items
          v-model="tabs"
        >
          <v-tab-item>
            <v-layout>
              <v-flex xs12>
                <v-simple-table>
                  <thead>
                    <th>teste Head</th>
                    <th>teste Head</th>
                    <th>teste Head</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Teste</td>
                      <td>Teste</td>
                      <td>Teste</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-flex>
            </v-layout>
          </v-tab-item>
          <v-tab-item>
            Respondidas Conteúdo
          </v-tab-item>
          <v-tab-item>
            Em Negociação Conteúdo
          </v-tab-item>
          <v-tab-item>
            Finalizadas Conteúdo
          </v-tab-item>
        </v-tabs-items> -->
        <v-dialog v-model="diligenciaDialog">

        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: 0
    }
  }
}
</script>

<style>

</style>
