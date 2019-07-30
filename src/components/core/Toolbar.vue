<template>
    <v-toolbar class="elevation-0" color="blue lighten" app absolute clipped-left>
        <v-btn @click="$store.dispatch('drawer')" mt-1 icon>
          <v-icon color="white" size="20" >menu</v-icon>
        </v-btn>
        <span class="white--text title ml-3 mr-5"><span class="font-weight-light white--text">Central de Oportunidades</span></span>
      </v-toolbar>
</template>