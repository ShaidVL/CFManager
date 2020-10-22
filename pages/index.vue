<template>
  <div>

    <div class="incomes">
      <p>Доходы:</p>
      <hr>
      <div>Пассивный доход:{{user.passiveIncome}} Общий доход:{{totalIncome}}</div>
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
      <div>Общий расход:{{user.totalExpenses}}</div>
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
    <p>Ежемесячный доход: {{cashFlow}}</p>

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
      <p>Закладная на дом:{{user.homeMortgage}}</p>
      <p>Кредит на образование:{{user.schoolLoans}}</p>
      <p>Кредит на автомобиль:{{user.carLoans}}</p>
      <p>Долг по кредитной карточке:{{user.creditCards}}</p>
      <p>Розничный долг:{{user.retailDebt}}</p>
      <p>По закладным:</p>
      <p>Пассивы(бизнес):</p>
      <p>Кредит банка:</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'statement',
    data() {
      return {}
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
    }
  }
</script>

<style>
  .expenses, .incomes {
    border: 1px solid black;
  }
</style>
