<template>
  <div>
    Вы можете
    <button @click="chooseProfession(Math.floor(Math.random()*12)+1)">получить рандомную</button>
    <strong>профессию</strong> или
    <button @click="showProfession = !showProfession">выбрать ее</button>
    <div v-if="showProfession">
      <div v-for="person in profession">
        <div @click="showPerson = person.id">{{person.name}}</div>
        <div v-if="showPerson === person.id">
          <div class="incomes">
            <p>Доходы:</p>
            <hr>
            <p>Заработок:{{person.salary}}</p>
          </div>
          <div class="expenses">
            <p>Расходы:</p>
            <hr>
            <p>Налоги:{{person.taxes}}</p>
            <p>Оплата закладной на дом:{{person.homeMortgagePayment}}</p>
            <p>Оплата кредита на образование:{{person.schoolLoanPayment}}</p>
            <p>Оплата кредита на автомобиль:{{person.carLoanPayment}}</p>
            <p>Выплаты по кредитной карточке:{{person.creditCardPayment}}</p>
            <p>Розничные расходы:{{person.retailPayment}}</p>
            <p>Другие расходы:{{person.otherExpenses}}</p>
          </div>
          <p>Ежемесячный
            доход:{{person.salary-(person.taxes+
            person.homeMortgagePayment+
            person.schoolLoanPayment+person.
            carLoanPayment+person.creditCardPayment+
            person.retailPayment+person.otherExpenses)
            }}</p>
          <button @click="chooseProfession(person.id)">Выбрать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {profession} from '~/static/data'

  export default {
    middleware: ['checkUser'],
    data() {
      return {
        profession,
        showProfession: false,
        showPerson: 0,
      }
    },
    methods: {
      chooseProfession(id) {
        const user = this.profession.find(person => person.id === id)
        const cashFlow = user.salary - (user.taxes + user.homeMortgagePayment + user.schoolLoanPayment + user.carLoanPayment + user.creditCardPayment + user.retailPayment + user.otherExpenses)
        const person = {
          ...user,
          cash: user.savings + cashFlow,
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        // this.$router.push('/investpac')
        this.$router.push('/')
      },
    },
  }
</script>

<style>
</style>
