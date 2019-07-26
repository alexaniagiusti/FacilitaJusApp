<template>
    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>

<script>
export default {

}
</script>

<style>
 .rodape {
    display: flex;
    position: relative;
    bottom: 0;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }
</style>
