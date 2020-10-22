<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Продажа Акций/Депозита</div>
    <div>Наименование: {{name}}</div>
    <div>Количество: {{amount}}</div>
    <div>Цена акции: {{price}}</div>
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
        amount: 0,
        price: 0,
        cashFlow: 0,
        salePrice: 0,
      }
    },
    mounted() {
      this.id = Number(this.$route.query.id)
      const stock = this.$store.state.user.stocks.find(stock => stock.id === this.id)
      this.name = stock.name
      this.amount = stock.amount
      this.price = stock.price
      this.cashFlow = stock.cashFlow
    },
    computed: {
      total(){
        return Number(this.salePrice) * Number(this.amount)
      },
      benefit() {
        return this.total - Number(this.price) * Number(this.amount)
      }
    },
    methods: {
      removeAsset() {
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash + this.benefit,
          stocks: user.stocks.filter(stock => stock.id !== this.id)
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
