<template>
  <div>
    Если Вы играте в 202 игру то можете
    <button @click="chooseInvestmentPackage(Math.floor(Math.random()*12)+1)">получить рандомный</button>
    <strong>Начальный инфестиционный пакет</strong> или
    <button @click="showInvestmentPackage=!showInvestmentPackage">выбрать его</button>
    наче нажмите <button @click="proceed">далее</button>
    <div v-if="showInvestmentPackage">
      <div v-for="item in investmentPackage" :key="item.id">
        <div>Наличные: {{item.cash}}</div>
        <div>Акции:</div>
        <div v-for="stock in item.stocks"> {{stock.name}}: {{stock.amount}} акций по ${{stock.price}}</div>
        <div>Недвижимость:</div>
        <div v-for="realEstate in item.realEstate">
          <div>{{realEstate.name}}</div>
          <div>Стоимость: {{realEstate.price}}</div>
          <div>Ипотека: {{realEstate.homeMortgage}}</div>
          <div>Первый взнос: {{realEstate.downPay}}</div>
          <div>Пассивный доход: {{realEstate.cashFlow}}</div>
        </div>
        <button @click="chooseInvestmentPackage(item.id)">Выбрать</button>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  import {investmentPackage} from '~/static/data'

  export default {
    middleware: ['checkUser'],
    data() {
      return {
        investmentPackage,
        showInvestmentPackage: false,
      }
    },
    methods: {
      chooseInvestmentPackage(id) {
        const item = this.investmentPackage.find(item => item.id === id)
        const user = this.$store.state.user
        const cashFlow = user.salary - (user.taxes + user.homeMortgagePayment + user.schoolLoanPayment + user.carLoanPayment + user.creditCardPayment + user.retailPayment + user.otherExpenses)
        const person = {
          ...user,
          cash: user.savings + item.cash + cashFlow,
          stocks: item.stocks,
          realEstate: item.realEstate
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      },
      proceed(){
        const user = this.$store.state.user
        const cashFlow = user.salary - (user.taxes + user.homeMortgagePayment + user.schoolLoanPayment + user.carLoanPayment + user.creditCardPayment + user.retailPayment + user.otherExpenses)
        const person = {
          ...user,
          cash: user.savings + cashFlow,
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      }
    },
  }
</script>

<style>
</style>
