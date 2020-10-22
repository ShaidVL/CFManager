<template>
  <div>

    <div class="incomes">
      <p>Доходы:</p>
      <hr>
      <div>Пассивный доход:{{passiveIncome}} Общий доход:{{totalIncome}}</div>
      <hr>
      <p>Заработок:{{user.salary}}</p>
      <p>Дивиденты:</p>
      <p>Недвижимость:</p>
      <div v-for="realEstate in user.realEstate">
        <div>{{realEstate.name}}</div>
        <div>Пассивный доход: {{realEstate.cashFlow}}</div>
      </div>
      <p>Бизнес:</p>
      <div v-for="item in user.business">
        <div>{{item.name}}</div>
        <div>Пассивный доход: {{item.cashFlow}}</div>
      </div>
    </div>
    <div class="expenses">
      <p>Расходы:</p>
      <hr>
      <p>Налоги:{{user.taxes}}</p>
      <p>Оплата закладной на дом:{{user.homeMortgagePayment}}</p>
      <p>Оплата кредита на образование:{{user.schoolLoanPayment}}</p>
      <p>Оплата кредита на автомобиль:{{user.carLoanPayment}}</p>
      <p>Выплаты по кредитной карточке:{{user.creditCardPayment}}</p>
      <p>Розничные расходы:{{user.retailPayment}}</p>
      <p>Другие расходы:{{user.otherExpenses}}</p>
      <p>Расходы на детей:</p>
      <p>Оплата кредита банка:</p>
    </div>
    <p>Ежемесячный доход:</p>

    <div class="incomes">
      <p>Активы:</p>
      <hr>
      <p>Акции/Взаимные фонды/Депозиты:</p>
      <div v-for="stock in user.stocks"> {{stock.name}}: {{stock.amount}} акций по ${{stock.price}}</div>
      <p>Недвижимость:</p>
      <div v-for="realEstate in user.realEstate">
        <div>{{realEstate.name}}</div>
        <div>Стоимость: {{realEstate.price}}</div>
        <div>Ипотека: {{realEstate.homeMortgage}}</div>
        <div>Первый взнос: {{realEstate.downPay}}</div>
      </div>
      <p>Бизнес:</p>
      <div v-for="item in user.business">
        <div>{{item.name}}</div>
        <div>Стоимость: {{item.price}}</div>
        <div>Долг: {{item.debt}}</div>
        <div>Первый взнос: {{item.downPay}}</div>
      </div>
    </div>
    <div class="expenses">
      <p>Пассивы:</p>
      <hr>
      <p>Закладная на дом:</p>
      <p>Кредит на образование:</p>
      <p>Кредит на автомобиль:</p>
      <p>Долг по кредитной карточке:</p>
      <p>Розничный долг:</p>
      <p>По закладным:</p>
      <p>Пассивы(бизнес):</p>
      <p>Кредит банка:</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'statement',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      passiveIncome() {
        return this.user.realEstate.reduce((acc,estate)=>acc+Number(estate.cashFlow), 0) + this.user.business.reduce((acc,item)=>acc+Number(item.cashFlow), 0)
      },
      totalIncome() {
        return this.passiveIncome + this.user.salary
      },
    }
  }
</script>

<style>
  .expenses, .incomes {
    border: 1px solid black;
  }
</style>
