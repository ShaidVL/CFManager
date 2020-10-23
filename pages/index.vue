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
      <p v-if="user.homeMortgagePayment">Оплата закладной на дом:{{user.homeMortgagePayment}}</p>
      <p v-if="user.schoolLoanPayment">Оплата кредита на образование:{{user.schoolLoanPayment}}</p>
      <p v-if="user.carLoanPayment">Оплата кредита на автомобиль:{{user.carLoanPayment}}</p>
      <p v-if="user.creditCardPayment">Выплаты по кредитной карточке:{{user.creditCardPayment}}</p>
      <p v-if="user.retailPayment">Розничные расходы:{{user.retailPayment}}</p>
      <p v-for="liability in this.user.liabilities">{{liability.name}}: {{liability.monthlyPay}}</p>
      <p>Другие расходы:{{user.otherExpenses}}</p>
      <p v-if="user.childrenAmount">Расходы на детей({{user.perChildExpenses}}*{{user.childrenAmount}}): {{user.childExpenses}}</p>
      <p v-if="user.bankLoanPayment">Оплата кредита банка: {{user.bankLoanPayment}}</p>
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
      <p>Другое:</p>
      <div v-for="item in user.other">
        <div>{{item.name}}</div>
        <div>Количество: {{item.amount}}</div>
        <div>Стоимость: {{item.price}}</div>
      </div>
    </div>
    <div class="expenses">
      <p>Пассивы:</p>
      <hr>
      <p v-if="user.homeMortgage">Закладная на дом:{{user.homeMortgage}}</p>
      <p v-if="user.schoolLoans">Кредит на образование:{{user.schoolLoans}}</p>
      <p v-if="user.carLoans">Кредит на автомобиль:{{user.carLoans}}</p>
      <p v-if="user.creditCards">Долг по кредитной карточке:{{user.creditCards}}</p>
      <p v-if="user.retailDebt">Розничный долг:{{user.retailDebt}}</p>
      <p v-if="user.bankLoan">Кредит банка: {{user.bankLoan}}</p>
      <p v-for="liability in this.repayLiabilities">{{liability.name}}: {{liability.debt}}</p>
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
      repayLiabilities() {
        return this.user.liabilities.filter(liability=>liability.repayAbility)
      }
    }
  }
</script>

<style>
  .expenses, .incomes {
    border: 1px solid black;
  }
</style>
