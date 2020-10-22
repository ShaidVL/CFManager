<template>
  <div>
    <p>{{user.name}} {{user.cash}} <button @click="$router.push('/act')">Действие</button></p>
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
    },
    methods:{
      goToAct(){
        this.$router.push('/act')
      }
    }
  }
</script>

<style>
</style>
