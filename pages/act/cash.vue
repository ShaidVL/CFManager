<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <hr>
    <div>
      <button @click="getMoney">Получить деньги</button>
      <input v-model="getCash" name="getCash" type="text" @input="checkForDigit"></div>
    <br>
    <div>
      <button @click="spendMoney">Потратить деньги</button>
      <input v-model="spendCash" name="spendCash" type="text" @input="checkForDigit"></div>
    <br>
    <div>
      <button @click="getSalary">Cash Flow</button>
      {{cashFlow}}$
    </div>
    <br>
    <div>
      <button @click="payExpense">Выплатить общий расход</button>
      {{user.totalExpenses}}$
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
        getCash: 0,
        spendCash: 0,
        indicateCash: 0,
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      totalIncome() {
        return this.user.passiveIncome + this.user.salary
      },
      cashFlow() {
        return this.totalIncome - this.user.totalExpenses
      },
    },
    methods: {
      getMoney() {
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash + Number(this.getCash)
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      },
      spendMoney() {
        const user = this.$store.state.user
        if (Number(this.spendCash) > user.cash) {
          let sum = (Number(this.spendCash) - user.cash)
          sum = sum - sum % 1000 + 1000
          alert(`Вам нехватает средств. нужен кредит минимум на ${sum}`)
        } else {
          const person = {
            ...user,
            cash: user.cash - Number(this.spendCash)
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      getSalary() {
        const user = this.$store.state.user
        if (this.cashFlow + user.cash < 0) {
          const person = {
            ...user,
            bankrupt: true
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          alert(`Вы банкрот, следуйте инструкциям или игра окончена`)
        } else {
          const person = {
            ...user,
            cash: user.cash + this.cashFlow,
            bankrupt: false
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      payExpense() {
        const user = this.$store.state.user
        if (this.user.totalExpenses > user.cash) {
          let sum = this.user.totalExpenses - user.cash
          sum = sum - sum % 1000 + 1000
          alert(`Вам нехватает средств. нужен кредит минимум на ${sum}`)
        } else {
          const person = {
            ...user,
            cash: user.cash - this.user.totalExpenses
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
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
