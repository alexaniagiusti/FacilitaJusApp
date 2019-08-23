<template>
<v-layout fluid>
  <Drawer :legalCaseLength="legalCases.length" :diligencesLength="diligences.length"/>
    <v-toolbar flat color="white" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-light black--text">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <slot>
    </slot>
</v-layout>
</template>

<script>
import Drawer from '../components/core/Drawer'
export default {
  props: [
    'title',
    'diligencesLength',
		'legalCaseLength'
  ],
  data () {
    return {

    }
  },
  components:{
    Drawer
  },
  mounted(){
    console.log(this.title)
  }
}
</script>>