<template>
  <v-app style="display:flex; width:100%; height:100vh">
    <Toolbar />
    <Drawer />
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '../components/core/Toolbar'
import Drawer from '../components/core/Drawer'
import Footer from '../components/core/Footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Drawer,
    Toolbar,
    Footer
  }
}
</script> 
