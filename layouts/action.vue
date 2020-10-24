<template>
  <div>
    <div>{{user.name}} {{user.cash}}$ <button @click="$router.push('/')">На главную</button></div>
    <Nuxt/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        user: state=>state.user
      })
    }
  }
</script>

<style>
</style>
