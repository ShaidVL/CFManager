<template>
  <div>
    <div class="row p-1">
      <div class="col-4 text-left">{{user.name}} {{user.cash}}$</div>
      <div class="col-4 text-center"><button @click="$router.push('/act')">Действие</button></div>
      <div class="col-4 text-right"><button @click="newGame">Новая игра</button></div>
    </div>
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
      newGame() {
        localStorage.removeItem('user')
        this.$store.commit('newGame')
        this.$router.push('/profession')
      },
    }
  }
</script>

<style>
</style>
