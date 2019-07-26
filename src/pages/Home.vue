<template>
  <div style="display:flex; width:100%; height:100vh">
    <Toolbar />
    <Drawer />
    <Footer />
  </div>
</template>

<script>
import Toolbar from '../components/Toolbar'
import Drawer from '../components/Drawer'
import Footer from '../components/Footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Drawer,
    Toolbar
  }
}
</script> 
 