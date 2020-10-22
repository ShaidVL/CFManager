<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <div>Бизнес</div>
    <div>Наименование<input v-model="name" type="text"></div>
    <div>Стоимость<input v-model="price" name="price" type="text" @input="checkForDigit"></div>
    <div>Долг<input v-model="debt" name="debt" type="text" @input="checkForDigit"></div>
    <div>Пассивный доход<input v-model="cashFlow" name="cashFlow" type="text" @input="checkForDigit"></div>

    <div>Цена покупки: {{downPay}}</div>
    <button @click="addAsset">Купить</button>
  </div>
</template>

<script>

  export default {
    middleware: ['checkUser'],
    data(){
      return{
        name: '',
        price: 0,
        debt: 0,
        cashFlow: 0,
      }
    },
    computed: {
      downPay() {
        return Number(this.price) - Number(this.debt)
      }
    },
    methods:{
      addAsset() {
        const {name, price, debt, downPay, cashFlow} = this
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash - this.downPay,
          business: [...user.business, {name, price, debt, downPay, cashFlow}]
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
