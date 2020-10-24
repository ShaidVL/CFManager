<template>
  <div>
    <div>
      <button @click="showAssets = !showAssets">Добавить актив</button>
    </div>
    <div v-if="showAssets">
      <br>
      <div @click="$router.push('/act/stock')">Акции/Взаимные фонды/Депозиты</div>
      <br>
      <div @click="$router.push('/act/estate')">Недвижимость</div>
      <br>
      <div @click="$router.push('/act/business')">Бизнес</div>
      <br>
      <div @click="$router.push('/act/other')">Другое</div>
    </div>
    <hr>
    <div>
      <button @click="$router.push('/act/sale')">Продать актив</button>
    </div>
    <hr>
    <div>
      <button @click="$router.push('/act/cash')">Операции с наличными</button>
    </div>
    <hr>
    <div>
      <button @click="$router.push('/act/liabilties')">Операции с пассивами</button>
    </div>
    <hr>
    <div v-if="showFastTrackBtn">
      <button @click="goToFastTrack">Перейти на быстрый круг</button>
      <hr>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        showAssets: false,
      }
    },
    computed:{
      ...mapGetters([
        'user'
      ]),
      showFastTrackBtn(){
        return this.user.passiveIncome > this.user.totalExpenses
      }
    },
    methods: {
      goToFastTrack(){
        const person = {
        ...this.user,
          fastTrack: true,
          cash: Math.round(this.user.passiveIncome/1000) *100000,
          initialCashFlow: Math.round(this.user.passiveIncome/1000) *100000,
          business:[]
      }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/fast-track')
      },
    }
  }
</script>

<style>
</style>
