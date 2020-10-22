<template>
  <div>
    <button @click="newGame">Новая игра</button>
    <button @click="addAsset">Добавить актив</button>
    <div>
      <div @click="$router.push('/act/stock')">Акции/Взаимные фонды/Депозиты</div>
      <div @click="$router.push('/act/estate')">Недвижимость</div>
      <div @click="$router.push('/act/business')">Бизнес</div>
      <div @click="$router.push('/act/other')">Другое</div>
    </div>

  </div>
</template>

<script>
  export default {
    middleware: ['checkUser'],
    layout:'action',
    methods:{
      newGame(){
        localStorage.removeItem('user')
        this.$store.commit('newGame')
        this.$router.push('/profession')
      },
      addAsset(){

      },

    }
  }
</script>

<style>
</style>
