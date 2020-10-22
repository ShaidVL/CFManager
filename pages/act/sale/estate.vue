<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Продажа недвижимости</div>
    <div>Наименование: {{name}}</div>
    <div>Стоимость: {{price}}</div>
    <div>Ипотека: {{homeMortgage}}</div>
    <div>Начальный взнос: {{downPay}}</div>
    <div>Пассивный доход: {{cashFlow}}</div>
    <hr>
    <div>Цена продажи<input v-model="salePrice" name="salePrice" type="text" @input="checkForDigit"></div>
    <hr>
    <div>Итого: {{total}} Выгода: {{benefit}}</div>
    <button @click="removeAsset">Продать</button>
  </div>
</template>

<script>
  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        name: '',
        price: 0,
        homeMortgage: 0,
        cashFlow: 0,
        downPay: 0,
        salePrice: 0,
      }
    },
    mounted(){
      this.id = Number(this.$route.query.id)
      const estate = this.$store.state.user.realEstate.find(estate=>estate.id===this.id)
      this.name=estate.name
      this.price=estate.price
      this.homeMortgage=estate.homeMortgage
      this.cashFlow=estate.cashFlow
      this.downPay=estate.downPay
    },
    computed:{
      total(){
        return Number(this.salePrice) - Number(this.homeMortgage)
      },
      benefit(){
        return this.total - Number(this.downPay)
      }
    },
    methods: {
      removeAsset() {
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash + this.benefit,
          realEstate: user.realEstate.filter(estate=>estate.id!==this.id)
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      },
      checkForDigit(event) {
        const name = event.target.name
        const value = event.target.value
        this[name] = value.replace(/\D/g, '')
        if (this[name].length > 1) {
          this[name] = this[name].replace(/^0+/, '')
        }
        if (this[name].length === 0) {
          this[name] = '0'
        }
      },
    }
  }
</script>

<style>
</style>
