<template>
  <div>
    <div>
      <button @click="newGame">Новая игра</button>
    </div>
    <div>
      <button @click="showAssets = !showAssets">Добавить актив</button>
    </div>
    <div v-if="showAssets">
      <div @click="$router.push('/act/stock')">Акции/Взаимные фонды/Депозиты</div>
      <div @click="$router.push('/act/estate')">Недвижимость</div>
      <div @click="$router.push('/act/business')">Бизнес</div>
      <div @click="$router.push('/act/other')">Другое</div>
    </div>
    <div>
      <button @click="$router.push('/act/sale')">Продать актив</button>
    </div>
    <div>
      <button @click="$router.push('/act/cash')">Операции с наличными</button>
    </div>
    <div>
      <button @click="$router.push('/act/liabilties')">Операции с пассивами</button>
    </div>

  </div>
</template>

<script>
  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        showAssets: false,
      }
    },
    methods: {
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
