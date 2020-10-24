<template>
  <div>
    <div>{{user.name}} {{user.cash}}$
      <button @click="$router.push('/act')">Действие</button>
      <button @click="newGame">Новая игра</button>
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
