<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Продажа Акций/Депозита</div>
    <div>Наименование: {{name}}</div>
    <div>Количество: {{amount}}</div>
    <div>Цена акции: {{price}}</div>
    <hr>
    <div>Количество<input v-model="saleAmount" name="saleAmount" type="text" @input="checkForDigit"  @change="onChange"></div>
    <div>Цена продажи<input v-model="salePrice" name="salePrice" type="text" @input="checkForDigit"></div>
    <hr>
    <div>Итого: {{total}} Выгода: {{benefit}}</div>
    <button @click="removeAsset">Продать</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        name: '',
        amount: 0,
        price: 0,
        cashFlow: 0,
        saleAmount: 0,
        salePrice: 0,
      }
    },
    mounted() {
      this.id = Number(this.$route.query.id)
      const stock = this.user.stocks.find(stock => stock.id === this.id)
      this.name = stock.name
      this.amount = stock.amount
      this.price = stock.price
      this.cashFlow = stock.cashFlow
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      total() {
        return Number(this.salePrice) * Number(this.saleAmount)
      },
      benefit() {
        return this.total - Number(this.price) * Number(this.saleAmount)
      }
    },
    methods: {
      removeAsset() {
        let stocks
        if (Number(this.saleAmount) < Number(this.amount)) {
          stocks = this.user.stocks.map(stock => stock.id !== this.id ? stock : ({
            ...stock,
            amount: stock.amount - Number(this.saleAmount)
          }))
        } else {
          stocks = this.user.stocks.filter(stock => stock.id !== this.id)
        }
        const person = {
          ...this.user,
          cash: this.user.cash + this.total,
          stocks
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
      onChange() {
        if (Number(this.saleAmount) > Number(this.amount)) {
          this.saleAmount = this.amount
        }
      }
    }
  }
</script>

<style>
</style>
